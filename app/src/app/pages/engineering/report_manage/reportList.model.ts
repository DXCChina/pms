/**
 * Created by gaole on 2017/7/28.
 */
import {Pagination} from "../../../theme/components/waDataList/pagnation.Entity";
import {Report} from "./report.model";

export class ReportList {
  data: Report[];
  paging: Pagination;

  constructor(data: Report[], paging: Pagination) {
    this.data = data;
    this.paging = paging;
  }
}


