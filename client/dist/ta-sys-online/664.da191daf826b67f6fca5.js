(self.webpackChunkta_sys_online=self.webpackChunkta_sys_online||[]).push([[664],{85664:(t,e,s)=>{"use strict";s.r(e),s.d(e,{EditPostListModule:()=>R});var o=s(61116),i=s(46553),r=s(23167),a=s(98633),n=s(65294),l=s(23651),h=(s(52279),s(62707)),c=s(82051),d=s.n(c),g=s(8619),p=s(61305),u=s(41142),S=s(63376),P=s(10418),y=s(6614);const f={postList:[],selectedPost:{},postInstance:void 0,exportData:[],totalPages:0,currentPage:0,totalItems:0,responseMsg:""};let m=(()=>{class t extends p.b{constructor(t,e,s){super(f),this.postService=t,this.store=e,this.fileStore=s,this.$postList=this.select(t=>t.postList),this.$exportData=this.select(t=>t.exportData),this.$totalPages=this.select(t=>t.totalPages),this.$totalItems=this.select(t=>t.totalItems),this.$currentPage=this.select(t=>t.currentPage),this.$selectedPost=this.select(t=>t.selectedPost),this.$postInstance=this.select(t=>t.postInstance)}fillEmpty(t,e,s,o){let i=s;console.log("FILL INDEX");let r=t*e;console.log(r);for(var a=0;a<o.length;a++)i[r]=o[a],r++;return console.log("Filled array result"),console.log(i),i}fetchMediaBySourceID(t){const e=t.map(t=>t.id);this.fileStore.getFiles(e)}initInfiniteData(t,e){return this.postService.fetchPost(t,e).toPromise().then(t=>{this.setState({postList:t.data}),this.fetchMediaBySourceID(t.data),console.log("Current flag: infite list"),console.log(this.state.postList),this.setState({totalItems:t.totalRecords}),this.setState({totalPages:t.totalPages}),this.setState({currentPage:t.pageNumber})})}loadInfiniteDataAsync(t,e){this.setIsLoading(!0),this.postService.fetchPost(t,e).subscribe({next:t=>{this.setState({postList:this.state.postList.concat(t.data)}),this.fetchMediaBySourceID(t.data),console.log("Infinite list"),console.log(this.state.postList),console.log("Server response"),console.log(t),this.setState({totalItems:t.totalRecords}),this.setState({totalPages:t.totalPages}),this.setState({currentPage:t.pageNumber}),this.setIsLoading(!1)},error:t=>{this.setIsLoading(!1),this.store.showNotif(t.error.responseMessage,"error"),console.log(t)}})}loadDataAsyncByLearnerID(t,e,s){this.setIsLoading(!0),this.postService.fetchPostByLearnerID(t,e,s).subscribe({next:s=>{this.setState({postList:this.fillEmpty(t-1,e,this.state.postList,s.data)}),console.log("Pure list"),console.log(this.state.postList),console.log("Server response"),console.log(s),this.setState({totalItems:s.totalRecords}),this.setState({totalPages:s.totalPages}),this.setState({currentPage:s.pageNumber}),this.setIsLoading(!1)},error:t=>{this.setIsLoading(!1),this.store.showNotif(t.error.responseMessage,"error"),console.log(t)}})}initInfiniteDataByLearnerID(t,e,s){return this.postService.fetchPostByLearnerID(t,e,s).toPromise().then(t=>{this.setState({postList:t.data}),console.log("Current flag: infite list"),console.log(this.state.postList),this.setState({totalItems:t.totalRecords}),this.setState({totalPages:t.totalPages}),this.setState({currentPage:t.pageNumber})})}loadInfiniteDataAsyncByLearnerID(t,e,s){this.setIsLoading(!0),this.postService.fetchPostByLearnerID(t,e,s).subscribe({next:t=>{this.setState({postList:this.state.postList.concat(t.data)}),console.log("Infinite list"),console.log(this.state.postList),console.log("Server response"),console.log(t),this.setState({totalItems:t.totalRecords}),this.setState({totalPages:t.totalPages}),this.setState({currentPage:t.pageNumber}),this.setIsLoading(!1)},error:t=>{this.setIsLoading(!1),this.store.showNotif(t.error.responseMessage,"error"),console.log(t)}})}initData(t,e){this.postService.fetchPost(t,e).toPromise().then(t=>{this.setState({postList:new Array(t.totalRecords)}),console.log("Current flag: pure list"),console.log(this.state.postList),this.setState({totalItems:t.totalRecords}),this.setState({totalPages:t.totalPages}),this.setState({currentPage:t.pageNumber})}).then(()=>{this.loadDataAsync(t,e)})}initFilterByPropertyData(t,e,s,o){this.store.showNotif("Filtered Mode On","custom"),this.postService.filterPostByProperty(t,e,s,o).toPromise().then(t=>{this.setState({postList:new Array(t.totalRecords)}),console.log("Current flag: filtered list"),console.log(this.state.postList),this.setState({totalItems:t.totalRecords}),this.setState({totalPages:t.totalPages}),this.setState({currentPage:t.pageNumber})}).then(()=>{this.filterPostByProperty(t,e,s,o)})}initInfiniteFilterByPropertyData(t,e,s,o){this.store.showNotif("Filtered Mode On","custom"),this.postService.filterPostByProperty(t,e,s,o).toPromise().then(t=>{this.setState({postList:t.data}),this.fetchMediaBySourceID(t.data),console.log("Current flag: infinite filtered list"),console.log(this.state.postList),this.setState({totalItems:t.totalRecords}),this.setState({totalPages:t.totalPages}),this.setState({currentPage:t.pageNumber})})}initSearchByPropertyData(t,e,s,o){this.store.showNotif("Searched Mode On","custom"),this.postService.searchPostByProperty(t,e,s,o).toPromise().then(t=>{this.setState({postList:new Array(t.totalRecords)}),console.log("Current flag: searched list"),console.log(this.state.postList),this.setState({totalItems:t.totalRecords}),this.setState({totalPages:t.totalPages}),this.setState({currentPage:t.pageNumber})}).then(()=>{this.searchPostByProperty(t,e,s,o)})}initInfiniteSearchByPropertyData(t,e,s,o){this.store.showNotif("Searched Mode On","custom"),this.postService.searchPostByProperty(t,e,s,o).toPromise().then(t=>{0!==t.totalRecords?(this.setState({postList:t.data}),this.fetchMediaBySourceID(t.data)):this.store.showNotif("No result found!","custom"),console.log("Current flag: infitite searched list"),console.log(this.state.postList),this.setState({totalItems:t.totalRecords}),this.setState({totalPages:t.totalPages}),this.setState({currentPage:t.pageNumber})})}initSortByPropertyData(t,e,s,o){this.store.showNotif("Sort Mode On","custom"),this.postService.sortPostByProperty(t,e,s,o).toPromise().then(t=>{this.setState({postList:new Array(t.totalRecords)}),console.log("Current flag: sort list"),console.log(this.state.postList),this.setState({totalItems:t.totalRecords}),this.setState({totalPages:t.totalPages}),this.setState({currentPage:t.pageNumber})}).then(()=>{this.sortPostByProperty(t,e,s,o)})}initInfiniteSortByPropertyData(t,e,s,o){this.store.showNotif("Sort Mode On","custom"),this.postService.sortPostByProperty(t,e,s,o).toPromise().then(t=>{this.setState({postList:t.data}),this.fetchMediaBySourceID(t.data),console.log("Current flag: sort list"),console.log(this.state.postList),this.setState({totalItems:t.totalRecords}),this.setState({totalPages:t.totalPages}),this.setState({currentPage:t.pageNumber})})}loadDataAsync(t,e){this.setIsLoading(!0),this.postService.fetchPost(t,e).subscribe({next:s=>{this.setState({postList:this.fillEmpty(t-1,e,this.state.postList,s.data)}),console.log("Pure list"),console.log(this.state.postList),console.log("Server response"),console.log(s),this.setState({totalItems:s.totalRecords}),this.setState({totalPages:s.totalPages}),this.setState({currentPage:s.pageNumber}),this.setIsLoading(!1)},error:t=>{this.setIsLoading(!1),this.store.showNotif(t.error.responseMessage,"error"),console.log(t)}})}refresh(t,e){this.setIsLoading(!0),this.postService.fetchPost(t,e).subscribe({next:s=>{this.setState({postList:this.fillEmpty(t-1,e,this.state.postList,s.data)}),this.setState({totalItems:s.totalRecords}),this.setState({totalPages:s.totalPages}),this.setState({currentPage:s.pageNumber}),console.log("Pure list"),console.log(this.state.postList),console.log("Server response"),console.log(s),this.store.showNotif("Refresh successfully","custom"),this.setIsLoading(!1)},error:t=>{this.setIsLoading(!1),this.store.showNotif(t.error.responseMessage,"error"),console.log(t)}})}setIsLoading(t){this.store.setIsLoading(t)}uploadPost(t,e,s){this.confirmDialog("").then(o=>{o&&(this.setIsLoading(!0),this.postService.uploadPost(t).subscribe({next:t=>{this.setState({responseMsg:t}),this.setTotalItems(this.state.totalItems+1),console.log(t),this.loadDataAsync(e,s),this.setIsLoading(!1),this.store.showNotif(t.responseMessage,"custom")},error:t=>{this.setIsLoading(!1),this.store.showNotif(t.error.responseMessage,"error"),console.log(t)}}))})}updatePost(t,e,s){this.confirmDialog("").then(o=>{o&&(this.setIsLoading(!0),this.postService.updatePost(t).subscribe({next:t=>{this.setState({responseMsg:t}),console.log(t),this.loadDataAsync(e,s),this.setIsLoading(!1),this.store.showNotif(t.responseMessage,"custom")},error:t=>{this.setIsLoading(!1),this.store.showNotif(t.error.responseMessage,"error"),console.log(t)}}))})}confirmDialog(t){return(0,u.iG)(""!=t?`<b>${t}</b>`:"<b>Are you sure?</b>","Confirm changes")}deleteSelectedPosts(t,e,s){this.confirmDialog("").then(o=>{o&&(this.setIsLoading(!0),this.postService.deletePost(t).subscribe({next:t=>{this.setState({responseMsg:t}),console.log(t),this.loadDataAsync(e,s),console.log(this.state.postList),this.setIsLoading(!1),this.store.showNotif(t.responseMessage,"custom")},error:t=>{this.setIsLoading(!1),this.store.showNotif(t.error.responseMessage,"error"),console.log(t)}}))})}deleteAll(){this.confirmDialog("Delete all items?").then(t=>{t&&(this.setIsLoading(!0),this.postService.deleteAll().subscribe({next:t=>{this.resetState(),console.log(t),this.setIsLoading(!1),this.store.showNotif(t.responseMessage,"custom")},error:t=>{this.setIsLoading(!1),this.store.showNotif(t.error.responseMessage,"error"),console.log(t)}}))})}deletePost(t,e,s){this.confirmDialog("").then(o=>{o&&(this.setIsLoading(!0),this.postService.deletePost(t).subscribe({next:t=>{this.setState({responseMsg:t}),this.setTotalItems(this.state.totalItems-1),console.log(t),this.loadDataAsync(e,s),this.setIsLoading(!1),this.store.showNotif(t.responseMessage,"custom")},error:t=>{this.setIsLoading(!1),this.store.showNotif(t.error.responseMessage,"error"),console.log(t)}}))})}selectPost(t){this.setState({selectedPost:t})}setTotalPages(t){this.setState({totalPages:t})}setTotalItems(t){this.setState({totalItems:t})}setCurrentPage(t){this.setState({currentPage:t})}filterPostByProperty(t,e,s,o){this.setIsLoading(!0),this.postService.filterPostByProperty(t,e,s,o).subscribe({next:t=>{0!==t.totalRecords&&(this.setState({postList:this.fillEmpty(s-1,o,this.state.postList,t.data)}),console.log("Filtered list"),console.log(this.state.postList),console.log("Server response"),console.log(t),this.setState({totalItems:t.totalRecords}),this.setState({totalPages:t.totalPages}),this.setState({currentPage:t.pageNumber})),this.setIsLoading(!1)},error:t=>{this.setIsLoading(!1),this.store.showNotif(t.error.responseMessage,"error"),console.log(t)}})}filterInfinitePostByProperty(t,e,s,o){this.setIsLoading(!0),this.postService.filterPostByProperty(t,e,s,o).subscribe({next:t=>{t.data.length&&(this.setState({postList:this.state.postList.concat(t.data)}),this.fetchMediaBySourceID(t.data)),console.log("Filtered list"),console.log(this.state.postList),console.log("Server response"),console.log(t),this.setState({totalItems:t.totalRecords}),this.setState({totalPages:t.totalPages}),this.setState({currentPage:t.pageNumber}),this.setIsLoading(!1)},error:t=>{this.setIsLoading(!1),this.store.showNotif(t.error.responseMessage,"error"),console.log(t)}})}searchPostByProperty(t,e,s,o){this.setIsLoading(!0),this.postService.searchPostByProperty(t,e,s,o).subscribe({next:t=>{0!==t.totalRecords?this.setState({postList:this.fillEmpty(s-1,o,this.state.postList,t.data)}):this.store.showNotif("No result found!","custom"),console.log("Searched list"),console.log(this.state.postList),console.log("Server response"),console.log(t),this.setState({totalItems:t.totalRecords}),this.setState({totalPages:t.totalPages}),this.setState({currentPage:t.pageNumber}),this.setIsLoading(!1)},error:t=>{this.setIsLoading(!1),this.store.showNotif(t.error.responseMessage,"error"),console.log(t)}})}searchInfinitePostByProperty(t,e,s,o){this.setIsLoading(!0),this.postService.searchPostByProperty(t,e,s,o).subscribe({next:t=>{0!==t.totalRecords?t.data.length&&(this.setState({postList:this.state.postList.concat(t.data)}),this.fetchMediaBySourceID(t.data)):this.store.showNotif("No result found!","custome"),console.log("Infite searched list"),console.log(this.state.postList),console.log("Server response"),console.log(t),this.setState({totalItems:t.totalRecords}),this.setState({totalPages:t.totalPages}),this.setState({currentPage:t.pageNumber}),this.setIsLoading(!1)},error:t=>{this.setIsLoading(!1),this.store.showNotif(t.error.responseMessage,"error"),console.log(t)}})}sortPostByProperty(t,e,s,o){this.setIsLoading(!0),this.postService.sortPostByProperty(t,e,s,o).subscribe({next:t=>{this.setState({responseMsg:t}),this.setState({postList:this.fillEmpty(s-1,o,this.state.postList,t.data)}),this.setState({totalItems:t.totalRecords}),this.setState({totalPages:t.totalPages}),this.setState({currentPage:t.pageNumber}),console.log("Sorted list"),console.log(this.state.postList),console.log("Server response"),console.log(t),this.setIsLoading(!1)},error:t=>{this.setIsLoading(!1),this.store.showNotif(t.error.responseMessage,"error"),console.log(t)}})}sortInfinitePostByProperty(t,e,s,o){this.setIsLoading(!0),this.postService.sortPostByProperty(t,e,s,o).subscribe({next:t=>{t.data.length&&(this.setState({postList:this.state.postList.concat(t.data)}),this.fetchMediaBySourceID(t.data)),console.log("Infite sorted list"),console.log(this.state.postList),console.log("Server response"),console.log(t),this.setState({totalItems:t.totalRecords}),this.setState({totalPages:t.totalPages}),this.setState({currentPage:t.pageNumber}),this.setIsLoading(!1)},error:t=>{this.setIsLoading(!1),this.store.showNotif(t.error.responseMessage,"error"),console.log(t)}})}getPost(t){return this.setIsLoading(!0),this.postService.getPost(t).toPromise().then(t=>{this.setState({postInstance:t}),console.log(t),this.setIsLoading(!1)})}setExportData(t){this.setState({postList:t})}resetState(){this.setState(f)}}return t.\u0275fac=function(e){return new(e||t)(g.LFG(S.G),g.LFG(P.d),g.LFG(y.V))},t.\u0275prov=g.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var I=s(41612),L=s(69333),x=s(52177),b=s(86101),w=s(83584);function B(t,e){if(1&t&&(g.TgZ(0,"div"),g.TgZ(1,"div",9),g._uU(2),g.qZA(),g.qZA()),2&t){const t=g.oxw();g.xp6(2),g.Oqu(t.selectInfoText)}}function N(t,e){if(1&t&&(g.TgZ(0,"div"),g.TgZ(1,"span"),g._uU(2),g.qZA(),g.qZA()),2&t){const t=g.oxw(2);g.xp6(2),g.hij("Total Post: ",t.postList.length," ")}}function v(t,e){if(1&t){const t=g.EpF();g.ynx(0),g.TgZ(1,"dx-data-grid",10),g.NdJ("selectedRowKeysChange",function(e){return g.CHM(t),g.oxw().selectedRows=e})("onOptionChanged",function(e){return g.CHM(t),g.oxw().onOptionChanged(e)})("onSelectionChanged",function(){return g.CHM(t),g.oxw().selectionChangedHandler()})("onEditingStart",function(){return g.CHM(t),g.oxw().onEditingStart()})("onInitNewRow",function(){return g.CHM(t),g.oxw().onInitNewRow()})("onSaved",function(e){return g.CHM(t),g.oxw().onSaved(e)})("onEditCanceled",function(){return g.CHM(t),g.oxw().onEditCanceled()})("onToolbarPreparing",function(e){return g.CHM(t),g.oxw().onToolbarPreparing(e)}),g._UZ(2,"dxo-editing",11),g._UZ(3,"dxo-selection",12),g._UZ(4,"dxo-grouping",13),g._UZ(5,"dxo-column-chooser",14),g._UZ(6,"dxo-paging",15),g._UZ(7,"dxo-pager",16),g._UZ(8,"dxo-load-panel",17),g.TgZ(9,"dxi-column",18),g._UZ(10,"dxi-validation-rule",19),g.qZA(),g.TgZ(11,"dxi-column",20),g._UZ(12,"dxi-validation-rule",19),g.qZA(),g.TgZ(13,"dxi-column",21),g._UZ(14,"dxi-validation-rule",19),g.qZA(),g.YNc(15,N,3,1,"div",22),g.qZA(),g.BQk()}if(2&t){const t=g.oxw();g.xp6(1),g.Q6J("dataSource",t.postList)("showBorders",!0)("allowColumnReordering",!0)("rowAlternationEnabled",!0)("columnHidingEnabled",!0)("selectedRowKeys",t.selectedRows)("sorting",!1),g.xp6(1),g.Q6J("allowUpdating",!0)("allowDeleting",!0)("allowAdding",!0)("useIcons",!0)("selectTextOnEditStart",!0),g.xp6(1),g.Q6J("selectAllMode","page")("showCheckBoxesMode","onClick"),g.xp6(1),g.Q6J("contextMenuEnabled",!0),g.xp6(1),g.Q6J("enabled",!0),g.xp6(1),g.Q6J("pageSize",t.pageSize),g.xp6(1),g.Q6J("visible",!0)("displayMode","adaptive")("allowedPageSizes",t.allowedPageSizes)("showPageSizeSelector",!0)("showNavigationButtons",!0),g.xp6(1),g.Q6J("enabled",!0),g.xp6(7),g.Q6J("dxTemplateOf","totalPostCount")}}const D=function(){return{paddingLeft:"25px",paddingRight:"25px"}},M=[{path:"",component:(()=>{class t{constructor(t,e,s,o,i){this.postStore=t,this.store=e,this.postHTTP=s,this.subjectStore=o,this.router=i,this.subjectList=[],this.pageSize=5,this.allowedPageSizes=[5,10,15],this.scrollingMode="standard",this.currentSortProperty="title",this.currentSearchProperty="title",this.currentFilterProperty="subjectId"}onToolbarPreparing(t){t.toolbarOptions.items.unshift({location:"before",template:"totalPostCount"},{location:"after",locateInMenu:"auto",widget:"dxButton",options:{type:"normal",icon:"refresh",hint:"Fetch data from server",onClick:this.onRefresh.bind(this)}},{location:"after",locateInMenu:"auto",widget:"dxButton",options:{type:"danger",icon:"trash",hint:"Delete all items",onClick:this.deleteAll.bind(this)}},{location:"after",locateInMenu:"auto",widget:"dxButton",options:{type:"danger",icon:"parentfolder",hint:"Generate random 100+ items",onClick:this.onAddRandom.bind(this)}},{location:"after",locateInMenu:"auto",widget:"dxButton",options:{type:"normal",icon:"exportpdf",hint:"Export to PDF",onClick:this.exportGridToPdf.bind(this)}},{location:"after",locateInMenu:"auto",widget:"dxButton",options:{type:"normal",icon:"xlsxfile",hint:"Export to Excel",onClick:this.exportDataGridToExcel.bind(this)}},{location:"before",widget:"dxTextBox",options:{valueChangeEvent:"keyup",showClearButton:!0,onKeyUp:this.onSearchKeyupHandler.bind(this),onValueChanged:this.onSearchValueChanged.bind(this),mode:"search",placeholder:"Search title"}},{location:"center",locateInMenu:"auto",widget:"dxButton",options:{type:"normal",icon:"filter",disabled:!0,hint:"Filter with subject"}},{location:"center",locateInMenu:"auto",widget:"dxSelectBox",options:{items:this.subjectList,valueExpr:"id",searchExpr:"name",displayExpr:"name",placeholder:"Filter with subject",searchEnabled:!0,onValueChanged:this.onFilterChange.bind(this)}},{location:"center",locateInMenu:"auto",widget:"dxButton",options:{type:"normal",icon:"card",disabled:!0,hint:"Sort by title name"}},{location:"center",locateInMenu:"auto",widget:"dxSelectBox",options:{items:[{id:"-1",name:"(NONE)"},{id:"0",name:"asc"},{id:"1",name:"desc"}],valueExpr:"name",placeholder:"Sort by name",displayExpr:"name",onValueChanged:this.onSortValueChanged.bind(this)}})}onSearchKeyupHandler(t){clearTimeout(this.timeout),this.timeout=setTimeout(()=>{this.isSearchingByName=!0,this.isFilteringByCategory=!1,this.isSortingByName=!1,console.log(this.currentSearchByPropertyValue),""!==this.currentSearchByPropertyValue?this.postStore.initSearchByPropertyData(this.currentSearchProperty,this.currentSearchByPropertyValue,this.dataGrid.instance.pageIndex()+1,this.pageSize):(this.store.showNotif("SEARCH MODE OFF","custom"),this.onRefresh())},1250)}onSearchValueChanged(t){this.currentSearchByPropertyValue=t.value}onSortValueChanged(t){this.isSortingByName=!0,this.isSearchingByName=!1,this.isFilteringByCategory=!1,this.currentSortByPropertyValue=t.value,"(NONE)"!==t.value?this.postStore.initSortByPropertyData(this.currentSortProperty,t.value,this.dataGrid.instance.pageIndex()+1,this.pageSize):(this.store.showNotif("SORT MODE OFF","custom"),this.onRefresh())}onFilterChange(t){this.isFilteringByCategory=!0,this.isSearchingByName=!1,this.isSortingByName=!1,this.currentFilterByPropertyValue=t.value,console.log(t.value),"(NONE)"!==t.value?this.postStore.initFilterByPropertyData(this.currentFilterProperty,t.value,this.dataGrid.instance.pageIndex()+1,this.pageSize):(this.store.showNotif("FILTER MODE OFF","custom"),this.onRefresh())}checkEditorMode(){return!0===this.isFilteringByCategory?"FILTER":!0===this.isSearchingByName?"SEARCH":!0===this.isSortingByName?"SORT":"NORMAL"}onOptionChanged(t){const e=this.checkEditorMode();if("paging.pageIndex"===t.fullName){const s=t.value+1;switch(console.log(`New page index: ${s}. Total items: ${this.postList.length}`),e){case"NORMAL":this.paginatePureData(s);break;case"FILTER":this.paginateFilterData(s);break;case"SEARCH":this.paginateSearchData(s);break;case"SORT":this.paginateSortData(s)}}if("paging.pageSize"===t.fullName)switch(this.pageSize=t.value,console.log(`Page size changed to ${t.value}`),e){case"NORMAL":this.postStore.loadDataAsync(this.currentIndexFromServer,t.value),this.goToPage(this.currentIndexFromServer);break;case"FILTER":this.postStore.filterPostByProperty(this.currentFilterProperty,this.currentFilterByPropertyValue,this.currentIndexFromServer,t.value),this.goToPage(this.currentIndexFromServer);break;case"SEARCH":this.postStore.searchPostByProperty(this.currentSearchProperty,this.currentSearchByPropertyValue,this.currentIndexFromServer,t.value),this.goToPage(this.currentIndexFromServer);break;case"SORT":this.postStore.sortPostByProperty(this.currentSortProperty,this.currentSortByPropertyValue,this.currentIndexFromServer,t.value),this.goToPage(this.currentIndexFromServer)}}paginatePureData(t){this.postStore.loadDataAsync(t,this.pageSize)}paginateFilterData(t){this.postStore.filterPostByProperty(this.currentFilterProperty,this.currentFilterByPropertyValue,t,this.pageSize)}paginateSearchData(t){this.postStore.searchPostByProperty(this.currentSearchProperty,this.currentSearchByPropertyValue,t,this.pageSize)}paginateSortData(t){this.postStore.sortPostByProperty(this.currentSortProperty,this.currentSortByPropertyValue,t,this.pageSize)}onEditingStart(){this.store.showNotif("Edit mode on","custom")}onInitNewRow(){this.store.showNotif("Blank row added, please fill in information","custom")}onSaved(t){if(t.changes.length)switch(t.changes[0].type){case"insert":this.postStore.uploadPost(t.changes[0].data,this.dataGrid.instance.pageIndex()+1,this.pageSize);break;case"update":console.log(t.changes[0]),this.postStore.updatePost(t.changes[0].data,this.dataGrid.instance.pageIndex()+1,this.pageSize);break;case"remove":this.postStore.deletePost([t.changes[0].key],this.dataGrid.instance.pageIndex()+1,this.pageSize)}else this.store.showNotif("No changes dectected","custom")}onEditCanceled(){this.store.showNotif("Editing cancelled","custom")}selectionChangedHandler(){this.selectedRows.length?(this.isSelectInfoVisible=!0,this.selectInfoText=`${this.selectedRows.length} rows selected`,this.selectedRows.forEach(t=>{console.log(t)})):this.isSelectInfoVisible=!1}changePageSize(t){this.dataGrid.instance.pageSize(t)}goToPage(t){this.dataGrid.instance.pageIndex(t)}deleteSelectedItems(){this.store.setIsLoading(!0);const t=this.checkEditorMode();this.selectedRows.length&&this.postStore.confirmDialog("").then(e=>{e&&this.postHTTP.deletePost(this.selectedRows).toPromise().then(()=>{switch(this.store.showNotif(`${this.selectedRows.length} items deleted`,"custom"),this.clearSelection(),t){case"NORMAL":this.postStore.initData(this.dataGrid.instance.pageIndex()+1,this.pageSize);break;case"FILTER":this.postStore.initFilterByPropertyData(this.currentFilterProperty,this.currentFilterByPropertyValue,this.dataGrid.instance.pageIndex()+1,this.pageSize);break;case"SORT":this.postStore.initSortByPropertyData(this.currentSortProperty,this.currentSortByPropertyValue,this.dataGrid.instance.pageIndex()+1,this.pageSize);break;case"SEARCH":this.postStore.initSearchByPropertyData(this.currentSearchProperty,this.currentSearchByPropertyValue,this.dataGrid.instance.pageIndex()+1,this.pageSize)}this.isSelectInfoVisible=!1}).then(()=>{this.store.setIsLoading(!1)})})}clearSelection(){this.selectedRows=[]}onRefresh(){this.isFilteringByCategory=!1,this.isSearchingByName=!1,this.isSortingByName=!1,this.postStore.initData(this.dataGrid.instance.pageIndex()+1,this.pageSize)}onAddRandom(){this.postStore.confirmDialog("This will generate random 100+ items in database. Are you sure").then(t=>{t&&(this.isFilteringByCategory=!1,this.store.setIsLoading(!0),this.postHTTP.generateRandomPost().toPromise().then(()=>{this.postStore.initData(this.dataGrid.instance.pageIndex()+1,this.pageSize)}).then(()=>{this.store.setIsLoading(!1),this.store.showNotif("Generated 100+ random items","custom")}))})}exportDataGridToExcel(){this.postStore.confirmDialog("This will export all fetched data to excel. Are you sure?").then(t=>{t&&(this.store.setIsLoading(!0),this.postHTTP.fetchAll().toPromise().then(t=>{this.postStore.setExportData(t),console.log(t),setTimeout(()=>{const t=new h.Workbook,e=t.addWorksheet("Post List");(0,a.d)({component:this.dataGrid.instance,worksheet:e,autoFilterEnabled:!0}).then(()=>{t.xlsx.writeBuffer().then(t=>{d()(new Blob([t],{type:"application/octet-stream"}),"Post_List.xlsx"),this.store.setIsLoading(!1),this.store.showNotif("Export succesully","custom")})})},200)}))})}exportGridToPdf(t){this.postStore.confirmDialog("This will export all data to pdf. Are you sure?").then(t=>{t&&(this.store.setIsLoading(!0),this.postHTTP.fetchAll().toPromise().then(t=>{this.postStore.setExportData(t),console.log(t),setTimeout(()=>{const t=new l.jsPDF;(0,n.d)({jsPDFDocument:t,component:this.dataGrid.instance}).then(()=>{t.save("Post_List.pdf"),this.store.setIsLoading(!1),this.store.showNotif("Export succesully","custom")})},200)}))})}deleteAll(){this.postStore.deleteAll()}navigateToStatistics(){this.router.navigate(["/statistics"])}sourceDataListener(){return this.postStore.$postList.subscribe(t=>{this.postList=t})}currentPageListener(){return this.postStore.$currentPage.subscribe(t=>{this.currentIndexFromServer=t})}ngOnInit(){this.sourceDataListener(),this.currentPageListener(),this.subjectStore.fetchAll().then(t=>{0!==t.length&&(console.log("FILTER DATA: "),console.log(t),this.subjectList=t,this.subjectList.unshift({id:"(NONE)",name:"(NONE)"}),setTimeout(()=>{this.onRefresh()},150))})}ngOnDestroy(){this.sourceDataListener().unsubscribe(),this.currentPageListener().unsubscribe(),this.postStore.resetState()}}return t.\u0275fac=function(e){return new(e||t)(g.Y36(m),g.Y36(P.d),g.Y36(S.G),g.Y36(I.Z),g.Y36(i.F0))},t.\u0275cmp=g.Xpm({type:t,selectors:[["app-edit-post-list"]],viewQuery:function(t,e){if(1&t&&g.Gf(r.e,5),2&t){let t;g.iGM(t=g.CRH())&&(e.dataGrid=t.first)}},decls:9,vars:7,consts:[[3,"ngStyle"],[3,"location","text"],["location","center","locateInMenu","auto",3,"visible"],[4,"dxTemplate"],["location","center","locateInMenu","auto"],["icon","trash","type","danger","hint","Delete current selected items",3,"visible","onClick"],["location","after","locateInMenu","auto"],["icon","arrowright","type","outline","text","Statistics","hint","Navigate to Statistics",3,"onClick"],[4,"ngIf"],[2,"font-size","small"],["id","gridContainer","keyExpr","id",3,"dataSource","showBorders","allowColumnReordering","rowAlternationEnabled","columnHidingEnabled","selectedRowKeys","sorting","selectedRowKeysChange","onOptionChanged","onSelectionChanged","onEditingStart","onInitNewRow","onSaved","onEditCanceled","onToolbarPreparing"],[3,"allowUpdating","allowDeleting","allowAdding","useIcons","selectTextOnEditStart"],["mode","multiple",3,"selectAllMode","showCheckBoxesMode"],["expandMode","rowClick",3,"contextMenuEnabled"],["mode","select",3,"enabled"],[3,"pageSize"],[3,"visible","displayMode","allowedPageSizes","showPageSizeSelector","showNavigationButtons"],[3,"enabled"],["dataField","title"],["type","required"],["dataField","content"],["dataField","userAccountId"],[4,"dxTemplate","dxTemplateOf"]],template:function(t,e){1&t&&(g.TgZ(0,"dx-toolbar",0),g._UZ(1,"dxi-item",1),g.TgZ(2,"dxi-item",2),g.YNc(3,B,3,1,"div",3),g.qZA(),g.TgZ(4,"dxi-item",4),g.TgZ(5,"dx-button",5),g.NdJ("onClick",function(){return e.deleteSelectedItems()}),g.qZA(),g.qZA(),g.TgZ(6,"dxi-item",6),g.TgZ(7,"dx-button",7),g.NdJ("onClick",function(){return e.navigateToStatistics()}),g.qZA(),g.qZA(),g.qZA(),g.YNc(8,v,16,24,"ng-container",8)),2&t&&(g.Q6J("ngStyle",g.DdM(6,D)),g.xp6(1),g.Q6J("location","before")("text","Post Mananagement"),g.xp6(1),g.Q6J("visible",e.isSelectInfoVisible),g.xp6(3),g.Q6J("visible",e.isSelectInfoVisible),g.xp6(3),g.Q6J("ngIf",0!==e.subjectList.length))},directives:[L.G,o.PC,x.ZT3,b.p6,w.K,o.O5,r.e,x.Uo8,x.Lz9,x.uCj,x.Auv,x.sXh,x.ilc,x.mKI,x.qvW,x.vrV],styles:[""]}),t})()}];let C=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=g.oAB({type:t}),t.\u0275inj=g.cJS({imports:[[i.Bz.forChild(M)],i.Bz]}),t})(),R=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=g.oAB({type:t}),t.\u0275inj=g.cJS({imports:[[o.ez,C,r.x,L.k,w.e]]}),t})()}}]);