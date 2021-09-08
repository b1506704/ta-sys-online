(self.webpackChunkta_sys_online=self.webpackChunkta_sys_online||[]).push([[636],{69636:(e,t,s)=>{"use strict";s.r(t),s.d(t,{EditCourseListModule:()=>R});var o=s(61116),r=s(15419),i=s(47592),a=s(98633),n=s(65294),l=s(23651),c=(s(52279),s(62707)),h=s(82051),u=s.n(h),g=s(8619),d=s(61305),p=s(41142),S=s(42693);let y=(()=>{class e{constructor(e){this.http=e,this.apiUrl="https://ta-sys-online-server.azurewebsites.net/api/Course"}fetchCourse(e,t){const s=(new S.LE).set("PageNumber",e).set("PageSize",t);return console.log(s.toString()),this.http.get(this.apiUrl+"/paging",{params:s,reportProgress:!0,observe:"body"})}fetchCourseByLearnerID(e,t,s){const o=(new S.LE).set("PageNumber",e).set("PageSize",t).set("Id",s);return console.log(o.toString()),this.http.get(this.apiUrl+"/byLearnerID",{params:o,reportProgress:!0,observe:"body"})}searchCourseByProperty(e,t,s,o){const r=(new S.LE).set("Property",e).set("Value",t).set("PageNumber",s).set("PageSize",o);return console.log(r.toString()),this.http.get(this.apiUrl+"/search",{params:r,reportProgress:!0,observe:"body"})}filterCourseByProperty(e,t,s,o){const r=(new S.LE).set("Value",t).set("Property",e).set("PageNumber",s).set("PageSize",o);return console.log(r.toString()),this.http.get(this.apiUrl+"/filter",{params:r,reportProgress:!0,observe:"body"})}sortCourseByProperty(e,t,s,o){const r=(new S.LE).set("SortBy",e).set("Order",t).set("PageNumber",s).set("PageSize",o);return console.log(r.toString()),this.http.get(this.apiUrl+"/paging",{params:r,reportProgress:!0,observe:"body"})}uploadCourse(e){return this.http.post(this.apiUrl,e,{reportProgress:!0,observe:"body"})}generateRandomCourse(){return this.http.post(this.apiUrl+"/randomCourse",{reportProgress:!0,observe:"body"})}deleteCourse(e){return this.http.post(this.apiUrl+"/delete",e,{reportProgress:!0,observe:"body"})}deleteAll(){return this.http.delete(this.apiUrl,{reportProgress:!0,observe:"body"})}getCourse(e){return this.http.get(this.apiUrl+`/${e}`,{reportProgress:!0,observe:"body"})}updateCourse(e){return this.http.put(this.apiUrl,e,{reportProgress:!0,observe:"body"})}fetchAll(){return this.http.get(this.apiUrl,{reportProgress:!0,observe:"body"})}}return e.\u0275fac=function(t){return new(t||e)(g.LFG(S.eN))},e.\u0275prov=g.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var m=s(86150);const P={courseList:[],selectedCourse:{},courseInstance:void 0,exportData:[],totalPages:0,currentPage:0,totalItems:0,responseMsg:""};let f=(()=>{class e extends d.b{constructor(e,t){super(P),this.courseService=e,this.store=t,this.$courseList=this.select(e=>e.courseList),this.$exportData=this.select(e=>e.exportData),this.$totalPages=this.select(e=>e.totalPages),this.$totalItems=this.select(e=>e.totalItems),this.$currentPage=this.select(e=>e.currentPage),this.$selectedCourse=this.select(e=>e.selectedCourse),this.$courseInstance=this.select(e=>e.courseInstance)}fillEmpty(e,t,s,o){let r=s;console.log("FILL INDEX");let i=e*t;console.log(i);for(var a=0;a<o.length;a++)r[i]=o[a],i++;return console.log("Filled array result"),console.log(r),r}initInfiniteData(e,t){return this.courseService.fetchCourse(e,t).toPromise().then(e=>{this.setState({courseList:e.data}),console.log("Current flag: infite list"),console.log(this.state.courseList),this.setState({totalItems:e.totalRecords}),this.setState({totalPages:e.totalPages}),this.setState({currentPage:e.pageNumber})})}loadInfiniteDataAsync(e,t){this.setIsLoading(!0),this.courseService.fetchCourse(e,t).subscribe({next:e=>{this.setState({courseList:this.state.courseList.concat(e.data)}),console.log("Infinite list"),console.log(this.state.courseList),console.log("Server response"),console.log(e),this.setState({totalItems:e.totalRecords}),this.setState({totalPages:e.totalPages}),this.setState({currentPage:e.pageNumber}),this.setIsLoading(!1)},error:e=>{this.setIsLoading(!1),this.store.showNotif(e.error.responseMessage,"error"),console.log(e)}})}loadDataAsyncByLearnerID(e,t,s){this.setIsLoading(!0),this.courseService.fetchCourseByLearnerID(e,t,s).subscribe({next:s=>{this.setState({courseList:this.fillEmpty(e-1,t,this.state.courseList,s.data)}),console.log("Pure list"),console.log(this.state.courseList),console.log("Server response"),console.log(s),this.setState({totalItems:s.totalRecords}),this.setState({totalPages:s.totalPages}),this.setState({currentPage:s.pageNumber}),this.setIsLoading(!1)},error:e=>{this.setIsLoading(!1),this.store.showNotif(e.error.responseMessage,"error"),console.log(e)}})}initInfiniteDataByLearnerID(e,t,s){return this.courseService.fetchCourseByLearnerID(e,t,s).toPromise().then(e=>{this.setState({courseList:e.data}),console.log("Current flag: infite list"),console.log(this.state.courseList),this.setState({totalItems:e.totalRecords}),this.setState({totalPages:e.totalPages}),this.setState({currentPage:e.pageNumber})})}loadInfiniteDataAsyncByLearnerID(e,t,s){this.setIsLoading(!0),this.courseService.fetchCourseByLearnerID(e,t,s).subscribe({next:e=>{this.setState({courseList:this.state.courseList.concat(e.data)}),console.log("Infinite list"),console.log(this.state.courseList),console.log("Server response"),console.log(e),this.setState({totalItems:e.totalRecords}),this.setState({totalPages:e.totalPages}),this.setState({currentPage:e.pageNumber}),this.setIsLoading(!1)},error:e=>{this.setIsLoading(!1),this.store.showNotif(e.error.responseMessage,"error"),console.log(e)}})}initData(e,t){this.courseService.fetchCourse(e,t).toPromise().then(e=>{this.setState({courseList:new Array(e.totalRecords)}),console.log("Current flag: pure list"),console.log(this.state.courseList),this.setState({totalItems:e.totalRecords}),this.setState({totalPages:e.totalPages}),this.setState({currentPage:e.pageNumber})}).then(()=>{this.loadDataAsync(e,t)})}initFilterByPropertyData(e,t,s,o){this.store.showNotif("Filtered Mode On","custom"),this.courseService.filterCourseByProperty(e,t,s,o).toPromise().then(e=>{this.setState({courseList:new Array(e.totalRecords)}),console.log("Current flag: filtered list"),console.log(this.state.courseList),this.setState({totalItems:e.totalRecords}),this.setState({totalPages:e.totalPages}),this.setState({currentPage:e.pageNumber})}).then(()=>{this.filterCourseByProperty(e,t,s,o)})}initInfiniteFilterByPropertyData(e,t,s,o){this.store.showNotif("Filtered Mode On","custom"),this.courseService.filterCourseByProperty(e,t,s,o).toPromise().then(e=>{this.setState({courseList:e.data}),console.log("Current flag: infinite filtered list"),console.log(this.state.courseList),this.setState({totalItems:e.totalRecords}),this.setState({totalPages:e.totalPages}),this.setState({currentPage:e.pageNumber})})}initSearchByPropertyData(e,t,s,o){this.store.showNotif("Searched Mode On","custom"),this.courseService.searchCourseByProperty(e,t,s,o).toPromise().then(e=>{this.setState({courseList:new Array(e.totalRecords)}),console.log("Current flag: searched list"),console.log(this.state.courseList),this.setState({totalItems:e.totalRecords}),this.setState({totalPages:e.totalPages}),this.setState({currentPage:e.pageNumber})}).then(()=>{this.searchCourseByProperty(e,t,s,o)})}initInfiniteSearchByPropertyData(e,t,s,o){this.store.showNotif("Searched Mode On","custom"),this.courseService.searchCourseByProperty(e,t,s,o).toPromise().then(e=>{0!==e.totalRecords?this.setState({courseList:e.data}):this.store.showNotif("No result found!","custom"),console.log("Current flag: infitite searched list"),console.log(this.state.courseList),this.setState({totalItems:e.totalRecords}),this.setState({totalPages:e.totalPages}),this.setState({currentPage:e.pageNumber})})}initSortByPropertyData(e,t,s,o){this.store.showNotif("Sort Mode On","custom"),this.courseService.sortCourseByProperty(e,t,s,o).toPromise().then(e=>{this.setState({courseList:new Array(e.totalRecords)}),console.log("Current flag: sort list"),console.log(this.state.courseList),this.setState({totalItems:e.totalRecords}),this.setState({totalPages:e.totalPages}),this.setState({currentPage:e.pageNumber})}).then(()=>{this.sortCourseByProperty(e,t,s,o)})}initInfiniteSortByPropertyData(e,t,s,o){this.store.showNotif("Sort Mode On","custom"),this.courseService.sortCourseByProperty(e,t,s,o).toPromise().then(e=>{this.setState({courseList:e.data}),console.log("Current flag: sort list"),console.log(this.state.courseList),this.setState({totalItems:e.totalRecords}),this.setState({totalPages:e.totalPages}),this.setState({currentPage:e.pageNumber})})}loadDataAsync(e,t){this.setIsLoading(!0),this.courseService.fetchCourse(e,t).subscribe({next:s=>{this.setState({courseList:this.fillEmpty(e-1,t,this.state.courseList,s.data)}),console.log("Pure list"),console.log(this.state.courseList),console.log("Server response"),console.log(s),this.setState({totalItems:s.totalRecords}),this.setState({totalPages:s.totalPages}),this.setState({currentPage:s.pageNumber}),this.setIsLoading(!1)},error:e=>{this.setIsLoading(!1),this.store.showNotif(e.error.responseMessage,"error"),console.log(e)}})}refresh(e,t){this.setIsLoading(!0),this.courseService.fetchCourse(e,t).subscribe({next:s=>{this.setState({courseList:this.fillEmpty(e-1,t,this.state.courseList,s.data)}),this.setState({totalItems:s.totalRecords}),this.setState({totalPages:s.totalPages}),this.setState({currentPage:s.pageNumber}),console.log("Pure list"),console.log(this.state.courseList),console.log("Server response"),console.log(s),this.store.showNotif("Refresh successfully","custom"),this.setIsLoading(!1)},error:e=>{this.setIsLoading(!1),this.store.showNotif(e.error.responseMessage,"error"),console.log(e)}})}setIsLoading(e){this.store.setIsLoading(e)}uploadCourse(e,t,s){this.confirmDialog("").then(o=>{o&&(this.setIsLoading(!0),this.courseService.uploadCourse(e).subscribe({next:e=>{this.setState({responseMsg:e}),this.setTotalItems(this.state.totalItems+1),console.log(e),this.loadDataAsync(t,s),this.setIsLoading(!1),this.store.showNotif(e.responseMessage,"custom")},error:e=>{this.setIsLoading(!1),this.store.showNotif(e.error.responseMessage,"error"),console.log(e)}}))})}updateCourse(e,t,s){this.confirmDialog("").then(o=>{o&&(this.setIsLoading(!0),this.courseService.updateCourse(e).subscribe({next:e=>{this.setState({responseMsg:e}),console.log(e),this.loadDataAsync(t,s),this.setIsLoading(!1),this.store.showNotif(e.responseMessage,"custom")},error:e=>{this.setIsLoading(!1),this.store.showNotif(e.error.responseMessage,"error"),console.log(e)}}))})}confirmDialog(e){return(0,p.iG)(""!=e?`<b>${e}</b>`:"<b>Are you sure?</b>","Confirm changes")}deleteSelectedCourses(e,t,s){this.confirmDialog("").then(o=>{o&&(this.setIsLoading(!0),this.courseService.deleteCourse(e).subscribe({next:e=>{this.setState({responseMsg:e}),console.log(e),this.loadDataAsync(t,s),console.log(this.state.courseList),this.setIsLoading(!1),this.store.showNotif(e.responseMessage,"custom")},error:e=>{this.setIsLoading(!1),this.store.showNotif(e.error.responseMessage,"error"),console.log(e)}}))})}deleteAll(){this.confirmDialog("Delete all items?").then(e=>{e&&(this.setIsLoading(!0),this.courseService.deleteAll().subscribe({next:e=>{this.resetState(),console.log(e),this.setIsLoading(!1),this.store.showNotif(e.responseMessage,"custom")},error:e=>{this.setIsLoading(!1),this.store.showNotif(e.error.responseMessage,"error"),console.log(e)}}))})}deleteCourse(e,t,s){this.confirmDialog("").then(o=>{o&&(this.setIsLoading(!0),this.courseService.deleteCourse(e).subscribe({next:e=>{this.setState({responseMsg:e}),this.setTotalItems(this.state.totalItems-1),console.log(e),this.loadDataAsync(t,s),this.setIsLoading(!1),this.store.showNotif(e.responseMessage,"custom")},error:e=>{this.setIsLoading(!1),this.store.showNotif(e.error.responseMessage,"error"),console.log(e)}}))})}selectCourse(e){this.setState({selectedCourse:e})}setTotalPages(e){this.setState({totalPages:e})}setTotalItems(e){this.setState({totalItems:e})}setCurrentPage(e){this.setState({currentPage:e})}filterCourseByProperty(e,t,s,o){this.setIsLoading(!0),this.courseService.filterCourseByProperty(e,t,s,o).subscribe({next:e=>{0!==e.totalRecords&&(this.setState({courseList:this.fillEmpty(s-1,o,this.state.courseList,e.data)}),console.log("Filtered list"),console.log(this.state.courseList),console.log("Server response"),console.log(e),this.setState({totalItems:e.totalRecords}),this.setState({totalPages:e.totalPages}),this.setState({currentPage:e.pageNumber})),this.setIsLoading(!1)},error:e=>{this.setIsLoading(!1),this.store.showNotif(e.error.responseMessage,"error"),console.log(e)}})}filterInfiniteCourseByProperty(e,t,s,o){this.setIsLoading(!0),this.courseService.filterCourseByProperty(e,t,s,o).subscribe({next:e=>{this.setState({courseList:this.state.courseList.concat(e)}),console.log("Filtered list"),console.log(this.state.courseList),console.log("Server response"),console.log(e),this.setState({totalItems:e.totalRecords}),this.setState({totalPages:e.totalPages}),this.setState({currentPage:e.pageNumber}),this.setIsLoading(!1)},error:e=>{this.setIsLoading(!1),this.store.showNotif(e.error.responseMessage,"error"),console.log(e)}})}searchCourseByProperty(e,t,s,o){this.setIsLoading(!0),this.courseService.searchCourseByProperty(e,t,s,o).subscribe({next:e=>{0!==e.totalRecords?this.setState({courseList:this.fillEmpty(s-1,o,this.state.courseList,e.data)}):this.store.showNotif("No result found!","custom"),console.log("Searched list"),console.log(this.state.courseList),console.log("Server response"),console.log(e),this.setState({totalItems:e.totalRecords}),this.setState({totalPages:e.totalPages}),this.setState({currentPage:e.pageNumber}),this.setIsLoading(!1)},error:e=>{this.setIsLoading(!1),this.store.showNotif(e.error.responseMessage,"error"),console.log(e)}})}searchInfiniteCourseByProperty(e,t,s,o){this.setIsLoading(!0),this.courseService.searchCourseByProperty(e,t,s,o).subscribe({next:e=>{0!==e.totalRecords?this.setState({courseList:this.state.courseList.concat(e)}):this.store.showNotif("No result found!","custome"),console.log("Infite searched list"),console.log(this.state.courseList),console.log("Server response"),console.log(e),this.setState({totalItems:e.totalRecords}),this.setState({totalPages:e.totalPages}),this.setState({currentPage:e.pageNumber}),this.setIsLoading(!1)},error:e=>{this.setIsLoading(!1),this.store.showNotif(e.error.responseMessage,"error"),console.log(e)}})}sortCourseByProperty(e,t,s,o){this.setIsLoading(!0),this.courseService.sortCourseByProperty(e,t,s,o).subscribe({next:e=>{this.setState({responseMsg:e}),this.setState({courseList:this.fillEmpty(s-1,o,this.state.courseList,e.data)}),this.setState({totalItems:e.totalRecords}),this.setState({totalPages:e.totalPages}),this.setState({currentPage:e.pageNumber}),console.log("Sorted list"),console.log(this.state.courseList),console.log("Server response"),console.log(e),this.setIsLoading(!1)},error:e=>{this.setIsLoading(!1),this.store.showNotif(e.error.responseMessage,"error"),console.log(e)}})}sortInfiniteCourseByProperty(e,t,s,o){this.setIsLoading(!0),this.courseService.sortCourseByProperty(e,t,s,o).subscribe({next:e=>{this.setState({courseList:this.state.courseList.concat(e)}),console.log("Infite sorted list"),console.log(this.state.courseList),console.log("Server response"),console.log(e),this.setState({totalItems:e.totalRecords}),this.setState({totalPages:e.totalPages}),this.setState({currentPage:e.pageNumber}),this.setIsLoading(!1)},error:e=>{this.setIsLoading(!1),this.store.showNotif(e.error.responseMessage,"error"),console.log(e)}})}getCourse(e){return this.setIsLoading(!0),this.courseService.getCourse(e).toPromise().then(e=>{this.setState({courseInstance:e}),console.log(e),this.setIsLoading(!1)})}setExportData(e){this.setState({courseList:e})}resetState(){this.setState(P)}}return e.\u0275fac=function(t){return new(t||e)(g.LFG(y),g.LFG(m.d))},e.\u0275prov=g.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var I=s(41612),x=s(69333),b=s(52177),L=s(86101),C=s(83584);function w(e,t){if(1&e&&(g.TgZ(0,"div"),g.TgZ(1,"div",9),g._uU(2),g.qZA(),g.qZA()),2&e){const e=g.oxw();g.xp6(2),g.Oqu(e.selectInfoText)}}function v(e,t){if(1&e&&(g.TgZ(0,"div"),g.TgZ(1,"span"),g._uU(2),g.qZA(),g.qZA()),2&e){const e=g.oxw(2);g.xp6(2),g.hij("Total Course: ",e.courseList.length," ")}}function N(e,t){if(1&e){const e=g.EpF();g.ynx(0),g.TgZ(1,"dx-data-grid",10),g.NdJ("selectedRowKeysChange",function(t){return g.CHM(e),g.oxw().selectedRows=t})("onOptionChanged",function(t){return g.CHM(e),g.oxw().onOptionChanged(t)})("onSelectionChanged",function(){return g.CHM(e),g.oxw().selectionChangedHandler()})("onEditingStart",function(){return g.CHM(e),g.oxw().onEditingStart()})("onInitNewRow",function(){return g.CHM(e),g.oxw().onInitNewRow()})("onSaved",function(t){return g.CHM(e),g.oxw().onSaved(t)})("onEditCanceled",function(){return g.CHM(e),g.oxw().onEditCanceled()})("onToolbarPreparing",function(t){return g.CHM(e),g.oxw().onToolbarPreparing(t)}),g._UZ(2,"dxo-editing",11),g._UZ(3,"dxo-selection",12),g._UZ(4,"dxo-grouping",13),g._UZ(5,"dxo-column-chooser",14),g._UZ(6,"dxo-paging",15),g._UZ(7,"dxo-pager",16),g._UZ(8,"dxo-load-panel",17),g.TgZ(9,"dxi-column",18),g._UZ(10,"dxi-validation-rule",19),g.qZA(),g.TgZ(11,"dxi-column",20),g._UZ(12,"dxi-validation-rule",19),g.qZA(),g.TgZ(13,"dxi-column",21),g._UZ(14,"dxi-validation-rule",19),g.qZA(),g.TgZ(15,"dxi-column",22),g._UZ(16,"dxi-validation-rule",19),g.qZA(),g.TgZ(17,"dxi-column",23),g._UZ(18,"dxi-validation-rule",19),g.qZA(),g.TgZ(19,"dxi-column",24),g._UZ(20,"dxi-validation-rule",19),g.qZA(),g.TgZ(21,"dxi-column",25),g._UZ(22,"dxi-validation-rule",19),g.qZA(),g.TgZ(23,"dxi-column",26),g._UZ(24,"dxi-validation-rule",19),g.qZA(),g.TgZ(25,"dxi-column",27),g._UZ(26,"dxi-validation-rule",19),g.qZA(),g.TgZ(27,"dxi-column",28),g._UZ(28,"dxi-validation-rule",19),g.qZA(),g.TgZ(29,"dxi-column",29),g._UZ(30,"dxi-validation-rule",19),g.qZA(),g.TgZ(31,"dxi-column",30),g._UZ(32,"dxi-validation-rule",19),g.qZA(),g.YNc(33,v,3,1,"div",31),g.qZA(),g.BQk()}if(2&e){const e=g.oxw();g.xp6(1),g.Q6J("dataSource",e.courseList)("showBorders",!0)("allowColumnReordering",!0)("rowAlternationEnabled",!0)("columnHidingEnabled",!0)("selectedRowKeys",e.selectedRows)("sorting",!1),g.xp6(1),g.Q6J("allowUpdating",!0)("allowDeleting",!0)("allowAdding",!0)("useIcons",!0)("selectTextOnEditStart",!0),g.xp6(1),g.Q6J("selectAllMode","page")("showCheckBoxesMode","onClick"),g.xp6(1),g.Q6J("contextMenuEnabled",!0),g.xp6(1),g.Q6J("enabled",!0),g.xp6(1),g.Q6J("pageSize",e.pageSize),g.xp6(1),g.Q6J("visible",!0)("displayMode","adaptive")("allowedPageSizes",e.allowedPageSizes)("showPageSizeSelector",!0)("showNavigationButtons",!0),g.xp6(1),g.Q6J("enabled",!0),g.xp6(25),g.Q6J("dxTemplateOf","totalCourseCount")}}const B=function(){return{paddingLeft:"25px",paddingRight:"25px"}},T=[{path:"",component:(()=>{class e{constructor(e,t,s,o,r){this.courseStore=e,this.store=t,this.courseHTTP=s,this.subjectStore=o,this.router=r,this.subjectList=[],this.pageSize=5,this.allowedPageSizes=[5,10,15],this.scrollingMode="standard",this.currentSortProperty="name",this.currentSearchProperty="name",this.currentFilterProperty="subjectId"}onToolbarPreparing(e){e.toolbarOptions.items.unshift({location:"before",template:"totalCourseCount"},{location:"after",locateInMenu:"auto",widget:"dxButton",options:{type:"normal",icon:"refresh",hint:"Fetch data from server",onClick:this.onRefresh.bind(this)}},{location:"after",locateInMenu:"auto",widget:"dxButton",options:{type:"danger",icon:"trash",hint:"Delete all items",onClick:this.deleteAll.bind(this)}},{location:"after",locateInMenu:"auto",widget:"dxButton",options:{type:"danger",icon:"parentfolder",hint:"Generate random 100+ items",onClick:this.onAddRandom.bind(this)}},{location:"after",locateInMenu:"auto",widget:"dxButton",options:{type:"normal",icon:"exportpdf",hint:"Export to PDF",onClick:this.exportGridToPdf.bind(this)}},{location:"after",locateInMenu:"auto",widget:"dxButton",options:{type:"normal",icon:"xlsxfile",hint:"Export to Excel",onClick:this.exportDataGridToExcel.bind(this)}},{location:"before",widget:"dxTextBox",options:{valueChangeEvent:"keyup",showClearButton:!0,onKeyUp:this.onSearchKeyupHandler.bind(this),onValueChanged:this.onSearchValueChanged.bind(this),mode:"search",placeholder:"Search name"}},{location:"center",locateInMenu:"auto",widget:"dxButton",options:{type:"normal",icon:"filter",disabled:!0,hint:"Filter with subject"}},{location:"center",locateInMenu:"auto",widget:"dxSelectBox",options:{items:this.subjectList,valueExpr:"id",searchExpr:"name",displayExpr:"name",placeholder:"Filter with subject",searchEnabled:!0,onValueChanged:this.onFilterChange.bind(this)}},{location:"center",locateInMenu:"auto",widget:"dxButton",options:{type:"normal",icon:"card",disabled:!0,hint:"Sort by total cost"}},{location:"center",locateInMenu:"auto",widget:"dxSelectBox",options:{items:[{id:"-1",name:"(NONE)"},{id:"0",name:"asc"},{id:"1",name:"desc"}],valueExpr:"name",placeholder:"Sort by name",displayExpr:"name",onValueChanged:this.onSortValueChanged.bind(this)}})}onSearchKeyupHandler(e){clearTimeout(this.timeout),this.timeout=setTimeout(()=>{this.isSearchingByName=!0,this.isFilteringByCategory=!1,this.isSortingByName=!1,console.log(this.currentSearchByPropertyValue),""!==this.currentSearchByPropertyValue?this.courseStore.initSearchByPropertyData(this.currentSearchProperty,this.currentSearchByPropertyValue,this.dataGrid.instance.pageIndex()+1,this.pageSize):(this.store.showNotif("SEARCH MODE OFF","custom"),this.onRefresh())},1250)}onSearchValueChanged(e){this.currentSearchByPropertyValue=e.value}onSortValueChanged(e){this.isSortingByName=!0,this.isSearchingByName=!1,this.isFilteringByCategory=!1,this.currentSortByPropertyValue=e.value,"(NONE)"!==e.value?this.courseStore.initSortByPropertyData(this.currentSortProperty,e.value,this.dataGrid.instance.pageIndex()+1,this.pageSize):(this.store.showNotif("SORT MODE OFF","custom"),this.onRefresh())}onFilterChange(e){this.isFilteringByCategory=!0,this.isSearchingByName=!1,this.isSortingByName=!1,this.currentFilterByPropertyValue=e.value,console.log(e.value),"(NONE)"!==e.value?this.courseStore.initFilterByPropertyData(this.currentFilterProperty,e.value,this.dataGrid.instance.pageIndex()+1,this.pageSize):(this.store.showNotif("FILTER MODE OFF","custom"),this.onRefresh())}checkEditorMode(){return!0===this.isFilteringByCategory?"FILTER":!0===this.isSearchingByName?"SEARCH":!0===this.isSortingByName?"SORT":"NORMAL"}onOptionChanged(e){const t=this.checkEditorMode();if("paging.pageIndex"===e.fullName){const s=e.value+1;switch(console.log(`New page index: ${s}. Total items: ${this.courseList.length}`),t){case"NORMAL":this.paginatePureData(s);break;case"FILTER":this.paginateFilterData(s);break;case"SEARCH":this.paginateSearchData(s);break;case"SORT":this.paginateSortData(s)}}if("paging.pageSize"===e.fullName)switch(this.pageSize=e.value,console.log(`Page size changed to ${e.value}`),t){case"NORMAL":this.courseStore.loadDataAsync(this.currentIndexFromServer,e.value),this.goToPage(this.currentIndexFromServer);break;case"FILTER":this.courseStore.filterCourseByProperty(this.currentFilterProperty,this.currentFilterByPropertyValue,this.currentIndexFromServer,e.value),this.goToPage(this.currentIndexFromServer);break;case"SEARCH":this.courseStore.searchCourseByProperty(this.currentSearchProperty,this.currentSearchByPropertyValue,this.currentIndexFromServer,e.value),this.goToPage(this.currentIndexFromServer);break;case"SORT":this.courseStore.sortCourseByProperty(this.currentSortProperty,this.currentSortByPropertyValue,this.currentIndexFromServer,e.value),this.goToPage(this.currentIndexFromServer)}}paginatePureData(e){this.courseStore.loadDataAsync(e,this.pageSize)}paginateFilterData(e){this.courseStore.filterCourseByProperty(this.currentFilterProperty,this.currentFilterByPropertyValue,e,this.pageSize)}paginateSearchData(e){this.courseStore.searchCourseByProperty(this.currentSearchProperty,this.currentSearchByPropertyValue,e,this.pageSize)}paginateSortData(e){this.courseStore.sortCourseByProperty(this.currentSortProperty,this.currentSortByPropertyValue,e,this.pageSize)}onEditingStart(){this.store.showNotif("Edit mode on","custom")}onInitNewRow(){this.store.showNotif("Blank row added, please fill in information","custom")}onSaved(e){if(e.changes.length)switch(e.changes[0].type){case"insert":this.courseStore.uploadCourse(e.changes[0].data,this.dataGrid.instance.pageIndex()+1,this.pageSize);break;case"update":console.log(e.changes[0]),this.courseStore.updateCourse(e.changes[0].data,this.dataGrid.instance.pageIndex()+1,this.pageSize);break;case"remove":this.courseStore.deleteCourse([e.changes[0].key],this.dataGrid.instance.pageIndex()+1,this.pageSize)}else this.store.showNotif("No changes dectected","custom")}onEditCanceled(){this.store.showNotif("Editing cancelled","custom")}selectionChangedHandler(){this.selectedRows.length?(this.isSelectInfoVisible=!0,this.selectInfoText=`${this.selectedRows.length} rows selected`,this.selectedRows.forEach(e=>{console.log(e)})):this.isSelectInfoVisible=!1}changePageSize(e){this.dataGrid.instance.pageSize(e)}goToPage(e){this.dataGrid.instance.pageIndex(e)}deleteSelectedItems(){this.store.setIsLoading(!0);const e=this.checkEditorMode();this.selectedRows.length&&this.courseStore.confirmDialog("").then(t=>{t&&this.courseHTTP.deleteCourse(this.selectedRows).toPromise().then(()=>{switch(this.store.showNotif(`${this.selectedRows.length} items deleted`,"custom"),this.clearSelection(),e){case"NORMAL":this.courseStore.initData(this.dataGrid.instance.pageIndex()+1,this.pageSize);break;case"FILTER":this.courseStore.initFilterByPropertyData(this.currentFilterProperty,this.currentFilterByPropertyValue,this.dataGrid.instance.pageIndex()+1,this.pageSize);break;case"SORT":this.courseStore.initSortByPropertyData(this.currentSortProperty,this.currentSortByPropertyValue,this.dataGrid.instance.pageIndex()+1,this.pageSize);break;case"SEARCH":this.courseStore.initSearchByPropertyData(this.currentSearchProperty,this.currentSearchByPropertyValue,this.dataGrid.instance.pageIndex()+1,this.pageSize)}this.isSelectInfoVisible=!1}).then(()=>{this.store.setIsLoading(!1)})})}clearSelection(){this.selectedRows=[]}onRefresh(){this.isFilteringByCategory=!1,this.isSearchingByName=!1,this.isSortingByName=!1,this.courseStore.initData(this.dataGrid.instance.pageIndex()+1,this.pageSize)}onAddRandom(){this.courseStore.confirmDialog("This will generate random 100+ items in database. Are you sure").then(e=>{e&&(this.isFilteringByCategory=!1,this.store.setIsLoading(!0),this.courseHTTP.generateRandomCourse().toPromise().then(()=>{this.courseStore.initData(this.dataGrid.instance.pageIndex()+1,this.pageSize)}).then(()=>{this.store.setIsLoading(!1),this.store.showNotif("Generated 100+ random items","custom")}))})}exportDataGridToExcel(){this.courseStore.confirmDialog("This will export all fetched data to excel. Are you sure?").then(e=>{e&&(this.store.setIsLoading(!0),this.courseHTTP.fetchAll().toPromise().then(e=>{this.courseStore.setExportData(e),console.log(e),setTimeout(()=>{const e=new c.Workbook,t=e.addWorksheet("Course List");(0,a.d)({component:this.dataGrid.instance,worksheet:t,autoFilterEnabled:!0}).then(()=>{e.xlsx.writeBuffer().then(e=>{u()(new Blob([e],{type:"application/octet-stream"}),"Course_List.xlsx"),this.store.setIsLoading(!1),this.store.showNotif("Export succesully","custom")})})},200)}))})}exportGridToPdf(e){this.courseStore.confirmDialog("This will export all data to pdf. Are you sure?").then(e=>{e&&(this.store.setIsLoading(!0),this.courseHTTP.fetchAll().toPromise().then(e=>{this.courseStore.setExportData(e),console.log(e),setTimeout(()=>{const e=new l.jsPDF;(0,n.d)({jsPDFDocument:e,component:this.dataGrid.instance}).then(()=>{e.save("Course_List.pdf"),this.store.setIsLoading(!1),this.store.showNotif("Export succesully","custom")})},200)}))})}deleteAll(){this.courseStore.deleteAll()}navigateToStatistics(){this.router.navigate(["/statistics"])}sourceDataListener(){return this.courseStore.$courseList.subscribe(e=>{this.courseList=e})}currentPageListener(){return this.courseStore.$currentPage.subscribe(e=>{this.currentIndexFromServer=e})}ngOnInit(){this.sourceDataListener(),this.currentPageListener(),this.subjectStore.fetchAll().then(e=>{0!==e.length&&(console.log("FILTER DATA: "),console.log(e),this.subjectList=e,this.subjectList.unshift({id:"(NONE)",name:"(NONE)"}),setTimeout(()=>{this.onRefresh()},150))})}ngOnDestroy(){this.sourceDataListener().unsubscribe(),this.currentPageListener().unsubscribe(),this.courseStore.resetState()}}return e.\u0275fac=function(t){return new(t||e)(g.Y36(f),g.Y36(m.d),g.Y36(y),g.Y36(I.Z),g.Y36(r.F0))},e.\u0275cmp=g.Xpm({type:e,selectors:[["app-edit-course-list"]],viewQuery:function(e,t){if(1&e&&g.Gf(i.e,5),2&e){let e;g.iGM(e=g.CRH())&&(t.dataGrid=e.first)}},decls:9,vars:7,consts:[[3,"ngStyle"],[3,"location","text"],["location","center","locateInMenu","auto",3,"visible"],[4,"dxTemplate"],["location","center","locateInMenu","auto"],["icon","trash","type","danger","hint","Delete current selected items",3,"visible","onClick"],["location","after","locateInMenu","auto"],["icon","arrowright","type","outline","text","Statistics","hint","Navigate to Statistics",3,"onClick"],[4,"ngIf"],[2,"font-size","small"],["id","gridContainer","keyExpr","id",3,"dataSource","showBorders","allowColumnReordering","rowAlternationEnabled","columnHidingEnabled","selectedRowKeys","sorting","selectedRowKeysChange","onOptionChanged","onSelectionChanged","onEditingStart","onInitNewRow","onSaved","onEditCanceled","onToolbarPreparing"],[3,"allowUpdating","allowDeleting","allowAdding","useIcons","selectTextOnEditStart"],["mode","multiple",3,"selectAllMode","showCheckBoxesMode"],["expandMode","rowClick",3,"contextMenuEnabled"],["mode","select",3,"enabled"],[3,"pageSize"],[3,"visible","displayMode","allowedPageSizes","showPageSizeSelector","showNavigationButtons"],[3,"enabled"],["dataField","name"],["type","required"],["dataField","summary"],["dataField","duration"],["dataField","description"],["dataField","availableSlot"],["dataField","maxSlot"],["dataField","rating"],["dataField","feedback"],["dataField","ratingCount"],["dataField","cost"],["dataField","subjectId"],["dataField","instructorId"],[4,"dxTemplate","dxTemplateOf"]],template:function(e,t){1&e&&(g.TgZ(0,"dx-toolbar",0),g._UZ(1,"dxi-item",1),g.TgZ(2,"dxi-item",2),g.YNc(3,w,3,1,"div",3),g.qZA(),g.TgZ(4,"dxi-item",4),g.TgZ(5,"dx-button",5),g.NdJ("onClick",function(){return t.deleteSelectedItems()}),g.qZA(),g.qZA(),g.TgZ(6,"dxi-item",6),g.TgZ(7,"dx-button",7),g.NdJ("onClick",function(){return t.navigateToStatistics()}),g.qZA(),g.qZA(),g.qZA(),g.YNc(8,N,34,24,"ng-container",8)),2&e&&(g.Q6J("ngStyle",g.DdM(6,B)),g.xp6(1),g.Q6J("location","before")("text","Course Mananagement"),g.xp6(1),g.Q6J("visible",t.isSelectInfoVisible),g.xp6(3),g.Q6J("visible",t.isSelectInfoVisible),g.xp6(3),g.Q6J("ngIf",0!==t.subjectList.length))},directives:[x.G,o.PC,b.ZT3,L.p6,C.K,o.O5,i.e,b.Uo8,b.Lz9,b.uCj,b.Auv,b.sXh,b.ilc,b.mKI,b.qvW,b.vrV],styles:[""]}),e})()}];let D=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=g.oAB({type:e}),e.\u0275inj=g.cJS({imports:[[r.Bz.forChild(T)],r.Bz]}),e})(),R=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=g.oAB({type:e}),e.\u0275inj=g.cJS({imports:[[o.ez,D,i.x,x.k,C.e]]}),e})()}}]);