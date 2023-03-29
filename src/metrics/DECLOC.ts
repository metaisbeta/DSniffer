import { IDecorator } from "../interfaces/IDecorator"

export function getDECLOCMetric(decorator: IDecorator) {
    return decorator.endLine - decorator.startLine + 1
}