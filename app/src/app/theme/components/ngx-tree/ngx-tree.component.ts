import {Component, OnInit, Input, ViewChild, OnChanges, Output, EventEmitter} from '@angular/core';
import {ITreeOptions, TREE_ACTIONS, KEYS, TreeComponent, TreeNode} from "angular-tree-component";

@Component({
  selector: 'wa-tree',
  templateUrl: './ngx-tree.component.html',
  styleUrls: ['./ngx-tree.component.scss']
})
export class NgxTreeComponent implements OnInit,OnChanges {
  @Input() nodes;
  @Input() tabIndex: number = 0;
  @Output() emitClick: EventEmitter<any> = new EventEmitter<any>()

  @ViewChild('tree') treeComponent: TreeComponent;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.tabIndex == 1) {
      setTimeout(() => {
        this.treeComponent.sizeChanged();
      });
    }
  }

  customTemplateStringOptions: ITreeOptions = {
    displayField: 'subTitle',
    isExpandedField: 'expanded',
    idField: 'uuid',
    actionMapping: {
      mouse: {
        click: (tree, node, $event) => {//左键
          $event.shiftKey
            ? TREE_ACTIONS.TOGGLE_SELECTED_MULTI(tree, node, $event)
            : TREE_ACTIONS.TOGGLE_SELECTED(tree, node, $event);
        }
      }
    },
    nodeHeight: 23,
    allowDrag: (node) => {
      return true;
    },
    allowDrop: (node) => {
      return true;
    },
    useVirtualScroll: false,
    animateExpand: true,
    animateSpeed: 30,
    animateAcceleration: 1.2
  };

  onInitialized(tree) {
    // tree.treeModel.getNodeById('11').setActiveAndVisible();
  }

  onEvent(event) {
    if(event.eventName === 'activate') {
      this.emitClick.emit(event)
      // if(event.node.data.id){
      //   console.log(event.node.data.id)
      // }
    }
  }

  // childrenCount(node: TreeNode): string {
  //   return node && node.children ? `(${node.children.length})` : '';
  // }

  //侧栏跟随
  // reinitSize() {
  //   var width = $(".mat-tab-body-wrapper").width();
  //   var height = $(window).height();
  //   $("#divLeft").css({height: height + "px", width: width * 0.25 + "px"});
  //   $("#divS").css({height: height - 2 + "px", width: "4px"});
  //   $("#divRight").css({height: height + "px", width: (width * 0.75 - 17) + "px"});
  // }
  //
  // load() {
  //   var that = this;
  //   $("#divS").on("mousedown", function (e) {
  //     that.sliderMoving = true;
  //     $("#divP").css("cursor", "e-resize");
  //     $("#divP").on("mousemove", function (e) {
  //       if (that.sliderMoving) {
  //         that.sliderGhostMoving(e);
  //       }
  //     });
  //     $("#divP").on("mouseup", function (e) {
  //       if (that.sliderMoving) {
  //         that.sliderMoving = false;
  //         that.sliderHorizontalMove(e);
  //         $("#divP").css("cursor", "default");
  //       }
  //     });
  //   });
  //
  //
  // }
  //
  // //分隔条幽灵左右拖动(mousemove)
  // sliderGhostMoving(e) {
  //   $("#divS").css({left: this.mousePosition(e).x - 2, display: "block"});
  // };
  //
  // //兼容各种浏览器的,获取鼠标真实位置
  // mousePosition(ev) {
  //   if (!ev) ev = window.event;
  //   if (ev.pageX || ev.pageY) {
  //     return {x: ev.pageX - 330, y: ev.pageY};
  //   }
  //   return {
  //     x: ev.clientX + document.documentElement.scrollLeft - document.body.clientLeft,
  //     y: ev.clientY + document.documentElement.scrollTop - document.body.clientTop
  //   };
  // };
  //
  // sliderHorizontalMove(e) {
  //   var lWidth = this.getElCoordinate($("#divS")[0]).left - 340 - 2;
  //   if(lWidth>1000){
  //     lWidth = 1000;
  //   }
  //
  //   var rWidth = $(window).width() - lWidth - 20;
  //
  //   $("#divLeft").css("width", lWidth + "px");
  //   $("#divRight").css("width", rWidth + "px");
  // };
  //
  // //获取一个DIV的绝对坐标的功能函数,即使是非绝对定位,一样能获取到
  // getElCoordinate(dom) {
  //   var t = dom.offsetTop;
  //   var l = dom.offsetLeft;
  //   dom = dom.offsetParent;
  //   while (dom) {
  //     t += dom.offsetTop;
  //     l += dom.offsetLeft;
  //     dom = dom.offsetParent;
  //   }
  //   ;
  //   return {top: t, left: l};
  // };
}


