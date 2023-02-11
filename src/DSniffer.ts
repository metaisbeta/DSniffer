import { IDecorator } from './interfaces/IDecorator'
import * as fs from "fs";
import * as path from "path";
import ts from "typescript";
import { Analyzer } from "./Analyzer"
import { FileModel } from "./models/FileModel"

export class DSniffer {
    execute(dirPath: string) {
        const analyzer = new Analyzer()
        let files: FileModel[] = []
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
                    files = files.concat(analyzer.run(sourceFile, targetPath))
                }
            } else {
                files = files.concat(this.execute(targetPath))
            }
        })
    
        return files
    }
}