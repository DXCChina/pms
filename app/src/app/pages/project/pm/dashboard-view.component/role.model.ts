export const RoleModel = {
    demand: {
        view: ['pm', 'dev'],
        add: ['pm'],
    },
    devSet: {
        view: ['pm', 'dev', 'test'],
        add: ['pm'],
    },
    testCase: {
        view: ['pm', 'test'],
        add: ['test'],
    },
    testSet: {
        view: ['pm', 'test'],
        add: ['pm'],
    },
    BUG: {
        view: ['pm', 'dev', 'test'],
        add: ['test'],
    },
};

