import { Component, OnInit, Input, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { CommonService } from '@app/shared/service/common.service';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';
import { Subscription } from 'rxjs';
import { formInput } from '@app/models/common/input';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  @ViewChild('datSyncc') dataSyncctemplate: TemplateRef<any>;
  fillingid = sessionStorage.getItem('FillingId');
  token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');

  primaryattorneyObj: any = {};
  FillingName: any;
  selectedCountryState: any;
  states = [];
  orgId: any = '';
  g28info: any = [];
  originalG28Obj: any;
  dataSyncPrimaryAttorney: any = {};
  syncModel: any = {};
  isSyncDisabled = true;

  thumbnail = [];

  //pdf
  profileContactInfo: any = {};
  pdf: PDFDocumentProxy;
  listObj = {};
  buttonName: string;
  createdFormValue = {};
  scaleData: any;
  public myForm: FormGroup;
  public inputList: formInput[] = [];

  emitGetImmigrationFormData: Subscription;
  emitSaveImmigrationFormData: Subscription;
  dataSyncc: any;
  tempDataSycc = [];

  @Input() formName: any;
  @Input() zoom = 1;

  @Input() pdfs = [];
  @Input() caseId: any;
  showPdfs = false;
  public inputLists = [];
  pagesNumber = 0;
  showData = false;
  showPdfView = true;

  constructor(private spinner: NgxSpinnerService, public commonService: CommonService, private _fb: FormBuilder) {
    this.myForm = this._fb.group({});
    this.emitGetImmigrationFormData = this.commonService.emitGetImmigrationFormData.subscribe((res) => {
      if (!commonService.checkNullorUndefined(res)) {
        this.resetForm();
        // this.pageRendered(this.scaleData);
        if (res.ImmigrationResults) {
          this.listObj = JSON.parse(res.ImmigrationResults.FormData);
        }
        if (res.DataSyncTemplate.length) {
          this.dataSyncc = res.DataSyncTemplate;
          this.commonService.openModel(this.dataSyncctemplate, 'lg');
        } else {
          this.showPdfs = true;
        }
      }
      this.spinner.hide();
    });
    this.emitSaveImmigrationFormData = this.commonService.emitSaveImmigrationFormData.subscribe((res) => {
      if (!commonService.checkNullorUndefined(res)) {
        this.commonService.getImmigrantInfo(this.formName, this.caseId);
      }
    });
  }

  ngOnInit() {
    this.commonService.getImmigrantInfo(this.formName, this.caseId);
    this.commonService.getContries();
    this.commonService.getStates();
  }

  private resetForm() {
    this.myForm.reset();
    this.myForm = this._fb.group({});
    this.inputList = [];
  }

  //saveImmigrationFormData
  saveImmigrationFormData() {
    // this.savePdf();
    this.getFinalData();
    console.log(this.listObj);
    this.commonService.saveImmigrationFormData(this.formName, this.listObj, this.caseId);
  }

  // savePdf() {
  //   if (!this.commonService.checkNullorUndefined(this.createdFormValue)) {
  //     this.listObj = Object.assign(this.listObj, this.createdFormValue);
  //   }
  //   for (let form in this.myForm.value) {
  //     if (form.includes('Radio')) {
  //       this.setDataButton(this.myForm.value[form], null);
  //     } else {
  //       this.setDataButton(form, this.myForm.value[form]);
  //     }
  //   }
  // }

  getFinalData() {
    this.inputLists.forEach((res) => {
      res.list.forEach((ele) => {
        if (ele.type == 'radio') {
          this.listObj = {
            ...this.listObj,
            [ele.key]: ele.value,
          };
        } else {
          this.listObj = {
            ...this.listObj,
            [ele.name]: ele.value,
          };
        }
      });
    });
  }

  storeDataSync(key, val, checked) {
    switch (key) {
      case key:
        if (checked) {
          this.tempDataSycc[key] = val;
        } else {
          delete this.tempDataSycc[key];
        }
        break;
    }
    if (Object.keys(this.tempDataSycc) && Object.keys(this.tempDataSycc).length) {
      this.isSyncDisabled = false;
    } else {
      this.isSyncDisabled = true;
    }
  }

  fileDataSync() {
    this.resetForm();
    // this.pageRendered(this.scaleData);
    let headingsobj = Object.keys(this.tempDataSycc);
    headingsobj.forEach((res) => {
      this.listObj[res] = this.tempDataSycc[res];
    });
    this.showPdfs = true;
    this.commonService.closeModel('close click');
  }

  cancelDataSync() {
    this.tempDataSycc = [];
    this.isSyncDisabled = true;
    this.showPdfs = true;
    this.commonService.closeModel('close click');
  }

  // <---------form code----------->

  previewPdf(i) {
    if (this.pagesNumber !== i) {
      this.pagesNumber = i;
      this.showData = false;
    }
  }
  next() {
    this.showData = false;
    this.pagesNumber = this.pagesNumber + 1;
  }

  prev() {
    this.showData = false;
    this.pagesNumber = this.pagesNumber - 1;
    // this.carousel.prev();
  }

  pageRenderedImages(event, img) {
    this.thumbnail.unshift({ url: event.source.canvas.toDataURL(), img: img });
    if (this.thumbnail.length === this.pdfs.length) {
      let thunPdf = [];
      for (let p = 0; p < this.pdfs.length; p++) {
        const pdf = this.thumbnail.find(res => res.img === this.pdfs[p]);
        if (pdf) {
          thunPdf.push(pdf);
        }
      }
      this.thumbnail = [ ...thunPdf];
      // console.log(this.pdfs, this.thumbnail);
      this.showPdfView = false;
    }
  }

  pageRendered(event) {

    if (this.inputLists[this.pagesNumber] != undefined) {
      if (this.inputLists[this.pagesNumber].list.length) {
        this.showData = true;
        return;
      }
    }
    // track the current page
    let currentPage = null;
    if (!event) {
      return;
    }
    this.scaleData = event;
    this.pdf
      .getPage(event.pageNumber)
      .then((p) => {
        currentPage = p;
        // get the annotations of the current page
        return p.getAnnotations();
      })
      .then((ann) => {
        const annotations = (<any>ann) as any[];
        annotations
          .filter((a) => a.subtype === 'Widget')
          .forEach((a) => {
            const fieldRect = currentPage
              .getViewport({ scale: event.source.viewport.scale })
              .convertToViewportRectangle(a.rect);
            this.addInput(a, fieldRect);
          });
      });
    // this.commonService.getImmigrantInfo(formName);
  }

  private addInput(annotation: any, rect: number[] = null): void {
    // add input to page
    this.createInput(annotation, rect);
    if (this.listObj !== null && this.listObj !== undefined) {
      this.myForm.patchValue(this.listObj);
      this.createdFormValue = Object.assign(this.createdFormValue, this.listObj);
    }
  }

  // screen DPI / PDF DPI
  private createInput(annotation: any, rect: number[] = null) {
    const input = new Input();
    input.name = annotation.fieldName;
    let formControl = new FormControl(annotation.buttonValue || '');

    if (annotation.fieldType === 'Tx' && !annotation.multiLine) {
      input.type = 'text';
      input.enableCont = 'text';
      input.value = annotation.buttonValue || '';
    }

    if (annotation.fieldType === 'Tx' && annotation.multiLine) {
      input.enableCont = 'textarea';
      input.value = annotation.buttonValue || '';
    }

    if (annotation.fieldType === 'Ch') {
      input.value = annotation.buttonValue || '';
      input.enableCont = 'dropdown';
      input.options = ['A', 'B', 'C'];
    }
    if (annotation.checkBox) {
      input.type = 'checkbox';
      input.value = true;
      input.enableCont = 'checkbox';
      formControl = new FormControl(annotation.buttonValue || false);
    }

    this.myForm.addControl(annotation.fieldName, formControl);

    if (annotation.fieldType === 'Btn' && !annotation.checkBox) {
      input.type = 'radio';
      input.enableCont = 'radio';
      input.value = annotation.buttonValue;
      input.key = annotation.buttonValue;
    }
    // Calculate all the positions and sizes
    if (rect) {
      input.top = rect[1] - (rect[1] - rect[3]);
      input.left = rect[0];
      input.height = (rect[1] - rect[3]) * 0.9;
      input.width = rect[2] - rect[0];
    }

    if (input.type == 'radio') {
      input.value = this.listObj[input.key] != null && this.listObj[input.key] != undefined ? this.listObj[input.key] : false;
    } else {
      input.value = this.listObj[input.name] != null && this.listObj[input.name] != undefined ? this.listObj[input.name] : '';
    }


    this.inputList.push(input);

    if (this.inputLists[this.pagesNumber] == undefined) {
      this.inputLists[this.pagesNumber] = { list: [] };
    }
    this.inputLists[this.pagesNumber].list.push(input);
    this.showData = true;
  }

  saveData() {
    console.log(this.inputLists);
  }

  trackByFn(index, item) {
    return index;
  }

  // setRadioName(annotation) {
  //   const radioName = this.setRadioButton(annotation.buttonValue);
  //   if (radioName != '') {
  //     this.myForm.patchValue({
  //       [annotation.fieldName]: radioName,
  //     });
  //   }
  // }
  // setRadioButton(value) {
  //   let radioName = '';
  //   for (let radio in this.listObj) {
  //     if (value == radio) {
  //       if (this.listObj[radio]) {
  //         radioName = radio;
  //       }
  //       this.listObj[radio] = false;
  //     }
  //   }
  //   return radioName != '' ? radioName : '';
  // }
  // setDataButton(form, value) {
  //   for (let val in this.listObj) {
  //     if (val == form) {
  //       this.listObj[val] = value != null ? value : true;
  //       break;
  //     }
  //   }
  // }

  public loadComplete(pdf: PDFDocumentProxy): void {
    this.pdf = pdf;
  }

  change(value, i) {
    this.inputLists[this.pagesNumber].list[i].value = value;
  }

  setRadioValue(input, i) {
    console.log(input, i, this.inputLists[this.pagesNumber].list)
    this.inputLists[this.pagesNumber].list.map(element => {
      if (element.name == input.name) {
        if (element.key == input.key) {
          element.value = true;
        } else {
          element.value = false;
        }
      }
    });
  }

  public getInputPosition(input: formInput): any {
    return {
      top: `${input.top}px`,
      left: `${input.left}px`,
      height: `${input.height}px`,
      width: `${input.width}px`,
    };
  }

  public zoomIn(): void {
    this.inputList = this.inputList.map((i) => {
      i.left *= 0.25 / this.zoom + 1;
      i.top *= 0.25 / this.zoom + 1;
      i.width *= 0.25 / this.zoom + 1;
      i.height *= 0.25 / this.zoom + 1;
      return i;
    });
    this.zoom += 0.25;
  }

  public zoomOut(): void {
    this.inputList = this.inputList.map((i) => {
      i.left *= 1 - 0.25 / this.zoom;
      i.top *= 1 - 0.25 / this.zoom;
      i.width *= 1 - 0.25 / this.zoom;
      i.height *= 1 - 0.25 / this.zoom;
      return i;
    });
    this.zoom -= 0.25;
  }

  //<--------------- end--------------------------->

  ngOnDestroy() {
    this.emitGetImmigrationFormData.unsubscribe();
    this.emitSaveImmigrationFormData.unsubscribe();
    this.commonService.clearCommonEmitters();
    this.commonService.closeModel('close click');
  }
}