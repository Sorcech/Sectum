const route = [
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
            {
              path: '/sectum/config',
              component: () => import('~/packet/Config/Config.md'),
              meta: { title: 'Config' },
            },
          ]
        },
        {
          path: '/sectum/',
          meta: { title: 'Element' },
          children: [
            {
              path: '/sectum/button',
              component: () => import('~/packet/Element/Button/Button.md'),
              meta: { title: 'Button' },
            },
            {
              path: '/sectum/checkbox',
              component: () => import('~/packet/Element/Checkbox/Checkbox.md'),
              meta: { title: 'Checkbox' },
            },
            {
              path: '/sectum/color',
              component: () => import('~/packet/Element/Color/Color.md'),
              meta: { title: 'Color' },
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
              path: '/sectum/toggle',
              component: () => import('~/packet/Element/Toggle/Toggle.md'),
              meta: { title: 'Toggle' },
            },
            {
              path: '/sectum/avatar',
              component: () => import('~/packet/Element/Avatar/Avatar.md'),
              meta: { title: 'Avatar' },
            },
            {
              path: '/sectum/image',
              component: () => import('~/packet/Element/Image/Image.md'),
              meta: { title: 'Image' },
            },
            {
              path: '/sectum/progress',
              component: () => import('~/packet/Element/Progress/Progress.md'),
              meta: { title: 'Progress' },
            }
          ]
        },
        {
          path: '/sectum/',
          meta: { title: 'Section' },
          children: [
            {
              path: '/sectum/card',
              component: () => import('~/packet/Section/Card/Card.md'),
              meta: { title: 'Card' },
            },
            {
              path: '/sectum/carousel',
              component: () => import('~/packet/Section/Carousel/Carousel.md'),
              meta: { title: 'Carousel' },
            },
            {
              path: '/sectum/date',
              component: () => import('~/packet/Section/DatePicker/DatePicker.md'),
              meta: { title: 'Date' },
            },
            {
              path: '/sectum/drawer',
              component: () => import('~/packet/Section/Drawer/Drawer.md'),
              meta: { title: 'Drawer' },
            },
            {
              path: '/sectum/dropdown',
              component: () => import('~/packet/Section/Dropdown/Dropdown.md'),
              meta: { title: 'Dropdown' },
            },
            {
              path: '/sectum/form',
              component: () => import('~/packet/Section/Form/Form.md'),
              meta: { title: 'Form' },
            },
            {
              path: '/sectum/file',
              component: () => import('~/packet/Section/File/File.md'),
              meta: { title: 'File' },
            },
            {
              path: '/sectum/Group',
              component: () => import('~/packet/Section/Group/Group.md'),
              meta: { title: 'Group' },
            },
            {
              path: '/sectum/list',
              component: () => import('~/packet/Section/List/List.md'),
              meta: { title: 'List' },
            },
            {
              path: '/sectum/menu',
              component: () => import('~/packet/Section/Menu/Menu.md'),
              meta: { title: 'Menu' },
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
              path: '/sectum/select',
              component: () => import('~/packet/Section/Select/Select.md'),
              meta: { title: 'Select' },
            },
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
              path: '/sectum/darktoggle',
              component: () => import('~/packet/Pattern/Dark/DarkToggle.md'),
              meta: { title: 'DarkToggle' },
            },
            {
              path: '/sectum/language',
              component: () => import('~/packet/Pattern/Language/Language.md'),
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
            {
              path: '/sectum/plus',
              component: () => import('~/packet/Pattern/Plus/Plus.md'),
              meta: { title: 'Plus' },
            },
            {
              path: '/sectum/editor',
              component: () => import('~/packet/Pattern/Editor/Editor.md'),
              meta: { title: 'Editor' },
            },
          ]
        },
        {
          path: '/sectum/',
          meta: { title: 'Model' },
          children: [
            {
              path: '/sectum/header',
              component: () => import('~/packet/Model/Header/Header.md'),
              meta: { title: 'Header' },
            },
            {
              path: '/sectum/footer',
              component: () => import('~/packet/Model/Footer/Footer.md'),
              meta: { title: 'Footer' },
            },
            {
              path: '/sectum/navbar',
              component: () => import('~/packet/Model/Navbar/Navbar.md'),
              meta: { title: 'Navbar' },
            },
            {
              path: '/sectum/sidebar',
              component: () => import('~/packet/Model/Sidebar/Sidebar.md'),
              meta: { title: 'Sidebar' },
            },
            {
              path: '/sectum/toolbar',
              component: () => import('~/packet/Model/Toolbar/Toolbar.md'),
              meta: { title: 'Toolbar' },
            },
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
              path: '/sectum/menual',
              component: () => import('~/packet/Layout/Menual/Menual.md'),
              meta: { title: 'Menual' },
            },
          ]
        }
      ]
    }
  ]

export default route

