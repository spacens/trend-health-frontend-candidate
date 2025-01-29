import {Injectable} from "@angular/core"
import {BehaviorSubject} from "rxjs"

export interface RouteInterface {
  name: string
  color: string
}

@Injectable({
  providedIn: "root",
})
export class RouteDataService {
  private readonly routeData = new BehaviorSubject({name: "", color: ""})

  set updateRoute(payload: RouteInterface) {
    this.routeData.next(payload)
  }

  get currentRoute() {
    return this.routeData
  }
}
