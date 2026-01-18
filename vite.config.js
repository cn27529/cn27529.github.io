// vite.config.js
import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: ".",

  plugins: [
    {
      name: "html-minifier",
      enforce: "post", // 在最后处理
      transformIndexHtml: {
        order: "post", // 最后执行
        handler(html, ctx) {
          // 只在生产环境压缩
          if (process.env.NODE_ENV === "production") {
            // 动态导入，避免开发环境依赖
            const { minify } = require("html-minifier-terser");
            return minify(html, {
              removeComments: true,
              collapseWhitespace: true,
              collapseBooleanAttributes: true,
              removeRedundantAttributes: true,
              removeScriptTypeAttributes: true,
              removeStyleLinkTypeAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeOptionalTags: false,
              minifyCSS: true,
              minifyJS: {
                compress: {
                  drop_console: true,
                  drop_debugger: true,
                  pure_funcs: ["console.log"], // 移除 console.log
                  ecma: 2020,
                  passes: 2, // 多次压缩
                },
                mangle: {
                  toplevel: true, // 混淆顶级变量
                },
                format: {
                  comments: false, // 移除注释
                },
              },
              minifyURLs: true,
            });
          }
          return html;
        },
      },
    },
  ],

  build: {
    outDir: "dist",
    assetsDir: "assets",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    cssMinify: true,
    assetsInlineLimit: 4096,

    rollupOptions: {
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
        entryFileNames: "assets/js/[name]-[hash].js",
        chunkFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split(".");
          const extType = info[info.length - 1];

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

  server: {
    port: 3000,
    open: true,
  },

  base: "./",

  optimizeDeps: {
    include: [],
  },

  // 添加資源處理
  assetsInclude: ["**/*.jpg", "**/*.jpeg", "**/*.png", "**/*.gif", "**/*.svg"],
});
