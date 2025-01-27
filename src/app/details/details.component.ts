import {Component, inject, OnInit, signal} from "@angular/core"
import {SearchDetailService} from "./data-access/service/search.service"
import {ActivatedRoute, RouterLink} from "@angular/router"
import {catchError, Observable, of, switchMap} from "rxjs"
import {SearchDetailResInterface} from "./data-access/search.model"
import {AsyncPipe} from "@angular/common"
import {SubscriptionHandler} from "../shared/utils/subscription-handler"

@Component({
  selector: "app-details",
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"],
})
export class DetailsComponent implements OnInit {
  private readonly searchDetailService = inject(SearchDetailService)
  private readonly route = inject(ActivatedRoute)
  readonly message = signal("")
  userDetails$: Observable<SearchDetailResInterface | string> =
    this.route.params.pipe(
      switchMap((res) => {
        return this.searchDetailService.getData(res["id"])
      }),
      catchError((err) => {
        this.message.set(err?.message || err?.error?.message)
        return of(err?.message || err?.error?.message)
      })
    )

  subs = new SubscriptionHandler()
  constructor() {}

  ngOnInit(): void {}

  // Helper function to sort keys in descending order
  getSortedKeys(quotes: Record<string, string[]>): string[] {
    return Object.keys(quotes).sort((a, b) => Number(b) - Number(a)) // Sort keys numerically in descending order
  }
}
