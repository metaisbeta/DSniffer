import { FileModel } from "../models/FileModel"

export function getUACMetric(file: FileModel): Number {
    const fileDecorators = file.getDecorators()

    const uniqueDecoratorName = {}

    fileDecorators.forEach(decorator => {
        uniqueDecoratorName[decorator.key] = undefined
    })

    return Object.keys(uniqueDecoratorName).length
}