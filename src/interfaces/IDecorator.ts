import { IElement } from "./IElement"

export interface IDecorator {
    key: string,
    name: string,
    type: string,
    isFactory: boolean,
    numParams: number,
    startLine: number,
    endLine: number,
    element: IElement

}