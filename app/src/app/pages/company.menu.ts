export const COMPANY_MENU = [
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
