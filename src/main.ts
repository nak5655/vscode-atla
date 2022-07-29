'use strict';

import { ExtensionContext, window as Window } from 'vscode';
import * as lc from "vscode-languageclient/node";
import { Config } from './config';

let client: lc.LanguageClient;

// 拡張機能が有効になったときに呼ばれる
export async function activate(context: ExtensionContext) {
    // サーバーのパスを取得
    const config = new Config(context);
    const serverPath = config.serverPath;

    // サーバーの設定
    const run: lc.Executable = {
        command: serverPath,
        options: {}
    };
    const serverOptions: lc.ServerOptions = {
        run,
        debug: run,
    };
    // LSPとの通信に使うリクエストを定義
    const clientOptions: lc.LanguageClientOptions = {
        // 対象とするファイルの種類や拡張子
        documentSelector: [
            { scheme: 'file', language: 'atla' },
        ],
        // 警告パネルでの表示名
        diagnosticCollectionName: 'Atla',
        revealOutputChannelOn: lc.RevealOutputChannelOn.Never,
        initializationOptions: {},
        progressOnInitialization: true,
    };

    try {
        // LSPを起動
        client = new lc.LanguageClient('Atla LSP Server', serverOptions, clientOptions);
    } catch (err) {
        void Window.showErrorMessage('拡張機能の起動に失敗しました。詳細はアウトプットパネルを参照ください');
        return;
    }
    client.start().catch((error) => client.error(`Starting the server failed.`, error, 'force'));
}

export async function deactivate(): Promise<void> {
    if (client) {
        await client.stop();
    }
}