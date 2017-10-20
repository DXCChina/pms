import {
  AfterViewInit, Component, ContentChild, TemplateRef, OnInit, ElementRef,
  ViewEncapsulation, Renderer2
} from "@angular/core";
import {Data} from "../../../theme/components/waDataList/data.Entity";
import {ReportList} from "./reportList.model";
import {objectKeys} from "../../../theme/validators/modifyKeys";
import {ReportManageService} from "./report-manage.service";
import {ConfigEntity} from "../../../theme/components/w-dataList/config.Entity";
import {ReportStaty} from "./report.model";


@Component({
  selector: "en-rm",
  templateUrl: './report-manage.component.html',
  styleUrls: ['./report-manage.component.scss'],
  providers: [ReportManageService],
  encapsulation: ViewEncapsulation.None
})

export class ReportManageComponent implements OnInit, AfterViewInit {
  checkedAll: boolean = false;
  report: ReportList;
  datas: Data[];
  selectReport:any;
  tabIndex: number = 0;
  contentSwitch: string = 'emptyCase'
  configEntity: any;
  reportStaty: ReportStaty;
  transAppStaty: any[] = [];
  transCpuStaty: any[] = [];
  transRamStaty: any[] = [];
  transCpuLine: any[] = [];
  transRamLine: any[] = [];
  transNodes: any[] = [];
  selected: any[] = [];
  treeRes: any
  treeData: any[] = [];
  loadingZN: string = '任务运行中...';
  loadingEN: string = 'Task is running ...';

  page: number = 1;
  size: number = 15;
  sortField: string = 'id';
  sortOrder: string = 'asc';

  nodes=[
    {
      // expanded: true,
      name: '案例1',
      subTitle: 'the root',
      children: [
        {
          name: '案例1-1',
          subTitle: 'a good child',
          // hasChildren: false
        }, {
          name: '案例1-2',
          subTitle: 'a bad child',
          // hasChildren: false
        }
      ]
    },
    {
      name: '案例2',
      subTitle: 'the second root',
      // expanded: true,
      children: [
        {
          name: '案例2-1',
          subTitle: 'new and improved',
          uuid: '11',
          // hasChildren: false
        }, {
          name: '案例2-2',
          subTitle: 'new and improved2',
          children: [
            {
              uuid: 1001,
              name: 'subsub',
              subTitle: 'subsub',
              // hasChildren: false
            }
          ]
        }
      ]
    }
  ];

  displayedColumns = ['name', 'version', 'size', 'type', 'device', 'status', 'timing'];

  // options
  view: any
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  legendTitle = '品牌';
  showXAxisLabel = true;
  // xAxisLabel = 'CPU占用量';
  showYAxisLabel = true;
  yAxisLabel = '品牌';
  barPadding: number = 20;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };


  appRows: any[];
  scriptRows: any[];
  // appColumn: any[] = [
  //   { prop: 'appName' , name: '应用名称' },
  //   { prop: 'appVersion', name: '应用版本' },
  //   { prop: 'size',  name: '应用大小' },
  //   { prop: 'testType', name: '测试类型' },
  //   { prop: 'devices', name: '完成终端数' },
  //   { prop: 'testState', name: '测试状态' },
  //   { prop: 'time', name: '耗时(秒)'}
  // ];
  appColumn: any[] = [
    { prop: 'name' , name: '应用名称' },
    { prop: 'version', name: '应用版本' },
    { prop: 'size',  name: '应用大小' },
    { prop: 'type', name: '平台' },
    // { prop: 'devices', name: '完成终端数' },
    // { prop: 'testState', name: '测试状态' },
    // { prop: 'time', name: '耗时(秒)'}
  ];
  // scriptColumn: any[] = [
  //   { prop: 'model' , name: '测试机型' },
  //   { prop: 'brand', name: '品牌' },
  //   { prop: 'state',  name: '状态' },
  //   { prop: 'successNum', name: '脚本测试成功数' },
  //   { prop: 'failedNum', name: '脚本测试失败数' },
  //   { prop: 'scriptName', name: '案例' },
  //   { prop: 'appName', name: '应用'},
  //   { prop: 'appVersion', name: '应用版本'}
  // ];
  scriptColumn: any[] = [
    { prop: 'model' , name: '测试机型' },
    { prop: 'brand', name: '品牌' },
    { prop: 'successNum', name: '脚本测试成功数' },
    { prop: 'failedNum', name: '脚本测试失败数' },
    { prop: 'total', name: '案例总数' },
    // { prop: 'check', name: '查看详情' },
  ];

  projectId: string = '';

  constructor(private _service:ReportManageService, private elementRef:ElementRef, private Renderer: Renderer2) {
    this.configEntity = {
      "name": "id",
      "id": "id",
      "description": "taskName",
    };
    this.projectId = sessionStorage.getItem("projectId");
    //
    // this.process(this.transCpuLine);
    // this.process(this.transRamLine);
  }
  ngOnInit(){
    this.getAllReports();
  }

  ngAfterViewInit() {

  }

  getCharts(){

  }

  xAxisFormat(val) {
    return val.toLocaleString() + '%';
  }

  yAxisFormatline(val) {
    return val.toLocaleString() + '%';
  }

  xAxisFormatline(val) {
    // console.log(val.toLocaleString())
    return val.toLocaleString();
  }

  process(data) {
    for (let item of data) {
      for (let s of item.series) {
        s.name = new Date(s.name)
      }
    }
  }

  translate(timeStr: string){
    let date = timeStr.toString().split(" ");
    return date[3]+' '+date[2]+' '+date[4]
  }

  // Percentage(item: any){
  //   let all: number = 0;
  //   this.single.map(val => all += val.value);
  //   let getPer = item/all *100;
  //   return getPer.toFixed(1) + '%'
  // }

  getAllReports(){
    let params = [
      `page=${this.page}`,
      `size=${this.size}`,
      `sortField=${this.sortField}`,
      `sortOrder=${this.sortOrder}`,
      `projectId=${this.projectId}`
    ].join('&');

    this._service.getAllReports(params)
      .then(res=>{
        this.report = res;
      })
  }

  getStepInfo(id: string, device: any) {
    this._service.getStepTreeInfo(id)
      .then(res => {
        res.data.testcases.forEach(item => {
          let node = {
            name: item.name,
            subTitle: item.description,
            eId:id,
            caseId:item.id,
            deviceId: '',
            children: res.data.scripts[item.id].map(child => {
              return {
                name: child.name,
                subTitle: child.description,
                scriptId: child.id
              }
            })
          }
          this.transNodes.push(node)
        })
        res.data.devices.map( (item, index, array) => {
          this.transNodes.map((node, i, nodes) => {
            nodes[i].deviceId = array[index].id
          })
        })
        this.transNodes = this.transNodes.concat()
      }).catch(err => console.log(err))
  }

  getTreeStep(event: any){
    if(event.node.parent.parent !== null) {
      this._service.getStepInfo(event.node.parent.data.deviceId, event.node.parent.data.eId, event.node.parent.data.caseId, event.node.data.scriptId)
        .then( res => {
          this.treeRes = res
          res.data.map(item => {
            if(item.value == 'null') {
              item.value = ""
            }
            let node = {
              runtime: item.runtime,
              _value: item.value,
              cpurate: item.cpurate,
              memory: item.memory,
              action: item.action,
              screenshotPath: item.screenshotPath
            }
            this.treeData.push(node)
          })
          this.treeData = this.treeData.concat()
          console.log(this.treeData)
        }).catch(err => {
          console.log(err)
      })
    }
  }

  loadInfo(selectReport: any){
    this.selectReport = selectReport;
  }

  consoleSearch(search: string) {
    console.log(search)
  }

  consoleFieldName(name: string) {
    console.log(name)
  }

  consoleSort(direction: string) {
    console.log(direction)
  }

  returnPageIndex(index: number) {
    this.page = index;
    this.getAllReports()
  }
  returnChecked(){

  }

  initData() {
    this.transAppStaty = [];
    this.transCpuStaty = [];
    this.transRamStaty = [];
    this.transCpuLine = [];
    this.transRamLine = [];
    this.transNodes = [];
    this.selected = [];
    this.treeRes = []
    this.treeData = [];
  }

  loadStatisInfo(exeId){
    this.initData()
    let dataLength
    this._service.loadStatisInfo(exeId)
      .then(res => {
        if (res.message === 'ok') {
          if(res.data.cpuStaty.length == 0) {
            this.contentSwitch = 'loadingCase';
            this.loadingZN = '未取得数据';
            this.loadingEN = 'Missing data'
          } else {
            this.contentSwitch = 'commonCase'
            this.reportStaty = res
            dataLength = res.data.cpuStaty.length
            res.data.cpuStaty.map(item => {
              let name = item.brand  + ' ' + item.model
              let value = item.value
              this.transCpuStaty.push({name, value})
            })
            res.data.ramStaty.map(item => {
              let name = item.brand + ' ' + item.model
              let value = item.value
              this.transRamStaty.push({name, value})
            })
            res.data.cpuLine.map(item => {
              let name = item.brand + ' '  + item.model
              let series = item.series
              this.transCpuLine.push({name, series})
            })
            res.data.rawLine.map(item => {
              let name = item.brand + ' '  + item.model
              let series = item.series
              this.transRamLine.push({name, series})
            })
            let name = res.data.appStaty.name
            let size = res.data.appStaty.size
            let version = res.data.appStaty.version
            let type = res.data.appStaty.type
            this.transAppStaty = [{
              name,
              size,
              version,
              type
            }];
            if (dataLength < 10) {
              this.view = [500, (dataLength + 1)*50]
            } else {
              this.view = [500, (dataLength + 1)*25]
            }
          }
        } else {
          this.contentSwitch = 'loadingCase'
          this.loadingZN = '任务运行中...';
          this.loadingEN = 'Task is running ...'
        }
      });

  }

  // onSelect({ selected }) {
  //   console.log('Select Event', selected, this.selected);
  // }

  onActivate(e) {
    if( e.type === 'click') {
      console.log(e.row)
    }
  }
  returnSelected(selectReport: any){
    this.transNodes = [];
    this.transCpuStaty = this.transRamStaty = [];
    this.loadInfo(selectReport);
    this.loadStatisInfo(selectReport.id);
    this.getStepInfo(selectReport.id, selectReport)
  }
  returnSearch(){

  }

  selectTab($event){
    this.tabIndex = $event.index;
    // console.log("tab", $event.index);
  }

  getHeight(row: any, index: number): number {
    return row.someHeight;
  }

  console() {
    console.log('1323132')
  }
}

