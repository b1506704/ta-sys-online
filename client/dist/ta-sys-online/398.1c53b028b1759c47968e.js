(self.webpackChunkta_sys_online=self.webpackChunkta_sys_online||[]).push([[398],{20398:(e,t,i)=>{"use strict";i.r(t),i.d(t,{EditLearnerModule:()=>E});var a=i(61116),r=i(15419),n=i(23167),o=i(98633),s=i(65294),l=i(23651),d=(i(52279),i(62707)),h=i(82051),c=i.n(h),u=i(8619),g=i(14484),p=i(60310),S=i(81683),m=i(69333),x=i(52177),y=i(86101),w=i(83584);function f(e,t){if(1&e&&(u.TgZ(0,"div"),u.TgZ(1,"div",29),u._uU(2),u.qZA(),u.qZA()),2&e){const e=u.oxw();u.xp6(2),u.Oqu(e.selectInfoText)}}function B(e,t){if(1&e&&(u.TgZ(0,"div"),u.TgZ(1,"span"),u._uU(2),u.qZA(),u.qZA()),2&e){const e=u.oxw();u.xp6(2),u.hij("Total Learner: ",e.learnerList.length," ")}}const C=function(){return{paddingLeft:"25px",paddingRight:"25px"}},T=function(){return[]},b=function(){return{name:"Male"}},I=function(){return{name:"Female"}},v=function(e,t){return[e,t]},N=[{path:"",component:(()=>{class e{constructor(e,t,i,a){this.learnerStore=e,this.store=t,this.learnerHTTP=i,this.router=a,this.pageSize=5,this.allowedPageSizes=[5,10,15],this.scrollingMode="standard"}onToolbarPreparing(e){e.toolbarOptions.items.unshift({location:"before",template:"totalLearnerCount"},{location:"after",locateInMenu:"auto",widget:"dxButton",options:{type:"normal",icon:"refresh",hint:"Fetch data from server",onClick:this.onRefresh.bind(this)}},{location:"after",locateInMenu:"auto",widget:"dxButton",options:{type:"danger",icon:"trash",hint:"Delete all items",onClick:this.deleteAll.bind(this)}},{location:"after",locateInMenu:"auto",widget:"dxButton",options:{type:"danger",icon:"parentfolder",hint:"Generate random 10 items",onClick:this.onAddRandom.bind(this)}},{location:"after",locateInMenu:"auto",widget:"dxButton",options:{type:"normal",icon:"exportpdf",hint:"Export to PDF",onClick:this.exportGridToPdf.bind(this)}},{location:"after",locateInMenu:"auto",widget:"dxButton",options:{type:"normal",icon:"xlsxfile",hint:"Export to Excel",onClick:this.exportDataGridToExcel.bind(this)}},{location:"before",widget:"dxTextBox",options:{valueChangeEvent:"keyup",showClearButton:!0,onKeyUp:this.onSearchKeyupHandler.bind(this),onValueChanged:this.onSearchValueChanged.bind(this),mode:"search",placeholder:"Search name"}},{location:"center",locateInMenu:"auto",widget:"dxButton",options:{type:"normal",icon:"filter",disabled:!0,hint:"Filter with blood type"}},{location:"center",locateInMenu:"auto",widget:"dxSelectBox",options:{valueExpr:"name",displayExpr:"name",placeholder:"Filter with blood type",onValueChanged:this.onFilterChange.bind(this)}},{location:"center",locateInMenu:"auto",widget:"dxButton",options:{type:"normal",icon:"card",disabled:!0,hint:"Sort by age"}},{location:"center",locateInMenu:"auto",widget:"dxSelectBox",options:{items:[{_id:"-1",name:"(NONE)"},{_id:"0",name:"ASC"},{_id:"1",name:"DESC"}],valueExpr:"name",placeholder:"Sort by age",displayExpr:"name",onValueChanged:this.onSortValueChanged.bind(this)}})}onSearchKeyupHandler(e){clearTimeout(this.timeout),this.timeout=setTimeout(()=>{this.isSearchingByName=!0,this.isFilteringByCategory=!1,this.isSortingByName=!1,console.log(this.currentSearchByNameValue),""!==this.currentSearchByNameValue?this.learnerStore.initSearchByNameData(this.currentSearchByNameValue,this.dataGrid.instance.pageIndex(),this.pageSize):(this.store.showNotif("SEARCH MODE OFF","custom"),this.onRefresh())},1250)}onSearchValueChanged(e){this.currentSearchByNameValue=e.value}onSortValueChanged(e){this.isSortingByName=!0,this.isSearchingByName=!1,this.isFilteringByCategory=!1,this.currentSortByPriceValue=e.value,"(NONE)"!==e.value?this.learnerStore.initSortByPriceData(e.value,this.dataGrid.instance.pageIndex(),this.pageSize):(this.store.showNotif("SORT MODE OFF","custom"),this.onRefresh())}onFilterChange(e){this.isFilteringByCategory=!0,this.isSearchingByName=!1,this.isSortingByName=!1,this.currentCategoryFilterValue=e.value,console.log(e.value),"-1"!==e.value?this.learnerStore.initFilterByCategoryData(e.value,this.dataGrid.instance.pageIndex(),this.pageSize):(this.store.showNotif("FILTER MODE OFF","custom"),this.onRefresh())}checkEditorMode(){return!0===this.isFilteringByCategory?"FILTER":!0===this.isSearchingByName?"SEARCH":!0===this.isSortingByName?"SORT":"NORMAL"}onOptionChanged(e){const t=this.checkEditorMode();if("paging.pageIndex"===e.fullName){const i=e.value;switch(console.log(`New page index: ${i}. Total items: ${this.learnerList.length}`),t){case"NORMAL":this.paginatePureData(i);break;case"FILTER":this.paginateFilterData(i);break;case"SEARCH":this.paginateSearchData(i);break;case"SORT":this.paginateSortData(i)}}if("paging.pageSize"===e.fullName)switch(this.pageSize=e.value,console.log(`Page size changed to ${e.value}`),t){case"NORMAL":this.learnerStore.loadDataAsync(this.currentIndexFromServer,e.value),this.goToPage(this.currentIndexFromServer);break;case"FILTER":this.learnerStore.filterLearnerByCategory(this.currentCategoryFilterValue,this.currentIndexFromServer,e.value),this.goToPage(this.currentIndexFromServer);break;case"SEARCH":this.learnerStore.searchLearnerByName(this.currentSearchByNameValue,this.currentIndexFromServer,e.value),this.goToPage(this.currentIndexFromServer);break;case"SORT":this.learnerStore.sortLearnerByPrice(this.currentSortByPriceValue,this.currentIndexFromServer,e.value),this.goToPage(this.currentIndexFromServer)}}paginatePureData(e){0===e?(this.learnerStore.loadDataAsync(e,this.pageSize),this.learnerStore.loadDataAsync(e+1,this.pageSize)):(this.learnerStore.loadDataAsync(e,this.pageSize),this.learnerStore.loadDataAsync(e+1,this.pageSize),this.learnerStore.loadDataAsync(e-1,this.pageSize))}paginateFilterData(e){0===e?(this.learnerStore.filterLearnerByCategory(this.currentCategoryFilterValue,e,this.pageSize),this.learnerStore.filterLearnerByCategory(this.currentCategoryFilterValue,e+1,this.pageSize)):(this.learnerStore.filterLearnerByCategory(this.currentCategoryFilterValue,e,this.pageSize),this.learnerStore.filterLearnerByCategory(this.currentCategoryFilterValue,e+1,this.pageSize),this.learnerStore.filterLearnerByCategory(this.currentCategoryFilterValue,e-1,this.pageSize))}paginateSearchData(e){0===e?(this.learnerStore.searchLearnerByName(this.currentSearchByNameValue,e,this.pageSize),this.learnerStore.searchLearnerByName(this.currentSearchByNameValue,e+1,this.pageSize)):(this.learnerStore.searchLearnerByName(this.currentSearchByNameValue,e,this.pageSize),this.learnerStore.searchLearnerByName(this.currentSearchByNameValue,e+1,this.pageSize),this.learnerStore.searchLearnerByName(this.currentSearchByNameValue,e-1,this.pageSize))}paginateSortData(e){0===e?(this.learnerStore.sortLearnerByPrice(this.currentSortByPriceValue,e,this.pageSize),this.learnerStore.sortLearnerByPrice(this.currentSortByPriceValue,e+1,this.pageSize)):(this.learnerStore.sortLearnerByPrice(this.currentSortByPriceValue,e,this.pageSize),this.learnerStore.sortLearnerByPrice(this.currentSortByPriceValue,e+1,this.pageSize),this.learnerStore.sortLearnerByPrice(this.currentSortByPriceValue,e-1,this.pageSize))}onEditingStart(){this.store.showNotif("Edit mode on","custom")}onInitNewRow(){this.store.showNotif("Blank row added, please fill in information","custom")}onSaved(e){if(e.changes.length)switch(e.changes[0].type){case"insert":this.learnerStore.uploadLearner(e.changes[0].data,this.dataGrid.instance.pageIndex(),this.pageSize);break;case"update":console.log(e.changes[0]),this.learnerStore.updateLearner(e.changes[0].data,e.changes[0].key,this.dataGrid.instance.pageIndex(),this.pageSize);break;case"remove":this.learnerStore.deleteLearner(e.changes[0].key,this.dataGrid.instance.pageIndex(),this.pageSize)}else this.store.showNotif("No changes dectected","custom")}onEditCanceled(){this.store.showNotif("Editing cancelled","custom")}selectionChangedHandler(){this.selectedRows.length?(this.isSelectInfoVisible=!0,this.selectInfoText=`${this.selectedRows.length} rows selected`,this.selectedRows.forEach(e=>{console.log(e)})):this.isSelectInfoVisible=!1}changePageSize(e){this.dataGrid.instance.pageSize(e)}goToPage(e){this.dataGrid.instance.pageIndex(e)}deleteSelectedItems(){this.store.setIsLoading(!0);const e=this.checkEditorMode();this.selectedRows.length&&this.learnerStore.confirmDialog("").then(t=>{t&&this.learnerHTTP.deleteSelectedLearners(this.selectedRows).toPromise().then(()=>{switch(this.store.showNotif(`${this.selectedRows.length} items deleted`,"custom"),this.clearSelection(),e){case"NORMAL":this.learnerStore.initData(this.dataGrid.instance.pageIndex(),this.pageSize);break;case"FILTER":this.learnerStore.initFilterByCategoryData(this.currentCategoryFilterValue,this.dataGrid.instance.pageIndex(),this.pageSize);break;case"SORT":this.learnerStore.initSortByPriceData(this.currentSortByPriceValue,this.dataGrid.instance.pageIndex(),this.pageSize);break;case"SEARCH":this.learnerStore.initSearchByNameData(this.currentSearchByNameValue,this.dataGrid.instance.pageIndex(),this.pageSize)}this.isSelectInfoVisible=!1}).then(()=>{this.store.setIsLoading(!1)})})}clearSelection(){this.selectedRows=[]}onRefresh(){this.isFilteringByCategory=!1,this.isSearchingByName=!1,this.isSortingByName=!1,this.learnerStore.initData(this.dataGrid.instance.pageIndex(),this.pageSize)}onAddRandom(){this.learnerStore.confirmDialog("This will generate random 10 items in database. Are you sure").then(e=>{e&&(this.isFilteringByCategory=!1,this.store.setIsLoading(!0),this.learnerHTTP.generateRandomLearner().toPromise().then(()=>{this.learnerStore.initData(this.dataGrid.instance.pageIndex(),this.pageSize)}).then(()=>{this.store.setIsLoading(!1),this.store.showNotif("Generated 10 random items","custom")}))})}exportDataGridToExcel(){this.learnerStore.confirmDialog("This will export all fetched data to excel. Are you sure?").then(e=>{e&&(this.store.setIsLoading(!0),this.learnerHTTP.fetchAll().toPromise().then(e=>{this.learnerStore.setExportData(e),console.log(e),setTimeout(()=>{const e=new d.Workbook,t=e.addWorksheet("Learner List");(0,o.d)({component:this.dataGrid.instance,worksheet:t,autoFilterEnabled:!0}).then(()=>{e.xlsx.writeBuffer().then(e=>{c()(new Blob([e],{type:"application/octet-stream"}),"Learner_List.xlsx"),this.store.setIsLoading(!1),this.store.showNotif("Export succesully","custom")})})},200)}))})}exportGridToPdf(e){this.learnerStore.confirmDialog("This will export all data to pdf. Are you sure?").then(e=>{e&&(this.store.setIsLoading(!0),this.learnerHTTP.fetchAll().toPromise().then(e=>{this.learnerStore.setExportData(e),console.log(e),setTimeout(()=>{const e=new l.jsPDF;(0,s.d)({jsPDFDocument:e,component:this.dataGrid.instance}).then(()=>{e.save("Learner_List.pdf"),this.store.setIsLoading(!1),this.store.showNotif("Export succesully","custom")})},200)}))})}deleteAll(){this.learnerStore.deleteAllLearners()}navigateToEditInstructor(){this.router.navigate(["/edit_instructor_list"])}sourceDataListener(){return this.learnerStore.$learnerList.subscribe(e=>{this.learnerList=e})}currentPageListener(){return this.learnerStore.$currentPage.subscribe(e=>{this.currentIndexFromServer=e})}ngOnInit(){this.sourceDataListener(),this.currentPageListener(),setTimeout(()=>{this.onRefresh()},150)}ngOnDestroy(){this.sourceDataListener().unsubscribe(),this.currentPageListener().unsubscribe(),this.onRefresh()}}return e.\u0275fac=function(t){return new(t||e)(u.Y36(g.H),u.Y36(p.d),u.Y36(S.N),u.Y36(r.F0))},e.\u0275cmp=u.Xpm({type:e,selectors:[["app-edit-learner-list"]],viewQuery:function(e,t){if(1&e&&u.Gf(n.e,5),2&e){let e;u.iGM(e=u.CRH())&&(t.dataGrid=e.first)}},decls:36,vars:49,consts:[[3,"ngStyle"],[3,"location","text"],["location","center","locateInMenu","auto",3,"visible"],[4,"dxTemplate"],["location","center","locateInMenu","auto"],["icon","trash","type","danger","hint","Delete current selected items",3,"visible","onClick"],["location","after","locateInMenu","auto"],["icon","arrowright","type","outline","text","Instructor Management","hint","Navigate to Edit Instructor",3,"onClick"],["id","gridContainer","keyExpr","_id",3,"dataSource","showBorders","allowColumnReordering","rowAlternationEnabled","columnHidingEnabled","selectedRowKeys","sorting","selectedRowKeysChange","onOptionChanged","onSelectionChanged","onEditingStart","onInitNewRow","onSaved","onEditCanceled","onToolbarPreparing"],[3,"allowUpdating","allowDeleting","allowAdding","useIcons","selectTextOnEditStart"],["mode","multiple",3,"selectAllMode","showCheckBoxesMode"],["expandMode","rowClick",3,"contextMenuEnabled"],["mode","select",3,"enabled"],[3,"pageSize"],[3,"visible","displayMode","allowedPageSizes","showPageSizeSelector","showNavigationButtons"],[3,"enabled"],["dataField","userName",3,"width","allowEditing"],["dataField","fullName"],["type","required"],["dataField","assignedRoom",3,"width","allowEditing"],["dataField","age","dataType","number",3,"width"],["dataField","height","dataType","number",3,"width"],["dataField","weight","dataType","number",3,"width"],["dataField","bloodType",3,"width","caption"],["displayExpr","name","valueExpr","name",3,"dataSource"],["dataField","gender",3,"width"],["dataField","occupation",3,"width"],["dataField","address"],[4,"dxTemplate","dxTemplateOf"],[2,"font-size","small"]],template:function(e,t){1&e&&(u.TgZ(0,"dx-toolbar",0),u._UZ(1,"dxi-item",1),u.TgZ(2,"dxi-item",2),u.YNc(3,f,3,1,"div",3),u.qZA(),u.TgZ(4,"dxi-item",4),u.TgZ(5,"dx-button",5),u.NdJ("onClick",function(){return t.deleteSelectedItems()}),u.qZA(),u.qZA(),u.TgZ(6,"dxi-item",6),u.TgZ(7,"dx-button",7),u.NdJ("onClick",function(){return t.navigateToEditInstructor()}),u.qZA(),u.qZA(),u.qZA(),u.TgZ(8,"dx-data-grid",8),u.NdJ("selectedRowKeysChange",function(e){return t.selectedRows=e})("onOptionChanged",function(e){return t.onOptionChanged(e)})("onSelectionChanged",function(){return t.selectionChangedHandler()})("onEditingStart",function(){return t.onEditingStart()})("onInitNewRow",function(){return t.onInitNewRow()})("onSaved",function(e){return t.onSaved(e)})("onEditCanceled",function(){return t.onEditCanceled()})("onToolbarPreparing",function(e){return t.onToolbarPreparing(e)}),u._UZ(9,"dxo-editing",9),u._UZ(10,"dxo-selection",10),u._UZ(11,"dxo-grouping",11),u._UZ(12,"dxo-column-chooser",12),u._UZ(13,"dxo-paging",13),u._UZ(14,"dxo-pager",14),u._UZ(15,"dxo-load-panel",15),u._UZ(16,"dxi-column",16),u.TgZ(17,"dxi-column",17),u._UZ(18,"dxi-validation-rule",18),u.qZA(),u._UZ(19,"dxi-column",19),u.TgZ(20,"dxi-column",20),u._UZ(21,"dxi-validation-rule",18),u.qZA(),u.TgZ(22,"dxi-column",21),u._UZ(23,"dxi-validation-rule",18),u.qZA(),u.TgZ(24,"dxi-column",22),u._UZ(25,"dxi-validation-rule",18),u.qZA(),u.TgZ(26,"dxi-column",23),u._UZ(27,"dxi-validation-rule",18),u._UZ(28,"dxo-lookup",24),u.qZA(),u.TgZ(29,"dxi-column",25),u._UZ(30,"dxi-validation-rule",18),u._UZ(31,"dxo-lookup",24),u.qZA(),u.TgZ(32,"dxi-column",26),u._UZ(33,"dxi-validation-rule",18),u.qZA(),u._UZ(34,"dxi-column",27),u.YNc(35,B,3,1,"div",28),u.qZA()),2&e&&(u.Q6J("ngStyle",u.DdM(42,C)),u.xp6(1),u.Q6J("location","before")("text","Learner Mananagement"),u.xp6(1),u.Q6J("visible",t.isSelectInfoVisible),u.xp6(3),u.Q6J("visible",t.isSelectInfoVisible),u.xp6(3),u.Q6J("dataSource",t.learnerList)("showBorders",!0)("allowColumnReordering",!0)("rowAlternationEnabled",!0)("columnHidingEnabled",!0)("selectedRowKeys",t.selectedRows)("sorting",!1),u.xp6(1),u.Q6J("allowUpdating",!0)("allowDeleting",!0)("allowAdding",!0)("useIcons",!0)("selectTextOnEditStart",!0),u.xp6(1),u.Q6J("selectAllMode","page")("showCheckBoxesMode","onClick"),u.xp6(1),u.Q6J("contextMenuEnabled",!0),u.xp6(1),u.Q6J("enabled",!0),u.xp6(1),u.Q6J("pageSize",t.pageSize),u.xp6(1),u.Q6J("visible",!0)("displayMode","adaptive")("allowedPageSizes",t.allowedPageSizes)("showPageSizeSelector",!0)("showNavigationButtons",!0),u.xp6(1),u.Q6J("enabled",!0),u.xp6(1),u.Q6J("width",100)("allowEditing",!1),u.xp6(3),u.Q6J("width",100)("allowEditing",!1),u.xp6(1),u.Q6J("width",60),u.xp6(2),u.Q6J("width",60),u.xp6(2),u.Q6J("width",60),u.xp6(2),u.Q6J("width",65)("caption","B.Type"),u.xp6(2),u.Q6J("dataSource",u.DdM(43,T)),u.xp6(1),u.Q6J("width",75),u.xp6(2),u.Q6J("dataSource",u.WLB(46,v,u.DdM(44,b),u.DdM(45,I))),u.xp6(1),u.Q6J("width",100),u.xp6(3),u.Q6J("dxTemplateOf","totalLearnerCount"))},directives:[m.G,a.PC,x.ZT3,y.p6,w.K,n.e,x.Uo8,x.Lz9,x.uCj,x.Auv,x.sXh,x.ilc,x.mKI,x.qvW,x.vrV,x.w3U],styles:[""]}),e})()}];let L=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=u.oAB({type:e}),e.\u0275inj=u.cJS({imports:[[r.Bz.forChild(N)],r.Bz]}),e})(),E=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=u.oAB({type:e}),e.\u0275inj=u.cJS({imports:[[a.ez,L,n.x,m.k,w.e]]}),e})()}}]);