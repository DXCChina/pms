export const ViewModel = {
    demand: {
        title: '需求',
        normalCol: ['名称', '状态', '级别', '所属活动'],
        columns: [
            { name: '名称', prop: 'name' },
            { name: '状态', prop: 'status' },
            { name: '级别', prop: 'level' },
            { name: '所属活动', prop: 'activity'},
            { name: '创建时间', prop: 'createAt' }
        ],
        roleOfNew: {
            pm: true,
            dev: false,
            test: false
        },
        url: 'demand'
    },
    devSet: {
        title: '活动',
        normalCol: ['名称', '状态', '预计花费（天）'],
        columns: [
            { name: '名称', prop: 'name' },
            { name: '状态', prop: 'status' },
            { name: '成员', prop: 'member' },
            { name: '进度', prop: 'progress' },
            { name: '起止时间', prop: '' },
            { name: '预计花费（天）', prop: 'cost' },
            { name: '创建时间', prop: 'createAt' }
        ],
        roleOfNew: {
            pm: true,
            dev: false,
            test: false
        },
        url: 'activity'
    },
    testCase: {
        title: '测试案例',
        normalCol: ['名称', '对应任务', '创建人', '案例类型', '状态'],
        columns: [
            { name: '名称', prop: 'name' },
            { name: '对应任务', prop: 'demand' },
            { name: '创建人', prop: 'owner' },
            { name: '案例类型', prop: 'type' },
            { name: '状态', prop: 'status' }
        ],
        roleOfNew: {
            pm: false,
            dev: false,
            test: true
        },
        url: 'testCase'
    },
    testSet: {
        title: '测试集',
        normalCol: ['名称', '指派人'],
        columns: [
            { name: '名称', prop: 'name' },
            { name: '指派人', prop: 'member' },
            { name: '所含案例', prop: 'testCase' }
        ],
        roleOfNew: {
            pm: true,
            dev: false,
            test: false
        },
        url: 'testSet'
    },
    bug: {
        title: 'BUG',
        normalCol: ['名称', '对应任务', '对应案例', '对应测试集', '创建人', '开发人员', '优先级', '严重程度'],
        columns: [
            { name: '名称', prop: 'name' },
            { name: '对应任务', prop: 'demand' },
            { name: '对应案例', prop: 'testCase' },
            { name: '对应测试集', prop: 'testSet' },
            { name: '创建人', prop: 'owner' },
            { name: '开发人员', prop: 'dev' },
            { name: '当前状态', prop: 'status' },
            { name: '优先级', prop: 'level' },
            { name: '严重程度', prop: 'priority' },
        ],
        roleOfNew: {
            pm: false,
            dev: false,
            test: true
        },
        url: 'testResult'
    }
};
