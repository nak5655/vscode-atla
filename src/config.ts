'use strict';

import * as vscode from 'vscode';

export class Config {
	readonly rootSection = "atla";

	constructor(_: vscode.ExtensionContext) {
	}

	private get<T>(path: string): T {
		return this.cfg.get<T>(path)!;
	}

	private get cfg(): vscode.WorkspaceConfiguration {
		return vscode.workspace.getConfiguration(this.rootSection);
	}

	get serverPath() {
		return this.get<string>("lsp-server.path");
	}
}