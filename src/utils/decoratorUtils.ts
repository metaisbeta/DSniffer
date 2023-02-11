import ts from "typescript";

export function getDecoratorType(node: ts.Node): string {
    const syntaxKindDictionary = {}
    syntaxKindDictionary[ts.SyntaxKind.ClassDeclaration] = "class"
    syntaxKindDictionary[ts.SyntaxKind.MethodDeclaration] = "method"
    syntaxKindDictionary[ts.SyntaxKind.Parameter] = "parameter"
    syntaxKindDictionary[ts.SyntaxKind.PropertyDeclaration] = "propert"

    return syntaxKindDictionary[node.parent.kind]
}
