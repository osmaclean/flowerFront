import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'sm-1': { min: '300px' },
        'sm-2': { min: '340px' },
        'sm-3': { min: '380px' },
      },
    },
  },
  plugins: [],
}
export default config
