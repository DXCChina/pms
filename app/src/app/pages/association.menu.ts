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
            icon: 'ion-navicon-round',
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
            icon: 'ion-navicon-round',
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
            title: '测试管理',
            icon: 'ion-navicon-round',
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
            icon: 'ion-navicon-round',
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
            icon: 'ion-navicon-round',
            selected: false,
            expanded: false,
            order: 100,
          }
        },
      }
    ]
  }
];
