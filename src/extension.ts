import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let pendoClass = vscode.commands.registerCommand("pendo-helper.pendoClass", function () {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }

    const uniqueString = makeid(20);
    let pendoClass = `pendo-${uniqueString}`;

    editor.edit((editBuilder) => {
      const cursorPosition = editor.selection.active;

      const char = cursorPosition.character - 1 < 0 ? 0 : cursorPosition.character - 1;
      const cursorToLeft = new vscode.Position(cursorPosition.line, char);

      const range = new vscode.Range(cursorPosition, cursorToLeft);
      const character = editor.document.getText(range);

      const charOnLeftIsWhitespace = character.trim() === "";
      const charOnLeftIsQuoteMark = character === `"` || character === `'`;

      if (!charOnLeftIsWhitespace && !charOnLeftIsQuoteMark) {
        pendoClass = ` ${pendoClass}`;
      }

      editBuilder.insert(cursorPosition, pendoClass);
    });
  });

  let pendoIgnore = vscode.commands.registerCommand("pendo-helper.pendoIgnore", function () {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }

    const pendoIgnore = `pendo-ignore`;

    editor.edit((editBuilder) => {
      const cursor = editor.selection;
      editBuilder.insert(cursor.active, pendoIgnore);
    });
  });

  /**
   * TODO: Find all duplicate pendo classes
   */
  // let pendoDuplicates

  /** @see https://stackoverflow.com/a/1349426 */
  function makeid(length: number) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  context.subscriptions.push(pendoClass, pendoIgnore);
}

export function deactivate() {}
