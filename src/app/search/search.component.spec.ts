import {ComponentFixture, TestBed} from "@angular/core/testing"
import {SearchComponent} from "./search.component"
import {ActivatedRoute} from "@angular/router"
import {SearchService} from "./data-access/service/search.service"
import {Observable, of} from "rxjs"
import {HttpClientTestingModule} from "@angular/common/http/testing"
import {MockData} from "./data-access/mock.data"

describe("SearchComponent", () => {
  let component: SearchComponent
  let fixture: ComponentFixture<SearchComponent>
  let mockActivatedRoute: {
    queryParams: Observable<{name?: string; color?: string}>
  }
  let mockSearchService: any

  beforeEach(async () => {
    mockSearchService = {
      searchData: jasmine.createSpy("searchData").and.returnValue(
        of({
          matches: Object.values(MockData),
        })
      ),
    }

    await TestBed.configureTestingModule({
      imports: [SearchComponent, HttpClientTestingModule],
      providers: [
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
        {provide: SearchService, useValue: mockSearchService},
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({name: "", color: "blue"}), // Mock query parameter
          },
        },
      ],
    }).compileComponents()

    mockActivatedRoute = TestBed.inject(ActivatedRoute)

    fixture = TestBed.createComponent(SearchComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  afterEach(() => {
    fixture.destroy()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })

  it("should call get results function on init", () => {
    spyOn(component, "getResults")
    component.ngOnInit()
    expect(component.getResults).toHaveBeenCalledTimes(1)
  })

  it("should check for route params", () => {
    mockActivatedRoute.queryParams.subscribe((params) => {
      expect(params).toEqual({name: "", color: "blue"})
    })
  })

  it("should set data signal with the default empty array", () => {
    expect(component.data()).toEqual([])
  })

  it("should unsubscribe from subscriptions on ngOnDestroy", () => {
    spyOn(component.subs, "unsubscribe")
    component.ngOnDestroy()
    expect(component.subs.unsubscribe).toHaveBeenCalled()
  })
})
