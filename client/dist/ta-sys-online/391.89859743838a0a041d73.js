(self.webpackChunkta_sys_online=self.webpackChunkta_sys_online||[]).push([[391],{13391:(t,e,s)=>{"use strict";s.r(e),s.d(e,{EditBillListModule:()=>E});var i=s(61116),o=s(15419),l=s(23167),r=s(98633),a=s(65294),n=s(23651),h=(s(52279),s(62707)),c=s(82051),g=s.n(c),d=s(8619),u=s(61305),p=s(41142),S=s(42693);let m=(()=>{class t{constructor(t){this.http=t,this.apiUrl="https://ta-sys-online-server.azurewebsites.net/api/Bill"}fetchBill(t,e){const s=(new S.LE).set("page",t).set("size",e);return console.log(s.toString()),this.http.get(this.apiUrl,{params:s,reportProgress:!0,observe:"body"})}searchBillByName(t,e,s){const i=(new S.LE).set("value",t).set("page",e).set("size",s);return console.log(i.toString()),this.http.post(this.apiUrl+"/searchByName",{},{params:i,reportProgress:!0,observe:"body"})}filterBillByPrice(t,e,s,i){const o=(new S.LE).set("criteria",t).set("value",e).set("page",s).set("size",i);return console.log(o.toString()),this.http.post(this.apiUrl,{},{params:o,reportProgress:!0,observe:"body"})}filterBillByCategory(t,e,s){const i=(new S.LE).set("value",t).set("page",e).set("size",s);return console.log(i.toString()),this.http.post(this.apiUrl+"/filterByCategory",{},{params:i,reportProgress:!0,observe:"body"})}sortBillByName(t,e,s){const i=(new S.LE).set("value",t).set("page",e).set("size",s);return console.log(i.toString()),this.http.post(this.apiUrl+"/sortByName",{},{params:i,reportProgress:!0,observe:"body"})}sortBillByPrice(t,e,s){const i=(new S.LE).set("value",t).set("page",e).set("size",s);return console.log(i.toString()),this.http.post(this.apiUrl+"/sortByPrice",{},{params:i,reportProgress:!0,observe:"body"})}uploadBill(t){return this.http.post(this.apiUrl,t,{reportProgress:!0,observe:"body"})}generateRandomBill(){return this.http.post(this.apiUrl+"/randomBill",{},{reportProgress:!0,observe:"body"})}deleteAllBills(){return this.http.post(this.apiUrl+"/deleteAll",{},{reportProgress:!0,observe:"body"})}deleteBill(t){return this.http.delete(this.apiUrl+`/${t}`,{reportProgress:!0,observe:"body"})}getBill(t){return this.http.get(this.apiUrl+`/${t}`,{reportProgress:!0,observe:"body"})}deleteSelectedBills(t){return this.http.post(this.apiUrl+"/batch",t,{reportProgress:!0,observe:"body"})}updateBill(t,e){return this.http.post(this.apiUrl+`/updateBill/${e}`,t,{reportProgress:!0,observe:"body"})}fetchAll(){return this.http.post(this.apiUrl+"/fetchAll",{},{reportProgress:!0,observe:"body"})}}return t.\u0275fac=function(e){return new(e||t)(d.LFG(S.eN))},t.\u0275prov=d.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var b=s(10418);const y={billList:[],selectedBill:{},exportData:[],totalPages:0,currentPage:0,totalItems:0,responseMsg:""};let B=(()=>{class t extends u.b{constructor(t,e){super(y),this.billService=t,this.store=e,this.$billList=this.select(t=>t.billList),this.$exportData=this.select(t=>t.exportData),this.$totalPages=this.select(t=>t.totalPages),this.$totalItems=this.select(t=>t.totalItems),this.$currentPage=this.select(t=>t.currentPage),this.$selectedBill=this.select(t=>t.selectedBill)}fillEmpty(t,e,s,i){let o=s,l=t*e;for(var r=0;r<i.length;r++)o[l]=i[r],l++;return console.log("Filled array result"),console.log(o),o}initData(t,e){this.billService.fetchBill(t,e).toPromise().then(t=>{this.setState({billList:new Array(t.totalItems)}),console.log("Current flag: pure list"),console.log(this.state.billList),this.setState({totalItems:t.totalItems}),this.setState({totalPages:t.totalPages}),this.setState({currentPage:t.currentPage})}).then(()=>{this.loadDataAsync(t,e)})}initFilterByCategoryData(t,e,s){this.store.showNotif("Filtered Mode On","custom"),this.billService.filterBillByCategory(t,0,5).toPromise().then(t=>{this.setState({billList:new Array(t.totalItems)}),console.log("Current flag: filtered list"),console.log(this.state.billList),this.setState({totalItems:t.totalItems}),this.setState({totalPages:t.totalPages}),this.setState({currentPage:t.currentPage})}).then(()=>{this.filterBillByCategory(t,e,s)})}initSearchByNameData(t,e,s){this.store.showNotif("Searched Mode On","custom"),this.billService.searchBillByName(t,0,5).toPromise().then(t=>{this.setState({billList:new Array(t.totalItems)}),console.log("Current flag: searched list"),console.log(this.state.billList),this.setState({totalItems:t.totalItems}),this.setState({totalPages:t.totalPages}),this.setState({currentPage:t.currentPage})}).then(()=>{this.searchBillByName(t,e,s)})}initSortByPriceData(t,e,s){this.store.showNotif("Sort Mode On","custom"),this.billService.sortBillByPrice(t,0,5).toPromise().then(t=>{this.setState({billList:new Array(t.totalItems)}),console.log("Current flag: sort list"),console.log(this.state.billList),this.setState({totalItems:t.totalItems}),this.setState({totalPages:t.totalPages}),this.setState({currentPage:t.currentPage})}).then(()=>{this.sortBillByPrice(t,e,s)})}initSortByName(t,e,s){this.store.showNotif("Sort Mode On","custom"),this.billService.sortBillByName(t,0,5).toPromise().then(t=>{this.setState({billList:new Array(t.totalItems)}),console.log("Current flag: sort list"),console.log(this.state.billList),this.setState({totalItems:t.totalItems}),this.setState({totalPages:t.totalPages}),this.setState({currentPage:t.currentPage})}).then(()=>{this.sortBillByName(t,e,s)})}loadDataAsync(t,e){this.setIsLoading(!0),this.billService.fetchBill(t,e).subscribe({next:s=>{this.setState({billList:this.fillEmpty(t,e,this.state.billList,s.items)}),console.log("Pure list"),console.log(this.state.billList),console.log("Server response"),console.log(s),this.setState({totalItems:s.totalItems}),this.setState({totalPages:s.totalPages}),this.setState({currentPage:s.currentPage}),this.setIsLoading(!1)},error:t=>{this.setIsLoading(!1),this.store.showNotif(t.error.responseMessage,"error"),console.log(t)}})}refresh(t,e){this.setIsLoading(!0),this.billService.fetchBill(t,e).subscribe({next:s=>{this.setState({billList:this.fillEmpty(t,e,this.state.billList,s.items)}),this.setState({totalItems:s.totalItems}),this.setState({totalPages:s.totalPages}),this.setState({currentPage:s.currentPage}),console.log("Pure list"),console.log(this.state.billList),console.log("Server response"),console.log(s),this.store.showNotif("Refresh successfully","custom"),this.setIsLoading(!1)},error:t=>{this.setIsLoading(!1),this.store.showNotif(t.error.responseMessage,"error"),console.log(t)}})}setIsLoading(t){this.store.setIsLoading(t)}uploadBill(t,e,s){this.confirmDialog("").then(i=>{i&&(this.setIsLoading(!0),this.billService.uploadBill(t).subscribe({next:t=>{this.setState({responseMsg:t}),this.setTotalItems(this.state.totalItems+1),console.log(t),this.loadDataAsync(e,s),this.setIsLoading(!1),this.store.showNotif(t.responseMessage,"custom")},error:t=>{this.setIsLoading(!1),this.store.showNotif(t.error.responseMessage,"error"),console.log(t)}}))})}updateBill(t,e,s,i){this.confirmDialog("").then(o=>{o&&(this.setIsLoading(!0),this.billService.updateBill(t,e).subscribe({next:t=>{this.setState({responseMsg:t}),console.log(t),this.loadDataAsync(s,i),this.setIsLoading(!1),this.store.showNotif(t.responseMessage,"custom")},error:t=>{this.setIsLoading(!1),this.store.showNotif(t.error.responseMessage,"error"),console.log(t)}}))})}confirmDialog(t){return(0,p.iG)(""!=t?`<b>${t}</b>`:"<b>Are you sure?</b>","Confirm changes")}deleteSelectedBills(t,e,s){this.confirmDialog("").then(i=>{i&&(this.setIsLoading(!0),this.billService.deleteSelectedBills(t).subscribe({next:t=>{this.setState({responseMsg:t}),console.log(t),this.loadDataAsync(e,s),console.log(this.state.billList),this.setIsLoading(!1),this.store.showNotif(t.responseMessage,"custom")},error:t=>{this.setIsLoading(!1),this.store.showNotif(t.error.responseMessage,"error"),console.log(t)}}))})}deleteAllBills(){this.confirmDialog("Delete all items?").then(t=>{t&&(this.setIsLoading(!0),this.billService.deleteAllBills().subscribe({next:t=>{this.setState({responseMsg:t}),this.setState({billList:[]}),this.setState({totalPages:0}),this.setState({currentPage:0}),this.setState({totalItems:0}),console.log(t),this.setIsLoading(!1),this.store.showNotif(t.responseMessage,"custom")},error:t=>{this.setIsLoading(!1),this.store.showNotif(t.error.responseMessage,"error"),console.log(t)}}))})}deleteBill(t,e,s){this.confirmDialog("").then(i=>{i&&(this.setIsLoading(!0),this.billService.deleteBill(t).subscribe({next:t=>{this.setState({responseMsg:t}),this.setTotalItems(this.state.totalItems-1),console.log(t),this.loadDataAsync(e,s),this.setIsLoading(!1),this.store.showNotif(t.responseMessage,"custom")},error:t=>{this.setIsLoading(!1),this.store.showNotif(t.error.responseMessage,"error"),console.log(t)}}))})}selectBill(t){this.setState({selectedBill:t})}setTotalPages(t){this.setState({totalPages:t})}setTotalItems(t){this.setState({totalItems:t})}setCurrentPage(t){this.setState({currentPage:t})}filterBillByPrice(t,e,s,i){this.setIsLoading(!0),this.billService.filterBillByPrice(t,e,s,i).subscribe({next:t=>{this.setState({responseMsg:t}),this.setState({billList:this.fillEmpty(s,i,this.state.billList,t.items)}),this.setState({totalItems:t.totalItems}),this.setState({totalPages:t.totalPages}),this.setState({currentPage:t.currentPage}),this.setIsLoading(!1)},error:t=>{this.setIsLoading(!1),this.store.showNotif(t.error.responseMessage,"error"),console.log(t)}})}filterBillByCategory(t,e,s){this.setIsLoading(!0),this.billService.filterBillByCategory(t,e,s).subscribe({next:t=>{this.setState({billList:this.fillEmpty(e,s,this.state.billList,t.items)}),console.log("Filtered list"),console.log(this.state.billList),console.log("Server response"),console.log(t),this.setState({totalItems:t.totalItems}),this.setState({totalPages:t.totalPages}),this.setState({currentPage:t.currentPage}),this.setIsLoading(!1)},error:t=>{this.setIsLoading(!1),this.store.showNotif(t.error.responseMessage,"error"),console.log(t)}})}searchBillByName(t,e,s){this.setIsLoading(!0),this.billService.searchBillByName(t,e,s).subscribe({next:t=>{this.setState({billList:this.fillEmpty(e,s,this.state.billList,t.items)}),console.log("Searched list"),console.log(this.state.billList),console.log("Server response"),console.log(t),this.setState({totalItems:t.totalItems}),this.setState({totalPages:t.totalPages}),this.setState({currentPage:t.currentPage}),this.setIsLoading(!1)},error:t=>{this.setIsLoading(!1),this.store.showNotif(t.error.responseMessage,"error"),console.log(t)}})}sortBillByName(t,e,s){this.setIsLoading(!0),this.billService.sortBillByName(t,e,s).subscribe({next:t=>{this.setState({responseMsg:t}),this.setState({billList:this.fillEmpty(e,s,this.state.billList,t.items)}),this.setState({totalItems:t.totalItems}),this.setState({totalPages:t.totalPages}),this.setState({currentPage:t.currentPage}),console.log("Sorted list"),console.log(this.state.billList),console.log("Server response"),console.log(t),this.setIsLoading(!1)},error:t=>{this.setIsLoading(!1),this.store.showNotif(t.error.responseMessage,"error"),console.log(t)}})}sortBillByPrice(t,e,s){this.setIsLoading(!0),this.billService.sortBillByPrice(t,e,s).subscribe({next:t=>{this.setState({responseMsg:t}),this.setState({billList:this.fillEmpty(e,s,this.state.billList,t.items)}),this.setState({totalItems:t.totalItems}),this.setState({totalPages:t.totalPages}),this.setState({currentPage:t.currentPage}),console.log("Sorted list"),console.log(this.state.billList),console.log("Server response"),console.log(t),this.setIsLoading(!1)},error:t=>{this.setIsLoading(!1),this.store.showNotif(t.error.responseMessage,"error"),console.log(t)}})}setExportData(t){this.setState({billList:t})}}return t.\u0275fac=function(e){return new(e||t)(d.LFG(m),d.LFG(b.d))},t.\u0275prov=d.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var f=s(69333),I=s(52177),x=s(86101),P=s(83584);function w(t,e){if(1&t&&(d.TgZ(0,"div"),d.TgZ(1,"div",23),d._uU(2),d.qZA(),d.qZA()),2&t){const t=d.oxw();d.xp6(2),d.Oqu(t.selectInfoText)}}function L(t,e){if(1&t&&(d.TgZ(0,"div"),d.TgZ(1,"span"),d._uU(2),d.qZA(),d.qZA()),2&t){const t=d.oxw();d.xp6(2),d.hij("Total Bill: ",t.billList.length," ")}}const v=function(){return{paddingLeft:"25px",paddingRight:"25px"}},N=[{path:"",component:(()=>{class t{constructor(t,e,s,i){this.billStore=t,this.store=e,this.billHTTP=s,this.router=i,this.healthInsuranceList=[{_id:"-1",name:"(NONE)"},{_id:"0",name:"YES"},{_id:"1",name:"NO"}],this.pageSize=5,this.allowedPageSizes=[5,10,15],this.scrollingMode="standard"}onToolbarPreparing(t){t.toolbarOptions.items.unshift({location:"before",template:"totalBillCount"},{location:"after",locateInMenu:"auto",widget:"dxButton",options:{type:"normal",icon:"refresh",hint:"Fetch data from server",onClick:this.onRefresh.bind(this)}},{location:"after",locateInMenu:"auto",widget:"dxButton",options:{type:"danger",icon:"trash",hint:"Delete all items",onClick:this.deleteAll.bind(this)}},{location:"after",locateInMenu:"auto",widget:"dxButton",options:{type:"danger",icon:"parentfolder",hint:"Generate random 100+ items",onClick:this.onAddRandom.bind(this)}},{location:"after",locateInMenu:"auto",widget:"dxButton",options:{type:"normal",icon:"exportpdf",hint:"Export to PDF",onClick:this.exportGridToPdf.bind(this)}},{location:"after",locateInMenu:"auto",widget:"dxButton",options:{type:"normal",icon:"xlsxfile",hint:"Export to Excel",onClick:this.exportDataGridToExcel.bind(this)}},{location:"before",widget:"dxTextBox",options:{valueChangeEvent:"keyup",showClearButton:!0,onKeyUp:this.onSearchKeyupHandler.bind(this),onValueChanged:this.onSearchValueChanged.bind(this),mode:"search",placeholder:"Search id"}},{location:"center",locateInMenu:"auto",widget:"dxButton",options:{type:"normal",icon:"filter",disabled:!0,hint:"Filter with health insurance"}},{location:"center",locateInMenu:"auto",widget:"dxSelectBox",options:{items:this.healthInsuranceList,valueExpr:"name",displayExpr:"name",placeholder:"Filter with health insurance",onValueChanged:this.onFilterChange.bind(this)}},{location:"center",locateInMenu:"auto",widget:"dxButton",options:{type:"normal",icon:"card",disabled:!0,hint:"Sort by total cost"}},{location:"center",locateInMenu:"auto",widget:"dxSelectBox",options:{items:[{_id:"-1",name:"(NONE)"},{_id:"0",name:"ASC"},{_id:"1",name:"DESC"}],valueExpr:"name",placeholder:"Sort by total cost",displayExpr:"name",onValueChanged:this.onSortValueChanged.bind(this)}})}onSearchKeyupHandler(t){clearTimeout(this.timeout),this.timeout=setTimeout(()=>{this.isSearchingByName=!0,this.isFilteringByCategory=!1,this.isSortingByName=!1,console.log(this.currentSearchByNameValue),""!==this.currentSearchByNameValue?this.billStore.initSearchByNameData(this.currentSearchByNameValue,this.dataGrid.instance.pageIndex(),this.pageSize):(this.store.showNotif("SEARCH MODE OFF","custom"),this.onRefresh())},1250)}onSearchValueChanged(t){this.currentSearchByNameValue=t.value}onSortValueChanged(t){this.isSortingByName=!0,this.isSearchingByName=!1,this.isFilteringByCategory=!1,this.currentSortByPriceValue=t.value,"(NONE)"!==t.value?this.billStore.initSortByPriceData(t.value,this.dataGrid.instance.pageIndex(),this.pageSize):(this.store.showNotif("SORT MODE OFF","custom"),this.onRefresh())}onFilterChange(t){this.isFilteringByCategory=!0,this.isSearchingByName=!1,this.isSortingByName=!1,this.currentCategoryFilterValue=t.value,console.log(t.value),"(NONE)"!==t.value?this.billStore.initFilterByCategoryData(t.value,this.dataGrid.instance.pageIndex(),this.pageSize):(this.store.showNotif("FILTER MODE OFF","custom"),this.onRefresh())}checkEditorMode(){return!0===this.isFilteringByCategory?"FILTER":!0===this.isSearchingByName?"SEARCH":!0===this.isSortingByName?"SORT":"NORMAL"}onOptionChanged(t){const e=this.checkEditorMode();if("paging.pageIndex"===t.fullName){const s=t.value;switch(console.log(`New page index: ${s}. Total items: ${this.billList.length}`),e){case"NORMAL":this.paginatePureData(s);break;case"FILTER":this.paginateFilterData(s);break;case"SEARCH":this.paginateSearchData(s);break;case"SORT":this.paginateSortData(s)}}if("paging.pageSize"===t.fullName)switch(this.pageSize=t.value,console.log(`Page size changed to ${t.value}`),e){case"NORMAL":this.billStore.loadDataAsync(this.currentIndexFromServer,t.value),this.goToPage(this.currentIndexFromServer);break;case"FILTER":this.billStore.filterBillByCategory(this.currentCategoryFilterValue,this.currentIndexFromServer,t.value),this.goToPage(this.currentIndexFromServer);break;case"SEARCH":this.billStore.searchBillByName(this.currentSearchByNameValue,this.currentIndexFromServer,t.value),this.goToPage(this.currentIndexFromServer);break;case"SORT":this.billStore.sortBillByPrice(this.currentSortByPriceValue,this.currentIndexFromServer,t.value),this.goToPage(this.currentIndexFromServer)}}paginatePureData(t){0===t?(this.billStore.loadDataAsync(t,this.pageSize),this.billStore.loadDataAsync(t+1,this.pageSize)):(this.billStore.loadDataAsync(t,this.pageSize),this.billStore.loadDataAsync(t+1,this.pageSize),this.billStore.loadDataAsync(t-1,this.pageSize))}paginateFilterData(t){0===t?(this.billStore.filterBillByCategory(this.currentCategoryFilterValue,t,this.pageSize),this.billStore.filterBillByCategory(this.currentCategoryFilterValue,t+1,this.pageSize)):(this.billStore.filterBillByCategory(this.currentCategoryFilterValue,t,this.pageSize),this.billStore.filterBillByCategory(this.currentCategoryFilterValue,t+1,this.pageSize),this.billStore.filterBillByCategory(this.currentCategoryFilterValue,t-1,this.pageSize))}paginateSearchData(t){0===t?(this.billStore.searchBillByName(this.currentSearchByNameValue,t,this.pageSize),this.billStore.searchBillByName(this.currentSearchByNameValue,t+1,this.pageSize)):(this.billStore.searchBillByName(this.currentSearchByNameValue,t,this.pageSize),this.billStore.searchBillByName(this.currentSearchByNameValue,t+1,this.pageSize),this.billStore.searchBillByName(this.currentSearchByNameValue,t-1,this.pageSize))}paginateSortData(t){0===t?(this.billStore.sortBillByPrice(this.currentSortByPriceValue,t,this.pageSize),this.billStore.sortBillByPrice(this.currentSortByPriceValue,t+1,this.pageSize)):(this.billStore.sortBillByPrice(this.currentSortByPriceValue,t,this.pageSize),this.billStore.sortBillByPrice(this.currentSortByPriceValue,t+1,this.pageSize),this.billStore.sortBillByPrice(this.currentSortByPriceValue,t-1,this.pageSize))}onEditingStart(){this.store.showNotif("Edit mode on","custom")}onInitNewRow(){this.store.showNotif("Blank row added, please fill in information","custom")}onSaved(t){if(t.changes.length)switch(t.changes[0].type){case"insert":this.billStore.uploadBill(t.changes[0].data,this.dataGrid.instance.pageIndex(),this.pageSize);break;case"update":console.log(t.changes[0]),this.billStore.updateBill(t.changes[0].data,t.changes[0].key,this.dataGrid.instance.pageIndex(),this.pageSize);break;case"remove":this.billStore.deleteBill(t.changes[0].key,this.dataGrid.instance.pageIndex(),this.pageSize)}else this.store.showNotif("No changes dectected","custom")}onEditCanceled(){this.store.showNotif("Editing cancelled","custom")}selectionChangedHandler(){this.selectedRows.length?(this.isSelectInfoVisible=!0,this.selectInfoText=`${this.selectedRows.length} rows selected`,this.selectedRows.forEach(t=>{console.log(t)})):this.isSelectInfoVisible=!1}changePageSize(t){this.dataGrid.instance.pageSize(t)}goToPage(t){this.dataGrid.instance.pageIndex(t)}deleteSelectedItems(){this.store.setIsLoading(!0);const t=this.checkEditorMode();this.selectedRows.length&&this.billStore.confirmDialog("").then(e=>{e&&this.billHTTP.deleteSelectedBills(this.selectedRows).toPromise().then(()=>{switch(this.store.showNotif(`${this.selectedRows.length} items deleted`,"custom"),this.clearSelection(),t){case"NORMAL":this.billStore.initData(this.dataGrid.instance.pageIndex(),this.pageSize);break;case"FILTER":this.billStore.initFilterByCategoryData(this.currentCategoryFilterValue,this.dataGrid.instance.pageIndex(),this.pageSize);break;case"SORT":this.billStore.initSortByPriceData(this.currentSortByPriceValue,this.dataGrid.instance.pageIndex(),this.pageSize);break;case"SEARCH":this.billStore.initSearchByNameData(this.currentSearchByNameValue,this.dataGrid.instance.pageIndex(),this.pageSize)}this.isSelectInfoVisible=!1}).then(()=>{this.store.setIsLoading(!1)})})}clearSelection(){this.selectedRows=[]}onRefresh(){this.isFilteringByCategory=!1,this.isSearchingByName=!1,this.isSortingByName=!1,this.billStore.initData(this.dataGrid.instance.pageIndex(),this.pageSize)}onAddRandom(){this.billStore.confirmDialog("This will generate random 100+ items in database. Are you sure").then(t=>{t&&(this.isFilteringByCategory=!1,this.store.setIsLoading(!0),this.billHTTP.generateRandomBill().toPromise().then(()=>{this.billStore.initData(this.dataGrid.instance.pageIndex(),this.pageSize)}).then(()=>{this.store.setIsLoading(!1),this.store.showNotif("Generated 100+ random items","custom")}))})}exportDataGridToExcel(){this.billStore.confirmDialog("This will export all fetched data to excel. Are you sure?").then(t=>{t&&(this.store.setIsLoading(!0),this.billHTTP.fetchAll().toPromise().then(t=>{this.billStore.setExportData(t),console.log(t),setTimeout(()=>{const t=new h.Workbook,e=t.addWorksheet("Bill List");(0,r.d)({component:this.dataGrid.instance,worksheet:e,autoFilterEnabled:!0}).then(()=>{t.xlsx.writeBuffer().then(t=>{g()(new Blob([t],{type:"application/octet-stream"}),"Bill_List.xlsx"),this.store.setIsLoading(!1),this.store.showNotif("Export succesully","custom")})})},200)}))})}exportGridToPdf(t){this.billStore.confirmDialog("This will export all data to pdf. Are you sure?").then(t=>{t&&(this.store.setIsLoading(!0),this.billHTTP.fetchAll().toPromise().then(t=>{this.billStore.setExportData(t),console.log(t),setTimeout(()=>{const t=new n.jsPDF;(0,a.d)({jsPDFDocument:t,component:this.dataGrid.instance}).then(()=>{t.save("Bill_List.pdf"),this.store.setIsLoading(!1),this.store.showNotif("Export succesully","custom")})},200)}))})}deleteAll(){this.billStore.deleteAllBills()}navigateToStatistics(){this.router.navigate(["/statistics"])}sourceDataListener(){return this.billStore.$billList.subscribe(t=>{this.billList=t})}currentPageListener(){return this.billStore.$currentPage.subscribe(t=>{this.currentIndexFromServer=t})}ngOnInit(){this.sourceDataListener(),this.currentPageListener(),setTimeout(()=>{this.onRefresh()},150)}ngOnDestroy(){this.sourceDataListener().unsubscribe(),this.currentPageListener().unsubscribe(),this.onRefresh()}}return t.\u0275fac=function(e){return new(e||t)(d.Y36(B),d.Y36(b.d),d.Y36(m),d.Y36(o.F0))},t.\u0275cmp=d.Xpm({type:t,selectors:[["app-edit-bill-list"]],viewQuery:function(t,e){if(1&t&&d.Gf(l.e,5),2&t){let t;d.iGM(t=d.CRH())&&(e.dataGrid=t.first)}},decls:26,vars:35,consts:[[3,"ngStyle"],[3,"location","text"],["location","center","locateInMenu","auto",3,"visible"],[4,"dxTemplate"],["location","center","locateInMenu","auto"],["icon","trash","type","danger","hint","Delete current selected items",3,"visible","onClick"],["location","after","locateInMenu","auto"],["icon","arrowright","type","outline","text","Statistics","hint","Navigate to Statistics",3,"onClick"],["id","gridContainer","keyExpr","_id",3,"dataSource","showBorders","allowColumnReordering","rowAlternationEnabled","columnHidingEnabled","selectedRowKeys","sorting","selectedRowKeysChange","onOptionChanged","onSelectionChanged","onEditingStart","onInitNewRow","onSaved","onEditCanceled","onToolbarPreparing"],[3,"allowUpdating","allowDeleting","allowAdding","useIcons","selectTextOnEditStart"],["mode","multiple",3,"selectAllMode","showCheckBoxesMode"],["expandMode","rowClick",3,"contextMenuEnabled"],["mode","select",3,"enabled"],[3,"pageSize"],[3,"visible","displayMode","allowedPageSizes","showPageSizeSelector","showNavigationButtons"],[3,"enabled"],["dataField","prescriptionID",3,"width"],["type","required"],["dataField","learnerID",3,"width"],["dataField","totalCost","dataType","number",3,"width"],["dataField","healthInsurance",3,"caption"],["displayExpr","name","valueExpr","name",3,"dataSource"],[4,"dxTemplate","dxTemplateOf"],[2,"font-size","small"]],template:function(t,e){1&t&&(d.TgZ(0,"dx-toolbar",0),d._UZ(1,"dxi-item",1),d.TgZ(2,"dxi-item",2),d.YNc(3,w,3,1,"div",3),d.qZA(),d.TgZ(4,"dxi-item",4),d.TgZ(5,"dx-button",5),d.NdJ("onClick",function(){return e.deleteSelectedItems()}),d.qZA(),d.qZA(),d.TgZ(6,"dxi-item",6),d.TgZ(7,"dx-button",7),d.NdJ("onClick",function(){return e.navigateToStatistics()}),d.qZA(),d.qZA(),d.qZA(),d.TgZ(8,"dx-data-grid",8),d.NdJ("selectedRowKeysChange",function(t){return e.selectedRows=t})("onOptionChanged",function(t){return e.onOptionChanged(t)})("onSelectionChanged",function(){return e.selectionChangedHandler()})("onEditingStart",function(){return e.onEditingStart()})("onInitNewRow",function(){return e.onInitNewRow()})("onSaved",function(t){return e.onSaved(t)})("onEditCanceled",function(){return e.onEditCanceled()})("onToolbarPreparing",function(t){return e.onToolbarPreparing(t)}),d._UZ(9,"dxo-editing",9),d._UZ(10,"dxo-selection",10),d._UZ(11,"dxo-grouping",11),d._UZ(12,"dxo-column-chooser",12),d._UZ(13,"dxo-paging",13),d._UZ(14,"dxo-pager",14),d._UZ(15,"dxo-load-panel",15),d.TgZ(16,"dxi-column",16),d._UZ(17,"dxi-validation-rule",17),d.qZA(),d.TgZ(18,"dxi-column",18),d._UZ(19,"dxi-validation-rule",17),d.qZA(),d.TgZ(20,"dxi-column",19),d._UZ(21,"dxi-validation-rule",17),d.qZA(),d.TgZ(22,"dxi-column",20),d._UZ(23,"dxi-validation-rule",17),d._UZ(24,"dxo-lookup",21),d.qZA(),d.YNc(25,L,3,1,"div",22),d.qZA()),2&t&&(d.Q6J("ngStyle",d.DdM(34,v)),d.xp6(1),d.Q6J("location","before")("text","Bill Mananagement"),d.xp6(1),d.Q6J("visible",e.isSelectInfoVisible),d.xp6(3),d.Q6J("visible",e.isSelectInfoVisible),d.xp6(3),d.Q6J("dataSource",e.billList)("showBorders",!0)("allowColumnReordering",!0)("rowAlternationEnabled",!0)("columnHidingEnabled",!0)("selectedRowKeys",e.selectedRows)("sorting",!1),d.xp6(1),d.Q6J("allowUpdating",!0)("allowDeleting",!0)("allowAdding",!0)("useIcons",!0)("selectTextOnEditStart",!0),d.xp6(1),d.Q6J("selectAllMode","page")("showCheckBoxesMode","onClick"),d.xp6(1),d.Q6J("contextMenuEnabled",!0),d.xp6(1),d.Q6J("enabled",!0),d.xp6(1),d.Q6J("pageSize",e.pageSize),d.xp6(1),d.Q6J("visible",!0)("displayMode","adaptive")("allowedPageSizes",e.allowedPageSizes)("showPageSizeSelector",!0)("showNavigationButtons",!0),d.xp6(1),d.Q6J("enabled",!0),d.xp6(1),d.Q6J("width",150),d.xp6(2),d.Q6J("width",150),d.xp6(2),d.Q6J("width",100),d.xp6(2),d.Q6J("caption","Health Insurance"),d.xp6(2),d.Q6J("dataSource",e.healthInsuranceList),d.xp6(1),d.Q6J("dxTemplateOf","totalBillCount"))},directives:[f.G,i.PC,I.ZT3,x.p6,P.K,l.e,I.Uo8,I.Lz9,I.uCj,I.Auv,I.sXh,I.ilc,I.mKI,I.qvW,I.vrV,I.w3U],styles:[""]}),t})()}];let C=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=d.oAB({type:t}),t.\u0275inj=d.cJS({imports:[[o.Bz.forChild(N)],o.Bz]}),t})(),E=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=d.oAB({type:t}),t.\u0275inj=d.cJS({imports:[[i.ez,C,l.x,f.k,P.e]]}),t})()}}]);