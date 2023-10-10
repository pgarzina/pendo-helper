// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(
  context: vscode.ExtensionContext
) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "pendo-paste" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json

  function makeid(length: number) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(
        Math.floor(
          Math.random() * charactersLength
        )
      );
      counter += 1;
    }
    return result;
  }
  let disposable =
    vscode.commands.registerCommand(
      "pendo-paste.pendoPaste",
      function () {
        // Get the active text editor
        const editor =
          vscode.window.activeTextEditor;

        if (editor) {
          const uniqueString = makeid(20);
          const pendoClass = `pendo-${uniqueString}`;

          editor.edit((editBuilder) => {
            const cursor = editor.selection;
            editBuilder.insert(
              cursor.active,
              pendoClass
            );
          });
        }
      }
    );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
