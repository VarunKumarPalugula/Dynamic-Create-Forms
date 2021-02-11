import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  billingObj = {
    firstName: "Gabriel",
    lastName:"Jackson",
    email: "gbrielJackson@yahoo.com",
    cardNumber: 9999-1111-2222-3333,
    expirationDate: "12/21",
    securityCode: "010",
    contryOrReg: "UnitedStates",
    zipOrpostal: 999001,
    billingHistory:[
    {
      date: "02/14/2021",
      description: "BusinessPlan - Annual Billing",
      amount: "USD $ 99.99",
      status: "success", 
    },
    {
      date: "02/14/2021",
      description: "BusinessPlan - Annual Billing",
      amount: "USD $ 99.99",
      status: "success", 
    },
    {
      date: "02/14/2021",
      description: "BusinessPlan - Annual Billing",
      amount: "USD $ 99.99",
      status: "success", 
    },
    {
      date: "02/14/2021",
      description: "BusinessPlan - Annual Billing",
      amount: "USD $ 99.99",
      status: "success", 
    },
    {
      date: "02/14/2021",
      description: "BusinessPlan - Annual Billing",
      amount: "USD $ 99.99",
      status: "success", 
    },

    ]
  }
  billingDetails;
  constructor() { }

  ngOnInit(): void {
    this.billingDetails = this.billingObj;
  }

}
