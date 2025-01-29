import {Component, inject, OnDestroy, signal} from "@angular/core"
import {SearchDetailService} from "./data-access/service/search.service"
import {ActivatedRoute, Router, RouterLink} from "@angular/router"
import {catchError, Observable, of, switchMap} from "rxjs"
import {SearchDetailResInterface} from "./data-access/search.model"
import {AsyncPipe} from "@angular/common"
import {SubscriptionHandler} from "../shared/utils/subscription-handler"
import {RouteDataService} from "../shared/services/route-data.service"

@Component({
  selector: "app-details",
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"],
})
export class DetailsComponent implements OnDestroy {
  private readonly searchDetailService = inject(SearchDetailService)
  private readonly routeDataService = inject(RouteDataService)
  private readonly router = inject(Router)
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

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  goBackWithParams() {
    this.subs.add = this.routeDataService.currentRoute.subscribe({
      next: ({name, color}) => {
        if (name || color) {
          this.router.navigate(["/"], {
            queryParams: {...(name && {name}), ...(color && {color})},
            queryParamsHandling: "merge",
          })
        } else {
          this.router.navigate(["/"])
        }
      },
    })
  }

  // Helper function to sort keys in descending order
  getSortedKeys(quotes: Record<string, string[]>): string[] {
    return Object.keys(quotes).sort((a, b) => Number(b) - Number(a)) // Sort keys numerically in descending order
  }
}
