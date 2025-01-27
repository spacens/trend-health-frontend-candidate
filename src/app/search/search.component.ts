import {Component, inject, OnDestroy, OnInit, signal} from "@angular/core"
import {ActivatedRoute, RouterLink} from "@angular/router"
import {SubscriptionHandler} from "../shared/utils/subscription-handler"
import {SearchService} from "./data-access/service/search.service"
import {SearchFormComponent} from "./ui/search-form.component"
import {SearhResInterface} from "./data-access/search.model"
import {PAGE_PATH} from "../app-routing.module"

@Component({
  selector: "app-search",
  standalone: true,
  imports: [SearchFormComponent, RouterLink],
  providers: [SearchService],
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute)
  private readonly searchService = inject(SearchService)
  readonly pagePath = PAGE_PATH
  readonly message = signal("")
  readonly data = signal<SearhResInterface[] | []>([])

  subs = new SubscriptionHandler()

  constructor() {}

  ngOnInit(): void {
    this.getResults()
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  getResults() {
    this.subs.add = this.route.queryParams.subscribe((params) => {
      if (params["name"] || params["color"]) {
        this.subs.add = this.searchService
          .searchData(params["name"], params["color"])
          .subscribe({
            next: (data) => {
              this.data.set(data.matches)
            },
            error: (err) => {
              this.message.set(err?.error?.error || err?.message)
            },
          })
      }
    })
  }
}
