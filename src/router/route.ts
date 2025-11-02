const route = [
    {
      path: '/',
      component: () => import('~/view/index.vue'),
      meta: { title: 'Index' },
    },
    {
      path: '/sectum',
      component: () => import('~/view/index.vue'),
      children: [
        {
          path: '/sectum/',
          meta: { title: 'Introduce' },
          children: [
            {
              path: '/sectum/started',
              component: () => import('~/packet/Config/Started.md'),
              meta: { title: 'Started' },
            },
          ]
        },
        {
          path: '/sectum/',
          meta: { title: 'Element' },
          children: [
            {
              path: '/sectum/color',
              component: () => import('~/packet/Element/Color/Color.md'),
              meta: { title: 'Color' },
            },
            {
              path: '/sectum/button',
              component: () => import('~/packet/Element/Button/Button.md'),
              meta: { title: 'Button' },
            },
            {
              path: '/sectum/label',
              component: () => import('~/packet/Element/Label/Label.md'),
              meta: { title: 'Label' },
            },
            {
              path: '/sectum/icon',
              component: () => import('~/packet/Element/Icon/Icon.md'),
              meta: { title: 'Icon' },
            },
            {
              path: '/sectum/input',
              component: () => import('~/packet/Element/Input/Input.md'),
              meta: { title: 'Input' },
            },
            {
              path: '/sectum/checkbox',
              component: () => import('~/packet/Element/Checkbox/Checkbox.md'),
              meta: { title: 'Checkbox' },
            },
            {
              path: '/sectum/toggle',
              component: () => import('~/packet/Element/Toggle/Toggle.md'),
              meta: { title: 'Toggle' },
            }
          ]
        },
        {
          path: '/sectum/',
          meta: { title: 'Section' },
          children: [
            {
              path: '/sectum/buttongroup',
              component: () => import('~/packet/Section/ButtonGroup/ButtonGroup.md'),
              meta: { title: 'ButtonGroup' },
            },
            {
              path: '/sectum/menu',
              component: () => import('~/packet/Section/Menu/Menu.md'),
              meta: { title: 'Menu' },
            },
            {
              path: '/sectum/dropdown',
              component: () => import('~/packet/Section/Dropdown/Dropdown.md'),
              meta: { title: 'Dropdown' },
            },
            {
              path: '/sectum/modal',
              component: () => import('~/packet/Section/Modal/Modal.md'),
              meta: { title: 'Modal' },
            },
            {
              path: '/sectum/table',
              component: () => import('~/packet/Section/Table/Table.md'),
              meta: { title: 'Table' },
            },
            {
              path: '/sectum/tabs',
              component: () => import('~/packet/Section/Tabs/Tabs.md'),
              meta: { title: 'Tabs' },
            },
            {
              path: '/sectum/upload',
              component: () => import('~/packet/Section/Upload/Upload.md'),
              meta: { title: 'Upload' },
            },
            {
              path: '/sectum/file',
              component: () => import('~/packet/Section/File/File.md'),
              meta: { title: 'File' },
            },
            {
              path: '/sectum/form',
              component: () => import('~/packet/Section/Form/Form.md'),
              meta: { title: 'Form' },
            },
            {
              path: '/sectum/select',
              component: () => import('~/packet/Section/Select/Select.md'),
              meta: { title: 'Select' },
            },
            {
              path: '/sectum/date',
              component: () => import('~/packet/Section/Date/Date.md'),
              meta: { title: 'Date' },
            },
            {
              path: '/sectum/drawer',
              component: () => import('~/packet/Section/Drawer/Drawer.md'),
              meta: { title: 'Drawer' },
            },
            {
              path: '/sectum/carousel',
              component: () => import('~/packet/Section/Carousel/Carousel.md'),
              meta: { title: 'Carousel' },
            }
          ]
        },
        {
          path: '/sectum/',
          meta: { title: 'Pattern' },
          children: [
            {
              path: '/sectum/theme',
              component: () => import('~/packet/Pattern/Theme/Theme.md'),
              meta: { title: 'Theme' },
            },
            {
              path: '/sectum/darkchange',
              component: () => import('~/packet/Pattern/Dark/DarkChange.md'),
              meta: { title: 'Darkchange' },
            },
            {
              path: '/sectum/language',
              component: () => import('~/packet/Pattern/Language/LanguageSelect.md'),
              meta: { title: 'Language' },
            },
            {
              path: '/sectum/markdown',
              component: () => import('~/packet/Pattern/Markdown/Markdown.md'),
              meta: { title: 'Markdown' },
            },
            {
              path: '/sectum/fullscreen',
              component: () => import('~/packet/Pattern/FullScreen/FullScreen.md'),
              meta: { title: 'Fullscreen' },
            },
          ]
        },
        {
          path: '/sectum/',
          meta: { title: 'Model' },
          children: [
            {
              path: '/sectum/form',
              component: () => import('~/packet/Section/Form/Form.md'),
              meta: { title: 'Form' },
            }
          ]
        },
        {
          path: '/sectum/',
          meta: { title: 'Layout' },
          children: [
            {
              path: '/sectum/header',
              component: () => import('~/packet/Layout/Header/Header.md'),
              meta: { title: 'Header' },
            },
            {
              path: '/sectum/footer',
              component: () => import('~/packet/Layout/Footer/Footer.md'),
              meta: { title: 'Footer' },
            },
            {
              path: '/sectum/navbar',
              component: () => import('~/packet/Layout/Navbar/Navbar.md'),
              meta: { title: 'Navbar' },
            },
            {
              path: '/sectum/sidebar',
              component: () => import('~/packet/Layout/Sidebar/Sidebar.md'),
              meta: { title: 'Sidebar' },
            },
            {
              path: '/sectum/toolbar',
              component: () => import('~/packet/Layout/Toolbar/Toolbar.md'),
              meta: { title: 'Toolbar' },
            }
          ]
        }
      ]
    }
  ]

export default route