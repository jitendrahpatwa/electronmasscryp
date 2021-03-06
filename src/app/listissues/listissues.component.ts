import { Component, OnInit } from '@angular/core';
import {  Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { ProjectService } from '../service/project/project.service';
import { DatastoreService } from '../service/datastore/datastore.service';

import * as _ from 'lodash';
@Component({
  selector: 'app-listissues',
  templateUrl: './listissues.component.html',
  styleUrls: ['./listissues.component.css'],
  providers:[ProjectService,DatastoreService]
})
export class ListissuesComponent implements OnInit {

  public ngxloading = false;

  appName:string;
  appID:string;
  appImage:string;
  appKey:string;

  applistsusers:any;
  showapplistsusers:number = 1;

  appDBNAMEURL:string;
  appDBIMAGEURL:string;

  constructor(
    public projectServ:ProjectService,
    public router:Router,
    public datastoreServ:DatastoreService,
  ) {

  }

  ngOnInit() {
    this.ngxloading = true;
    // this.projectServ.letsIssuing("18testbcdef@mail.com",location.href,"myFunc()","Some issues have taken");
    this.loadData();

    
  }

  loadData(){

    this.appKey = this.datastoreServ.retrieveFromLocal("IssuerAppProjectKey");
    this.appName = this.datastoreServ.retrieveFromLocal("IssuerAppProjectName");
    this.appID = this.datastoreServ.retrieveFromLocal("IssuerAppProjectID");
    this.appImage = this.datastoreServ.retrieveFromLocal("IssuerAppProjectPic");
    
    this.appDBNAMEURL = this.datastoreServ.retrieveFromLocal("IssuerAppProjectDBNAMEURL");
    this.appDBIMAGEURL = this.datastoreServ.retrieveFromLocal("IssuerAppProjectDBIMAGEURL");

    this.retrieve();
  }

  retrieve(){
    this.projectServ.retireveDBNAMEDetails(this.appDBNAMEURL)
    .then(
      d=>{
        // console.log(d)
        this.ngxloading = false;
        this.applistsusers = d;
        this.showapplistsusers = 0;
      },
      e=>{
        // console.log(e)
        this.ngxloading = false;
        this.raiseErrorView();
      }
    ).catch(
      e=>{
        // console.log(e)
        this.ngxloading = false;
        this.raiseErrorView();
      }
    );
  }
  

  raiseErrorView(){
    this.showapplistsusers = 1;
    setTimeout(()=>{
      this.showapplistsusers = 2;
    },2500);
  }

  openIssueByUser(u){
    // console.log(u)
    this.datastoreServ.saveToLocal("IssuerAppProjectToSeeUserID",u.id);
    this.router.navigate(["/listsbyuser"]);
  }

}