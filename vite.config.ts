import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
    // 使用 less
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    },
    resolve: {
      //配置文件扩展名
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
      // Vite路径别名配置
      alias: {
        "@": path.resolve(__dirname, './src'),
    }

    },
})
