import { FileModel } from "./FileModel"

export class DirectoryModel {
    private directoryPath: string
    private directoryName: string
    private totalTypescriptFiles: number = 0
    private totalTypescriptDecoratorFiles: number = 0
    private typescriptDecoratorFiles: FileModel[] = []

    constructor(directoryPath: string, directoryName: string) {
        this.directoryPath = directoryPath
        this.directoryName = directoryName
    }

    getDirectoryPath() {
        return this.directoryPath
    }

    getDirectoryName() {
        return this.directoryName
    }

    getTotalTypescriptFiles() {
        return this.totalTypescriptFiles
    }

    getTotalTypescriptDecoratorFiles() {
        return this.totalTypescriptDecoratorFiles
    }

    getTypescriptDecoratorFiles() {
        return this.typescriptDecoratorFiles
    }

    addDecoratorFile(file: FileModel) {
        this.typescriptDecoratorFiles.push(file)
    }
}