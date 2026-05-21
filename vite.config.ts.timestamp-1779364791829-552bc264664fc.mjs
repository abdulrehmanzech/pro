// vite.config.ts
import { defineConfig } from "file:///C:/Users/abdul/Documents/work/pro/node_modules/vite/dist/node/index.js";
import solidPlugin from "file:///C:/Users/abdul/Documents/work/pro/node_modules/vite-plugin-solid/dist/esm/index.mjs";
var vite_config_default = defineConfig({
  plugins: [solidPlugin()],
  build: {
    cssTarget: "chrome61",
    sourcemap: true,
    rollupOptions: {
      external: ["klinecharts"],
      output: {
        assetFileNames: (chunkInfo) => {
          if (chunkInfo.name === "style.css") {
            return "klinecharts-pro.css";
          }
        },
        globals: {
          klinecharts: "klinecharts"
        }
      }
    },
    lib: {
      entry: "./src/index.ts",
      name: "klinechartspro",
      fileName: (format) => {
        if (format === "es") {
          return "klinecharts-pro.js";
        }
        if (format === "umd") {
          return "klinecharts-pro.umd.js";
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhYmR1bFxcXFxEb2N1bWVudHNcXFxcd29ya1xcXFxwcm9cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFiZHVsXFxcXERvY3VtZW50c1xcXFx3b3JrXFxcXHByb1xcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvYWJkdWwvRG9jdW1lbnRzL3dvcmsvcHJvL3ZpdGUuY29uZmlnLnRzXCI7Ly8vIDxyZWZlcmVuY2UgdHlwZXM9XCJ2aXRlL2NsaWVudFwiIC8+XHJcblxyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgc29saWRQbHVnaW4gZnJvbSAndml0ZS1wbHVnaW4tc29saWQnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtzb2xpZFBsdWdpbigpXSxcclxuICBidWlsZDoge1xyXG4gICAgY3NzVGFyZ2V0OiAnY2hyb21lNjEnLFxyXG4gICAgc291cmNlbWFwOiB0cnVlLFxyXG4gICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICBleHRlcm5hbDogWydrbGluZWNoYXJ0cyddLFxyXG4gICAgICBvdXRwdXQ6IHtcclxuICAgICAgICBhc3NldEZpbGVOYW1lczogKGNodW5rSW5mbykgPT4ge1xyXG4gICAgICAgICAgaWYgKGNodW5rSW5mby5uYW1lID09PSAnc3R5bGUuY3NzJykge1xyXG4gICAgICAgICAgICByZXR1cm4gJ2tsaW5lY2hhcnRzLXByby5jc3MnXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBnbG9iYWxzOiB7XHJcbiAgICAgICAgICBrbGluZWNoYXJ0czogJ2tsaW5lY2hhcnRzJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgbGliOiB7XHJcbiAgICAgIGVudHJ5OiAnLi9zcmMvaW5kZXgudHMnLFxyXG4gICAgICBuYW1lOiAna2xpbmVjaGFydHNwcm8nLFxyXG4gICAgICBmaWxlTmFtZTogKGZvcm1hdCkgPT4ge1xyXG4gICAgICAgIGlmIChmb3JtYXQgPT09ICdlcycpIHtcclxuICAgICAgICAgIHJldHVybiAna2xpbmVjaGFydHMtcHJvLmpzJ1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZm9ybWF0ID09PSAndW1kJykge1xyXG4gICAgICAgICAgcmV0dXJuICdrbGluZWNoYXJ0cy1wcm8udW1kLmpzJ1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUVBLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8saUJBQWlCO0FBRXhCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxZQUFZLENBQUM7QUFBQSxFQUN2QixPQUFPO0FBQUEsSUFDTCxXQUFXO0FBQUEsSUFDWCxXQUFXO0FBQUEsSUFDWCxlQUFlO0FBQUEsTUFDYixVQUFVLENBQUMsYUFBYTtBQUFBLE1BQ3hCLFFBQVE7QUFBQSxRQUNOLGdCQUFnQixDQUFDLGNBQWM7QUFDN0IsY0FBSSxVQUFVLFNBQVMsYUFBYTtBQUNsQyxtQkFBTztBQUFBLFVBQ1Q7QUFBQSxRQUNGO0FBQUEsUUFDQSxTQUFTO0FBQUEsVUFDUCxhQUFhO0FBQUEsUUFDZjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxLQUFLO0FBQUEsTUFDSCxPQUFPO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTixVQUFVLENBQUMsV0FBVztBQUNwQixZQUFJLFdBQVcsTUFBTTtBQUNuQixpQkFBTztBQUFBLFFBQ1Q7QUFDQSxZQUFJLFdBQVcsT0FBTztBQUNwQixpQkFBTztBQUFBLFFBQ1Q7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
