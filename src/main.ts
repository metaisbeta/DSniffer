import * as fs from "fs";
import * as path from "path";
import ts from "typescript";

const projectsPath = path.join(__dirname, "../projects");

interface IDecoratorInfos {
    type: string,
    isFactory: boolean,
    numParams?: number
}

function analyzeDecorators(sourceFile: ts.SourceFile): IDecoratorInfos[] {
    let decorators: IDecoratorInfos[] = []
    getDecoratorNodeInfo(sourceFile)

    function getDecoratorNodeInfo(node: ts.Node) {
        if(ts.isDecorator(node)) {
            let decoratorInfo: IDecoratorInfos = {
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


function recursiveReadDir(dirPath: string) {
    let decorators: IDecoratorInfos[] = []
    fs.readdirSync(dirPath).forEach(async target => {
        const targetPath = path.join(dirPath, target)
        const targetStat = fs.statSync(targetPath)

        if(targetStat.isFile()) {
            const isTypescriptFile = path.extname(targetPath) === ".ts"
            if(isTypescriptFile) {
                const sourceFile = ts.createSourceFile (
                    target,
                    fs.readFileSync(targetPath).toString(),
                    ts.ScriptTarget.Latest,
                    true
                )
                decorators = decorators.concat(analyzeDecorators(sourceFile))
            }
        } else {
            decorators = decorators.concat(recursiveReadDir(targetPath))
        }
    })

    return decorators
}


fs.readdirSync(projectsPath).forEach(project => {
    console.log(`Analisando projeto ${project}`)
    const projectPath = path.join(projectsPath, project)
    const projectDecoratos = recursiveReadDir(projectPath)
    console.log(`Total de decorators no projeto: ${projectDecoratos.length}\n`)
})


function getDecoratorType(node: ts.Node): string {
    const syntaxKindDictionary = {
         "260": "class",
         "171": "method",
         "166": "parameter",
         "169": "property"
    }
    return syntaxKindDictionary[node.parent.kind]
}

