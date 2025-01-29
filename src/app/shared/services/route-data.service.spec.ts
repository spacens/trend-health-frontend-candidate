import {TestBed} from "@angular/core/testing"
import {RouteDataService, RouteInterface} from "./route-data.service"

describe("RouteDataService", () => {
  let service: RouteDataService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(RouteDataService)
  })

  it("should be created", () => {
    expect(service).toBeTruthy()
  })

  it("should update route data correctly", () => {
    const mockRoute: RouteInterface = {name: "Test Route", color: "Blue"}
    service.updateRoute = mockRoute

    service.currentRoute.subscribe((data) => {
      expect(data).toEqual(mockRoute)
    })
  })

  it("should have initial empty route data", () => {
    service.currentRoute.subscribe((data) => {
      expect(data).toEqual({name: "", color: ""})
    })
  })
})
