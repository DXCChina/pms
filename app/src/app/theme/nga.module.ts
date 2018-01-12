import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  BaThemeConfig
} from './theme.config';

import {
  BaThemeConfigProvider
} from './theme.configProvider';

import {
  BaBackTop,
  BaCard,
  BaCheckbox,
  BaContentTop,
  BaFullCalendar,
  BaMenuItem,
  BaMenu,
  BaMsgCenter,
  BaMultiCheckbox,
  BaSidebar,
  BaWelTop,
  ListCardComponent,
  PmsSidebar
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
  Name2AvatarPipe,
  DelHtmlTagPipe
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
  MatSelectModule, MatTabsModule, MatCardModule, MatProgressBarModule, MatToolbarModule, MatChipsModule,
  MatTooltipModule, MatDialogModule
} from '@angular/material';

import {WaDataList} from './components/waDataList/waDataList.component';
import {WaFilter} from './components/waFilter/waFilter.component';
import {WaSort} from './components/waSort/waSort.component';
import {WaDataListItemComponent} from './components/waDataList/waDataListitem/waDataListItem.component';
import {WColumnComponent, WDataListComponent} from './components/w-dataList/w-dataList.component';
import {WSidebarComponent} from './components/w-sidebar/w-sidebar.component';
import {WaSearchComponent} from './components/waSearch/wa-search.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {WaDatableComponent} from './components/wa-datatable/wa-datatable.component';
import {DeviceManageComponent} from './components/device_manage/device-manage.component';
import {DeviceItemComponent} from './components/device_manage/device-item/device-item.component';

import {CommonSearchComponent} from './components/commonSearch/commonSearch.component';
import {PositionSwitchPipe} from './pipes/positionSwitch/positionSwitch.pipe';

import {ChipListComponent} from './components/chip-list/chip-lsit.component';
import {PmPeoplemanageComponent} from './components/pm-peoplemanage/pm-peoplemanage.component';
import {CommonDeleteDialog} from './components/deleteDialog/deleteDialog.component';
import {HorizontalTimelineComponent} from './components/horizontal-timeline/horizontal-timeline.component';
import {TimeLineComponent} from './components/timeLine/timeLine.component';

const NGA_COMPONENTS = [
  BaBackTop,
  BaCard,
  BaCheckbox,
  BaContentTop,
  BaFullCalendar,
  BaMenuItem,
  BaMenu,
  BaMsgCenter,
  BaMultiCheckbox,
  BaSidebar,
  BaWelTop,
  WaSearchComponent,
  BaPagination,
  WaDataList,
  WaDataListItemComponent,
  WaFilter,
  WaSort,

  WDataListComponent,
  WColumnComponent,
  WSidebarComponent,
  WaDatableComponent,
  DeviceManageComponent,
  DeviceItemComponent,

  CommonSearchComponent,
  ChipListComponent,
  ListCardComponent,
  PmPeoplemanageComponent,
  CommonDeleteDialog,
  PmsSidebar,
  HorizontalTimelineComponent,
  TimeLineComponent
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
  PositionSwitchPipe,
  Name2AvatarPipe,
  DelHtmlTagPipe
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
    // Add material design components
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatDialogModule,
    MatProgressBarModule,
    MatTabsModule,
    MatCardModule,
    MatChipsModule,
    NgxDatatableModule,
    MatToolbarModule,
  ],
  exports: [
    ...NGA_PIPES,
    ...NGA_DIRECTIVES,
    ...NGA_COMPONENTS
  ],
  entryComponents:[
    CommonDeleteDialog
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
