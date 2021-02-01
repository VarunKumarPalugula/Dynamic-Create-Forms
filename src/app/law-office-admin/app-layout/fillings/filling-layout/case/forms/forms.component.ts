import { Component, OnInit } from '@angular/core';
import { FormNameConfig } from '@app/enums/FormNames.config';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
})
export class FormsComponent implements OnInit {
  pdfs: any = [];
  formName: any;
  sub: any;
  zoom = 1;
  caseId: any;

  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.caseId = params['id'];
      if (params['name'] == 'g-28') {
        let g38Pdfs = [
          'https://usics-forms.s3.amazonaws.com/g28/g-28+1st+page.pdf',
          'https://usics-forms.s3.amazonaws.com/g28/g-28+2nd+page.pdf',
          'https://usics-forms.s3.amazonaws.com/g28/g-28+3rd+page.pdf',
          'https://usics-forms.s3.amazonaws.com/g28/g-28+4th+page.pdf',
        ];
        this.configForm(g38Pdfs, FormNameConfig.G28);
      } else if (params['name'] == 'i-129') {
        let i129Pdfs = [
          'https://usics-forms.s3.amazonaws.com/i-129/i-129-pc_Part1.pdf',
          'https://usics-forms.s3.amazonaws.com/i-129/i-129-pc_Part2.pdf',
          'https://usics-forms.s3.amazonaws.com/i-129/i-129-pc_Part3.pdf',
          'https://usics-forms.s3.amazonaws.com/i-129/i-129-pc_Part4.pdf',
          'https://usics-forms.s3.amazonaws.com/i-129/i-129-pc_Part5.pdf',
          'https://usics-forms.s3.amazonaws.com/i-129/i-129-pc_Part6.pdf',
          'https://usics-forms.s3.amazonaws.com/i-129/i-129-pc_Part7.pdf',
          'https://usics-forms.s3.amazonaws.com/i-129/i-129-pc_Part8.pdf',
          'https://usics-forms.s3.amazonaws.com/i-129/i-129-pc_Part9.pdf',
          'https://usics-forms.s3.amazonaws.com/i-129/i-129-pc_Part10.pdf',
          'https://usics-forms.s3.amazonaws.com/i-129/i-129-pc_Part11.pdf',
          'https://usics-forms.s3.amazonaws.com/i-129/i-129-pc_Part12.pdf',
          'https://usics-forms.s3.amazonaws.com/i-129/i-129-pc_Part13.pdf',
          'https://usics-forms.s3.amazonaws.com/i-129/i-129-pc_Part14.pdf',
          'https://usics-forms.s3.amazonaws.com/i-129/i-129-pc_Part15.pdf',
          'https://usics-forms.s3.amazonaws.com/i-129/i-129-pc_Part16.pdf',
          'https://usics-forms.s3.amazonaws.com/i-129/i-129-pc_Part17.pdf',
          'https://usics-forms.s3.amazonaws.com/i-129/i-129-pc_Part18.pdf',
          'https://usics-forms.s3.amazonaws.com/i-129/i-129-pc_Part19.pdf',
          'https://usics-forms.s3.amazonaws.com/i-129/i-129-pc_Part20.pdf',
          'https://usics-forms.s3.amazonaws.com/i-129/i-129-pc_Part21.pdf',
          'https://usics-forms.s3.amazonaws.com/i-129/i-129-pc_Part22.pdf',
          'https://usics-forms.s3.amazonaws.com/i-129/i-129-pc_Part23.pdf',
          'https://usics-forms.s3.amazonaws.com/i-129/i-129-pc_Part24.pdf',
          'https://usics-forms.s3.amazonaws.com/i-129/i-129-pc_Part25.pdf',
          'https://usics-forms.s3.amazonaws.com/i-129/i-129-pc_Part26.pdf',
          'https://usics-forms.s3.amazonaws.com/i-129/i-129-pc_Part27.pdf',
          'https://usics-forms.s3.amazonaws.com/i-129/i-129-pc_Part28.pdf',
          'https://usics-forms.s3.amazonaws.com/i-129/i-129-pc_Part29.pdf',
          'https://usics-forms.s3.amazonaws.com/i-129/i-129-pc_Part30.pdf',
          'https://usics-forms.s3.amazonaws.com/i-129/i-129-pc_Part31.pdf',
          'https://usics-forms.s3.amazonaws.com/i-129/i-129-pc_Part32.pdf',
          'https://usics-forms.s3.amazonaws.com/i-129/i-129-pc_Part33.pdf',
          'https://usics-forms.s3.amazonaws.com/i-129/i-129-pc_Part34.pdf',
          'https://usics-forms.s3.amazonaws.com/i-129/i-129-pc_Part35.pdf',
          'https://usics-forms.s3.amazonaws.com/i-129/i-129-pc_Part36.pdf',
          'https://usics-forms.s3.amazonaws.com/i-129/i-129-pc_Part37.pdf',
          'https://usics-forms.s3.amazonaws.com/i-129/i-129-pc_Part38.pdf',
          'https://usics-forms.s3.amazonaws.com/i-129/i-129-pc_Part39.pdf',
          'https://usics-forms.s3.amazonaws.com/i-129/i-129-pc_Part40.pdf',
          'https://usics-forms.s3.amazonaws.com/i-129/i-129-pc_Part41.pdf',
          'https://usics-forms.s3.amazonaws.com/i-129/i-129-pc_Part42.pdf',
        ];
        this.configForm(i129Pdfs, FormNameConfig.I129);
      } else if (params['name'] == 'i-360') {
        let i360Pdfs = [
          'https://usics-forms.s3.amazonaws.com/i-360/1-i-360.pdf',
          'https://usics-forms.s3.amazonaws.com/i-360/2-i-360.pdf',
          'https://usics-forms.s3.amazonaws.com/i-360/3-i-360.pdf',
          'https://usics-forms.s3.amazonaws.com/i-360/4-i-360.pdf',
          'https://usics-forms.s3.amazonaws.com/i-360/5-i-360.pdf',
          'https://usics-forms.s3.amazonaws.com/i-360/6-i-360.pdf',
          'https://usics-forms.s3.amazonaws.com/i-360/7-i-360.pdf',
          'https://usics-forms.s3.amazonaws.com/i-360/8-i-360.pdf',
          'https://usics-forms.s3.amazonaws.com/i-360/9-i-360.pdf',
          'https://usics-forms.s3.amazonaws.com/i-360/10-i-360.pdf',
          'https://usics-forms.s3.amazonaws.com/i-360/11-i-360.pdf',
          'https://usics-forms.s3.amazonaws.com/i-360/12-i-360.pdf',
          'https://usics-forms.s3.amazonaws.com/i-360/13-i-360.pdf',
          'https://usics-forms.s3.amazonaws.com/i-360/14-i-360.pdf',
          'https://usics-forms.s3.amazonaws.com/i-360/15-i-360.pdf',
          'https://usics-forms.s3.amazonaws.com/i-360/16-i-360.pdf',
          'https://usics-forms.s3.amazonaws.com/i-360/17-i-360.pdf',
          'https://usics-forms.s3.amazonaws.com/i-360/18-i-360.pdf',
          'https://usics-forms.s3.amazonaws.com/i-360/19-i-360.pdf',
        ];
        this.configForm(i360Pdfs, FormNameConfig.I360);
      } else if (params['name'] == 'g-1145') {
        let g1145 = ['https://usics-forms.s3.amazonaws.com/G-1145/G-1145.pdf'];
        this.configForm(g1145, FormNameConfig.G1145);
      } else if (params['name'] == 'i-485') {
        let i485Pdfs = [
          'https://usics-forms.s3.amazonaws.com/i-485/1-i-485-pc.pdf',
          'https://usics-forms.s3.amazonaws.com/i-485/2-i-485-pc.pdf',
          'https://usics-forms.s3.amazonaws.com/i-485/3-i-485-pc.pdf',
          'https://usics-forms.s3.amazonaws.com/i-485/4-i-485-pc.pdf',
          'https://usics-forms.s3.amazonaws.com/i-485/5-i-485-pc.pdf',
          'https://usics-forms.s3.amazonaws.com/i-485/6-i-485-pc.pdf',
          'https://usics-forms.s3.amazonaws.com/i-485/7-i-485-pc.pdf',
          'https://usics-forms.s3.amazonaws.com/i-485/8-i-485-pc.pdf',
          'https://usics-forms.s3.amazonaws.com/i-485/9-i-485-pc.pdf',
          'https://usics-forms.s3.amazonaws.com/i-485/10-i-485-pc.pdf',
          'https://usics-forms.s3.amazonaws.com/i-485/11-i-485-pc.pdf',
          'https://usics-forms.s3.amazonaws.com/i-485/12-i-485-pc.pdf',
          'https://usics-forms.s3.amazonaws.com/i-485/13-i-485-pc.pdf',
          'https://usics-forms.s3.amazonaws.com/i-485/14-i-485-pc.pdf',
          'https://usics-forms.s3.amazonaws.com/i-485/15-i-485-pc.pdf',
          'https://usics-forms.s3.amazonaws.com/i-485/16-i-485-pc.pdf',
          'https://usics-forms.s3.amazonaws.com/i-485/17-i-485-pc.pdf',
          'https://usics-forms.s3.amazonaws.com/i-485/18-i-485-pc.pdf',
          'https://usics-forms.s3.amazonaws.com/i-485/19-i-485-pc.pdf',
          'https://usics-forms.s3.amazonaws.com/i-485/20-i-485-pc.pdf',
        ];
        this.configForm(i485Pdfs, FormNameConfig.I485);
      } else if (params['name'] == 'i-526') {
        let i526Forms = [
          'https://usics-forms.s3.amazonaws.com/i-526/i-526_Part1.pdf',
          'https://usics-forms.s3.amazonaws.com/i-526/i-526_Part2.pdf',
          'https://usics-forms.s3.amazonaws.com/i-526/i-526_Part3.pdf',
          'https://usics-forms.s3.amazonaws.com/i-526/i-526_Part4.pdf',
          'https://usics-forms.s3.amazonaws.com/i-526/i-526_Part5.pdf',
          'https://usics-forms.s3.amazonaws.com/i-526/i-526_Part6.pdf',
          'https://usics-forms.s3.amazonaws.com/i-526/i-526_Part7.pdf',
          'https://usics-forms.s3.amazonaws.com/i-526/i-526_Part8.pdf',
          'https://usics-forms.s3.amazonaws.com/i-526/i-526_Part9.pdf',
          'https://usics-forms.s3.amazonaws.com/i-526/i-526_Part10.pdf',
          'https://usics-forms.s3.amazonaws.com/i-526/i-526_Part11.pdf',
          'https://usics-forms.s3.amazonaws.com/i-526/i-526_Part12.pdf',
          'https://usics-forms.s3.amazonaws.com/i-526/i-526_Part13.pdf',
        ];
        this.configForm(i526Forms, FormNameConfig.I526);
      } else if (params['name'] == 'i-751') {
        this.configForm(FormNameConfig.I751URL, FormNameConfig.I751);
      } else if (params['name'] == 'i-765') {
        let i765Forms = [
          'https://usics-forms.s3.amazonaws.com/i-765/i-765+(1)_Part1.pdf',
          'https://usics-forms.s3.amazonaws.com/i-765/i-765+(1)_Part1.pdf',
          'https://usics-forms.s3.amazonaws.com/i-765/i-765+(1)_Part1.pdf',
          'https://usics-forms.s3.amazonaws.com/i-765/i-765+(1)_Part1.pdf',
          'https://usics-forms.s3.amazonaws.com/i-765/i-765+(1)_Part1.pdf',
          'https://usics-forms.s3.amazonaws.com/i-765/i-765+(1)_Part1.pdf',
          'https://usics-forms.s3.amazonaws.com/i-765/i-765+(1)_Part1.pdf',
        ];
        this.configForm(i765Forms, FormNameConfig.I765);
      } else if (params['name'] == 'i-130') {
        let i130Forms = [
          'https://usics-forms.s3.amazonaws.com/i-130/1-i-130-split.pdf',
          'https://usics-forms.s3.amazonaws.com/i-130/2-i-130-split.pdf',
          'https://usics-forms.s3.amazonaws.com/i-130/3-i-130-split.pdf',
          'https://usics-forms.s3.amazonaws.com/i-130/4-i-130-split.pdf',
          'https://usics-forms.s3.amazonaws.com/i-130/5-i-130-split.pdf',
          'https://usics-forms.s3.amazonaws.com/i-130/6-i-130-split.pdf',
          'https://usics-forms.s3.amazonaws.com/i-130/7-i-130-split.pdf',
          'https://usics-forms.s3.amazonaws.com/i-130/8-i-130-split.pdf',
          'https://usics-forms.s3.amazonaws.com/i-130/9-i-130-split.pdf',
          'https://usics-forms.s3.amazonaws.com/i-130/10-i-130-split.pdf',
          'https://usics-forms.s3.amazonaws.com/i-130/11-i-130-split.pdf',
          'https://usics-forms.s3.amazonaws.com/i-130/12-i-130-split.pdf',
        ];
        this.configForm(i130Forms, FormNameConfig.I130);
      } else if (params['name'] == 'i-140') {
        let i140Pdfs = [
          'https://usics-forms.s3.amazonaws.com/i-140/i-140_Part1.pdf',
          'https://usics-forms.s3.amazonaws.com/i-140/i-140_Part2.pdf',
          'https://usics-forms.s3.amazonaws.com/i-140/i-140_Part3.pdf',
          'https://usics-forms.s3.amazonaws.com/i-140/i-140_Part4.pdf',
          'https://usics-forms.s3.amazonaws.com/i-140/i-140_Part5.pdf',
          'https://usics-forms.s3.amazonaws.com/i-140/i-140_Part6.pdf',
          'https://usics-forms.s3.amazonaws.com/i-140/i-140_Part7.pdf',
          'https://usics-forms.s3.amazonaws.com/i-140/i-140_Part8.pdf',
          'https://usics-forms.s3.amazonaws.com/i-140/i-140_Part9.pdf',
        ];
        this.configForm(i140Pdfs, FormNameConfig.I140);
      } else if (params['name'] == 'I-130a') {
        let i130aForms = [
          'https://usics-forms.s3.amazonaws.com/i-130a/i-130a+1.pdf',
          'https://usics-forms.s3.amazonaws.com/i-130a/i-130a+2.pdf',
          'https://usics-forms.s3.amazonaws.com/i-130a/i-130a+3.pdf',
          'https://usics-forms.s3.amazonaws.com/i-130a/i-130a+4.pdf',
          'https://usics-forms.s3.amazonaws.com/i-130a/i-130a+5.pdf',
          'https://usics-forms.s3.amazonaws.com/i-130a/i-130a+6.pdf',
        ];
        this.configForm(i130aForms, FormNameConfig.I130A);
      } else if (params['name'] == 'i-131') {
        let i131Forms = [
          'https://usics-forms.s3.amazonaws.com/i-131/i-131_Part1.pdf',
          'https://usics-forms.s3.amazonaws.com/i-131/i-131_Part2.pdf',
          'https://usics-forms.s3.amazonaws.com/i-131/i-131_Part3.pdf',
          'https://usics-forms.s3.amazonaws.com/i-131/i-131_Part4.pdf',
          'https://usics-forms.s3.amazonaws.com/i-131/i-131_Part5.pdf',
        ];
        this.configForm(i131Forms, FormNameConfig.I131);
      } else if (params['name'] == 'i-508') {
        let i508Forms = [
          'https://usics-forms.s3.amazonaws.com/i-508/i-508_Part1.pdf',
          'https://usics-forms.s3.amazonaws.com/i-508/i-508_Part2.pdf',
          'https://usics-forms.s3.amazonaws.com/i-508/i-508_Part3.pdf',
          'https://usics-forms.s3.amazonaws.com/i-508/i-508_Part4.pdf',
          'https://usics-forms.s3.amazonaws.com/i-508/i-508_Part5.pdf',
          'https://usics-forms.s3.amazonaws.com/i-508/i-508_Part6.pdf',
        ];
        this.configForm(i508Forms, FormNameConfig.I508);
      } else if (params['name'] == 'i-212') {
        let i212Forms = [
          'https://usics-forms.s3.amazonaws.com/i212/i-212_Part1.pdf',
          'https://usics-forms.s3.amazonaws.com/i212/i-212_Part2.pdf',
          'https://usics-forms.s3.amazonaws.com/i212/i-212_Part3.pdf',
          'https://usics-forms.s3.amazonaws.com/i212/i-212_Part4.pdf',
          'https://usics-forms.s3.amazonaws.com/i212/i-212_Part5.pdf',
          'https://usics-forms.s3.amazonaws.com/i212/i-212_Part6.pdf',
          'https://usics-forms.s3.amazonaws.com/i212/i-212_Part7.pdf',
          'https://usics-forms.s3.amazonaws.com/i212/i-212_Part8.pdf',
          'https://usics-forms.s3.amazonaws.com/i212/i-212_Part9.pdf',
          'https://usics-forms.s3.amazonaws.com/i212/i-212_Part10.pdf',
          'https://usics-forms.s3.amazonaws.com/i212/i-212_Part11.pdf',
        ];
        this.configForm(i212Forms, FormNameConfig.I212);
      } else if (params['name'] == 'i-601') {
        let i601Forms = [
          'https://usics-forms.s3.amazonaws.com/i601/i-601-pc_Part1.pdf',
          'https://usics-forms.s3.amazonaws.com/i601/i-601-pc_Part2.pdf',
          'https://usics-forms.s3.amazonaws.com/i601/i-601-pc_Part3.pdf',
          'https://usics-forms.s3.amazonaws.com/i601/i-601-pc_Part4.pdf',
          'https://usics-forms.s3.amazonaws.com/i601/i-601-pc_Part5.pdf',
          'https://usics-forms.s3.amazonaws.com/i601/i-601-pc_Part6.pdf',
          'https://usics-forms.s3.amazonaws.com/i601/i-601-pc_Part7.pdf',
          'https://usics-forms.s3.amazonaws.com/i601/i-601-pc_Part8.pdf',
          'https://usics-forms.s3.amazonaws.com/i601/i-601-pc_Part9.pdf',
          'https://usics-forms.s3.amazonaws.com/i601/i-601-pc_Part10.pdf',
          'https://usics-forms.s3.amazonaws.com/i601/i-601-pc_Part11.pdf',
          'https://usics-forms.s3.amazonaws.com/i601/i-601-pc_Part12.pdf',
        ];
        this.configForm(i601Forms, FormNameConfig.I601);
      } else if (params['name'] == 'i-612') {
        let i612Forms = [
          'https://usics-forms.s3.amazonaws.com/i612/i-612_Part1.pdf',
          'https://usics-forms.s3.amazonaws.com/i612/i-612_Part2.pdf',
          'https://usics-forms.s3.amazonaws.com/i612/i-612_Part3.pdf',
          'https://usics-forms.s3.amazonaws.com/i612/i-612_Part4.pdf',
          'https://usics-forms.s3.amazonaws.com/i612/i-612_Part5.pdf',
          'https://usics-forms.s3.amazonaws.com/i612/i-612_Part6.pdf',
          'https://usics-forms.s3.amazonaws.com/i612/i-612_Part7.pdf',

        ];
        this.configForm(i612Forms, FormNameConfig.I612);
      }
      else if (params['name'] == 'i-566') {
        let i566Forms = [
          'https://usics-forms.s3.amazonaws.com/i-566/i-566_Part1.pdf',
          'https://usics-forms.s3.amazonaws.com/i-566/i-566_Part2.pdf',
          'https://usics-forms.s3.amazonaws.com/i-566/i-566_Part3.pdf',
          'https://usics-forms.s3.amazonaws.com/i-566/i-566_Part4.pdf',
          'https://usics-forms.s3.amazonaws.com/i-566/i-566_Part5.pdf',
          'https://usics-forms.s3.amazonaws.com/i-566/i-566_Part6.pdf',
          'https://usics-forms.s3.amazonaws.com/i-566/i-566_Part7.pdf',
          'https://usics-forms.s3.amazonaws.com/i-566/i-566_Part8.pdf',

        ];
        this.configForm(i566Forms, FormNameConfig.I566);
      } else if (params['name'] == 'i-485SupA') {
        let i485SupAForms = [
          'https://usics-forms.s3.amazonaws.com/i485SubA/i-485supa-pc_Part1.pdf',
          'https://usics-forms.s3.amazonaws.com/i485SubA/i-485supa-pc_Part2.pdf',
          'https://usics-forms.s3.amazonaws.com/i485SubA/i-485supa-pc_Part3.pdf',
          'https://usics-forms.s3.amazonaws.com/i485SubA/i-485supa-pc_Part4.pdf'

        ];
        this.configForm(i485SupAForms, FormNameConfig.I485SUPA);
      } else if (params['name'] == 'i-485SupJ') {
        let i485SupJForms = [
          'https://usics-forms.s3.amazonaws.com/i485SubJ/i-485supj-pc_Part1.pdf',
          'https://usics-forms.s3.amazonaws.com/i485SubJ/i-485supj-pc_Part2.pdf',
          'https://usics-forms.s3.amazonaws.com/i485SubJ/i-485supj-pc_Part3.pdf',
          'https://usics-forms.s3.amazonaws.com/i485SubJ/i-485supj-pc_Part4.pdf',
          'https://usics-forms.s3.amazonaws.com/i485SubJ/i-485supj-pc_Part5.pdf',
          'https://usics-forms.s3.amazonaws.com/i485SubJ/i-485supj-pc_Part6.pdf',
          'https://usics-forms.s3.amazonaws.com/i485SubJ/i-485supj-pc_Part7.pdf',

        ];
        this.configForm(i485SupJForms, FormNameConfig.I485SUPJ);
      }else if (params['name'] == 'i-864') {
        let i864Forms = [
          'https://usics-forms.s3.amazonaws.com/I-864/i-864-pc_Part1.pdf',
          'https://usics-forms.s3.amazonaws.com/I-864/i-864-pc_Part2.pdf',
          'https://usics-forms.s3.amazonaws.com/I-864/i-864-pc_Part3.pdf',
          'https://usics-forms.s3.amazonaws.com/I-864/i-864-pc_Part4.pdf',
          'https://usics-forms.s3.amazonaws.com/I-864/i-864-pc_Part5.pdf',
          'https://usics-forms.s3.amazonaws.com/I-864/i-864-pc_Part6.pdf',
          'https://usics-forms.s3.amazonaws.com/I-864/i-864-pc_Part7.pdf',
          'https://usics-forms.s3.amazonaws.com/I-864/i-864-pc_Part8.pdf',
          'https://usics-forms.s3.amazonaws.com/I-864/i-864-pc_Part9.pdf',
          'https://usics-forms.s3.amazonaws.com/I-864/i-864-pc_Part10.pdf'
        ];
        this.configForm(i864Forms, FormNameConfig.I864);
      }else if (params['name'] == 'i-944') {
        let i944Forms = [
         'https://usics-forms.s3.amazonaws.com/I-944/i-944-pc_Part1.pdf',
         'https://usics-forms.s3.amazonaws.com/I-944/i-944-pc_Part2.pdf',
         'https://usics-forms.s3.amazonaws.com/I-944/i-944-pc_Part3.pdf',
         'https://usics-forms.s3.amazonaws.com/I-944/i-944-pc_Part4.pdf',
         'https://usics-forms.s3.amazonaws.com/I-944/i-944-pc_Part5.pdf',
         'https://usics-forms.s3.amazonaws.com/I-944/i-944-pc_Part6.pdf',
         'https://usics-forms.s3.amazonaws.com/I-944/i-944-pc_Part7.pdf',
         'https://usics-forms.s3.amazonaws.com/I-944/i-944-pc_Part8.pdf',
         'https://usics-forms.s3.amazonaws.com/I-944/i-944-pc_Part9.pdf',
         'https://usics-forms.s3.amazonaws.com/I-944/i-944-pc_Part10.pdf',
         'https://usics-forms.s3.amazonaws.com/I-944/i-944-pc_Part11.pdf',
         'https://usics-forms.s3.amazonaws.com/I-944/i-944-pc_Part12.pdf',
         'https://usics-forms.s3.amazonaws.com/I-944/i-944-pc_Part13.pdf',
         'https://usics-forms.s3.amazonaws.com/I-944/i-944-pc_Part14.pdf',
         'https://usics-forms.s3.amazonaws.com/I-944/i-944-pc_Part15.pdf',
         'https://usics-forms.s3.amazonaws.com/I-944/i-944-pc_Part16.pdf',
         'https://usics-forms.s3.amazonaws.com/I-944/i-944-pc_Part17.pdf',
         'https://usics-forms.s3.amazonaws.com/I-944/i-944-pc_Part18.pdf',
        ];
        this.configForm(i944Forms, FormNameConfig.I944);
      }
    });
  }

  configForm(pdfs, formName) {
    this.pdfs = pdfs;
    this.formName = formName;
  }
}
