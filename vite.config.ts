import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
// vite.config.js/ts
import {join} from "path";
import compressPlugin from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': join(__dirname, "src"),
        }
    },
    plugins: [
        vue(),
        compressPlugin({ //gzip静态资源压缩
            verbose: true,    // 默认即可
            disable: false,  //开启压缩(不禁用)，默认即可
            deleteOriginFile: false, //删除源文件
            algorithm: 'gzip',  //压缩算法
            ext: '.gz', //文件类型
        }),
        // ...
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
    ],
})
