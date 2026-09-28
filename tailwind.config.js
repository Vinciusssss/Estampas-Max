/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.js'],
  theme: {
    extend: {
      colors: {
        // Grafite quase preto — usado no hero e nas seções de destaque
        // escuras.
        ink: {
          800: '#201E1B',
          900: '#141310',
          950: '#0C0B0A',
        },
        // Branco quente / cinza claro — seções de leitura.
        paper: {
          DEFAULT: '#FAF8F4',
          subtle: '#F1EDE5',
        },
        // Único tom de destaque: vermelho terracota, não vibrante.
        brand: {
          300: '#D3A39B',
          400: '#BC7B70',
          500: '#A15243',
          600: '#7E3F34',
          700: '#5F2F27',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        // Pilha de fontes do sistema em vez de baixar JetBrains Mono: usada
        // só em rótulos pequenos decorativos (eyebrows, tags, badges), onde
        // a fonte mono do sistema já cumpre o efeito visual sem custo de
        // rede nem trabalho extra no caminho crítico de renderização.
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', '"Liberation Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
