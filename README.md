# Live2D Cursor — 宣传网站

这是 `Live2D Cursor`（开发代号 EasyAnchor）项目的静态宣传页面，纯 HTML / CSS / JS，无需构建工具，可以直接部署到 GitHub Pages。

## 目录结构

```
EasyAnchor-Website/
├── index.html          # 页面主体
├── css/style.css        # 样式（暗色渐变主题，含滚动动效）
├── js/main.js            # 交互脚本（鼠标跟随光晕、滚动揭示、移动端导航）
├── assets/
│   ├── brand/favicon.ico # 复用自 EasyAnchor/assets/Live2DCursor_icon.ico
│   └── icons/*.png        # 复用自 Game Icon Pack（SIL OFL 许可）
└── README.md
```

## 本地预览

直接双击 `index.html` 用浏览器打开即可；也可以用任意静态服务器，例如：

```powershell
cd EasyAnchor-Website
python -m http.server 8080
# 然后浏览器打开 http://localhost:8080
```

## 部署到 GitHub Pages

**方式一：独立仓库（推荐）**

1. 新建一个 GitHub 仓库，例如 `EasyAnchor-Website` 或 `easyanchor.github.io`。
2. 把本文件夹内容推送到该仓库的 `main` 分支根目录。
3. 仓库 Settings → Pages → Source 选择 `Deploy from a branch` → `main` / `/(root)`。
4. 等待几分钟，访问 `https://<你的用户名>.github.io/<仓库名>/`。

**方式二：放进现有仓库的 `docs/` 目录**

1. 把本文件夹重命名为 `docs`，放到你的项目仓库根目录。
2. 仓库 Settings → Pages → Source 选择 `Deploy from a branch` → `main` / `/docs`。

## 上线前需要替换的内容

- `js/main.js` 顶部的 `STEAM_URL` 常量：换成真实的 Steam 商店页面地址，导航栏 / Hero / 下载区 / 页脚里所有"Steam"按钮都会自动指向它（这些按钮共用 `.js-steam-link` class）。
- 可选：把 `assets/brand/favicon.ico` 替换成更高分辨率的 PNG 版本作为 `<meta property="og:image">`，用于社交分享预览图。

## 版权与致谢

- 应用图标与部分功能图标来自 `EasyAnchor/assets`（Game Icon Pack，SIL Open Font License）。
- 页面与 Live2D Inc. 无官方关联，仅用于展示基于 Live2D Cubism SDK 构建的第三方工具。
