(self.webpackChunkta_sys_online=self.webpackChunkta_sys_online||[]).push([[9880],{89880:(t,n,e)=>{"use strict";e.r(n),e.d(n,{LoginModule:()=>h});var o=e(61116),i=e(15419),r=e(67935),s=e(41142),a=e(49783),d=e(76659),c=e(52177);const l=function(){return["loginForm"]},u=function(){return{text:"Username"}},p=function(){return{text:"Password"}},g=function(){return{mode:"password"}},m=[{path:"",component:(()=>{class t{constructor(t){this.authService=t,this.password="",this.passwordOptions={mode:"password",value:this.password},this.loginButtonOptions={text:"Login",type:"normal",useSubmitBehavior:!0},this.resetButtonOptions={text:"Clear",type:"normal",useSubmitBehavior:!1,onClick:()=>{this.form.instance.resetValues(),this.form.instance.getEditor("userName").focus()}},this.passwordComparison=()=>this.form.instance.option("formData").Password,this.onLoginSubmit=t=>{t.preventDefault(),this.authService.sendLoginRequest(this.user)}}checkComparison(){return!0}onFormShown(t){setTimeout(()=>{this.form.instance.getEditor("userName").focus()},200)}ngAfterViewInit(){(0,s.iG)("<div>userName: d123</div><div>passWord: d123</div><div>role: Doctor</div><div>userName: admin</div><div>passWord: admin</div><div>role: Admin</div><div>userName: c123</div><div>passWord: c123</div><div>role: Customer</div>","Test Account")}ngOnInit(){this.user={userName:"",passWord:"",role:""}}}return t.\u0275fac=function(n){return new(n||t)(a.Y36(d.e))},t.\u0275cmp=a.Xpm({type:t,selectors:[["app-login"]],viewQuery:function(t,n){if(1&t&&a.Gf(r.Y,5),2&t){let t;a.iGM(t=a.CRH())&&(n.form=t.first)}},decls:14,vars:17,consts:[[2,"display","flex","justify-content","center","align-items","center"],[3,"classList","submit"],[1,"long-title"],["id","form","validationGroup","userData",3,"formData","readOnly","showColonAfterLabel","showValidationSummary","scrollingEnabled","onContentReady"],["itemType","group","caption","Account Information"],["dataField","userName",3,"label"],["type","required","message","Username is required"],["dataField","passWord",3,"label","editorOptions"],["type","required","message","Password is required"],["itemType","group",3,"colCount","cssClass"],["itemType","button","horizontalAlignment","center",3,"buttonOptions"]],template:function(t,n){1&t&&(a.TgZ(0,"div",0),a.TgZ(1,"form",1),a.NdJ("submit",function(t){return n.onLoginSubmit(t)}),a.TgZ(2,"div",2),a.TgZ(3,"h3"),a._uU(4,"Login"),a.qZA(),a.qZA(),a.TgZ(5,"dx-form",3),a.NdJ("onContentReady",function(t){return n.onFormShown(t)}),a.TgZ(6,"dxi-item",4),a.TgZ(7,"dxi-item",5),a._UZ(8,"dxi-validation-rule",6),a.qZA(),a.TgZ(9,"dxi-item",7),a._UZ(10,"dxi-validation-rule",8),a.qZA(),a.qZA(),a.TgZ(11,"dxi-item",9),a._UZ(12,"dxi-item",10),a._UZ(13,"dxi-item",10),a.qZA(),a.qZA(),a.qZA(),a.qZA()),2&t&&(a.xp6(1),a.Q6J("classList",a.DdM(13,l)),a.xp6(4),a.Q6J("formData",n.user)("readOnly",!1)("showColonAfterLabel",!0)("showValidationSummary",!0)("scrollingEnabled",!0),a.xp6(2),a.Q6J("label",a.DdM(14,u)),a.xp6(2),a.Q6J("label",a.DdM(15,p))("editorOptions",a.DdM(16,g)),a.xp6(2),a.Q6J("colCount",2)("cssClass","buttonGroup"),a.xp6(1),a.Q6J("buttonOptions",n.loginButtonOptions),a.xp6(1),a.Q6J("buttonOptions",n.resetButtonOptions))},directives:[r.Y,c.ZT3,c.vrV],styles:["body[_ngcontent-%COMP%], html[_ngcontent-%COMP%]{margin:0;min-height:100%;height:100%}*[_ngcontent-%COMP%]{box-sizing:border-box}@font-face{font-family:Hero;src:url(SVN-Birth-Of-A-Hero.291c0b7b016c2bfb71fa.ttf);font-weight:700}.content[_ngcontent-%COMP%]{line-height:1.5}.content[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:30px;margin-top:20px;margin-bottom:20px}.content-block[_ngcontent-%COMP%]{margin-left:40px;margin-right:40px;margin-top:20px}.screen-x-small[_ngcontent-%COMP%]   .content-block[_ngcontent-%COMP%]{margin-left:20px;margin-right:20px}.responsive-paddings[_ngcontent-%COMP%]{padding:20px}.screen-large[_ngcontent-%COMP%]   .responsive-paddings[_ngcontent-%COMP%]{padding:40px}.dx-card.wide-card[_ngcontent-%COMP%]{border-radius:0;margin-left:0;margin-right:0;border-right:0;border-left:0}.with-footer[_ngcontent-%COMP%] > .dx-scrollable-wrapper[_ngcontent-%COMP%] > .dx-scrollable-container[_ngcontent-%COMP%] > .dx-scrollable-content[_ngcontent-%COMP%]{height:100%}.with-footer[_ngcontent-%COMP%] > .dx-scrollable-wrapper[_ngcontent-%COMP%] > .dx-scrollable-container[_ngcontent-%COMP%] > .dx-scrollable-content[_ngcontent-%COMP%] > .dx-scrollview-content[_ngcontent-%COMP%]{display:flex;flex-direction:column;min-height:100%}  form{margin:10px}  .buttonGroup{margin-top:20px}  .loginForm{background-color:initial;box-shadow:0 10px 20px #00000030,0 6px 6px #0000003b;width:60%;padding:20px}  .long-title h3{font-family:Segoe UI Light,Helvetica Neue Light,Segoe UI,Helvetica Neue,Trebuchet MS,Verdana;font-weight:200;font-size:28px;text-align:center;margin-bottom:20px}"]}),t})()}];let f=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=a.oAB({type:t}),t.\u0275inj=a.cJS({imports:[[i.Bz.forChild(m)],i.Bz]}),t})(),h=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=a.oAB({type:t}),t.\u0275inj=a.cJS({imports:[[o.ez,f,r.A]]}),t})()}}]);