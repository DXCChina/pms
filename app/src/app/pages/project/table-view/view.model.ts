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
        newUrl: '',
        roleOfNew: {
            pm: true,
            dev: true,
            test: true
        },
        detailUrl: 'demand'
    },
    devset: {
        title: '活动',
        normalCol: ['名称', '状态', '预计花费（小时）'],
        columns: [
            { name: '名称', prop: 'name' },
            { name: '状态', prop: 'status' },
            { name: '成员', prop: 'member' },
            { name: '进度', prop: 'progress' },
            { name: '起止时间', prop: '' },
            { name: '预计花费（小时）', prop: 'cost' },
            { name: '创建时间', prop: 'createAt' }
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
        normalCol: ['名称', '对应任务', '创建人', '案例类型', '输入', '预期输出'],
        columns: [
            { name: '名称', prop: 'name' },
            { name: '对应任务', prop: 'demand' },
            { name: '创建人', prop: 'owner' },
            { name: '案例类型', prop: 'type' },
            { name: '输入', prop: 'input' },
            { name: '预期输出', prop: 'expect' }
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
        normalCol: ['名称', '指派人'],
        columns: [
            { name: '名称', prop: 'name' },
            { name: '指派人', prop: 'member' },
            { name: '所含案例', prop: 'testCase' }
        ],
        newUrl: '',
        roleOfNew: {
            pm: true,
            dev: true,
            test: true
        },
        detailUrl: 'testSet'
    },
    bug: {
        title: 'BUG',
        normalCol: ['名称', '对应任务', '对应案例', '对应测试集', '创建人', '开发人员', '当前状态', '输入', '预期输出', '实际输入', '优先级', '严重程度'],
        columns: [
            { name: '名称', prop: 'name' },
            { name: '对应任务', prop: 'demand' },
            { name: '对应案例', prop: 'testCase' },
            { name: '对应测试集', prop: 'testSet' },
            { name: '创建人', prop: 'owner' },
            { name: '开发人员', prop: 'dev' },
            { name: '当前状态', prop: 'status' },
            { name: '输入', prop: 'input' },
            { name: '预期输出', prop: 'expect' },
            { name: '实际输入', prop: 'output' },
            { name: '优先级', prop: 'level' },
            { name: '严重程度', prop: 'priority' },
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
