import ts from "typescript";
import { DirectoryModel } from "../models/DirectoryModel"

export function getDecoratorType(node: ts.Node): string {
    const syntaxKindDictionary = {}
    syntaxKindDictionary[ts.SyntaxKind.ClassDeclaration] = "class"
    syntaxKindDictionary[ts.SyntaxKind.MethodDeclaration] = "method"
    syntaxKindDictionary[ts.SyntaxKind.Parameter] = "parameter"
    syntaxKindDictionary[ts.SyntaxKind.PropertyDeclaration] = "propert"

    return syntaxKindDictionary[node.parent.kind]
}

export function findDirectory(directories: DirectoryModel[], directoryName: string): DirectoryModel {
    const existDirectory = directories.find(directory => {
        return directory.getDirectoryName() === directoryName
    })
    return existDirectory
}