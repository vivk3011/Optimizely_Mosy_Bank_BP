import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'selector',
  theme: {
    colors: {
      'white': '#ffffff',
      'ghost-white': '#F8F8FC',
      'light-grey': '#D9D9D9',
      'azure': '#007EFC',
      'verdansk': '#6AF388',
      'people-eater': '#9847FF',
      'paleruby': '#EB5A79',
      'tangy': '#FFAA47',
      'vulcan': '#10141D',
      'vulcan-85': '#2C313F',
      'independence': '#484F61',
      'mischka': '#CED2DC',
      'pale-sky': '#656C81',
      'currentColor': 'currentColor',
      'transparent': 'transparent',
      'inherit': 'inherit'
    },
    extend: {
      colors: {
        // Shades used by RichTextBlock display template settings
        blue:   { 50: '#eff6ff' },
        gray:   { 100: '#f3f4f6' },
        yellow: { 50: '#fefce8', 200: '#fef08a' },
        slate:  { 900: '#0f172a' },
        brandBlue: "#1E40AF",
        brandYellow: "#fef08a",
        productBg: "#F3F8FF",
        productText: "#0F172A",
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'inherit',
            'h1': { color: 'inherit' },
            'h2': { color: 'inherit' },
            'h3': { color: 'inherit' },
            'h4': { color: 'inherit' },
            'h5': { color: 'inherit' },
            'h6': { color: 'inherit' },
            '.dark strong':{ color: 'var(--ghost-white)' },
          },
        },
      },
    }
  },
  safelist: [
    'w-screen',
    'w-full',
    'w-auto',
    'w-1/2',
    'w-1/3',
    'basis-full',
    'basis-auto',
    'basis-1/2',
    'basis-1/3',
    't-center',
    'flex-row',
    'flex-col',
    'flex-row-reverse',
    'flex-col-reverse',
    'opti-content-area',
    'opti-content-area-item',
    // RichTextBlock — variant
    'prose', 'prose-invert', 'max-w-none',
    'bg-yellow-50', 'border', 'border-yellow-200', 'rounded-2xl', 'p-4',
    'bg-slate-900',
    // RichTextBlock — alignment
    'text-left', 'text-center', 'text-right',
    // RichTextBlock — spacing
    'my-2', 'my-4', 'my-8',
    // RichTextBlock — backgroundColor
    'bg-white', 'bg-gray-100', 'bg-blue-50', 'bg-yellow-50', 'bg-slate-900', 'text-white',
    "bg-transparent",
    "bg-gray-100",
    "bg-white",
    "bg-black",
    "bg-blue-50",

   ],
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
    function ({ addBase, theme }: { addBase: any; theme: any }) {
      function extractColorVars(colorObj: Record<string, string>, colorGroup = ''): Record<string, string> {
        return Object.keys(colorObj).reduce((vars, colorKey) => {
          const value = colorObj[colorKey];
          const cssVariable = colorKey === "DEFAULT" ? `-${colorGroup}` : `-${colorGroup}-${colorKey}`;

          const newVars =
            typeof value === 'string'
              ? { [cssVariable]: value }
              : extractColorVars(value, `-${colorKey}`);

          return { ...vars, ...newVars };
        }, {});
      }

      addBase({
        ':root': extractColorVars(theme('colors')),
      });
    },
  ],
};
export default config;
