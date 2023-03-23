import ts from "typescript";
import { DirectoryModel } from "../models/DirectoryModel"
import { IElement } from "../interfaces/IElement"

export function getNodeType(node: ts.Node): string {
    const syntaxKindDictionary = {}
    syntaxKindDictionary[ts.SyntaxKind.ClassDeclaration] = "class"
    syntaxKindDictionary[ts.SyntaxKind.MethodDeclaration] = "method"
    syntaxKindDictionary[ts.SyntaxKind.Parameter] = "parameter"
    syntaxKindDictionary[ts.SyntaxKind.PropertyDeclaration] = "property"

    return syntaxKindDictionary[node.kind]
}

export function findDirectory(directories: DirectoryModel[], directoryName: string): DirectoryModel {
    const existDirectory = directories.find(directory => {
        return directory.getDirectoryName() === directoryName
    })
    return existDirectory
}

export function getDecoratorElement(elementNode: ts.Node): IElement {
    return {
        name: getNodeName(elementNode),
        type: getNodeType(elementNode),
        start: elementNode.getStart(),
        end: elementNode.getEnd()
    }
}

function getNodeName(node: ts.Node): string | undefined {
    if (
        ts.isClassDeclaration(node) ||
        ts.isMethodDeclaration(node) ||
        ts.isParameter(node) ||
        ts.isPropertyDeclaration(node) 
    ) {
        return node.name?.getText()
    } else {
        return
    }
}