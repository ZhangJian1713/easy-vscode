import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'monorepo-template',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  base: '/ZhangJian1713/easy-vscode',
  publicPath: '/ZhangJian1713/easy-vscode/',
  navs: {
    'zh-CN': [
      {
        title: 'Foo',
        path: '/zh-CN/foo',
      },
      {
        title: 'GitLab',
        path: 'https://github.com/ZhangJian1713/easy-vscode',
      },
      {
        title: 'Config',
        path: 'https://d.umijs.org/config',
      },
    ],
    'en-US': [
      {
        title: 'Foo',
        path: '/foo',
      },
      {
        title: 'GitLab',
        path: 'https://github.com/ZhangJian1713/easy-vscode',
      },
      {
        title: 'Config',
        path: 'https://d.umijs.org/config',
      },
    ],
  },
});
