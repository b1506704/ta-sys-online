(self.webpackChunkta_sys_online=self.webpackChunkta_sys_online||[]).push([[824],{41824:(e,t,i)=>{"use strict";i.r(t),i.d(t,{EditUserInfoModule:()=>E});var o=i(61116),n=i(15419),r=i(47592),s=i(98633),a=i(65294),l=i(23651),d=(i(52279),i(62707)),c=i(82051),h=i.n(c),u=i(8619),g=i(4670),p=i(86150),f=i(15756),S=i(69333),x=i(52177),y=i(86101),m=i(83584);function I(e,t){if(1&e&&(u.TgZ(0,"div"),u.TgZ(1,"div",9),u._uU(2),u.qZA(),u.qZA()),2&e){const e=u.oxw();u.xp6(2),u.Oqu(e.selectInfoText)}}function w(e,t){1&e&&(u.ynx(0),u._UZ(1,"dxi-column",27),u.BQk()),2&e&&(u.xp6(1),u.Q6J("width",150))}function P(e,t){if(1&e&&(u.TgZ(0,"div"),u.TgZ(1,"span"),u._uU(2),u.qZA(),u.qZA()),2&e){const e=u.oxw(2);u.xp6(2),u.hij("Total UserInfo: ",e.userInfoList.length," ")}}function b(e,t){if(1&e){const e=u.EpF();u.ynx(0),u.TgZ(1,"dx-data-grid",10),u.NdJ("selectedRowKeysChange",function(t){return u.CHM(e),u.oxw().selectedRows=t})("onOptionChanged",function(t){return u.CHM(e),u.oxw().onOptionChanged(t)})("onSelectionChanged",function(){return u.CHM(e),u.oxw().selectionChangedHandler()})("onEditingStart",function(){return u.CHM(e),u.oxw().onEditingStart()})("onInitNewRow",function(){return u.CHM(e),u.oxw().onInitNewRow()})("onSaved",function(t){return u.CHM(e),u.oxw().onSaved(t)})("onEditCanceled",function(){return u.CHM(e),u.oxw().onEditCanceled()})("onToolbarPreparing",function(t){return u.CHM(e),u.oxw().onToolbarPreparing(t)}),u._UZ(2,"dxo-editing",11),u._UZ(3,"dxo-selection",12),u._UZ(4,"dxo-grouping",13),u._UZ(5,"dxo-column-chooser",14),u._UZ(6,"dxo-paging",15),u._UZ(7,"dxo-pager",16),u._UZ(8,"dxo-load-panel",17),u._UZ(9,"dxi-column",18),u.TgZ(10,"dxi-column",19),u._UZ(11,"dxi-validation-rule",20),u._UZ(12,"dxo-lookup",21),u.qZA(),u._UZ(13,"dxi-column",22),u._UZ(14,"dxi-column",23),u._UZ(15,"dxi-column",24),u._UZ(16,"dxi-column",25),u.YNc(17,w,2,1,"ng-container",8),u.YNc(18,P,3,1,"div",26),u.qZA(),u.BQk()}if(2&e){const e=u.oxw();u.xp6(1),u.Q6J("dataSource",e.userInfoList)("showBorders",!0)("allowColumnReordering",!0)("rowAlternationEnabled",!0)("columnHidingEnabled",!0)("selectedRowKeys",e.selectedRows)("sorting",!1),u.xp6(1),u.Q6J("allowUpdating",!0)("allowDeleting",!0)("allowAdding",!0)("useIcons",!0)("selectTextOnEditStart",!0),u.xp6(1),u.Q6J("selectAllMode","page")("showCheckBoxesMode","onClick"),u.xp6(1),u.Q6J("contextMenuEnabled",!0),u.xp6(1),u.Q6J("enabled",!0),u.xp6(1),u.Q6J("pageSize",e.pageSize),u.xp6(1),u.Q6J("visible",!0)("displayMode","adaptive")("allowedPageSizes",e.allowedPageSizes)("showPageSizeSelector",!0)("showNavigationButtons",!0),u.xp6(1),u.Q6J("enabled",!0),u.xp6(2),u.Q6J("caption","Gender"),u.xp6(2),u.Q6J("dataSource",e.genderList),u.xp6(5),u.Q6J("ngIf",e.isAddingNewRow),u.xp6(1),u.Q6J("dxTemplateOf","totalUserInfoCount")}}const B=function(){return{paddingLeft:"25px",paddingRight:"25px"}},C=[{path:"",component:(()=>{class e{constructor(e,t,i,o){this.userInfoStore=e,this.store=t,this.userInfoHTTP=i,this.router=o,this.genderList=[{id:"(NONE)",name:"(NONE)"},{id:"0",name:"Male"},{id:"1",name:"Female"}],this.pageSize=5,this.allowedPageSizes=[5,10,15],this.scrollingMode="standard",this.isAddingNewRow=!1,this.currentSortProperty="fullName",this.currentSearchProperty="fullName",this.currentFilterProperty="gender"}onToolbarPreparing(e){e.toolbarOptions.items.unshift({location:"before",template:"totalUserInfoCount"},{location:"after",locateInMenu:"auto",widget:"dxButton",options:{type:"normal",icon:"refresh",hint:"Fetch data from server",onClick:this.onRefresh.bind(this)}},{location:"after",locateInMenu:"auto",widget:"dxButton",options:{type:"danger",icon:"trash",hint:"Delete all items",onClick:this.deleteAll.bind(this)}},{location:"after",locateInMenu:"auto",widget:"dxButton",options:{type:"danger",icon:"parentfolder",hint:"Generate random 100+ items",onClick:this.onAddRandom.bind(this)}},{location:"after",locateInMenu:"auto",widget:"dxButton",options:{type:"normal",icon:"exportpdf",hint:"Export to PDF",onClick:this.exportGridToPdf.bind(this)}},{location:"after",locateInMenu:"auto",widget:"dxButton",options:{type:"normal",icon:"xlsxfile",hint:"Export to Excel",onClick:this.exportDataGridToExcel.bind(this)}},{location:"before",widget:"dxTextBox",options:{valueChangeEvent:"keyup",showClearButton:!0,onKeyUp:this.onSearchKeyupHandler.bind(this),onValueChanged:this.onSearchValueChanged.bind(this),mode:"search",placeholder:"Search name"}},{location:"center",locateInMenu:"auto",widget:"dxButton",options:{type:"normal",icon:"filter",disabled:!0,hint:"Filter with subject"}},{location:"center",locateInMenu:"auto",widget:"dxSelectBox",options:{items:this.genderList,valueExpr:"id",searchExpr:"name",displayExpr:"name",placeholder:"Filter with gender",searchEnabled:!0,onValueChanged:this.onFilterChange.bind(this)}},{location:"center",locateInMenu:"auto",widget:"dxButton",options:{type:"normal",icon:"card",disabled:!0,hint:"Sort by total cost"}},{location:"center",locateInMenu:"auto",widget:"dxSelectBox",options:{items:[{id:"-1",name:"(NONE)"},{id:"0",name:"asc"},{id:"1",name:"desc"}],valueExpr:"name",placeholder:"Sort by name",displayExpr:"name",onValueChanged:this.onSortValueChanged.bind(this)}})}onSearchKeyupHandler(e){clearTimeout(this.timeout),this.timeout=setTimeout(()=>{this.isSearchingByName=!0,this.isFilteringByCategory=!1,this.isSortingByName=!1,console.log(this.currentSearchByPropertyValue),""!==this.currentSearchByPropertyValue?this.userInfoStore.initSearchByPropertyData(this.currentSearchProperty,this.currentSearchByPropertyValue,this.dataGrid.instance.pageIndex()+1,this.pageSize):(this.store.showNotif("SEARCH MODE OFF","custom"),this.onRefresh())},1250)}onSearchValueChanged(e){this.currentSearchByPropertyValue=e.value}onSortValueChanged(e){this.isSortingByName=!0,this.isSearchingByName=!1,this.isFilteringByCategory=!1,this.currentSortByPropertyValue=e.value,"(NONE)"!==e.value?this.userInfoStore.initSortByPropertyData(this.currentSortProperty,e.value,this.dataGrid.instance.pageIndex()+1,this.pageSize):(this.store.showNotif("SORT MODE OFF","custom"),this.onRefresh())}onFilterChange(e){this.isFilteringByCategory=!0,this.isSearchingByName=!1,this.isSortingByName=!1,this.currentFilterByPropertyValue=e.value,console.log(e.value),"(NONE)"!==e.value?this.userInfoStore.initFilterByPropertyData(this.currentFilterProperty,e.value,this.dataGrid.instance.pageIndex()+1,this.pageSize):(this.store.showNotif("FILTER MODE OFF","custom"),this.onRefresh())}checkEditorMode(){return!0===this.isFilteringByCategory?"FILTER":!0===this.isSearchingByName?"SEARCH":!0===this.isSortingByName?"SORT":"NORMAL"}onOptionChanged(e){const t=this.checkEditorMode();if("paging.pageIndex"===e.fullName){const i=e.value+1;switch(console.log(`New page index: ${i}. Total items: ${this.userInfoList.length}`),t){case"NORMAL":this.paginatePureData(i);break;case"FILTER":this.paginateFilterData(i);break;case"SEARCH":this.paginateSearchData(i);break;case"SORT":this.paginateSortData(i)}}if("paging.pageSize"===e.fullName)switch(this.pageSize=e.value,console.log(`Page size changed to ${e.value}`),t){case"NORMAL":this.userInfoStore.loadDataAsync(this.currentIndexFromServer,e.value),this.goToPage(this.currentIndexFromServer);break;case"FILTER":this.userInfoStore.filterUserInfoByProperty(this.currentFilterProperty,this.currentFilterByPropertyValue,this.currentIndexFromServer,e.value),this.goToPage(this.currentIndexFromServer);break;case"SEARCH":this.userInfoStore.searchUserInfoByProperty(this.currentSearchProperty,this.currentSearchByPropertyValue,this.currentIndexFromServer,e.value),this.goToPage(this.currentIndexFromServer);break;case"SORT":this.userInfoStore.sortUserInfoByProperty(this.currentSortProperty,this.currentSortByPropertyValue,this.currentIndexFromServer,e.value),this.goToPage(this.currentIndexFromServer)}}paginatePureData(e){this.userInfoStore.loadDataAsync(e,this.pageSize)}paginateFilterData(e){this.userInfoStore.filterUserInfoByProperty(this.currentFilterProperty,this.currentFilterByPropertyValue,e,this.pageSize)}paginateSearchData(e){this.userInfoStore.searchUserInfoByProperty(this.currentSearchProperty,this.currentSearchByPropertyValue,e,this.pageSize)}paginateSortData(e){this.userInfoStore.sortUserInfoByProperty(this.currentSortProperty,this.currentSortByPropertyValue,e,this.pageSize)}onEditingStart(){this.isAddingNewRow=!1,this.store.showNotif("Edit mode on","custom")}onInitNewRow(){this.isAddingNewRow=!0,this.store.showNotif("Blank row added, please fill in information","custom")}onSaved(e){if(e.changes.length)switch(e.changes[0].type){case"insert":this.userInfoStore.uploadUserInfo(e.changes[0].data,this.dataGrid.instance.pageIndex()+1,this.pageSize),this.isAddingNewRow=!1;break;case"update":console.log(e.changes[0]),this.userInfoStore.updateUserInfo(e.changes[0].data,this.dataGrid.instance.pageIndex()+1,this.pageSize),this.isAddingNewRow=!1;break;case"remove":this.userInfoStore.deleteUserInfo([e.changes[0].key],this.dataGrid.instance.pageIndex()+1,this.pageSize),this.isAddingNewRow=!1}else this.store.showNotif("No changes dectected","custom")}onEditCanceled(){this.isAddingNewRow=!1,this.store.showNotif("Editing cancelled","custom")}selectionChangedHandler(){this.selectedRows.length?(this.isSelectInfoVisible=!0,this.selectInfoText=`${this.selectedRows.length} rows selected`,this.selectedRows.forEach(e=>{console.log(e)})):this.isSelectInfoVisible=!1}changePageSize(e){this.dataGrid.instance.pageSize(e)}goToPage(e){this.dataGrid.instance.pageIndex(e)}deleteSelectedItems(){this.store.setIsLoading(!0);const e=this.checkEditorMode();this.selectedRows.length&&this.userInfoStore.confirmDialog("").then(t=>{t&&this.userInfoHTTP.deleteUserInfo(this.selectedRows).toPromise().then(()=>{switch(this.store.showNotif(`${this.selectedRows.length} items deleted`,"custom"),this.clearSelection(),e){case"NORMAL":this.userInfoStore.initData(this.dataGrid.instance.pageIndex()+1,this.pageSize);break;case"FILTER":this.userInfoStore.initFilterByPropertyData(this.currentFilterProperty,this.currentFilterByPropertyValue,this.dataGrid.instance.pageIndex()+1,this.pageSize);break;case"SORT":this.userInfoStore.initSortByPropertyData(this.currentSortProperty,this.currentSortByPropertyValue,this.dataGrid.instance.pageIndex()+1,this.pageSize);break;case"SEARCH":this.userInfoStore.initSearchByPropertyData(this.currentSearchProperty,this.currentSearchByPropertyValue,this.dataGrid.instance.pageIndex()+1,this.pageSize)}this.isSelectInfoVisible=!1}).then(()=>{this.store.setIsLoading(!1)})})}clearSelection(){this.selectedRows=[]}onRefresh(){this.isFilteringByCategory=!1,this.isSearchingByName=!1,this.isSortingByName=!1,this.userInfoStore.initData(this.dataGrid.instance.pageIndex()+1,this.pageSize)}onAddRandom(){this.userInfoStore.confirmDialog("This will generate random 100+ items in database. Are you sure").then(e=>{e&&(this.isFilteringByCategory=!1,this.store.setIsLoading(!0),this.userInfoHTTP.generateRandomUserInfo().toPromise().then(()=>{this.userInfoStore.initData(this.dataGrid.instance.pageIndex()+1,this.pageSize)}).then(()=>{this.store.setIsLoading(!1),this.store.showNotif("Generated 100+ random items","custom")}))})}exportDataGridToExcel(){this.userInfoStore.confirmDialog("This will export all fetched data to excel. Are you sure?").then(e=>{e&&(this.store.setIsLoading(!0),this.userInfoHTTP.fetchAll().toPromise().then(e=>{this.userInfoStore.setExportData(e),console.log(e),setTimeout(()=>{const e=new d.Workbook,t=e.addWorksheet("UserInfo List");(0,s.d)({component:this.dataGrid.instance,worksheet:t,autoFilterEnabled:!0}).then(()=>{e.xlsx.writeBuffer().then(e=>{h()(new Blob([e],{type:"application/octet-stream"}),"UserInfo_List.xlsx"),this.store.setIsLoading(!1),this.store.showNotif("Export succesully","custom")})})},200)}))})}exportGridToPdf(e){this.userInfoStore.confirmDialog("This will export all data to pdf. Are you sure?").then(e=>{e&&(this.store.setIsLoading(!0),this.userInfoHTTP.fetchAll().toPromise().then(e=>{this.userInfoStore.setExportData(e),console.log(e),setTimeout(()=>{const e=new l.jsPDF;(0,a.d)({jsPDFDocument:e,component:this.dataGrid.instance}).then(()=>{e.save("UserInfo_List.pdf"),this.store.setIsLoading(!1),this.store.showNotif("Export successfully","custom")})},200)}))})}deleteAll(){this.userInfoStore.deleteAll()}navigateToEditSubject(){this.router.navigate(["/edit_subject_list"])}sourceDataListener(){return this.userInfoStore.$userInfoList.subscribe(e=>{this.userInfoList=e})}currentPageListener(){return this.userInfoStore.$currentPage.subscribe(e=>{this.currentIndexFromServer=e})}ngOnInit(){this.sourceDataListener(),this.currentPageListener(),setTimeout(()=>{this.onRefresh()},150)}ngOnDestroy(){this.sourceDataListener().unsubscribe(),this.currentPageListener().unsubscribe()}}return e.\u0275fac=function(t){return new(t||e)(u.Y36(g.$),u.Y36(p.d),u.Y36(f.C),u.Y36(n.F0))},e.\u0275cmp=u.Xpm({type:e,selectors:[["app-edit-user-info-list"]],viewQuery:function(e,t){if(1&e&&u.Gf(r.e,5),2&e){let e;u.iGM(e=u.CRH())&&(t.dataGrid=e.first)}},decls:9,vars:7,consts:[[3,"ngStyle"],[3,"location","text"],["location","center","locateInMenu","auto",3,"visible"],[4,"dxTemplate"],["location","center","locateInMenu","auto"],["icon","trash","type","danger","hint","Delete current selected items",3,"visible","onClick"],["location","after","locateInMenu","auto"],["icon","arrowright","type","outline","text","Subject Management","hint","Navigate to Edit Subject",3,"onClick"],[4,"ngIf"],[2,"font-size","small"],["id","gridContainer","keyExpr","id",3,"dataSource","showBorders","allowColumnReordering","rowAlternationEnabled","columnHidingEnabled","selectedRowKeys","sorting","selectedRowKeysChange","onOptionChanged","onSelectionChanged","onEditingStart","onInitNewRow","onSaved","onEditCanceled","onToolbarPreparing"],[3,"allowUpdating","allowDeleting","allowAdding","useIcons","selectTextOnEditStart"],["mode","multiple",3,"selectAllMode","showCheckBoxesMode"],["expandMode","rowClick",3,"contextMenuEnabled"],["mode","select",3,"enabled"],[3,"pageSize"],[3,"visible","displayMode","allowedPageSizes","showPageSizeSelector","showNavigationButtons"],[3,"enabled"],["dataField","fullName","caption","Full Name"],["dataField","gender",3,"caption"],["type","required"],["displayExpr","name","valueExpr","id",3,"dataSource"],["dataField","dateOfBirth","caption","Date Of Birth","dataType","date"],["dataField","phone","caption","Phone"],["dataField","email","caption","Email"],["dataField","address","caption","Address"],[4,"dxTemplate","dxTemplateOf"],["dataField","userAccountId","caption","User Acc ID",3,"width"]],template:function(e,t){1&e&&(u.TgZ(0,"dx-toolbar",0),u._UZ(1,"dxi-item",1),u.TgZ(2,"dxi-item",2),u.YNc(3,I,3,1,"div",3),u.qZA(),u.TgZ(4,"dxi-item",4),u.TgZ(5,"dx-button",5),u.NdJ("onClick",function(){return t.deleteSelectedItems()}),u.qZA(),u.qZA(),u.TgZ(6,"dxi-item",6),u.TgZ(7,"dx-button",7),u.NdJ("onClick",function(){return t.navigateToEditSubject()}),u.qZA(),u.qZA(),u.qZA(),u.YNc(8,b,19,27,"ng-container",8)),2&e&&(u.Q6J("ngStyle",u.DdM(6,B)),u.xp6(1),u.Q6J("location","before")("text","User Info Mananagement"),u.xp6(1),u.Q6J("visible",t.isSelectInfoVisible),u.xp6(3),u.Q6J("visible",t.isSelectInfoVisible),u.xp6(3),u.Q6J("ngIf",0!==t.genderList.length))},directives:[S.G,o.PC,x.ZT3,y.p6,m.K,o.O5,r.e,x.Uo8,x.Lz9,x.uCj,x.Auv,x.sXh,x.ilc,x.mKI,x.qvW,x.vrV,x.w3U],styles:[""]}),e})()}];let T=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=u.oAB({type:e}),e.\u0275inj=u.cJS({imports:[[n.Bz.forChild(C)],n.Bz]}),e})(),E=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=u.oAB({type:e}),e.\u0275inj=u.cJS({imports:[[o.ez,T,r.x,S.k,m.e]]}),e})()}}]);