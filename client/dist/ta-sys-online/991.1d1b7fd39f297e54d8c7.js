(self.webpackChunkta_sys_online=self.webpackChunkta_sys_online||[]).push([[991],{7991:(t,e,i)=>{"use strict";i.r(e),i.d(e,{EditInstructorListModule:()=>z});var r=i(61116),o=i(15419),n=i(23167),a=i(98633),s=i(65294),c=i(23651),l=(i(52279),i(62707)),d=i(82051),h=i.n(d),u=i(76740),g=i(8619),p=i(29146),S=i(60310),m=i(24203),x=i(69333),y=i(52177),f=i(86101),w=i(83584);function I(t,e){if(1&t&&(g.TgZ(0,"div"),g.TgZ(1,"div",27),g._uU(2),g.qZA(),g.qZA()),2&t){const t=g.oxw();g.xp6(2),g.Oqu(t.selectInfoText)}}function B(t,e){if(1&t&&(g.TgZ(0,"div"),g.TgZ(1,"span"),g._uU(2),g.qZA(),g.qZA()),2&t){const t=g.oxw();g.xp6(2),g.hij("Total Instructor: ",t.instructorList.length," ")}}const C=function(){return{paddingLeft:"25px",paddingRight:"25px"}},T=function(){return{name:"Male"}},b=function(){return{name:"Female"}},N=function(t,e){return[t,e]},v=function(){return{name:"Instructor"}},E=function(){return{name:"Nurses"}},F=function(){return{name:"Assistants"}},D=function(t,e,i){return[t,e,i]},P=[{path:"",component:(()=>{class t{constructor(t,e,i,r){this.instructorStore=t,this.store=e,this.instructorHTTP=i,this.router=r,this.departmentList=(0,u.Z)(),this.pageSize=5,this.allowedPageSizes=[5,10,15],this.scrollingMode="standard"}onToolbarPreparing(t){t.toolbarOptions.items.unshift({location:"before",template:"totalinstructorCount"},{location:"after",locateInMenu:"auto",widget:"dxButton",options:{type:"normal",icon:"refresh",hint:"Fetch data from server",onClick:this.onRefresh.bind(this)}},{location:"after",locateInMenu:"auto",widget:"dxButton",options:{type:"danger",icon:"trash",hint:"Delete all items",onClick:this.deleteAll.bind(this)}},{location:"after",locateInMenu:"auto",widget:"dxButton",options:{type:"danger",icon:"parentfolder",hint:"Generate random 10 items",onClick:this.onAddRandom.bind(this)}},{location:"after",locateInMenu:"auto",widget:"dxButton",options:{type:"normal",icon:"exportpdf",hint:"Export to PDF",onClick:this.exportGridToPdf.bind(this)}},{location:"after",locateInMenu:"auto",widget:"dxButton",options:{type:"normal",icon:"xlsxfile",hint:"Export to Excel",onClick:this.exportDataGridToExcel.bind(this)}},{location:"before",widget:"dxTextBox",options:{valueChangeEvent:"keyup",showClearButton:!0,onKeyUp:this.onSearchKeyupHandler.bind(this),onValueChanged:this.onSearchValueChanged.bind(this),mode:"search",placeholder:"Search name"}},{location:"center",locateInMenu:"auto",widget:"dxButton",options:{type:"normal",icon:"filter",disabled:!0,hint:"Filter with department"}},{location:"center",locateInMenu:"auto",widget:"dxSelectBox",options:{items:this.departmentList,valueExpr:"name",displayExpr:"name",placeholder:"Filter with department",onValueChanged:this.onFilterChange.bind(this)}},{location:"center",locateInMenu:"auto",widget:"dxButton",options:{type:"normal",icon:"card",disabled:!0,hint:"Sort by age"}},{location:"center",locateInMenu:"auto",widget:"dxSelectBox",options:{items:[{_id:"-1",name:"(NONE)"},{_id:"0",name:"ASC"},{_id:"1",name:"DESC"}],valueExpr:"name",placeholder:"Sort by age",displayExpr:"name",onValueChanged:this.onSortValueChanged.bind(this)}})}onSearchKeyupHandler(t){clearTimeout(this.timeout),this.timeout=setTimeout(()=>{this.isSearchingByName=!0,this.isFilteringByCategory=!1,this.isSortingByName=!1,console.log(this.currentSearchByNameValue),""!==this.currentSearchByNameValue?this.instructorStore.initSearchByNameData(this.currentSearchByNameValue,this.dataGrid.instance.pageIndex(),this.pageSize):(this.store.showNotif("SEARCH MODE OFF","custom"),this.onRefresh())},1250)}onSearchValueChanged(t){this.currentSearchByNameValue=t.value}onSortValueChanged(t){this.isSortingByName=!0,this.isSearchingByName=!1,this.isFilteringByCategory=!1,this.currentSortByPriceValue=t.value,"(NONE)"!==t.value?this.instructorStore.initSortByPriceData(t.value,this.dataGrid.instance.pageIndex(),this.pageSize):(this.store.showNotif("SORT MODE OFF","custom"),this.onRefresh())}onFilterChange(t){this.isFilteringByCategory=!0,this.isSearchingByName=!1,this.isSortingByName=!1,this.currentCategoryFilterValue=t.value,console.log(t.value),"(NONE)"!==t.value?this.instructorStore.initFilterByCategoryData(t.value,this.dataGrid.instance.pageIndex(),this.pageSize):(this.store.showNotif("FILTER MODE OFF","custom"),this.onRefresh())}checkEditorMode(){return!0===this.isFilteringByCategory?"FILTER":!0===this.isSearchingByName?"SEARCH":!0===this.isSortingByName?"SORT":"NORMAL"}onOptionChanged(t){const e=this.checkEditorMode();if("paging.pageIndex"===t.fullName){const i=t.value;switch(console.log(`New page index: ${i}. Total items: ${this.instructorList.length}`),e){case"NORMAL":this.paginatePureData(i);break;case"FILTER":this.paginateFilterData(i);break;case"SEARCH":this.paginateSearchData(i);break;case"SORT":this.paginateSortData(i)}}if("paging.pageSize"===t.fullName)switch(this.pageSize=t.value,console.log(`Page size changed to ${t.value}`),e){case"NORMAL":this.instructorStore.loadDataAsync(this.currentIndexFromServer,t.value),this.goToPage(this.currentIndexFromServer);break;case"FILTER":this.instructorStore.filterInstructorByCategory(this.currentCategoryFilterValue,this.currentIndexFromServer,t.value),this.goToPage(this.currentIndexFromServer);break;case"SEARCH":this.instructorStore.searchInstructorByName(this.currentSearchByNameValue,this.currentIndexFromServer,t.value),this.goToPage(this.currentIndexFromServer);break;case"SORT":this.instructorStore.sortInstructorByPrice(this.currentSortByPriceValue,this.currentIndexFromServer,t.value),this.goToPage(this.currentIndexFromServer)}}paginatePureData(t){0===t?(this.instructorStore.loadDataAsync(t,this.pageSize),this.instructorStore.loadDataAsync(t+1,this.pageSize)):(this.instructorStore.loadDataAsync(t,this.pageSize),this.instructorStore.loadDataAsync(t+1,this.pageSize),this.instructorStore.loadDataAsync(t-1,this.pageSize))}paginateFilterData(t){0===t?(this.instructorStore.filterInstructorByCategory(this.currentCategoryFilterValue,t,this.pageSize),this.instructorStore.filterInstructorByCategory(this.currentCategoryFilterValue,t+1,this.pageSize)):(this.instructorStore.filterInstructorByCategory(this.currentCategoryFilterValue,t,this.pageSize),this.instructorStore.filterInstructorByCategory(this.currentCategoryFilterValue,t+1,this.pageSize),this.instructorStore.filterInstructorByCategory(this.currentCategoryFilterValue,t-1,this.pageSize))}paginateSearchData(t){0===t?(this.instructorStore.searchInstructorByName(this.currentSearchByNameValue,t,this.pageSize),this.instructorStore.searchInstructorByName(this.currentSearchByNameValue,t+1,this.pageSize)):(this.instructorStore.searchInstructorByName(this.currentSearchByNameValue,t,this.pageSize),this.instructorStore.searchInstructorByName(this.currentSearchByNameValue,t+1,this.pageSize),this.instructorStore.searchInstructorByName(this.currentSearchByNameValue,t-1,this.pageSize))}paginateSortData(t){0===t?(this.instructorStore.sortInstructorByPrice(this.currentSortByPriceValue,t,this.pageSize),this.instructorStore.sortInstructorByPrice(this.currentSortByPriceValue,t+1,this.pageSize)):(this.instructorStore.sortInstructorByPrice(this.currentSortByPriceValue,t,this.pageSize),this.instructorStore.sortInstructorByPrice(this.currentSortByPriceValue,t+1,this.pageSize),this.instructorStore.sortInstructorByPrice(this.currentSortByPriceValue,t-1,this.pageSize))}onEditingStart(){this.store.showNotif("Edit mode on","custom")}onInitNewRow(){this.store.showNotif("Blank row added, please fill in information","custom")}onSaved(t){if(t.changes.length)switch(t.changes[0].type){case"insert":this.instructorStore.uploadInstructor(t.changes[0].data,this.dataGrid.instance.pageIndex(),this.pageSize);break;case"update":console.log(t.changes[0]),this.instructorStore.updateInstructor(t.changes[0].data,t.changes[0].key,this.dataGrid.instance.pageIndex(),this.pageSize);break;case"remove":this.instructorStore.deleteInstructor(t.changes[0].key,this.dataGrid.instance.pageIndex(),this.pageSize)}else this.store.showNotif("No changes dectected","custom")}onEditCanceled(){this.store.showNotif("Editing cancelled","custom")}selectionChangedHandler(){this.selectedRows.length?(this.isSelectInfoVisible=!0,this.selectInfoText=`${this.selectedRows.length} rows selected`,this.selectedRows.forEach(t=>{console.log(t)})):this.isSelectInfoVisible=!1}changePageSize(t){this.dataGrid.instance.pageSize(t)}goToPage(t){this.dataGrid.instance.pageIndex(t)}deleteSelectedItems(){this.store.setIsLoading(!0);const t=this.checkEditorMode();this.selectedRows.length&&this.instructorStore.confirmDialog("").then(e=>{e&&this.instructorHTTP.deleteSelectedInstructors(this.selectedRows).toPromise().then(()=>{switch(this.store.showNotif(`${this.selectedRows.length} items deleted`,"custom"),this.clearSelection(),t){case"NORMAL":this.instructorStore.initData(this.dataGrid.instance.pageIndex(),this.pageSize);break;case"FILTER":this.instructorStore.initFilterByCategoryData(this.currentCategoryFilterValue,this.dataGrid.instance.pageIndex(),this.pageSize);break;case"SORT":this.instructorStore.initSortByPriceData(this.currentSortByPriceValue,this.dataGrid.instance.pageIndex(),this.pageSize);break;case"SEARCH":this.instructorStore.initSearchByNameData(this.currentSearchByNameValue,this.dataGrid.instance.pageIndex(),this.pageSize)}this.isSelectInfoVisible=!1}).then(()=>{this.store.setIsLoading(!1)})})}clearSelection(){this.selectedRows=[]}onRefresh(){this.isFilteringByCategory=!1,this.isSearchingByName=!1,this.isSortingByName=!1,this.instructorStore.initData(this.dataGrid.instance.pageIndex(),this.pageSize)}onAddRandom(){this.instructorStore.confirmDialog("This will generate random 10 items in database. Are you sure").then(t=>{t&&(this.isFilteringByCategory=!1,this.store.setIsLoading(!0),this.instructorHTTP.generateRandomInstructor().toPromise().then(()=>{this.instructorStore.initData(this.dataGrid.instance.pageIndex(),this.pageSize)}).then(()=>{this.store.setIsLoading(!1),this.store.showNotif("Generated 10 random items","custom")}))})}exportDataGridToExcel(){this.instructorStore.confirmDialog("This will export all fetched data to excel. Are you sure?").then(t=>{t&&(this.store.setIsLoading(!0),this.instructorHTTP.fetchAll().toPromise().then(t=>{this.instructorStore.setExportData(t),console.log(t),setTimeout(()=>{const t=new l.Workbook,e=t.addWorksheet("instructor List");(0,a.d)({component:this.dataGrid.instance,worksheet:e,autoFilterEnabled:!0}).then(()=>{t.xlsx.writeBuffer().then(t=>{h()(new Blob([t],{type:"application/octet-stream"}),"instructor_List.xlsx"),this.store.setIsLoading(!1),this.store.showNotif("Export succesully","custom")})})},200)}))})}exportGridToPdf(t){this.instructorStore.confirmDialog("This will export all data to pdf. Are you sure?").then(t=>{t&&(this.store.setIsLoading(!0),this.instructorHTTP.fetchAll().toPromise().then(t=>{this.instructorStore.setExportData(t),console.log(t),setTimeout(()=>{const t=new c.jsPDF;(0,s.d)({jsPDFDocument:t,component:this.dataGrid.instance}).then(()=>{t.save("instructor_List.pdf"),this.store.setIsLoading(!1),this.store.showNotif("Export succesully","custom")})},200)}))})}deleteAll(){this.instructorStore.deleteAllInstructors()}navigateToEditSchedule(){this.router.navigate(["/edit_schedule"])}sourceDataListener(){return this.instructorStore.$instructorList.subscribe(t=>{this.instructorList=t})}currentPageListener(){return this.instructorStore.$currentPage.subscribe(t=>{this.currentIndexFromServer=t})}ngOnInit(){this.sourceDataListener(),this.currentPageListener(),setTimeout(()=>{this.onRefresh()},150)}ngOnDestroy(){this.sourceDataListener().unsubscribe(),this.currentPageListener().unsubscribe(),this.onRefresh()}}return t.\u0275fac=function(e){return new(e||t)(g.Y36(p.Y),g.Y36(S.d),g.Y36(m.o),g.Y36(o.F0))},t.\u0275cmp=g.Xpm({type:t,selectors:[["app-edit-instructor-list"]],viewQuery:function(t,e){if(1&t&&g.Gf(n.e,5),2&t){let t;g.iGM(t=g.CRH())&&(e.dataGrid=t.first)}},decls:33,vars:52,consts:[[3,"ngStyle"],[3,"location","text"],["location","center","locateInMenu","auto",3,"visible"],[4,"dxTemplate"],["location","center","locateInMenu","auto"],["icon","trash","type","danger","hint","Delete current selected items",3,"visible","onClick"],["location","after","locateInMenu","auto"],["icon","arrowright","type","outline","text","Schedule Management","hint","Navigate to Edit Schedule",3,"onClick"],["id","gridContainer","keyExpr","_id",3,"dataSource","showBorders","allowColumnReordering","rowAlternationEnabled","columnHidingEnabled","selectedRowKeys","sorting","selectedRowKeysChange","onOptionChanged","onSelectionChanged","onEditingStart","onInitNewRow","onSaved","onEditCanceled","onToolbarPreparing"],[3,"allowUpdating","allowDeleting","allowAdding","useIcons","selectTextOnEditStart"],["mode","multiple",3,"selectAllMode","showCheckBoxesMode"],["expandMode","rowClick",3,"contextMenuEnabled"],["mode","select",3,"enabled"],[3,"pageSize"],[3,"visible","displayMode","allowedPageSizes","showPageSizeSelector","showNavigationButtons"],[3,"enabled"],["dataField","userName",3,"width","allowEditing"],["dataField","fullName"],["type","required"],["dataField","age","dataType","number",3,"width"],["dataField","department",3,"width","caption"],["displayExpr","name","valueExpr","name",3,"dataSource"],["dataField","gender",3,"width"],["dataField","role",3,"width"],["dataField","yearsOfExperience"],["dataField","description"],[4,"dxTemplate","dxTemplateOf"],[2,"font-size","small"]],template:function(t,e){1&t&&(g.TgZ(0,"dx-toolbar",0),g._UZ(1,"dxi-item",1),g.TgZ(2,"dxi-item",2),g.YNc(3,I,3,1,"div",3),g.qZA(),g.TgZ(4,"dxi-item",4),g.TgZ(5,"dx-button",5),g.NdJ("onClick",function(){return e.deleteSelectedItems()}),g.qZA(),g.qZA(),g.TgZ(6,"dxi-item",6),g.TgZ(7,"dx-button",7),g.NdJ("onClick",function(){return e.navigateToEditSchedule()}),g.qZA(),g.qZA(),g.qZA(),g.TgZ(8,"dx-data-grid",8),g.NdJ("selectedRowKeysChange",function(t){return e.selectedRows=t})("onOptionChanged",function(t){return e.onOptionChanged(t)})("onSelectionChanged",function(){return e.selectionChangedHandler()})("onEditingStart",function(){return e.onEditingStart()})("onInitNewRow",function(){return e.onInitNewRow()})("onSaved",function(t){return e.onSaved(t)})("onEditCanceled",function(){return e.onEditCanceled()})("onToolbarPreparing",function(t){return e.onToolbarPreparing(t)}),g._UZ(9,"dxo-editing",9),g._UZ(10,"dxo-selection",10),g._UZ(11,"dxo-grouping",11),g._UZ(12,"dxo-column-chooser",12),g._UZ(13,"dxo-paging",13),g._UZ(14,"dxo-pager",14),g._UZ(15,"dxo-load-panel",15),g._UZ(16,"dxi-column",16),g.TgZ(17,"dxi-column",17),g._UZ(18,"dxi-validation-rule",18),g.qZA(),g.TgZ(19,"dxi-column",19),g._UZ(20,"dxi-validation-rule",18),g.qZA(),g.TgZ(21,"dxi-column",20),g._UZ(22,"dxi-validation-rule",18),g._UZ(23,"dxo-lookup",21),g.qZA(),g.TgZ(24,"dxi-column",22),g._UZ(25,"dxi-validation-rule",18),g._UZ(26,"dxo-lookup",21),g.qZA(),g.TgZ(27,"dxi-column",23),g._UZ(28,"dxi-validation-rule",18),g._UZ(29,"dxo-lookup",21),g.qZA(),g._UZ(30,"dxi-column",24),g._UZ(31,"dxi-column",25),g.YNc(32,B,3,1,"div",26),g.qZA()),2&t&&(g.Q6J("ngStyle",g.DdM(39,C)),g.xp6(1),g.Q6J("location","before")("text","Instructor Mananagement"),g.xp6(1),g.Q6J("visible",e.isSelectInfoVisible),g.xp6(3),g.Q6J("visible",e.isSelectInfoVisible),g.xp6(3),g.Q6J("dataSource",e.instructorList)("showBorders",!0)("allowColumnReordering",!0)("rowAlternationEnabled",!0)("columnHidingEnabled",!0)("selectedRowKeys",e.selectedRows)("sorting",!1),g.xp6(1),g.Q6J("allowUpdating",!0)("allowDeleting",!0)("allowAdding",!0)("useIcons",!0)("selectTextOnEditStart",!0),g.xp6(1),g.Q6J("selectAllMode","page")("showCheckBoxesMode","onClick"),g.xp6(1),g.Q6J("contextMenuEnabled",!0),g.xp6(1),g.Q6J("enabled",!0),g.xp6(1),g.Q6J("pageSize",e.pageSize),g.xp6(1),g.Q6J("visible",!0)("displayMode","adaptive")("allowedPageSizes",e.allowedPageSizes)("showPageSizeSelector",!0)("showNavigationButtons",!0),g.xp6(1),g.Q6J("enabled",!0),g.xp6(1),g.Q6J("width",100)("allowEditing",!1),g.xp6(3),g.Q6J("width",60),g.xp6(2),g.Q6J("width",150)("caption","Department"),g.xp6(2),g.Q6J("dataSource",e.departmentList),g.xp6(1),g.Q6J("width",75),g.xp6(2),g.Q6J("dataSource",g.WLB(42,N,g.DdM(40,T),g.DdM(41,b))),g.xp6(1),g.Q6J("width",100),g.xp6(2),g.Q6J("dataSource",g.kEZ(48,D,g.DdM(45,v),g.DdM(46,E),g.DdM(47,F))),g.xp6(3),g.Q6J("dxTemplateOf","totalInstructorCount"))},directives:[x.G,r.PC,y.ZT3,f.p6,w.K,n.e,y.Uo8,y.Lz9,y.uCj,y.Auv,y.sXh,y.ilc,y.mKI,y.qvW,y.vrV,y.w3U],styles:[""]}),t})()}];let Z=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=g.oAB({type:t}),t.\u0275inj=g.cJS({imports:[[o.Bz.forChild(P)],o.Bz]}),t})(),z=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=g.oAB({type:t}),t.\u0275inj=g.cJS({imports:[[r.ez,Z,n.x,x.k,w.e]]}),t})()}}]);