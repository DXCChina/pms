export const ViewModel = {
    demand: {
        title: '需求',
        columns: [
            { name: '名称', prop: 'name' },
            { name: '详情', prop: 'detail' },
            { name: '详情', prop: 'detail' },
            { name: '详情', prop: 'detail' }
        ],
        newUrl: '',
        roleOfNew: {
            pm: true,
            dev: true,
            test: true
        },
        detailUrl: 'demand'
    },
    activity: {
        title: '活动',
        columns: [
            { name: '名称', prop: 'name' },
            { name: '详情', prop: 'detail' },
            { name: '详情', prop: 'detail' },
            { name: '详情', prop: 'detail' }
        ],
        newUrl: '',
        roleOfNew: {
            pm: true,
            dev: true,
            test: true
        },
        detailUrl: 'activity'
    },
    testCase: {
        title: '测试案例',
        columns: [
            { name: '名称', prop: 'name' },
            { name: '详情', prop: 'detail' },
            { name: '详情', prop: 'detail' },
            { name: '详情', prop: 'detail' }
        ],
        newUrl: '',
        roleOfNew: {
            pm: false,
            dev: false,
            test: true
        },
        detailUrl: 'testCase'
    },
    testSet: {
        title: '测试集',
        columns: [
            { name: '名称', prop: 'name' },
            { name: '详情', prop: 'detail' },
            { name: '详情', prop: 'detail' },
            { name: '详情', prop: 'detail' }
        ],
        newUrl: '',
        roleOfNew: {
            pm: true,
            dev: true,
            test: true
        },
        detailUrl: 'testSet'
    },
    testResult: {
        title: 'BUG',
        columns: [
            { name: '名称', prop: 'name' },
            { name: '详情', prop: 'detail' },
            { name: '详情', prop: 'detail' },
            { name: '详情', prop: 'detail' }
        ],
        newUrl: '',
        roleOfNew: {
            pm: true,
            dev: true,
            test: true
        },
        detailUrl: 'testResult'
    }
};
