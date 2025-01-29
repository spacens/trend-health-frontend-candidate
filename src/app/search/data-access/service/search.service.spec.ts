import {TestBed} from "@angular/core/testing"
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing"
import {SearchService} from "./search.service"
import {environment} from "src/environments/environment"

describe("SearchService", () => {
  let service: SearchService
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchService],
    })
    service = TestBed.inject(SearchService)
    httpMock = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpMock.verify()
  })

  it("should be created", () => {
    expect(service).toBeTruthy()
  })

  it("should call searchData with correct parameters", () => {
    const mockResponse = {matches: [{id: "1", name: "Test Name"}]}
    const name = "test"
    const color = "red"

    service.searchData(name, color).subscribe((res) => {
      expect(res).toEqual(mockResponse)
    })

    const req = httpMock.expectOne(
      `${environment.baseUrl}/search?term=${name}&color=${color}`
    )
    expect(req.request.method).toBe("GET")
    req.flush(mockResponse)
  })

  it("should handle empty parameters correctly", () => {
    const mockResponse = {matches: []}

    service.searchData().subscribe((res) => {
      expect(res).toEqual(mockResponse)
    })

    const req = httpMock.expectOne(`${environment.baseUrl}/search?term=&color=`)
    expect(req.request.method).toBe("GET")
    req.flush(mockResponse)
  })
})
