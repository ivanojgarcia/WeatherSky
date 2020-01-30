import { Component, OnInit, OnDestroy } from "@angular/core";
import { Apollo } from 'apollo-angular';
import { Country, Query } from '../../type';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';
import { ALL_COUNTRIES, GET_COUNTRY, GET_WHEATER, AllLinkQueryResponse } from '../../graphql';


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
  constructor(private apollo: Apollo) {}

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("profile-page");

    this.showData = false;
    this.loadButtons = true;

    // this.allCountries = this.apollo.watchQuery<Query>({
    //   query: gql`
    //     query {
    //       getAllCountries{
    //           id
    //           name
    //           code
    //           latitud
    //           longitude
    //           }
    //       }
    //   `
    // }).valueChanges
    // .pipe(
    //   map(result => result.data.getAllCountries)
    // );

    this.apollo.watchQuery({
      query: ALL_COUNTRIES
    }).valueChanges.subscribe((response) => {
      // 5
      this.countries = response.data;
      this.loadButtons = false;
     });

  }
  getDataCountry(code) {
    this.apollo.watchQuery({
      query: GET_COUNTRY,
      variables: {
        code
      }
    }).valueChanges.subscribe((response) => {
      // 5
      this.country = response.data;
      let tmpDate = new Date();
      let now = Math.floor(+new Date()/1000)
      this.apollo.watchQuery({
        query: GET_WHEATER,
        variables: {
          latitud: parseFloat(response.data.getCountry.latitud),
          longitude: parseFloat(response.data.getCountry.longitude),
          time: now,
        }
      }).valueChanges.subscribe((res) => {
        this.wheater = res.data;
        console.log(res.data)
      })
     });
     this.showData = true;
    }
  clearData() {
    this.showData = false;
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("profile-page");
  }
}
