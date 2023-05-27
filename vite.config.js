import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
// eslint-disable-next-line no-unused-vars
export default defineConfig(({ command, mode }) => {
  const isProduction = mode === "production";

  // Vite Proxy yapılandırması
  const detailProxyOptions = {
    "/api": {
      target: "https://api.ip2whois.com/v2",
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ""),
    },
  };

  const harmfulContentProxyOptions = {
    "/api/address": {
      target: "https://www.usom.gov.tr/",
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api\/address/, ""),
    },
  };

  // Geliştirme modunda ve üretim modunda farklı yapılandırmalar
  return {
    plugins: [react()],
    server: {
      proxy: isProduction
        ? {}
        : { ...detailProxyOptions, ...harmfulContentProxyOptions },
    },
  };
});

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// // eslint-disable-next-line no-unused-vars
// export default defineConfig(({ command, mode }) => {
//   const isProduction = mode === 'production'

//   // Vite Proxy yapılandırması
//   const proxyOptions = {
//     "/api": {
//       target: "https://api.ip2whois.com/v2",
//       changeOrigin: true,
//       rewrite: (path) => path.replace(/^\/api/, ''),
//     }
//   }

//   // Geliştirme modunda ve üretim modunda farklı yapılandırmalar
//   return {
//     plugins: [react()],
//     server: {
//       proxy: isProduction ? {} : proxyOptions
//     }
//   }
// })
