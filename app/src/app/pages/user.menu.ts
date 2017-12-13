export const USER_MENU = [
  {
    path: 'test',
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
        path: 'activity',
        data: {
          menu: {
            title: '项目管理',
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
