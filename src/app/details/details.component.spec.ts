import {ComponentFixture, TestBed} from "@angular/core/testing"
import {DetailsComponent} from "./details.component"
import {SearchDetailService} from "./data-access/service/search.service"
import {ActivatedRoute} from "@angular/router"
import {of} from "rxjs"
import {SearchDetailResInterface} from "./data-access/search.model"
import {AsyncPipe} from "@angular/common"
import {RouterTestingModule} from "@angular/router/testing"

describe("DetailsComponent", () => {
  let component: DetailsComponent
  let fixture: ComponentFixture<DetailsComponent>
  let mockSearchDetailService: jasmine.SpyObj<SearchDetailService>
  let mockActivatedRoute

  beforeEach(async () => {
    mockSearchDetailService = jasmine.createSpyObj("SearchDetailService", [
      "getData",
    ])
    mockActivatedRoute = {
      params: of({id: "1"}),
    }

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, AsyncPipe, DetailsComponent],
      providers: [
        {provide: SearchDetailService, useValue: mockSearchDetailService},
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComponent)
    component = fixture.componentInstance
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })

  it("should fetch user details successfully", () => {
    const mockResponse: SearchDetailResInterface = {
      id: 1,
      name: "John Doe",
      favorite_color: "Blue",
      quotes: {"5": ["Great quote!"]},
    }
    mockSearchDetailService.getData.and.returnValue(of(mockResponse))

    fixture.detectChanges()

    component.userDetails$.subscribe((data) => {
      expect(data).toEqual(mockResponse)
    })
  })

  it("should sort quote keys in descending order", () => {
    const quotes = {"1": ["Test1"], "10": ["Test10"], "5": ["Test5"]}
    const sortedKeys = component.getSortedKeys(quotes)
    expect(sortedKeys).toEqual(["10", "5", "1"])
  })
})
