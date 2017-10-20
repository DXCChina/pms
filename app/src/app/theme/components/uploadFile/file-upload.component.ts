import {Component, EventEmitter, Input, NgZone, OnInit, Output} from '@angular/core';

@Component({
  selector: 'file-upload',
  templateUrl: 'file-upload.component.html',
  styleUrls: ['file-upload.scss'],
  providers: []
})
export class FileUploadComponent implements OnInit {
  color: string = 'primary';
  mode: string = 'determinate';
  bufferValue: number = 75;
  @Input() disable: boolean = false;
  @Input() fileSizeLimit: number = 20971520;
  @Input() url: string;
  @Input() name: string;
  @Input() type: string = '';
  @Input() allowUploadType: string[];
  @Output() onUploading = new EventEmitter<boolean>();
  @Output() onFinishUploading = new EventEmitter<any>();

  private zone: NgZone;
  private progress: number = 0;
  private response: any = {};
  private originalName: string = ' ';

  private reply: ReplyObject = new ReplyObject();
  private options: Object;
  private isLegalType: boolean = false;

  constructor() {

  }

  ngOnInit() {
    this.options = {
      url: this.url,
      fieldName: this.name,
      customHeaders: {
        'X-TOKEN': localStorage.getItem('accessToken')
      }
    };
    this.reply.property = this.name;
    this.zone = new NgZone({enableLongStackTrace: false});
  }


  handleUpload(data: any): void {
    this.onUploading.emit(true);

    this.zone.run(() => {
      this.response = data;
      this.progress = Math.floor(data.progress.percent);
    });

    let rsp = data.response;
    if (rsp) {
      rsp = JSON.parse(rsp);
      this.reply.rsp = rsp;
      this.onFinishUploading.emit(this.reply);
    }
  }

  beforeUpload(uploadingFile): void {
    if (uploadingFile.size > this.fileSizeLimit) {
      uploadingFile.setAbort();
      alert('文件不能超过200M，请重新上传！');
    }
    this.originalName = uploadingFile.originalName;

    let typeOfFile = this.originalName.substring(this.originalName.lastIndexOf('.') + 1);

    for (var type in this.allowUploadType) {
      if (typeOfFile == this.allowUploadType[type]) {
        this.isLegalType = true;
        return;
      }
    }
    if (!this.isLegalType) {
      uploadingFile.setAbort();
      alert('上传文件格式不正确! ');
    }
  }

}

export class ReplyObject {
  property: string;
  rsp: any;
}
