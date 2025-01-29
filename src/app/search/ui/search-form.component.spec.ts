import {ComponentFixture, TestBed} from "@angular/core/testing"
import {SearchFormComponent} from "./search-form.component"
import {ActivatedRoute, Router} from "@angular/router"
import {ReactiveFormsModule} from "@angular/forms"
import {of} from "rxjs"

describe("SearchFormComponent", () => {
  let component: SearchFormComponent
  let fixture: ComponentFixture<SearchFormComponent>
  let mockRouter = jasmine.createSpyObj("Router", ["navigate"])
  let mockActivatedRoute = {
    queryParams: of({name: "test", color: "red"}),
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, SearchFormComponent],
      providers: [
        {provide: Router, useValue: mockRouter},
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })

  it("should initialize form with query parameters", () => {
    expect(component.searchForm.value).toEqual({name: "test", color: "red"})
  })

  it("should update query params on form submission", () => {
    component.searchForm.setValue({name: "newName", color: "blue"})
    component.submit()

    expect(mockRouter.navigate).toHaveBeenCalledWith(["."], {
      relativeTo: mockActivatedRoute,
      queryParams: {name: "newName", color: "blue"},
      queryParamsHandling: "merge",
    })
  })

  it("should reset the form when clear button is clicked", () => {
    component.searchForm.setValue({name: "test", color: "red"})
    component.searchForm.reset()
    expect(component.searchForm.value).toEqual({name: null, color: null})
  })
})
