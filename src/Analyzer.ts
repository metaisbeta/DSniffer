import { IDecorator } from "./interfaces/IDecorator"
import { getNodeType, getDecoratorElement } from "./utils/decoratorUtils"
import { FileModel } from "./models/FileModel"
import ts from "typescript";

export class Analyzer {
    run(sourceFile: ts.SourceFile, filePath: string): FileModel {
        const file = new FileModel(filePath, sourceFile.fileName)
        getDecoratorNodeInfo(sourceFile)
    
        function getDecoratorNodeInfo(node: ts.Node) {
            if(ts.isDecorator(node)) {
                const decoratorName = node.expression.getFirstToken()?.getText() ?? node.expression.getText()
                const decoratorKey = ts.isCallExpression(node.expression) ? node.expression.getText() : decoratorName;
                let decorator: IDecorator = {
                    key: decoratorKey.replace(/\s/g, ''),
                    name: decoratorName,
                    type: getNodeType(node.parent),
                    isFactory: false,
                    numParams: 0,
                    startLine: ts.getLineAndCharacterOfPosition(sourceFile, node.getStart()).line,
                    endLine: ts.getLineAndCharacterOfPosition(sourceFile, node.getEnd()).line,
                    element: getDecoratorElement(node.parent)
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