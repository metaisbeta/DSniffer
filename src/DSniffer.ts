import { IDecorator } from './interfaces/IDecorator'
import * as fs from "fs";
import * as path from "path";
import ts from "typescript";
import { Analyzer } from "./Analyzer"


export class DSniffer {
    execute(dirPath: string) {
        const analyzer = new Analyzer()
        let decorators: IDecorator[] = []
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
                    decorators = decorators.concat(analyzer.run(sourceFile))
                }
            } else {
                decorators = decorators.concat(this.execute(targetPath))
            }
        })
    
        return decorators
    }
}