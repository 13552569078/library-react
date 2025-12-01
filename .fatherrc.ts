import { defineConfig } from 'father';

export default defineConfig({
  esm: {
    output: 'dist/esm',
    platform: 'browser',
  },
  cjs: {
    output: 'dist/lib',
    platform: 'node',
  },
  extraBabelPlugins: [
    ['babel-plugin-inline-react-svg', {
      svgo: {
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                removeViewBox: false,
              },
            },
          },
        ],
      },
    }],
  ],
});
