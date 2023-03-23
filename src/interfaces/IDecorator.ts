import { IElement } from "./IElement"

export interface IDecorator {
    name: string,
    type: string,
    isFactory: boolean,
    numParams: Number,
    element: IElement
}