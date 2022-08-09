// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const axios = require('axios');



/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
	const res = await axios.get("https://api.github.com/repos/amanlalwani007/leetcode-solutions/contents?ref=master");
	const questions= res.data.map(
		question =>{
			return {
				label: question.name,
				detail: question.html_url
			}

		}
	)
	
	let disposable = vscode.commands.registerCommand('leetcode-dsa-helper.leetcodeDSAHelper', 
	async function () {
		const question = await vscode.window.showQuickPick(questions,{
			matchOnDetail:true	
		})
		if(question == null) return
		vscode.env.openExternal(question.detail);


	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}


//url :- https://api.github.com/repos/amanlalwani007/leetcode-solutions/contents?ref=master

