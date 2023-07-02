import { IDecorator } from "../interfaces/IDecorator"

// DECLOC (Decorator Lines Of Code)
export function getDECLOCMetric(decorator: IDecorator) {
    return decorator.endLine - decorator.startLine + 1
}