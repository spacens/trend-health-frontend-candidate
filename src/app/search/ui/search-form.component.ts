import {Component, inject, OnInit} from "@angular/core"
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms"
import {ActivatedRoute, Router} from "@angular/router"
import {SubscriptionHandler} from "src/app/shared/utils/subscription-handler"

@Component({
  selector: "app-search-form",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./search-form.component.html",
  styleUrl: "./search-form.component.scss",
})
export class SearchFormComponent implements OnInit {
  private readonly route = inject(ActivatedRoute)
  private readonly router = inject(Router)

  subs = new SubscriptionHandler()

  searchForm = new FormGroup({
    name: new FormControl(""),
    color: new FormControl(""),
  })

  get name() {
    return this.searchForm.get("name")
  }

  get color() {
    return this.searchForm.get("color")
  }

  ngOnInit(): void {
    this.subs.add = this.route.queryParams.subscribe((params) => {
      if (params["name"] || params["color"]) {
        this.searchForm.patchValue({
          name: params["name"],
          color: params["color"],
        })
      }
    })
  }

  submit() {
    if (this.searchForm.invalid) return
    this.router.navigate(["."], {
      relativeTo: this.route,
      queryParams: {
        name: this.name.value,
        color: this.color.value,
      },
      queryParamsHandling: "merge",
    })
  }
}
