import { IDecorator } from "../interfaces/IDecorator"

export function getAAMetric(decorator: IDecorator): Number {
    return decorator.numParams
}