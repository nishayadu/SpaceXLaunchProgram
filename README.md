# SpaceX

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.2.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Technology Used

For Designing Page - Html5, scss and Bootstrap
For Accessibilty - aria attribute
For Service call - httpClientModule
For Server Side Rendering - Angular Universal(boilerplate code)
[Known Issue - When we are using SSR, page is flickered]

## Responsive Behaviour
- For Mobile page is having 1 column - until 700px
- For Tablet page is having 2 column - between 700 and 1024
- For Desktop page is having 4 column - between 1024 and 1440

## Functionality Detail

- When page is loaded for the 1st time all the 100 records will be loaded in the page, and it will be saved in the cache for 5mins
- If data is available in the cache, it will directly fetch the data, other wise it will make an API call.
- For few records mission id is coming as empty, so it is displaying as blank record.
- Image url is not working, which is coming from the API, So, I have added a placeholder image to display.
- Wnen we apply any filter, url will change with the filter applied, without reloading the page, and on deselecting the filter it will be removed from the query param

    ### Launch Year Behaviour
        - When clicking on any of the year, it will filter the value for that year.
        - If we select other ear it will deselect the previous selection and filter value for the new selection.
        - If we deselect the selected year, it will display data without any filter

    ### Lanun Success Behaviour
        - When clicking on true/false, it will show all the records based on filters.
        - As its an array, so, here I am assuming that, if any one of the value is true, I am showing Launch success value as true
        - When Deselecting the selected button, it will display data without filter

    ### Land Success Behaviour
        - When clicking on true/false, it will show all the records based on filters.
        - As its an array, so, here I am assuming that, if any one of the value is true, I am showing Land success value as true
        - For some of the record land success is having null, so I am showing it as unknown.
        - When Deselecting the selected button, it will display data without filter

## Build

Development -            Run npm run dev:ssr 
Server Side rendering  - Run npm run build:ssr
                         Run npm run serve:ssr

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
- Implemented test cases for the component load and all the 3 filters - Launch success, Land Success and Launch Year.


LightHouse report:
