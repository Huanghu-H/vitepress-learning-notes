import { defineConfig } from 'vitepress'

// 本地开发使用根路径；GitHub Actions 构建项目站点时自动使用仓库子路径。
const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const base = process.env.GITHUB_ACTIONS === 'true' && repositoryName
  ? `/${repositoryName}/`
  : '/'

export default defineConfig({
  lang: 'zh-CN',
  title: '知行笔记',
  description: '记录编程学习、实践经验与常用工具的个人技术文档',
  base,
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['meta', { name: 'theme-color', content: '#3451b2' }],
    ['meta', { name: 'author', content: '学习者' }]
  ],

  themeConfig: {
    siteTitle: '知行笔记',
    nav: [
      { text: '首页', link: '/' },
      { text: '开始阅读', link: '/guide/getting-started' },
      {
        text: '学习笔记',
        items: [
          { text: 'Python', link: '/notes/python/basics' },
          { text: '前端开发', link: '/notes/frontend/javascript' },
          { text: '开发工具', link: '/tools/git' }
        ]
      },
      { text: '关于', link: '/about' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: '使用指南',
          items: [
            { text: '开始阅读', link: '/guide/getting-started' },
            { text: '笔记编写规范', link: '/guide/writing-notes' }
          ]
        }
      ],
      '/notes/python/': [
        {
          text: 'Python 学习笔记',
          items: [
            { text: '语法基础', link: '/notes/python/basics' },
            { text: '函数与模块', link: '/notes/python/functions-modules' },
            { text: '异步编程', link: '/notes/python/asyncio' }
          ]
        }
      ],
      '/notes/frontend/': [
        {
          text: '前端开发笔记',
          items: [
            { text: 'JavaScript 核心语法', link: '/notes/frontend/javascript' },
            { text: 'VitePress 使用记录', link: '/notes/frontend/vitepress' }
          ]
        }
      ],
      '/tools/': [
        {
          text: '开发工具',
          items: [
            { text: 'Git 常用工作流', link: '/tools/git' },
            { text: '终端速查表', link: '/tools/terminal' }
          ]
        }
      ]
    },

    outline: {
      level: [2, 3],
      label: '本页目录'
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short'
      }
    },
    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '目录',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '没有找到相关结果',
            resetButtonTitle: '清除查询',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },
    footer: {
      message: '持续记录，保持思考。',
      copyright: 'Copyright © 2026 知行笔记'
    }
  },

  markdown: {
    lineNumbers: true,
    container: {
      tipLabel: '提示',
      warningLabel: '注意',
      dangerLabel: '警告',
      infoLabel: '信息',
      detailsLabel: '查看详情'
    }
  }
})
