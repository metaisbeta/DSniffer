import ts from "typescript";

export function getDecoratorType(node: ts.Node): string {
    const syntaxKindDictionary = {
         "260": "class",
         "171": "method",
         "166": "parameter",
         "169": "property"
    }
    return syntaxKindDictionary[node.parent.kind]
}
