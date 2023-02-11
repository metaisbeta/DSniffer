import { IDecorator } from "../interfaces/IDecorator"

export class FileModel {
    private filePath: string
    private fileName: string
    private decorators: IDecorator[] = []
    
    constructor(filePath: string, fileName: string) {
        this.filePath = filePath
        this.fileName = fileName
    }

    getFilePath() {
        return this.filePath
    }

    getFileName() {
        return this.fileName
    }

    getDecorators() {
        return this.decorators
    }

    addDecorator(decorator: IDecorator) {
        this.decorators.push(decorator)
    }

}