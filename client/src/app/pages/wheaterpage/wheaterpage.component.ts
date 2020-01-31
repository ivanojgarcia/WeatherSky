import { Component, OnInit, OnDestroy } from "@angular/core";
import { Apollo } from 'apollo-angular';
import { DataCountries, DataCountry } from '../../type';
import { map } from 'rxjs/operators';
import { ALL_COUNTRIES, GET_COUNTRY } from '../../graphql';


@Component({
  selector: "app-wheaterpage",
  templateUrl: "wheaterpage.component.html"
})
export class WheaterpageComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  countries : any = [];
  country : any = [];
  showData : boolean
  loadButtons : boolean
  time : any;
  date : any;
  wheater : any = {};
  loadData : boolean;
  constructor(private apollo: Apollo) {}

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("profile-page");

    this.showData = false;
    this.loadData = false;
    this.loadButtons = true;

    this.apollo.watchQuery({
       query: ALL_COUNTRIES
     }).valueChanges
     .pipe(map(result => <DataCountries>result.data))
     .subscribe((countries) => {
       this.countries = countries.getAllCountries;
       this.loadButtons = false
     })

  }
  getDataCountry(code) {
    this.loadData = true;
    this.showData = false
    this.apollo.watchQuery({
      query: GET_COUNTRY,
      variables: {
        code
      }
    }).valueChanges.pipe(map(result => <DataCountry> result.data)) .subscribe((country) => {
      this.country = country.getCountry;
      let now = new Date();
      this.date = now.getDate() + '-' + ( now.getMonth() + 1 ) + '-' + now.getFullYear();
      this.time = now.getHours() + ':' + now.getMinutes();
     });
     setTimeout(() => { this.loadData = false; this.showData = true; }, 1500);
    }
  clearData() {
    this.showData = false;
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("profile-page");
  }
}
