# Atla — VS Code 拡張機能

**Atla** プログラミング言語の VS Code 向け言語サポート拡張機能です。  
Language Server Protocol (LSP) を通じて、リアルタイムの診断・補完・ホバー情報などの IntelliSense 機能を提供します。

## 機能

- リアルタイムエラー診断（LSP 経由）
- コード補完・ホバー情報・シグネチャヘルプ
- ビルド / クリーン / 実行タスク（VS Code タスクランナー統合）
- 問題マッチャー（コンパイラエラーを「問題」パネルに表示）

## 必要条件

| 要件 | バージョン |
|------|-----------|
| VS Code | ≥ 1.90.0 |
| Node.js | ≥ 22 |
| `atla-lsp.exe` | 別途インストール必須 |
| `atla.exe` | 別途インストール必須 |

`atla-lsp.exe` と `atla.exe` はデフォルトで `~/.atla/` に配置されていることを想定しています。  
インストール方法については [Atla 公式サイト](https://github.com/nak5655/vscode-atla) を参照してください。

## インストール

VS Code Marketplace からインストールするか、`.vsix` ファイルを直接インストールしてください。

```bash
# .vsix ファイルからインストール
code --install-extension atla-0.0.1.vsix
```

## 設定

拡張機能の設定は VS Code の設定（`settings.json`）で変更できます。

| 設定キー | デフォルト値 | 説明 |
|---------|-------------|------|
| `atla.lsp-server.path` | `~/.atla/atla-lsp.exe` | Atla LSP サーバーの実行ファイルパス |
| `atla.build-system.path` | `~/.atla/atla.exe` | Atla ビルドシステムの実行ファイルパス |

例：

```jsonc
// .vscode/settings.json
{
  "atla.lsp-server.path": "C:/tools/atla/atla-lsp.exe",
  "atla.build-system.path": "C:/tools/atla/atla.exe"
}
```

## ビルド手順（開発者向け）

### 1. リポジトリのクローンと依存関係のインストール

```bash
git clone https://github.com/nak5655/vscode-atla.git
cd vscode-atla
npm install
```

### 2. ビルドコマンド一覧

| コマンド | 説明 |
|---------|------|
| `npm run build` | 拡張機能をバンドル（出力: `dist/extension.js`） |
| `npm run dev` | ウォッチモード — ファイル変更時に自動リビルド |
| `npm run typecheck` | ファイルを出力せず型チェックのみ実行 |
| `npm run lint` | `src/` に対して ESLint を実行 |
| `npm run format` | Prettier でコードをフォーマット |
| `npm run check` | `lint` + `typecheck` + `build` を一括実行（公開前チェック） |

### 3. 通常のビルド

```bash
npm run build
```

`dist/extension.js` が生成されます。

### 4. 開発時（ウォッチモード）

```bash
npm run dev
```

ファイルを保存するたびに自動でリビルドされます。VS Code の拡張機能ホストをリロードして変更を反映してください。

### 5. 公開前チェック

```bash
npm run check
```

ESLint・型チェック・ビルドをまとめて実行します。PR を出す前に必ず通してください。

### 6. パッケージング（.vsix 生成）

```bash
npx vsce package
```

カレントディレクトリに `atla-<version>.vsix` が生成されます。

## ライセンス

[Apache License 2.0](LICENSE)
