import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
  keys = []
  results = [];  
  constructor(
  ) { }
  
  organizations = {
          "montana": {
              "id":"montana",
              "logging": "Yes", 
              "name": "Montana State University",
              "irName": "ScholarWorks",
              "irType": "dspace",
              "image": "assets/img/montana.jpg",
              "snippet": "ScholarWorks is an open access institutional repository for the capture of the intellectual work of Montana State University.",
              "urls": ["http://scholarworks.montana.edu/", "https://scholarworks.montana.edu/"]
            },
           "new_mexico":{
               "id":"new_mexico",
               "logging": "Yes", 
               "name": "University of New Mexico",
               "irName": "Lobo Vault",
               "irType": "dspace",
               "image": "assets/img/new_mexico.jpg",
               "snippet": "LoboVault is UNM's Institutional Repository. It hosts scholarly publications from UNM faculty, graduate student theses and dissertations, UNM administrative records, and more.",
               "urls": ["https://repository.unm.edu/", "http://repository.unm.edu/"]
           },
           "mcmaster":{
               "id":"mcmaster",
               "logging": "Yes", 
               "name": "McMaster University",
               "irName": "MacSphere",
               "irType": "dspace",
               "image": "assets/img/mcmaster.jpg",
               "snippet": "MacSphere is McMaster University’s Institutional Repository (IR). The research and scholarly output included in MacSphere has been selected and deposited by the individual university departments and centres on campus.",
               "urls": ["https://repository.unm.edu/", "http://repository.unm.edu/"]
           },
           "md_soar":{
               "id":"md_soar",
               "logging": "Yes", 
               "name": "University of Maryland",
               "irName": "MDSOAR",
               "irType": "dspace",
               "image": "assets/img/mdsoar_logo.png",
               "snippet": "MD-SOAR is a shared digital repository platform for eleven colleges and universities in Maryland. It is jointly governed by all participating libraries, who have agreed to share policies and practices that are necessary and appropriate for the shared platform.",
               "urls": ["https://repository.unm.edu/", "http://repository.unm.edu/"]
           },
           "texas_am":{
               "id":"texas_am",
               "logging": "Yes", 
               "name": "Taxas A&M",
               "irName": "OAKTrust digital repository",
               "irType": "dspace",
               "image": "assets/img/Sec_Square_Maroon.png",
               "snippet": "The OAKTrust digital repository at Texas A&M is a digital service that collects, preserves, and distributes the scholarly output of the University. The repository facilitates open access scholarly communication while preserving the scholarly legacy of the Texas A&M community.",
               "urls": ["https://repository.unm.edu/", "http://repository.unm.edu/"]
           },
           "colorado":{
               "id":"colorado",
               "logging": "Yes", 
               "name": "Colorado State University",
               "irName": "Digital Collections of Colorado",
               "irType": "dspace",
               "image": "assets/img/RAM-CSU.png",
               "snippet": "The Digital Collections of Colorado is a digital service that collects, preserves and distributes digital material provided by a group of Colorado institutions for digital preservation and scholarly communication.",
               "urls": ["https://repository.unm.edu/", "http://repository.unm.edu/"]
           },
           "um":{
               "id":"um",
               "logging": "Yes", 
               "name": "University of Michagan",
               "irName": "MDSOAR",
               "irType": "dspace",
               "image": "assets/img/dblogo200px.png",
               "snippet": "Deep Blue is the University of Michigan's institutional repository service. It preserves and provides access to the research and creative work done by our faculty, staff, and students.",
               "urls": ["https://repository.unm.edu/", "http://repository.unm.edu/"]
           },
           "calgary":{
               "id":"calgary",
               "logging": "Yes", 
               "name": "University of Calgary",
               "irName": "PRISM",
               "irType": "dspace",
               "image": "assets/img/logo_university-of-calgary.png",
               "snippet": "PRISM: University of Calgary’s Digital Repository is used to manage, preserve and make available the academic works of faculty, students and research groups. The collection includes faculty publications, masters and doctoral theses, and research output from across Southern Alberta.",
               "urls": ["https://repository.unm.edu/", "http://repository.unm.edu/"]
           }
  };
  
  getOrganizationsList() {
      this.keys = Object.keys(this.organizations);
      for (let key of this.keys){
          console.log(this.organizations[key]);
          this.results.push(this.organizations[key]);
      }
      return this.results;
  }
  
  getOrganizationData(id) {
      return this.organizations[id];
  }
  
}
