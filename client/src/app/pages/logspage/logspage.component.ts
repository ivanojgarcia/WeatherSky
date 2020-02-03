import { Component, OnInit, OnDestroy } from "@angular/core";
import { Apollo } from 'apollo-angular';
import { LogsError, ErrorLogs } from '../../type';
import { map } from 'rxjs/operators';
import { ALL_ERROR_LOGS } from '../../graphql';

@Component({
  selector: "app-logspage",
  templateUrl: "logspage.component.html"
})
export class LogspageComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  loadButtons : boolean = false;
  logs : any;
  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo.watchQuery({
      query: ALL_ERROR_LOGS
    }).valueChanges
    .pipe(map(result => <LogsError>result.data))
    .subscribe((errorsLogs) => {
      this.logs = errorsLogs.getAllErrors;
      console.log(this.logs)
    })
      
  }
  ngOnDestroy() {
  }
}
