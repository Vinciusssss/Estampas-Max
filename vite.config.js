import { defineConfig } from 'vite';

export default defineConfig({
  // Caminhos relativos: o build funciona ao ser hospedado em subpasta e
  // ao abrir a pasta dist por um servidor estático, sem quebrar CSS/JS.
  base: './',
  server: {
    // host:true escuta em IPv4 (127.0.0.1) e IPv6. Sem isso, o Vite pode
    // ficar só em ::1 e o navegador (que resolve localhost p/ IPv4) não conecta.
    host: true,
    port: 5177,
  },
  preview: {
    host: true,
    port: 4173,
  },
});
