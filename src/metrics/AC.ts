import { FileModel } from "../models/FileModel"

export function getACMetric (file: FileModel): Number {
    return file.getDecorators().length
}