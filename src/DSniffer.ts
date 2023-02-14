import { IDecorator } from './interfaces/IDecorator'
import * as fs from "fs";
import * as path from "path";
import ts from "typescript";
import { Analyzer } from "./Analyzer"
import { DirectoryModel } from "./models/DirectoryModel"

export class DSniffer {
    execute(dirPath: string) {
        const analyzer = new Analyzer()
        let directories: DirectoryModel[] = []
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
                    const directoryName = path.basename(path.dirname(targetPath));
                    const fileDirectory = findDirectory(directories, directoryName)
                    if(fileDirectory) {
                        fileDirectory.addDecoratorFile(analyzer.run(sourceFile, targetPath))
                    } else {
                        const directory = new DirectoryModel(path.dirname(targetPath), directoryName)
                        directory.addDecoratorFile(analyzer.run(sourceFile, targetPath))
                        directories.push(directory)
                    }
                    
                }
            } else if(targetStat.isDirectory()){
                directories = directories.concat(this.execute(targetPath))
            }
        })
        return directories
    }
}

function findDirectory(directories: DirectoryModel[], directoryName: string): DirectoryModel {
    const existDirectory = directories.find(directory => {
        return directory.getDirectoryName() === directoryName
    })
    return existDirectory
}