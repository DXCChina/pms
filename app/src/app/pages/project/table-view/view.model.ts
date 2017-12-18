export const ViewModel = {
    demandList: {
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
    activityList: {
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
    testCaseList: {
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
    testSetList: {
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
    testResultList: {
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
