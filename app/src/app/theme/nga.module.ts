import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgUploaderModule } from 'ngx-uploader';
import { AppTranslationModule } from '../app.translation.module';

import {
  BaThemeConfig
} from './theme.config';

import {
  BaThemeConfigProvider
} from './theme.configProvider';

import {
  BaAmChart,
  BaBackTop,
  BaCard,
  BaChartistChart,
  BaCheckbox,
  BaContentTop,
  BaFullCalendar,
  BaMenuItem,
  BaMenu,
  BaMsgCenter,
  BaMultiCheckbox,
  BaPictureUploader,
  BaSidebar,
  BaFileUploader,
  BaWelTop,
  WaSortListComponent,
  ListCardComponent
} from './components';

import { BaCardBlur } from './components/baCard/baCardBlur.directive';

import {
  BaScrollPosition,
  BaSlimScroll,
  BaThemeRun
} from './directives';

import {
  BaAppPicturePipe,
  BaKameleonPicturePipe,
  BaProfilePicturePipe,
  Name2AvatarPipe
} from './pipes';

import {
  BaImageLoaderService,
  BaMenuService,
  BaThemePreloader,
  BaThemeSpinner
} from './services';

import {
  EmailValidator,
  EqualPasswordsValidator
} from './validators';

import { BaPagination } from './components/waPagination/waPagination.component';

import {
  MatButtonModule, MatCheckboxModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule,
  MatSelectModule, MatTabsModule, MatCardModule, MatChipsModule, MatProgressBarModule, MatToolbarModule, MatChipsModule
} from '@angular/material';

import {WaDataList} from "./components/waDataList/waDataList.component";
import {WaFilter} from "./components/waFilter/waFilter.component";
import {WaSort} from "./components/waSort/waSort.component";
import {WaDataListItemComponent} from "./components/waDataList/waDataListitem/waDataListItem.component";
import {FileUploadComponent} from "./components/uploadFile/file-upload.component";
import {WColumnComponent, WDataListComponent} from "./components/w-dataList/w-dataList.component";
import {WSidebarComponent} from "./components/w-sidebar/w-sidebar.component";
import {SortableModule, BsDropdownModule} from "ngx-bootstrap";
import {WaSearchComponent} from "./components/waSearch/wa-search.component";
import {NgxTreeComponent} from "./components/ngx-tree/ngx-tree.component";
import {TreeModule} from "angular-tree-component";
import {ContextMenuModule} from "ngx-contextmenu";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {WaDatableComponent} from "./components/wa-datatable/wa-datatable.component";
import {DeviceManageComponent} from "./components/device_manage/device-manage.component";
import {DeviceItemComponent} from "./components/device_manage/device-item/device-item.component";
import {DemandSearchComponent} from "./components/demandSearch/demandSearch.component";
import {ChipListComponent} from "./components/chip-list/chip-lsit.component";

const NGA_COMPONENTS = [
  BaAmChart,
  BaBackTop,
  BaCard,
  BaChartistChart,
  BaCheckbox,
  BaContentTop,
  BaFullCalendar,
  BaMenuItem,
  BaMenu,
  BaMsgCenter,
  BaMultiCheckbox,
  BaPictureUploader,
  BaSidebar,
  BaFileUploader,
  BaWelTop,
  WaSortListComponent,
  WaSearchComponent,
  BaPagination,
  WaDataList,
  WaDataListItemComponent,
  WaFilter,
  WaSort,
  FileUploadComponent,

  WDataListComponent,
  WColumnComponent,
  WSidebarComponent,
  NgxTreeComponent,
  WaDatableComponent,
  DeviceManageComponent,
  DeviceItemComponent,
  ChipListComponent
  ListCardComponent,
];

const NGA_DIRECTIVES = [
  BaScrollPosition,
  BaSlimScroll,
  BaThemeRun,
  BaCardBlur
];

const NGA_PIPES = [
  BaAppPicturePipe,
  BaKameleonPicturePipe,
  BaProfilePicturePipe,
  Name2AvatarPipe
];

const NGA_SERVICES = [
  BaImageLoaderService,
  BaThemePreloader,
  BaThemeSpinner,
  BaMenuService
];

const NGA_VALIDATORS = [
  EmailValidator,
  EqualPasswordsValidator
];

@NgModule({
  declarations: [
    ...NGA_PIPES,
    ...NGA_DIRECTIVES,
    ...NGA_COMPONENTS,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AppTranslationModule,
    NgUploaderModule,
    SortableModule.forRoot(),
    BsDropdownModule.forRoot(),
    // Add material design components
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatTabsModule,
    MatCardModule,
    MatChipsModule,
    TreeModule,
    ContextMenuModule,
    NgxDatatableModule,
    MatToolbarModule,
    MatChipsModule
  ],
  exports: [
    ...NGA_PIPES,
    ...NGA_DIRECTIVES,
    ...NGA_COMPONENTS
  ],
  entryComponents:[
  ]
})
export class NgaModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: NgaModule,
      providers: [
        BaThemeConfigProvider,
        BaThemeConfig,
        ...NGA_VALIDATORS,
        ...NGA_SERVICES
      ],
    };
  }
}
