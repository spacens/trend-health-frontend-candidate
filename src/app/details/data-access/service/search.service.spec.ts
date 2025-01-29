import {TestBed} from "@angular/core/testing"
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing"
import {environment} from "src/environments/environment"
import {SearchDetailResInterface} from "../search.model"
import {SearchDetailService} from "./search.service"

describe("SearchDetailService", () => {
  let service: SearchDetailService
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchDetailService],
    })
    service = TestBed.inject(SearchDetailService)
    httpMock = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpMock.verify()
  })

  it("should be created", () => {
    expect(service).toBeTruthy()
  })

  it("should fetch data correctly", () => {
    const mockResponse: SearchDetailResInterface = {
      id: 1,
      name: "Test Name",
      favorite_color: "blue",
      quotes: {
        "73": [
          "The pen is mightier than the sword.",
          "Actions speak louder than words.",
          "Speak softly, and carry a big stick.",
        ],
        "6": [
          "People who think they know everything" +
            " annoy those of us who do.",
        ],
      },
    }
    const id = "1"

    service.getData(id).subscribe((res) => {
      expect(res).toEqual(mockResponse)
    })

    const req = httpMock.expectOne(`${environment.baseUrl}/details/${id}`)
    expect(req.request.method).toBe("GET")
    req.flush(mockResponse)
  })
})
