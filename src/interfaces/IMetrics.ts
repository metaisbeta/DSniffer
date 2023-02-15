export interface IDirectoryMetrics {
    directoryName: string
    results: IFileResult[]
}

export interface IFileResult {
    sourceFilePath: string
    fileName: string
    fileMetrics: IFileMetrics
    decoratorsReport?: IDecoratorReport[]
}

export interface IDecoratorReport {
    decoratorName: string
    type: string
    decoratorMetrics: IDecoratorMetrics
}

interface IDecoratorMetrics {
    AA: Number
}

interface IFileMetrics {
    AC: Number,
    UAC: Number
}