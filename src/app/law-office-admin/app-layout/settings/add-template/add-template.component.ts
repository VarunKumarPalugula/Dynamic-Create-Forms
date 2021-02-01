import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '@app/law-office-admin/admin.service';
import { CommonService } from '@app/shared/service/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-template',
  templateUrl: './add-template.component.html',
  styleUrls: ['./add-template.component.scss'],
})
export class AddTemplateComponent implements OnInit {
  templateParentSections: any;
  sectionsData: any;
  sectionsDataforEdit: any;
  addTemplate: FormGroup;
  finalSetArray = [];
  isCollapsed = false;
  editTemplateTitle: any;
  isAddMode: boolean = true
  deleteTemplate: any;
  deleteTemplateTitle: string;
  templateTitleForDelete: any
  templateFilingTypeForDelete: any
  filingTypes: any;
  constructor(
    private commonService: CommonService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private toaster: ToastrService,
    private router: Router,
    private route:ActivatedRoute,
    private modalService: NgbModal,
    private adminService: AdminService,
  ) {}

  ngOnInit(): void {
    this.addTemplateBuildForm();
    this.getUiControlSections();
    this.editTemplateTitle = this.route.snapshot.paramMap.get('id');
    if(this.editTemplateTitle) {
      this.getTemplates()
      this.isAddMode = false
    }
    this.GetFillingTypes();
  }
  addTemplateBuildForm() {
    this.addTemplate = this.fb.group({
      templateName: ['', Validators.required],
      filingType: ['', Validators.required],
    });
  }
  getUiControlSections() {
    this.spinner.show();
    this.commonService.getUiControlSections().subscribe((res: any) => {
      this.templateParentSections = res['Templates'];
      this.spinner.hide();
    });
  }
  templateTitle(templateTitle) {
    this.spinner.show();
    if(this.editTemplateTitle) {
      this.getTemplates()
    } 
    else {
    this.commonService.getTeplatesDatabyTemplate(templateTitle).subscribe((res: any) => {
      this.sectionsData = res['Templates'];
      this.spinner.hide();
    });
  }
  }
  selectAllFields(templateTitle, value) {
    let index = this.sectionsData.findIndex((res) => res.SubSection == templateTitle);
    this.sectionsData[index]['SubSectionTemplateData'][templateTitle].forEach((element) => {
      if (value) {
        element.selected = true;
        element.Active = true;
      } else {
        element.Active = true;
        element.selected = false;
      }
    });
  }
  singleSelect(templateTitle, value, k) {
    let selectAll = true;
    let index = this.sectionsData.findIndex((res) => res.SubSection == templateTitle);
    this.sectionsData[index]['SubSectionTemplateData'][templateTitle].forEach((element, index) => {
      if (index == k && value) {
        element.Active = true;
      } else if(index == k && !value) {
        element.Active = false;
      }
      if(element.Active == false) {
        selectAll = false
      }
    });
    this.sectionsData[index]['ActiveFlag'] = selectAll
  }
  onSubmit() {
    for (let i = 0; i < this.sectionsData.length; i++) {
      let finalArray = {
        OrgId: sessionStorage.getItem('OrganisationID'),
        AdminId: sessionStorage.getItem('LoguserId'),
        DisplayTemplateTitle: this.addTemplate.value.templateName,
        Section: this.sectionsData[i].Section,
        SubSection: this.sectionsData[i].SubSection,
        FilingType: this.addTemplate.value.filingType,
        subsectiontemplatedata: this.sectionsData[i].SubSectionTemplateData,
      };
      this.finalSetArray.push(finalArray);
    }
    this.commonService.saveTemplateOptions(this.isAddMode,this.finalSetArray).subscribe((res: any) => {
      this.toaster.info(res['Message']);
      this.router.navigate(['/admin/settings']);
    });
  }
  deleteTemplateBytempTitle() {
    this.commonService.deleteTemplate(sessionStorage.getItem('OrganisationID'), this.templateTitleForDelete, this.templateFilingTypeForDelete ).subscribe(
      (res: any) => {
        this.modalService.dismissAll();
        this.toaster.info(res['Message']);
      this.router.navigate(['/admin/settings']);
      },
      (err) => {
        this.toaster.error('Error Occured');
      }
    )
  }

  getTemplates() {
    this.spinner.hide();
    this.commonService.getSavedTemplates(sessionStorage.getItem('OrganisationID')).subscribe(
      (res: any) => {
        res;
        let arrays = res.reduce(function(a, e) {
          let estKey = (e['DisplayTemplateTitle']); 
          (a[estKey] ? a[estKey] : (a[estKey] = null || [])).push(e);
          return a;
        }, {});
        this.sectionsData = res.filter(x=> x.DisplayTemplateTitle == this.editTemplateTitle)
        console.log(this.sectionsData);
        
        this.addTemplate.patchValue({
          templateName: this.sectionsData[0]['DisplayTemplateTitle'],
          filingType: this.sectionsData[0]['FilingType']
        })
        console.log(this.addTemplate.value);
        
      } 
    )
  }

  confirmDeteleteTemplate(popup: any,templateTitle: any,templateFilingType: any) {
    this.templateTitleForDelete = templateTitle;
    this.templateFilingTypeForDelete = templateFilingType
    this.deleteTemplate = this.modalService.open(popup, { centered: true, keyboard: false, backdrop: 'static', });
  }
  cancelDeteleteTemplate(value: string) {
    this.deleteTemplate.close(value);
  }

  //Get Fillings
  GetFillingTypes() {
    this.spinner.show();
    this.adminService.GetFilings().subscribe(
      (res: any[]) => {
        this.spinner.hide();
        this.filingTypes = res;
      },
      (err) => {
        this.spinner.hide();
        this.toaster.error('Error Occured');
      }
    );
  }
}
