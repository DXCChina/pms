export const RoleModel = {
    pm: [
        {
            name: 'demand',
            canAdd: true,
        },
        {
            name: 'devSet',
            canAdd: true,
        },
        {
            name: 'testCase',
            canAdd: false,
        },
        {
            name: 'testSet',
            canAdd: true,
        },
        {
            name: 'bug',
            canAdd: false,
        }
    ],
    test: [
        {
            name: 'devSet',
            canAdd: false,
        },
        {
            name: 'testCase',
            canAdd: true,
        },
        {
            name: 'testSet',
            canAdd: false,
        },
        {
            name: 'bug',
            canAdd: true,
        }
    ],
    dev: [
        {
            name: 'demand',
            canAdd: false,
        },
        {
            name: 'devSet',
            canAdd: false,
        },
        {
            name: 'bug',
            canAdd: false,
        }
    ]
};

