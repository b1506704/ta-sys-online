(self.webpackChunkta_sys_online=self.webpackChunkta_sys_online||[]).push([[846],{89846:(e,t,i)=>{"use strict";i.r(t),i.d(t,{LearnerStatisticsModule:()=>v});var a=i(61116),n=i(15419),r=i(8619),o=i(14484),l=i(60093),s=i(59544),d=i(29182),c=i(21355),h=i(62080),u=i(35839),g=i(52177);const x=function(){return{type:"fixedPoint",precision:"0"}},p=[{path:"",component:(()=>{class e{constructor(e,t){this.learnerStore=e,this.screen=t,this.barChartTitle="Learner By Blood Type",this.barChartSubtitle="B.Type Category",this.funnelChartTitle="Learner By Occupation",this.funnelChartSubtitle="Job count",this.lineChartTitle="Learner By Age",this.lineChartSubtitle="Height and Weight",this.polarChartTitle="Learner By Virus Test",this.polarChartSubtitle="Positive Virus Test",this.pieChartTitle="Learner By Gender",this.pieChartSubtitle="Total Male/Female Percentage",this.loadingIndicator={enabled:!0,backgroundColor:"white",font:{color:"white",family:"hero",size:"50px",weight:"bold"}},this.visualLineRange={},this.visualPolarRange={},this.barChartSource=[{bloodType:"",totalCount:""}],this.funnelChartSource=[{job:"",totalCount:""}],this.pieChartSource=[{gender:"",totalCount:""}],this.chartHeight=610,this.chartWidth=610,this.customizeTooltip=e=>({html:`<div><div class='tooltip-header'>Age: ${e.argumentText}</div><div class='tooltip-body'><div class='series-name'><span class='top-series-name'>`+e.points[0].seriesName+"</span>: </div><div class='value-text'><span class='top-series-value'>"+e.points[0].valueText+"</span></div><div class='series-name'><span class='bottom-series-name'>"+e.points[1].seriesName+"</span>: </div><div class='value-text'><span class='bottom-series-value'>"+e.points[1].valueText+"</span></div></div></div>"})}onPointClick(e){e.target.select()}customizeLabel(e){return e.valueText+" ("+e.percentText+")"}barChartSourceListener(){return this.learnerStore.getBloodTypeStatistics(),this.learnerStore.$bloodTypeStatistics.subscribe(e=>{this.barChartSource=e})}funnelChartSourceListener(){return this.learnerStore.getJobStatistics(),this.learnerStore.$jobStatistics.subscribe(e=>{this.funnelChartSource=e})}pieChartSourceListener(){return this.learnerStore.getGenderStatistics(),this.learnerStore.$genderStatistics.subscribe(e=>{this.pieChartSource=e})}sourceDataListener(){return this.learnerStore.$learnerList.subscribe(e=>{this.learnerList=e})}ngOnInit(){const e=this.screen.sizes["screen-x-small"];console.log("SCREEN XSMALL"),console.log(e),!0===e?(this.chartHeight=310,this.chartWidth=310):(this.chartHeight=600,this.chartWidth=600),this.barChartSourceListener(),this.funnelChartSourceListener(),this.pieChartSourceListener(),this.sourceDataListener(),setTimeout(()=>{this.learnerStore.initData(0,50)},150)}ngOnDestroy(){this.sourceDataListener().unsubscribe(),this.funnelChartSourceListener().unsubscribe(),this.barChartSourceListener().unsubscribe(),this.pieChartSourceListener().unsubscribe()}}return e.\u0275fac=function(t){return new(t||e)(r.Y36(o.H),r.Y36(l.H))},e.\u0275cmp=r.Xpm({type:e,selectors:[["app-learner-statistics"]],decls:68,vars:78,consts:[[1,"chart-container"],[1,"chart"],["id","zoomedChart",3,"dataSource","loadingIndicator"],[3,"text","subtitle","horizontalAlignment"],[3,"height","width"],["type","scatter","name","Height","valueField","height"],[3,"size"],["type","line","name","Expected average","valueField","weight"],[3,"visible"],["argumentField","weight",3,"closed"],[3,"startAngle","tickInterval"],[3,"visualRange"],[3,"enabled"],["hoverMode","excludePoints","verticalAlignment","top","horizontalAlignment","center"],[3,"value","valueChange"],[3,"height"],[3,"top","left","bottom","right"],[3,"startValue","endValue","minorTickInterval","tickInterval"],["callValueChanged","onMoving"],[3,"dataSource","loadingIndicator"],["name","Height","color","green","argumentField","age","valueField","height"],["name","Weight","color","white","argumentField","age","valueField","weight"],["verticalAlignment","top","horizontalAlignment","center"],[3,"dataSource","value","valueChange"],[3,"left"],[3,"minorTickCount"],["argumentField","age","valueField","height"],["argumentField","age","valueField","weight"],["id","chart",3,"dataSource","loadingIndicator","onPointClick"],["valueField","totalCount","name","totalCount"],["argumentField","bloodType","type","bar","hoverMode","allArgumentPoints","selectionMode","allArgumentPoints"],[3,"visible","format"],["id","pie",3,"dataSource","loadingIndicator"],["orientation","horizontal","itemTextPosition","right","horizontalAlignment","center","verticalAlignment","bottom",3,"columnCount"],["argumentField","gender","valueField","totalCount"],["position","columns",3,"visible","customizeText"],[3,"visible","width"],["id","pyramid","argumentField","job","valueField","totalCount","algorithm","dynamicHeight",3,"dataSource","inverted","sortData","loadingIndicator"],["visible","true","verticalAlignment","bottom","horizontalAlignment","center"]],template:function(e,t){1&e&&(r.TgZ(0,"div",0),r.TgZ(1,"div",1),r.TgZ(2,"dx-polar-chart",2),r._UZ(3,"dxo-title",3),r._UZ(4,"dxo-size",4),r.TgZ(5,"dxi-series",5),r._UZ(6,"dxo-point",6),r.qZA(),r.TgZ(7,"dxi-series",7),r._UZ(8,"dxo-point",8),r.qZA(),r._UZ(9,"dxo-common-series-settings",9),r._UZ(10,"dxo-argument-axis",10),r._UZ(11,"dxo-value-axis",11),r._UZ(12,"dxo-export",12),r._UZ(13,"dxo-legend",13),r.qZA(),r.TgZ(14,"dx-range-selector",14),r.NdJ("valueChange",function(e){return t.visualPolarRange=e}),r._UZ(15,"dxo-size",15),r._UZ(16,"dxo-margin",16),r.TgZ(17,"dxo-scale",17),r._UZ(18,"dxo-minor-tick",8),r.qZA(),r._UZ(19,"dxo-behavior",18),r.qZA(),r.qZA(),r.TgZ(20,"div",1),r.TgZ(21,"dx-chart",19),r._UZ(22,"dxo-title",3),r._UZ(23,"dxo-size",4),r._UZ(24,"dxi-series",20),r._UZ(25,"dxi-series",21),r.TgZ(26,"dxo-common-series-settings"),r._UZ(27,"dxo-point",6),r.qZA(),r._UZ(28,"dxo-tooltip",12),r._UZ(29,"dxo-argument-axis",11),r._UZ(30,"dxo-legend",22),r._UZ(31,"dxo-export",12),r.qZA(),r.TgZ(32,"dx-range-selector",23),r.NdJ("valueChange",function(e){return t.visualLineRange=e}),r._UZ(33,"dxo-size",15),r._UZ(34,"dxo-margin",24),r._UZ(35,"dxo-scale",25),r._UZ(36,"dxo-behavior",18),r.TgZ(37,"dxo-chart"),r._UZ(38,"dxi-series",26),r._UZ(39,"dxi-series",27),r.qZA(),r.qZA(),r.qZA(),r.TgZ(40,"div",1),r.TgZ(41,"dx-chart",28),r.NdJ("onPointClick",function(e){return t.onPointClick(e)}),r._UZ(42,"dxo-title",3),r._UZ(43,"dxo-size",4),r._UZ(44,"dxi-series",29),r.TgZ(45,"dxo-common-series-settings",30),r._UZ(46,"dxo-label",31),r.qZA(),r._UZ(47,"dxo-legend",22),r._UZ(48,"dxo-export",12),r.qZA(),r.qZA(),r.TgZ(49,"div",1),r.TgZ(50,"dx-pie-chart",32),r._UZ(51,"dxo-title",3),r._UZ(52,"dxo-size",4),r._UZ(53,"dxo-legend",33),r._UZ(54,"dxo-export",12),r.TgZ(55,"dxi-series",34),r.TgZ(56,"dxo-label",35),r._UZ(57,"dxo-font",6),r._UZ(58,"dxo-connector",36),r.qZA(),r.qZA(),r.qZA(),r.qZA(),r.TgZ(59,"div",1),r.TgZ(60,"dx-funnel",37),r._UZ(61,"dxo-title",3),r._UZ(62,"dxo-size",4),r._UZ(63,"dxo-tooltip",12),r.TgZ(64,"dxo-item"),r._UZ(65,"dxo-border",8),r.qZA(),r._UZ(66,"dxo-legend",38),r._UZ(67,"dxo-export",12),r.qZA(),r.qZA(),r.qZA()),2&e&&(r.xp6(2),r.Q6J("dataSource",t.learnerList)("loadingIndicator",t.loadingIndicator),r.xp6(1),r.Q6J("text",t.polarChartTitle)("subtitle",t.polarChartSubtitle)("horizontalAlignment","center"),r.xp6(1),r.Q6J("height",t.chartHeight)("width",t.chartWidth),r.xp6(2),r.Q6J("size",8),r.xp6(2),r.Q6J("visible",!1),r.xp6(1),r.Q6J("closed",!1),r.xp6(1),r.Q6J("startAngle",90)("tickInterval",30),r.xp6(1),r.Q6J("visualRange",t.visualPolarRange),r.xp6(1),r.Q6J("enabled",!0),r.xp6(2),r.Q6J("value",t.visualPolarRange),r.xp6(1),r.Q6J("height",100),r.xp6(1),r.Q6J("top",10)("left",60)("bottom",10)("right",50),r.xp6(1),r.Q6J("startValue",0)("endValue",200)("minorTickInterval",.5)("tickInterval",5),r.xp6(1),r.Q6J("visible",!1),r.xp6(3),r.Q6J("dataSource",t.learnerList)("loadingIndicator",t.loadingIndicator),r.xp6(1),r.Q6J("text",t.lineChartTitle)("subtitle",t.lineChartSubtitle)("horizontalAlignment","center"),r.xp6(1),r.Q6J("height",t.chartHeight)("width",t.chartWidth),r.xp6(4),r.Q6J("size",7),r.xp6(1),r.Q6J("enabled",!0),r.xp6(1),r.Q6J("visualRange",t.visualLineRange),r.xp6(2),r.Q6J("enabled",!0),r.xp6(1),r.Q6J("dataSource",t.learnerList)("value",t.visualLineRange),r.xp6(1),r.Q6J("height",70),r.xp6(1),r.Q6J("left",10),r.xp6(1),r.Q6J("minorTickCount",1),r.xp6(6),r.Q6J("dataSource",t.barChartSource)("loadingIndicator",t.loadingIndicator),r.xp6(1),r.Q6J("text",t.barChartTitle)("subtitle",t.barChartSubtitle)("horizontalAlignment","center"),r.xp6(1),r.Q6J("height",t.chartHeight)("width",t.chartWidth),r.xp6(3),r.Q6J("visible",!0)("format",r.DdM(77,x)),r.xp6(2),r.Q6J("enabled",!0),r.xp6(2),r.Q6J("dataSource",t.pieChartSource)("loadingIndicator",t.loadingIndicator),r.xp6(1),r.Q6J("text",t.pieChartTitle)("subtitle",t.pieChartSubtitle)("horizontalAlignment","center"),r.xp6(1),r.Q6J("height",t.chartHeight)("width",t.chartWidth),r.xp6(1),r.Q6J("columnCount",2),r.xp6(1),r.Q6J("enabled",!0),r.xp6(2),r.Q6J("visible",!0)("customizeText",t.customizeLabel),r.xp6(1),r.Q6J("size",10),r.xp6(1),r.Q6J("visible",!0)("width",.5),r.xp6(2),r.Q6J("dataSource",t.funnelChartSource)("inverted",!0)("sortData",!0)("loadingIndicator",t.loadingIndicator),r.xp6(1),r.Q6J("text",t.funnelChartTitle)("subtitle",t.funnelChartSubtitle)("horizontalAlignment","center"),r.xp6(1),r.Q6J("height",t.chartHeight)("width",t.chartWidth),r.xp6(1),r.Q6J("enabled",!0),r.xp6(2),r.Q6J("visible",!0),r.xp6(2),r.Q6J("enabled",!0))},directives:[s.V,g.POg,g.kD0,g.bcN,g.Akp,g.P_1,g.NwO,g.NBd,g.Ak0,g.T87,d.A,g.gz5,g.yk0,g.B9B,g.jk2,c.q,g.v6i,g.z4s,g.sBj,h.U,g.zVO,g.l5v,u.K,g.H7e,g.vhZ],styles:["@media screen and (max-width:320px){.chart-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:space-evenly;align-items:center}}@media screen and (min-width:321px){.chart-container[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-evenly;flex-wrap:wrap;align-items:center;width:100%}}.chart[_ngcontent-%COMP%]{margin-top:15px;padding:15px;border-radius:15px;background-color:rgba(0,0,0,.404);box-shadow:inset 0 30px 60px -12px #fdfdff,inset 0 18px 36px -18px #0000004d}  .tooltip-header{margin-bottom:5px;font-size:16px;font-weight:500;padding-bottom:5px;border-bottom:1px solid #c5c5c5}  .tooltip-body{width:170px}  .tooltip-body .series-name{font-weight:400;opacity:.6;display:inline-block;line-height:1.5;padding-right:10px;width:126px}  .tooltip-body .value-text{display:inline-block;line-height:1.5;width:30px}"]}),e})()}];let b=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=r.oAB({type:e}),e.\u0275inj=r.cJS({imports:[[n.Bz.forChild(p)],n.Bz]}),e})();var m=i(83584);let v=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=r.oAB({type:e}),e.\u0275inj=r.cJS({imports:[[a.ez,b,c.t,m.e,d.Z,s.F,u.Z,h.w]]}),e})()}}]);