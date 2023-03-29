import * as fs from "fs";
import { IDirectoryMetrics, IFileResult, IDecoratorReport } from "../interfaces/IMetrics"
import { IDecorator } from "../interfaces/IDecorator"
import { DirectoryModel } from "../models/DirectoryModel"
import { getAAMetric, getACMetric, getUACMetric, getDECLOCMetric } from "../metrics/index"


export class Metrics {
    projectName: string
    directories: IDirectoryMetrics[] = []

    constructor(projectName: string) {
        this.projectName = projectName
    }

    getMetrics(directory: DirectoryModel) {
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
                    AC: getACMetric(file),
                    UAC: getUACMetric(file)
                },
                decoratorsReport: this.getDecoratorsMetrics(file.getDecorators())
            }
            directoryMetrics.results.push(fileResult)
        })

        this.directories.push(directoryMetrics)
    }


    private getDecoratorsMetrics(decorators: IDecorator[]): IDecoratorReport[] {
        let decoratorsReport: IDecoratorReport[] = []
        decorators.forEach(decorator => {
            const report = {
                decoratorName: decorator.name,
                type: decorator.type,
                decoratorMetrics: {
                    AA: getAAMetric(decorator),
                    DECLOC: getDECLOCMetric(decorator)
                },
                element: decorator.element
            }

            decoratorsReport.push(report)
        })

        return decoratorsReport
    }

    exportJson() {
        fs.writeFileSync(`output/${this.projectName}.json`, JSON.stringify(this, null, 4))
    }
}