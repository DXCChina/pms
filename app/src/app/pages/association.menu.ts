export const ASSOCIATION_MENU = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: '工作台',
            icon: 'ion-edit',
            selected: false,
            expanded: false,
            order: 100,
          }
        },
      },
      {
        path: 'demand',
        data: {
          menu: {
            title: '需求管理',
            icon: 'ion-pull-request',
            selected: false,
            expanded: false,
            order: 100,
          }
        },
      },
      {
        path: 'devSet',
        data: {
          menu: {
            title: '开发活动',
            icon: 'ion-gear-b',
            selected: false,
            expanded: false,
            order: 100,
          }
        },
      },
      {
        path: 'testCase',
        data: {
          menu: {
            title: '用例管理',
            icon: 'ion-briefcase',
            selected: false,
            expanded: false,
            order: 100,
          }
        },
      },
      {
        path: 'testSet',
        data: {
          menu: {
            title: '测试实验室',
            icon: 'ion-ios-grid-view-outline',
            selected: false,
            expanded: false,
            order: 100,
          }
        },
      },
      {
        path: 'bug',
        data: {
          menu: {
            title: '缺陷管理',
            icon: 'ion-bug',
            selected: false,
            expanded: false,
            order: 100,
          }
        },
      }
    ]
  }
];
