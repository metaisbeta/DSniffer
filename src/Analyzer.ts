import { IDecorator } from "./interfaces/IDecorator"
import { getDecoratorType } from "./utils/decoratorUtils"
import { FileModel } from "./models/FileModel"
import ts from "typescript";

export class Analyzer {
    run(sourceFile: ts.SourceFile, filePath: string): FileModel {
        const file = new FileModel(filePath, sourceFile.fileName)
        getDecoratorNodeInfo(sourceFile)
    
        function getDecoratorNodeInfo(node: ts.Node) {
            if(ts.isDecorator(node)) {
                let decorator: IDecorator = {
                    name: node.expression.getFirstToken()?.getText() ?? node.expression.getText(),
                    type: getDecoratorType(node),
                    isFactory: false
                }

                if(ts.isCallExpression(node.expression)) {
                    const expression = node.expression
                    decorator.isFactory = true
                    decorator.numParams = expression.arguments.length
                }
                
                file.addDecorator(decorator)
            }
            ts.forEachChild(node, getDecoratorNodeInfo)
        }
    
        return file 
    }
}