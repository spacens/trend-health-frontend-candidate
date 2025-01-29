import {HttpClient, HttpParams} from "@angular/common/http"
import {inject, Injectable} from "@angular/core"
import {environment} from "src/environments/environment"
import {SearhResInterface} from "../search.model"

@Injectable({
  providedIn: "any",
})
export class SearchService {
  private readonly http = inject(HttpClient)

  searchData(name?: string, color?: string) {
    const params = new HttpParams({
      fromObject: {term: name ?? "", color: color ?? ""},
    })
    return this.http.get<{matches: SearhResInterface[]}>(
      `${environment.baseUrl}/search`,
      {params}
    )
  }
}
