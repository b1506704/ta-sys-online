(self.webpackChunkta_sys_online=self.webpackChunkta_sys_online||[]).push([[6294],{35750:(e,t,s)=>{"use strict";s.d(t,{J:()=>i});var o=s(42693),r=s(49783);let i=(()=>{class e{constructor(e){this.http=e,this.apiScheduleUrl="https://ta-sys-online.azurewebsites.net/schedules"}fetchSchedule(e,t){const s=(new o.LE).set("page",e).set("size",t);return console.log(s.toString()),this.http.get(this.apiScheduleUrl,{params:s,reportProgress:!0,observe:"body"})}searchScheduleByName(e,t,s){const r=(new o.LE).set("value",e).set("page",t).set("size",s);return console.log(r.toString()),this.http.post(this.apiScheduleUrl+"/searchByName",{},{params:r,reportProgress:!0,observe:"body"})}filterScheduleByPrice(e,t,s,r){const i=(new o.LE).set("criteria",e).set("value",t).set("page",s).set("size",r);return console.log(i.toString()),this.http.post(this.apiScheduleUrl,{},{params:i,reportProgress:!0,observe:"body"})}filterScheduleByCategory(e,t,s){const r=(new o.LE).set("value",e).set("page",t).set("size",s);return console.log(r.toString()),this.http.post(this.apiScheduleUrl+"/filterByCategory",{},{params:r,reportProgress:!0,observe:"body"})}sortScheduleByName(e,t,s){const r=(new o.LE).set("value",e).set("page",t).set("size",s);return console.log(r.toString()),this.http.post(this.apiScheduleUrl+"/sortByName",{},{params:r,reportProgress:!0,observe:"body"})}sortScheduleByPrice(e,t,s){const r=(new o.LE).set("value",e).set("page",t).set("size",s);return console.log(r.toString()),this.http.post(this.apiScheduleUrl+"/sortByPrice",{},{params:r,reportProgress:!0,observe:"body"})}uploadSchedule(e){return this.http.post(this.apiScheduleUrl,e,{reportProgress:!0,observe:"body"})}generateRandomSchedule(){return this.http.post(this.apiScheduleUrl+"/randomSchedule",{},{reportProgress:!0,observe:"body"})}deleteAllSchedules(){return this.http.post(this.apiScheduleUrl+"/deleteAll",{},{reportProgress:!0,observe:"body"})}deleteSchedule(e){return this.http.delete(this.apiScheduleUrl+`/${e}`,{reportProgress:!0,observe:"body"})}getSchedule(e){return this.http.get(this.apiScheduleUrl+`/${e}`,{reportProgress:!0,observe:"body"})}deleteSelectedSchedules(e){return this.http.post(this.apiScheduleUrl+"/batch",e,{reportProgress:!0,observe:"body"})}updateSchedule(e,t){return this.http.post(this.apiScheduleUrl+`/updateSchedule/${t}`,e,{reportProgress:!0,observe:"body"})}fetchAll(){return this.http.post(this.apiScheduleUrl+"/fetchAll",{},{reportProgress:!0,observe:"body"})}}return e.\u0275fac=function(t){return new(t||e)(r.LFG(o.eN))},e.\u0275prov=r.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()},76294:(e,t,s)=>{"use strict";s.d(t,{H:()=>n});var o=s(79996),r=s(61305),i=s(41142),l=s(49783),h=s(35750),a=s(60310);const c={scheduleList:[],selectedSchedule:{},exportData:[],totalPages:0,currentPage:0,totalItems:0,responseMsg:""};let n=(()=>{class e extends r.b{constructor(e,t){super(c),this.scheduleService=e,this.store=t,this.$scheduleList=this.select(e=>e.scheduleList),this.$exportData=this.select(e=>e.exportData),this.$totalPages=this.select(e=>e.totalPages),this.$totalItems=this.select(e=>e.totalItems),this.$currentPage=this.select(e=>e.currentPage),this.$selectedSchedule=this.select(e=>e.selectedSchedule)}fillEmpty(e,t,s,o){let r=s,i=e*t;for(var l=0;l<o.length;l++)r[i]=o[l],i++;return console.log("Filled array result"),console.log(r),r}initData(e,t){this.scheduleService.fetchSchedule(e,t).toPromise().then(e=>{this.setState({scheduleList:new Array(e.totalItems)}),console.log("Current flag: pure list"),console.log(this.state.scheduleList),this.setState({totalItems:e.totalItems}),this.setState({totalPages:e.totalPages}),this.setState({currentPage:e.currentPage})}).then(()=>{this.loadDataAsync(e,t)})}initFilterByCategoryData(e,t,s){this.store.showNotif("Filtered Mode On","custom"),this.scheduleService.filterScheduleByCategory(e,0,5).toPromise().then(e=>{this.setState({scheduleList:new Array(e.totalItems)}),console.log("Current flag: filtered list"),console.log(this.state.scheduleList),this.setState({totalItems:e.totalItems}),this.setState({totalPages:e.totalPages}),this.setState({currentPage:e.currentPage})}).then(()=>{this.filterScheduleByCategory(e,t,s)})}initSearchByNameData(e,t,s){this.store.showNotif("Searched Mode On","custom"),this.scheduleService.searchScheduleByName(e,0,5).toPromise().then(e=>{this.setState({scheduleList:new Array(e.totalItems)}),console.log("Current flag: searched list"),console.log(this.state.scheduleList),this.setState({totalItems:e.totalItems}),this.setState({totalPages:e.totalPages}),this.setState({currentPage:e.currentPage})}).then(()=>{this.searchScheduleByName(e,t,s)})}initSortByPriceData(e,t,s){this.store.showNotif("Sort Mode On","custom"),this.scheduleService.sortScheduleByPrice(e,0,5).toPromise().then(e=>{this.setState({scheduleList:new Array(e.totalItems)}),console.log("Current flag: sort list"),console.log(this.state.scheduleList),this.setState({totalItems:e.totalItems}),this.setState({totalPages:e.totalPages}),this.setState({currentPage:e.currentPage})}).then(()=>{this.sortScheduleByPrice(e,t,s)})}initSortByName(e,t,s){this.store.showNotif("Sort Mode On","custom"),this.scheduleService.sortScheduleByName(e,0,5).toPromise().then(e=>{this.setState({scheduleList:new Array(e.totalItems)}),console.log("Current flag: sort list"),console.log(this.state.scheduleList),this.setState({totalItems:e.totalItems}),this.setState({totalPages:e.totalPages}),this.setState({currentPage:e.currentPage})}).then(()=>{this.sortScheduleByName(e,t,s)})}loadDataAsync(e,t){this.setIsLoading(!0),this.scheduleService.fetchSchedule(e,t).subscribe({next:s=>{this.setState({scheduleList:this.fillEmpty(e,t,this.state.scheduleList,s.items)}),console.log("Pure list"),console.log(this.state.scheduleList),console.log("Server response"),console.log(s),this.setState({totalItems:s.totalItems}),this.setState({totalPages:s.totalPages}),this.setState({currentPage:s.currentPage}),this.setIsLoading(!1)},error:e=>{this.setIsLoading(!1),this.store.showNotif(e.error.errorMessage,"error"),console.log(e)}})}refresh(e,t){this.setIsLoading(!0),this.scheduleService.fetchSchedule(e,t).subscribe({next:s=>{this.setState({scheduleList:this.fillEmpty(e,t,this.state.scheduleList,s.items)}),this.setState({totalItems:s.totalItems}),this.setState({totalPages:s.totalPages}),this.setState({currentPage:s.currentPage}),console.log("Pure list"),console.log(this.state.scheduleList),console.log("Server response"),console.log(s),this.store.showNotif("Refresh successfully","custom"),this.setIsLoading(!1)},error:e=>{this.setIsLoading(!1),this.store.showNotif(e.error.errorMessage,"error"),console.log(e)}})}setIsLoading(e){this.store.setIsLoading(e)}uploadSchedule(e,t,s){this.confirmDialog("").then(o=>{o&&(this.setIsLoading(!0),this.scheduleService.uploadSchedule(e).subscribe({next:e=>{this.setState({responseMsg:e}),this.setTotalItems(this.state.totalItems+1),console.log(e),this.loadDataAsync(t,s),this.setIsLoading(!1),this.store.showNotif(e.message,"custom")},error:e=>{this.setIsLoading(!1),this.store.showNotif(e.error.errorMessage,"error"),console.log(e)}}))})}updateSchedule(e,t,s,o){this.confirmDialog("").then(r=>{r&&(this.setIsLoading(!0),this.scheduleService.updateSchedule(e,t).subscribe({next:e=>{this.setState({responseMsg:e}),console.log(e),this.loadDataAsync(s,o),this.setIsLoading(!1),this.store.showNotif(e.message,"custom")},error:e=>{this.setIsLoading(!1),this.store.showNotif(e.error.errorMessage,"error"),console.log(e)}}))})}confirmDialog(e){return(0,i.iG)(""!=e?`<b>${e}</b>`:"<b>Are you sure?</b>","Confirm changes")}deleteSelectedSchedules(e,t,s){this.confirmDialog("").then(o=>{o&&(this.setIsLoading(!0),this.scheduleService.deleteSelectedSchedules(e).subscribe({next:e=>{this.setState({responseMsg:e}),console.log(e),this.loadDataAsync(t,s),console.log(this.state.scheduleList),this.setIsLoading(!1),this.store.showNotif(e.message,"custom")},error:e=>{this.setIsLoading(!1),this.store.showNotif(e.error.errorMessage,"error"),console.log(e)}}))})}deleteAllSchedules(){this.confirmDialog("Delete all items?").then(e=>{e&&(this.setIsLoading(!0),this.scheduleService.deleteAllSchedules().subscribe({next:e=>{this.setState({responseMsg:e}),this.setState({scheduleList:[]}),this.setState({totalPages:0}),this.setState({currentPage:0}),this.setState({totalItems:0}),console.log(e),this.setIsLoading(!1),this.store.showNotif(e.message,"custom")},error:e=>{this.setIsLoading(!1),this.store.showNotif(e.error.errorMessage,"error"),console.log(e)}}))})}deleteSchedule(e,t,s){this.confirmDialog("").then(o=>{o&&(this.setIsLoading(!0),this.scheduleService.deleteSchedule(e).subscribe({next:e=>{this.setState({responseMsg:e}),this.setTotalItems(this.state.totalItems-1),console.log(e),this.loadDataAsync(t,s),this.setIsLoading(!1),this.store.showNotif(e.message,"custom")},error:e=>{this.setIsLoading(!1),this.store.showNotif(e.error.errorMessage,"error"),console.log(e)}}))})}selectSchedule(e){this.setState({selectedSchedule:e})}setTotalPages(e){this.setState({totalPages:e})}setTotalItems(e){this.setState({totalItems:e})}setCurrentPage(e){this.setState({currentPage:e})}getSchedule(e){return this.$scheduleList.pipe((0,o.U)(t=>t.find(t=>t._id===e)))}filterScheduleByPrice(e,t,s,o){this.setIsLoading(!0),this.scheduleService.filterScheduleByPrice(e,t,s,o).subscribe({next:e=>{this.setState({responseMsg:e}),this.setState({scheduleList:this.fillEmpty(s,o,this.state.scheduleList,e.items)}),this.setState({totalItems:e.totalItems}),this.setState({totalPages:e.totalPages}),this.setState({currentPage:e.currentPage}),this.setIsLoading(!1)},error:e=>{this.setIsLoading(!1),this.store.showNotif(e.error.errorMessage,"error"),console.log(e)}})}filterScheduleByCategory(e,t,s){this.setIsLoading(!0),this.scheduleService.filterScheduleByCategory(e,t,s).subscribe({next:e=>{this.setState({scheduleList:this.fillEmpty(t,s,this.state.scheduleList,e.items)}),console.log("Filtered list"),console.log(this.state.scheduleList),console.log("Server response"),console.log(e),this.setState({totalItems:e.totalItems}),this.setState({totalPages:e.totalPages}),this.setState({currentPage:e.currentPage}),this.setIsLoading(!1)},error:e=>{this.setIsLoading(!1),this.store.showNotif(e.error.errorMessage,"error"),console.log(e)}})}searchScheduleByName(e,t,s){this.setIsLoading(!0),this.scheduleService.searchScheduleByName(e,t,s).subscribe({next:e=>{this.setState({scheduleList:this.fillEmpty(t,s,this.state.scheduleList,e.items)}),console.log("Searched list"),console.log(this.state.scheduleList),console.log("Server response"),console.log(e),this.setState({totalItems:e.totalItems}),this.setState({totalPages:e.totalPages}),this.setState({currentPage:e.currentPage}),this.setIsLoading(!1)},error:e=>{this.setIsLoading(!1),this.store.showNotif(e.error.errorMessage,"error"),console.log(e)}})}sortScheduleByName(e,t,s){this.setIsLoading(!0),this.scheduleService.sortScheduleByName(e,t,s).subscribe({next:e=>{this.setState({responseMsg:e}),this.setState({scheduleList:this.fillEmpty(t,s,this.state.scheduleList,e.items)}),this.setState({totalItems:e.totalItems}),this.setState({totalPages:e.totalPages}),this.setState({currentPage:e.currentPage}),console.log("Sorted list"),console.log(this.state.scheduleList),console.log("Server response"),console.log(e),this.setIsLoading(!1)},error:e=>{this.setIsLoading(!1),this.store.showNotif(e.error.errorMessage,"error"),console.log(e)}})}sortScheduleByPrice(e,t,s){this.setIsLoading(!0),this.scheduleService.sortScheduleByPrice(e,t,s).subscribe({next:e=>{this.setState({responseMsg:e}),this.setState({scheduleList:this.fillEmpty(t,s,this.state.scheduleList,e.items)}),this.setState({totalItems:e.totalItems}),this.setState({totalPages:e.totalPages}),this.setState({currentPage:e.currentPage}),console.log("Sorted list"),console.log(this.state.scheduleList),console.log("Server response"),console.log(e),this.setIsLoading(!1)},error:e=>{this.setIsLoading(!1),this.store.showNotif(e.error.errorMessage,"error"),console.log(e)}})}setExportData(e){this.setState({scheduleList:e})}}return e.\u0275fac=function(t){return new(t||e)(l.LFG(h.J),l.LFG(a.d))},e.\u0275prov=l.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()}}]);