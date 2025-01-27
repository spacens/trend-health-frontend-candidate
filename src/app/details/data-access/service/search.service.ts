import {HttpClient, HttpParams} from "@angular/common/http"
import {inject, Injectable} from "@angular/core"
import {environment} from "src/environments/environment"
import {SearchDetailResInterface} from "../search.model"

@Injectable({
  providedIn: "any",
})
export class SearchDetailService {
  private readonly http = inject(HttpClient)

  getData(id: string) {
    return this.http.get<SearchDetailResInterface>(
      `${environment.baseUrl}/details/${id}`
    )
  }
}
