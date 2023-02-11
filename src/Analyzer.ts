import { IDecorator } from "./interfaces/IDecorator"
import { getDecoratorType } from "./utils/decoratorUtils"
import ts from "typescript";


export class Analyzer {
    run(sourceFile: ts.SourceFile): IDecorator[] {
        let decorators: IDecorator[] = []
        getDecoratorNodeInfo(sourceFile)
    
        function getDecoratorNodeInfo(node: ts.Node) {
            if(ts.isDecorator(node)) {
                let decoratorInfo: IDecorator = {
                    type: getDecoratorType(node),
                    isFactory: false
                }
                
                if(ts.isCallExpression(node.expression)) {
                    const expression = node.expression
                    decoratorInfo.isFactory = true
                    decoratorInfo.numParams = expression.arguments.length
                }
             
                decorators.push(decoratorInfo)
            }
            ts.forEachChild(node, getDecoratorNodeInfo)
        }
    
        return decorators 
    }
}