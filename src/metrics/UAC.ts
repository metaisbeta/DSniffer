import { FileModel } from "../models/FileModel"

export function getUACMetric(file: FileModel): Number {
    const fileDecorators = file.getDecorators()

    const uniqueDecoratorName = {}

    fileDecorators.forEach(decorator => {
        uniqueDecoratorName[decorator.name] = undefined
    })

    return Object.keys(uniqueDecoratorName).length
}