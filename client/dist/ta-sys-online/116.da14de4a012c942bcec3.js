(self.webpackChunkta_sys_online=self.webpackChunkta_sys_online||[]).push([[116],{63116:(e,t,i)=>{"use strict";i.r(t),i.d(t,{ScheduleListModule:()=>D});var r=i(61116),n=i(15419),a=i(8619),s=i(76294),o=i(60310),h=i(35750),c=i(69333),l=i(52177),u=i(83584),d=i(54416);const g=function(){return{mode:"virtual"}},S=function(){return{type:"timelineWorkWeek",name:"Timeline",groupOrientation:"vertical"}},p=function(){return{type:"month",groupOrientation:"horizontal"}},m=function(e,t){return[e,t]},y=[{path:"",component:(()=>{class e{constructor(e,t,i,r){this.scheduleStore=e,this.store=t,this.scheduleHTTP=i,this.router=r,this.pageSize=100,this.instructorName=[{name:"Dr. Elon Musk"},{name:"Dr. Tim Cahill"},{name:"Dr. David De Gea"},{name:"Dr. Manuel Neuer"},{name:"Dr. Phi Minh Long"},{name:"Dr. Au Trung"},{name:"Dr. Thach Sung"},{name:"Dr. Alien"},{name:"Dr. Predator"}],this.allowedPageSizes=[5,10,15],this.currentDate=new Date(2021,2,28),this.isEdit=!1,this.searchBoxOptions={valueChangeEvent:"keyup",showClearButton:!0,onKeyUp:this.onSearchKeyupHandler.bind(this),onValueChanged:this.onSearchValueChanged.bind(this),mode:"search",placeholder:"Search with name"},this.refreshButtonOptions={type:"normal",icon:"refresh",hint:"Fetch data from server",onClick:this.onRefresh.bind(this)},this.filterSelectBoxOptions={items:this.instructorName,valueExpr:"_id",displayExpr:"name",placeholder:"Filter with instructor name",onValueChanged:this.onFilterChange.bind(this)},this.sortSelectBoxOptions={items:[{_id:"-1",name:"(NONE)"},{_id:"0",name:"ASC"},{_id:"1",name:"DESC"}],valueExpr:"name",placeholder:"Sort room",displayExpr:"name",onValueChanged:this.onSortValueChanged.bind(this)}}onSearchKeyupHandler(e){clearTimeout(this.timeout),this.timeout=setTimeout(()=>{this.isSearchingByName=!0,this.isFilteringByCategory=!1,this.isSortingByPrice=!1,console.log(this.currentSearchByNameValue),""!==this.currentSearchByNameValue?this.scheduleStore.initSearchByNameData(this.currentSearchByNameValue,this.currentIndexFromServer,this.pageSize):(this.store.showNotif("SEARCH MODE OFF","custom"),this.onRefresh())},1250)}onSearchValueChanged(e){this.currentSearchByNameValue=e.value}onSortValueChanged(e){this.isSortingByPrice=!0,this.isSearchingByName=!1,this.isFilteringByCategory=!1,this.currentSortByPriceValue=e.value,"(NONE)"!==e.value?this.scheduleStore.initSortByPriceData(e.value,this.currentIndexFromServer,this.pageSize):(this.store.showNotif("SORT MODE OFF","custom"),this.onRefresh())}onFilterChange(e){this.isFilteringByCategory=!0,this.isSearchingByName=!1,this.isSortingByPrice=!1,this.currentCategoryFilterValue=e.value,console.log(e.value),"-1"!==e.value?this.scheduleStore.initFilterByCategoryData(e.value,this.currentIndexFromServer,this.pageSize):(this.store.showNotif("FILTER MODE OFF","custom"),this.onRefresh())}checkEditorMode(){return!0===this.isFilteringByCategory?"FILTER":!0===this.isSearchingByName?"SEARCH":!0===this.isSortingByPrice?"SORT":"NORMAL"}onOptionChanged(e){const t=this.checkEditorMode();if("currentDate"===e.fullName){const e=this.currentIndexFromServer+1;switch(t){case"NORMAL":this.paginatePureData(e);break;case"FILTER":this.paginateFilterData(e);break;case"SEARCH":this.paginateSearchData(e);break;case"SORT":this.paginateSortData(e)}}}onAppointmentClick(e){this.store.showNotif(`Room: ${e.targetedAppointmentData.room}`,"custom")}onAppointmentDblClick(e){e.cancel=!0}paginatePureData(e){0===e?(this.scheduleStore.loadDataAsync(e,this.pageSize),this.scheduleStore.loadDataAsync(e+1,this.pageSize)):(this.scheduleStore.loadDataAsync(e,this.pageSize),this.scheduleStore.loadDataAsync(e+1,this.pageSize),this.scheduleStore.loadDataAsync(e-1,this.pageSize))}paginateFilterData(e){0===e?(this.scheduleStore.filterScheduleByCategory(this.currentCategoryFilterValue,e,this.pageSize),this.scheduleStore.filterScheduleByCategory(this.currentCategoryFilterValue,e+1,this.pageSize)):(this.scheduleStore.filterScheduleByCategory(this.currentCategoryFilterValue,e,this.pageSize),this.scheduleStore.filterScheduleByCategory(this.currentCategoryFilterValue,e+1,this.pageSize),this.scheduleStore.filterScheduleByCategory(this.currentCategoryFilterValue,e-1,this.pageSize))}paginateSearchData(e){0===e?(this.scheduleStore.searchScheduleByName(this.currentSearchByNameValue,e,this.pageSize),this.scheduleStore.searchScheduleByName(this.currentSearchByNameValue,e+1,this.pageSize)):(this.scheduleStore.searchScheduleByName(this.currentSearchByNameValue,e,this.pageSize),this.scheduleStore.searchScheduleByName(this.currentSearchByNameValue,e+1,this.pageSize),this.scheduleStore.searchScheduleByName(this.currentSearchByNameValue,e-1,this.pageSize))}paginateSortData(e){0===e?(this.scheduleStore.sortScheduleByPrice(this.currentSortByPriceValue,e,this.pageSize),this.scheduleStore.sortScheduleByPrice(this.currentSortByPriceValue,e+1,this.pageSize)):(this.scheduleStore.sortScheduleByPrice(this.currentSortByPriceValue,e,this.pageSize),this.scheduleStore.sortScheduleByPrice(this.currentSortByPriceValue,e+1,this.pageSize),this.scheduleStore.sortScheduleByPrice(this.currentSortByPriceValue,e-1,this.pageSize))}onRefresh(){this.isFilteringByCategory=!1,this.isSearchingByName=!1,this.isSortingByPrice=!1,this.scheduleStore.initData(this.currentIndexFromServer,this.pageSize)}navigateToEditLesson(){this.router.navigate(["/edit_lesson_list"])}sourceDataListener(){return this.scheduleStore.$scheduleList.subscribe(e=>{this.scheduleList=e})}currentPageListener(){return this.scheduleStore.$currentPage.subscribe(e=>{this.currentIndexFromServer=e})}ngOnInit(){this.sourceDataListener(),this.currentPageListener(),setTimeout(()=>{this.onRefresh()},150)}ngOnDestroy(){this.sourceDataListener().unsubscribe(),this.currentPageListener().unsubscribe()}}return e.\u0275fac=function(t){return new(t||e)(a.Y36(s.H),a.Y36(o.d),a.Y36(h.J),a.Y36(n.F0))},e.\u0275cmp=a.Xpm({type:e,selectors:[["app-schedule-list"]],decls:6,vars:22,consts:[["location","after","locateInMenu","auto"],["icon","arrowright","type","outline","text","Lesson Management","hint","Navigate to Edit Lesson",3,"onClick"],[3,"location","text"],["timeZone","Asia/Ho_Chi_Minh","currentView","Timeline","textExpr","instructorName","descriptionExpr","room","firstDayOfWeek","1","dateSerializationFormat","yyyy-MM-ddTHH:mm:ssZ",3,"dataSource","shadeUntilCurrentTime","cellDuration","scrolling","views","showAllDayPanel","currentDate","startDayHour","endDayHour","startDateExpr","endDateExpr","editing","height","onOptionChanged","onAppointmentClick","onAppointmentDblClick"],[3,"allowUpdating"]],template:function(e,t){1&e&&(a.TgZ(0,"dx-toolbar"),a.TgZ(1,"dxi-item",0),a.TgZ(2,"dx-button",1),a.NdJ("onClick",function(){return t.navigateToEditLesson()}),a.qZA(),a.qZA(),a._UZ(3,"dxi-item",2),a.qZA(),a.TgZ(4,"dx-scheduler",3),a.NdJ("onOptionChanged",function(e){return t.onOptionChanged(e)})("onAppointmentClick",function(e){return t.onAppointmentClick(e)})("onAppointmentDblClick",function(e){return t.onAppointmentDblClick(e)}),a._UZ(5,"dxo-editing",4),a.qZA()),2&e&&(a.xp6(3),a.Q6J("location","center")("text","Working Schedule"),a.xp6(1),a.Q6J("dataSource",t.scheduleList)("shadeUntilCurrentTime",!0)("cellDuration",60)("scrolling",a.DdM(16,g))("views",a.WLB(19,m,a.DdM(17,S),a.DdM(18,p)))("showAllDayPanel",!1)("currentDate",t.currentDate)("startDayHour",7)("endDayHour",24)("startDateExpr","startDate")("endDateExpr","endDate")("editing",t.isEdit)("height",550),a.xp6(1),a.Q6J("allowUpdating",!1))},directives:[c.G,l.ZT3,u.K,d.n,l.Uo8],styles:[".card-container[_ngcontent-%COMP%]{flex-direction:row;flex-wrap:wrap}.card-container[_ngcontent-%COMP%], .card-container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center}.card-container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]{height:250px;margin:10px;background-color:rgba(0,10,12,.486);border-radius:10px;box-shadow:0 54px 55px #00000040,0 -12px 30px #0000001f,0 4px 6px #0000001f,0 12px 13px #0000002b,0 -3px 5px #00000017;width:250px;flex-direction:column}.card-container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .card-title[_ngcontent-%COMP%]{font-size:large;font-weight:700;font-style:oblique}.card-container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .card-img[_ngcontent-%COMP%]{height:150px;width:240px}"]}),e})()}];let C=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=a.oAB({type:e}),e.\u0275inj=a.cJS({imports:[[n.Bz.forChild(y)],n.Bz]}),e})(),D=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=a.oAB({type:e}),e.\u0275inj=a.cJS({imports:[[r.ez,C,c.k,u.e,d.s]]}),e})()}}]);