# Ngconf-Pagination Library

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.5.
> ![ngconf-pagination](https://img.icons8.com/flat_round/48/000000/wide-long-left-arrow.png "Prev Page")  1 of 5 ![ngconf-pagination](https://img.icons8.com/flat_round/48/000000/wide-long-right-arrow.png "Next Page") Pagination Feature with search functionality for Angular.  

### Latest Release: 
Now we added support for special characters search by removing them from search index process for better results. 
### Demo Link   
[Stackblitz Demo](https://stackblitz.com/edit/ngconf-pagination "ngconf-pagination Demo") 

## Step - 1

> npm i ngconf-pagination --save  
[NPM Package Link](https://www.npmjs.com/package/ngconf-pagination "ngconf-pagination")  

## Step - 2  
Import NgconfPaginationModule in app.module.ts file.  

**app.module.ts**
```typescript
import {NgconfPaginationModule} from 'ngconf-pagination';
 imports: [
    BrowserModule,
    AppRoutingModule,
    NgconfPaginationModule,
    HttpClientModule
  ]
```

## Step - 3
This step is to quick start the usage of package later with the understanding of workflow you can  
modify the code. You can have a look in our stackbliz demo for more clarity. Json typicode dummy data api is used to show that this package can handle asynchronous data.
**app.component.ts**
```typescript
  tableArray:Array<any> = [];
  currentPage:any = 1;
  itemsPerPage:any = 10;
  totalPage:any = 0;
  term:any = "";
  prop:any = "";
  constructor(private http: HttpClient){

  } 
  ngOnInit(){
  this.http.get("https://jsonplaceholder.typicode.com/comments")
  .subscribe(res => {
     let temp:any = res;
     this.tableArray = temp;
  });
    
  }
```
**app.component.html**
```html
  <input type="text" [(ngModel)]="term" [value]="term" placeholder="Search">
  <br>
  <label class="mt-3" for="fill">Searh Based On:</label>
  <select class="ml-2" [(ngModel)]="prop" id="fill">
    <option  value="" selected>All</option>
    <option value="id">ID</option>
    <option value="name">Name</option>
    <option value="email">Email</option>
    <option value="body">Body</option>
  </select>
  <div class="table-responsive" *ngIf="tableArray.length > 0">
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Body</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of tableArray  | paginator: { elementsPerPage: itemsPerPage, currentPage: currentPage,searchTerm: term, prop: prop  } " >
          <th scope="row">{{item.id}}</th>
          <td>{{item.name}}</td>
          <td>{{item.email}}</td>
          <td>{{item.body}}</td>
        </tr>
        
      </tbody>
    </table>
  </div>
<pagination-controls *ngIf="term == ''" (pageChange)="currentPage = $event" [controls]="{currentPage: currentPage,itemsPerPage: itemsPerPage,dataLength: tableArray.length  }"></pagination-controls>
```

## Explanation on paginator pipe inputs 
1 **elementsPerPage** this input is used to specify the items per page like 10,5 and 20 etc to divide the data.  
2 **currentPage** This input is used to specify the current page so that accordingly pipe transforms the data.  
3 **searchTerm** This input is used to take user search input and show the results by applying it on the data.  
4. **prop** This input property is used to take specific table field to search.It can be left with empty string to search on all fields.   
Structure of the configuration interface for reference.
```typescript
export interface opt {
  elementsPerPage: Number;
  currentPage: Number;
  searchTerm: String;
  prop: String;
}
```  
## Explanation on paginator controls component inputs 
1 **currentPage** This input is to specify the component the current page.  
2 **itemsPerPage** This input is used to specify the items per page to the component.  
3 **dataLength** This input is used to caluculate the total pages based on data length and items per page.
```typescript
export interface opt{
  currentPage:any;
  itemsPerPage:any;
  dataLength:any;  
}
```  
## Styling Suggestion  
If you want to have your own page control component then you can use your component and use the above parameters to caluculate the total pages and current page change functionality.


> That's it you are good to go. Happy Coding :)
