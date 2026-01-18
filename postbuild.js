// postbuild.js - 處理 Vite 未自動處理的檔案
const fs = require("fs");
const path = require("path");

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();

  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName),
      );
    });
  } else {
    // 只複製非 HTML/JS/CSS 檔案（Vite 已處理）
    const ext = path.extname(src).toLowerCase();
    if (![".html", ".js", ".css", ".ts", ".tsx"].includes(ext)) {
      fs.copyFileSync(src, dest);
    }
  }
}

function postBuild() {
  console.log("🚀 開始後處理建構...");

  const distDir = "dist";

  // 確保 dist 目錄存在
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  // 複製特定需要保留的目錄結構
  const dirsToCopy = ["images", "js", "css"];

  dirsToCopy.forEach((dir) => {
    if (fs.existsSync(dir)) {
      console.log(`📁 複製 ${dir}/ 目錄...`);
      copyRecursiveSync(dir, path.join(distDir, dir));
    }
  });

  // 複製特殊檔案
  const filesToCopy = [
    "robots.txt",
    "sitemap.xml",
    "sitemap.txt",
    "tree.txt",
    "favicon.ico",
  ];

  filesToCopy.forEach((file) => {
    if (fs.existsSync(file)) {
      console.log(`📄 複製 ${file}...`);
      fs.copyFileSync(file, path.join(distDir, file));
    }
  });

  // 複製 bowl 目錄的圖片
  if (fs.existsSync("bowl/images")) {
    console.log("📁 複製 bowl/images/...");
    copyRecursiveSync("bowl/images", path.join(distDir, "bowl/images"));
  }

  // 複製 luopan 目錄的圖片
  if (fs.existsSync("luopan/images")) {
    console.log("📁 複製 luopan/images/...");
    copyRecursiveSync("luopan/images", path.join(distDir, "luopan/images"));
  }

  // 複製其他可能需要的目錄
  const extraDirs = ["docs", "notify-bot-line", "assets"];
  extraDirs.forEach((dir) => {
    if (fs.existsSync(dir)) {
      console.log(`📁 複製 ${dir}/...`);
      copyRecursiveSync(dir, path.join(distDir, dir));
    }
  });

  console.log("✅ 後處理完成！");
}

postBuild();
