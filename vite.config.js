// vite.config.js
import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  // 設定根目錄為當前目錄
  root: ".",

  build: {
    // 輸出到 dist 資料夾
    outDir: "dist",

    // 靜態資源輸出目錄
    assetsDir: "assets",

    // 最小化設定
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    cssMinify: true,

    // 設定資源大小限制，小檔案內聯
    assetsInlineLimit: 4096, // 4KB

    // Rollup 配置
    rollupOptions: {
      // 多頁面入口點
      input: {
        main: "index.html",
        index2: "index2.html",
        index3: "index3.html",
        index4: "index4.html",
        index5: "index5.html",
        index7: "index7.html",
        bowl: "bowl/index.html",
        compass: "compass/index.html",
        clock: "clock/index.html",
        cv: "cv/index.html",
        luopan: "luopan/index.html",
        w3c: "w3c/index.html",
        hcj: "hcj/index.html",
        hcj2: "hcj/index2.html",
        hcj3: "hcj/index3.html",
      },

      output: {
        // 檔案命名規則
        entryFileNames: "assets/js/[name]-[hash].js",
        chunkFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split(".");
          const extType = info[info.length - 1];

          // 根據副檔名分類
          if (/\.(png|jpe?g|gif|svg|webp|avif)$/.test(assetInfo.name)) {
            return "assets/images/[name]-[hash][extname]";
          }
          if (/\.(woff|woff2|eot|ttf|otf)$/.test(assetInfo.name)) {
            return "assets/fonts/[name]-[hash][extname]";
          }
          if (/\.css$/.test(assetInfo.name)) {
            return "assets/css/[name]-[hash][extname]";
          }

          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },

  // 伺服器配置
  server: {
    port: 3000,
    open: true,
  },

  // 公共路徑設定
  base: "./",

  // 優化設定
  optimizeDeps: {
    include: [], // 如有需要，可在此添加需要預打包的依賴
  },
});
