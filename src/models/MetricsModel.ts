import * as fs from "fs";
import { IDirectoryMetrics, IFileResult } from "../interfaces/IDirectoryMetrics"
import { DirectoryModel } from "../models/DirectoryModel"
import { getACMetric } from "../metrics/AC"

export class Metrics {
    projectName: string
    directories: IDirectoryMetrics[] = []

    constructor(projectName: string) {
        this.projectName = projectName
    }

    addDirectoryMetric(directory: DirectoryModel) {
        let directoryMetrics: IDirectoryMetrics = {
            directoryName: directory.getDirectoryName(),
            results: []
        }

        const files = directory.getTypescriptDecoratorFiles()
        files.forEach(file => {
            let fileResult: IFileResult = {
                sourceFilePath: file.getFilePath(),
                fileName: file.getFileName(),
                fileMetrics: {
                    AC: getACMetric(file)
                }
            }
            directoryMetrics.results.push(fileResult)
        })

        this.directories.push(directoryMetrics)
    }
}