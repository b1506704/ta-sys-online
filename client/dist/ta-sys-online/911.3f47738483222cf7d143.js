(self.webpackChunkta_sys_online=self.webpackChunkta_sys_online||[]).push([[911],{50911:(t,e,i)=>{"use strict";i.d(e,{X:()=>$,V:()=>H});var n=i(51973),s=i(99624),a=i(8619),o=i(40165),r=i(94165),h=i(34638),d=i(81389),l=i(81272),c=i(21618),m=i(20818),_=i(47991),u=i(3926),p=i(80610),g=i(68257),I=i(9690),f=i(81028),C=i(14277),v=i(71556),b=i(77116),w=i(53873),x=i(6282),O="dx-gallery-loop",P="dx-gallery-active",E="dx-gallery-item-invisible",S="dx-gallery-item-loop",y="dx-gallery-item-selected",B=".dx-gallery-indicator-item",D="dx-gallery-indicator-item-selected",T=f.Z.inherit({_supportedKeys:function(){return(0,m.l)(this.callBase(),{pageUp:d.ZT,pageDown:d.ZT})},_getDefaultOptions:function(){return(0,m.l)(this.callBase(),{direction:"next",onClick:null,hoverStateEnabled:!0,activeStateEnabled:!0})},_render:function(){this.callBase();var t=this,e=this.$element(),i=(0,C.V4)(p.u,this.NAME);e.addClass("dx-gallery-nav-button-"+this.option("direction")),r.Z.off(e,i),r.Z.on(e,i,function(e){t._createActionByOption("onClick")({event:e})})},_optionChanged:function(t){switch(t.name){case"onClick":case"direction":this._invalidate();break;default:this.callBase(t)}}}),N=v.Z.inherit({_activeStateUnit:".dx-gallery-item",_getDefaultOptions:function(){return(0,m.l)(this.callBase(),{activeStateEnabled:!1,animationDuration:400,animationEnabled:!0,loop:!1,swipeEnabled:!0,indicatorEnabled:!0,showIndicator:!0,selectedIndex:0,slideshowDelay:0,showNavButtons:!1,wrapAround:!1,initialItemWidth:void 0,stretchImages:!1,_itemAttributes:{role:"option"},loopItemFocus:!1,selectOnFocus:!0,selectionMode:"single",selectionRequired:!0,selectionByClick:!1})},_defaultOptionsRules:function(){return this.callBase().concat([{device:function(){return"desktop"===I.Z.real().deviceType&&!I.Z.isSimulator()},options:{focusStateEnabled:!0}}])},_init:function(){this.callBase(),this.option("loopItemFocus",this.option("loop"))},_initTemplates:function(){this.callBase(),this._templateManager.addDefaultTemplates({item:new w.c((function(t,e){var i=(0,o.Z)("<img>").addClass("dx-gallery-item-image");(0,l.PO)(e)?(this._prepareDefaultItemTemplate(e,t),i.attr({src:e.imageSrc,alt:e.imageAlt}).appendTo(t)):i.attr("src",String(e)).appendTo(t)}).bind(this),["imageSrc","imageAlt","text","html"],this.option("integrationOptions.watchMethod"))})},_dataSourceOptions:function(){return{paginate:!1}},_itemContainer:function(){return this._$container},_itemClass:function(){return"dx-gallery-item"},_itemDataKey:function(){return"dxGalleryItemData"},_actualItemWidth:function(){var t=this.option("wrapAround");return this.option("stretchImages")?1/(t?this._itemsPerPage()+1:this._itemsPerPage()):t?this._itemPercentWidth()*this._itemsPerPage()/(this._itemsPerPage()+1):this._itemPercentWidth()},_itemPercentWidth:function(){var t=this.$element().outerWidth(),e=this.option("initialItemWidth");return e&&e<=t?e/t:1},_itemsPerPage:function(){var t=(0,c.Ym)()?Math.floor(1/this._itemPercentWidth()):1;return Math.min(t,this._itemsCount())},_pagesCount:function(){return Math.ceil(this._itemsCount()/this._itemsPerPage())},_itemsCount:function(){return(this.option("items")||[]).length},_offsetDirection:function(){return this.option("rtlEnabled")?-1:1},_initMarkup:function(){this._renderWrapper(),this._renderItemsContainer(),this.$element().addClass("dx-gallery"),this.$element().toggleClass(O,this.option("loop")),this.callBase(),this.setAria({role:"listbox",label:"gallery"})},_render:function(){this._renderDragHandler(),this._renderContainerPosition(),this._renderItemSizes(),this._renderItemPositions(),this._renderNavButtons(),this._renderIndicator(),this._renderSelectedItem(),this._renderItemVisibility(),this._renderUserInteraction(),this._setupSlideShow(),this._reviseDimensions(),this.callBase()},_dimensionChanged:function(){var t=this.option("selectedIndex")||0;this._stopItemAnimations(),this._clearCacheWidth(),this._cloneDuplicateItems(),this._renderItemSizes(),this._renderItemPositions(),this._renderIndicator(),this._renderContainerPosition(this._calculateIndexOffset(t),!0),this._renderItemVisibility()},_renderDragHandler:function(){var t=(0,C.V4)("dragstart",this.NAME);r.Z.off(this.$element(),t),r.Z.on(this.$element(),t,"img",function(){return!1})},_renderWrapper:function(){this._$wrapper||(this._$wrapper=(0,o.Z)("<div>").addClass("dx-gallery-wrapper").appendTo(this.$element()))},_renderItems:function(t){if(!(0,c.Ym)()){var e=this.option("selectedIndex");t=t.length>e?t.slice(e,e+1):t.slice(0,1)}this.callBase(t),this._loadNextPageIfNeeded()},_renderItemsContainer:function(){this._$container||(this._$container=(0,o.Z)("<div>").addClass("dx-gallery-container").appendTo(this._$wrapper))},_cloneDuplicateItems:function(){if(this.option("loop")){var t,e=(this.option("items")||[]).length,i=e-1;if(e){this._getLoopedItems().remove();var n=Math.min(this._itemsPerPage(),e),s=this._getRealItems(),a=this._itemContainer();for(t=0;t<n;t++)this._cloneItemForDuplicate(s[t],a);for(t=0;t<n;t++)this._cloneItemForDuplicate(s[i-t],a)}}},_cloneItemForDuplicate:function(t,e){t&&(0,o.Z)(t).clone(!0).addClass(S).css("margin",0).appendTo(e)},_getRealItems:function(){return this.$element().find(".dx-gallery-item:not(.dx-gallery-item-loop)")},_getLoopedItems:function(){return this.$element().find(".dx-gallery-item-loop")},_emptyMessageContainer:function(){return this._$wrapper},_renderItemSizes:function(t){var e=this._itemElements(),i=this._actualItemWidth();void 0!==t&&(e=e.slice(t)),e.each(function(t){(0,o.Z)(e[t]).outerWidth(100*i+"%")})},_renderItemPositions:function(){var t=this._actualItemWidth(),e=this._itemsCount(),i=this._itemsPerPage(),n=this.$element().find(".dx-gallery-item-loop").length,s=e+n-1,a=this.option("wrapAround")?.5:0,r=this._itemFreeSpace(),h=!!r,d=this.option("rtlEnabled"),l=this.option("selectedIndex"),c=d?"Right":"Left";this._itemElements().each(function(n){var d=n,l=(0,o.Z)(this).hasClass(S);if(n>e+i-1&&(d=s-d-i),l||0===d){var m=t*(d+a)+r*(d+1-a),_=l?c.toLowerCase():"margin"+c;(0,o.Z)(this).css(_,100*m+"%")}else h&&(0,o.Z)(this).css("margin"+c,100*r+"%")}),this._relocateItems(l,l,!0)},_itemFreeSpace:function(){var t=this._itemsPerPage();return this.option("wrapAround")&&(t+=1),(1-this._actualItemWidth()*t)/(t+1)},_renderContainerPosition:function(t,e,i){this._releaseInvisibleItems(),t=t||0;var n,s=this,a=this._actualItemWidth(),o=t,r=this._offsetDirection()*o*(a+this._itemFreeSpace());return(0,l.$K)(this._animationOverride)&&(i=this._animationOverride,delete this._animationOverride),i?(s._startSwipe(),n=s._animate(r).done(s._endSwipe.bind(s))):((0,g.pB)(this._$container,{left:r*this._elementWidth(),top:0}),n=(new x.BH).resolveWith(s)),n.done(function(){this._deferredAnimate&&s._deferredAnimate.resolveWith(s),e&&this._renderItemVisibility()}),n.promise()},_startSwipe:function(){this.$element().addClass(P)},_endSwipe:function(){this.$element().removeClass(P)},_animate:function(t,e){var i=this,n=this._$container,s=new x.BH;return u.Z.animate(this._$container,(0,m.l)({type:"slide",to:{left:t*this._elementWidth()},duration:i.option("animationDuration"),complete:function(){i._needMoveContainerForward()&&(0,g.pB)(n,{left:0,top:0}),i._needMoveContainerBack()&&(0,g.pB)(n,{left:i._maxContainerOffset()*i._elementWidth(),top:0}),s.resolveWith(i)}},e||{})),s},_needMoveContainerForward:function(){return this._$container.position().left*this._offsetDirection()<=-this._maxItemWidth()*this._elementWidth()*this._itemsCount()+1},_needMoveContainerBack:function(){return this._$container.position().left*this._offsetDirection()>=this._actualItemWidth()*this._elementWidth()-1},_maxContainerOffset:function(){return-this._maxItemWidth()*(this._itemsCount()-this._itemsPerPage())*this._offsetDirection()},_maxItemWidth:function(){return this._actualItemWidth()+this._itemFreeSpace()},_reviseDimensions:function(){var t=this._itemElements().first().find(".dx-item-content");t&&!t.is(":hidden")&&(this.option("height")||this.option("height",t.outerHeight()),this.option("width")||this.option("width",t.outerWidth()),this._dimensionChanged())},_renderIndicator:function(){if(this._cleanIndicators(),this.option("showIndicator")){for(var t=this._$indicator=(0,o.Z)("<div>").addClass("dx-gallery-indicator").appendTo(this._$wrapper),e=this.option("indicatorEnabled"),i=0;i<this._pagesCount();i++){var n=(0,o.Z)("<div>").addClass("dx-gallery-indicator-item").appendTo(t);e&&this._attachIndicatorClickHandler(n,i)}this._renderSelectedPageIndicator()}},_attachIndicatorClickHandler:function(t,e){r.Z.on(t,(0,C.V4)(p.u,this.NAME),(function(t){this._indicatorSelectHandler(t,e)}).bind(this))},_detachIndicatorClickHandler:function(t){r.Z.off(t,(0,C.V4)(p.u,this.NAME))},_toggleIndicatorInteraction:function(t){var e,i=(null===(e=this._$indicator)||void 0===e?void 0:e.find(B))||[];i.length&&i.each((function(e,i){t?this._attachIndicatorClickHandler((0,o.Z)(i),e):this._detachIndicatorClickHandler((0,o.Z)(i))}).bind(this))},_cleanIndicators:function(){this._$indicator&&this._$indicator.remove()},_renderSelectedItem:function(){var t=this.option("selectedIndex");this._itemElements().removeClass(y).eq(t).addClass(y)},_renderItemVisibility:function(){this.option("initialItemWidth")||this.option("wrapAround")?this._releaseInvisibleItems():(this._itemElements().each((function(t,e){this.option("selectedIndex")===t?(0,o.Z)(e).removeClass(E):(0,o.Z)(e).addClass(E)}).bind(this)),this._getLoopedItems().addClass(E))},_releaseInvisibleItems:function(){this._itemElements().removeClass(E),this._getLoopedItems().removeClass(E)},_renderSelectedPageIndicator:function(){if(this._$indicator){var t=this.option("selectedIndex"),e=this._pagesCount()-1,i=Math.ceil(t/this._itemsPerPage());i=Math.min(e,i),this._$indicator.find(B).removeClass(D).eq(i).addClass(D)}},_renderUserInteraction:function(){var t=this.$element(),e=this.option("swipeEnabled")&&this._itemsCount()>1;this._createComponent(t,b.Z,{disabled:this.option("disabled")||!e,onStart:this._swipeStartHandler.bind(this),onUpdated:this._swipeUpdateHandler.bind(this),onEnd:this._swipeEndHandler.bind(this),itemSizeFunc:this._elementWidth.bind(this)})},_indicatorSelectHandler:function(t,e){if(this.option("indicatorEnabled")){var i=this._fitPaginatedIndex(e*this._itemsPerPage());this._needLongMove=!0,this.option("selectedIndex",i),this._loadNextPageIfNeeded(i)}},_renderNavButtons:function(){var t=this;t.option("showNavButtons")?(t._prevNavButton=(0,o.Z)("<div>").appendTo(this._$wrapper),t._createComponent(t._prevNavButton,T,{direction:"prev",onClick:function(){t._prevPage()}}),t._nextNavButton=(0,o.Z)("<div>").appendTo(this._$wrapper),t._createComponent(t._nextNavButton,T,{direction:"next",onClick:function(){t._nextPage()}}),this._renderNavButtonsVisibility()):t._cleanNavButtons()},_prevPage:function(){var t=this._itemsPerPage(),e=this.option("selectedIndex")-t;return e===-t&&t===this._itemsCount()?this._relocateItems(e,0):this.goToItem(this._fitPaginatedIndex(e))},_nextPage:function(){var t=this._itemsPerPage(),e=this.option("selectedIndex")+t;return e===t&&t===this._itemsCount()?this._relocateItems(e,0):this.goToItem(this._fitPaginatedIndex(e)).done(this._loadNextPageIfNeeded)},_loadNextPageIfNeeded:function(t){t=void 0===t?this.option("selectedIndex"):t,this._dataSource&&this._dataSource.paginate()&&this._shouldLoadNextPage(t)&&!this._isDataSourceLoading()&&!this._isLastPage()&&this._loadNextPage().done((function(){this._renderIndicator(),this._cloneDuplicateItems(),this._renderItemPositions(),this._renderNavButtonsVisibility(),this._renderItemSizes(t)}).bind(this))},_shouldLoadNextPage:function(t){return t+2*this._itemsPerPage()>this.option("items").length},_allowDynamicItemsAppend:function(){return!0},_fitPaginatedIndex:function(t){var e=this._itemsPerPage(),i=t<0?e+t:this._itemsCount()-t;return t>this._itemsCount()-1?(t=0,this._goToGhostItem=!0):i<e&&i>0&&(t>0?t-=e-i:t+=e-i),t},_cleanNavButtons:function(){this._prevNavButton&&(this._prevNavButton.remove(),delete this._prevNavButton),this._nextNavButton&&(this._nextNavButton.remove(),delete this._nextNavButton)},_renderNavButtonsVisibility:function(){if(this.option("showNavButtons")&&this._prevNavButton&&this._nextNavButton){var t=this.option("selectedIndex"),e=this.option("loop"),i=this._itemsCount();if(this._prevNavButton.show(),this._nextNavButton.show(),0===i&&(this._prevNavButton.hide(),this._nextNavButton.hide()),!e){var n=t===i-this._itemsPerPage(),s=i<2||0===t;n=this._dataSource&&this._dataSource.paginate()?n&&this._isLastPage():n||i<2,s&&this._prevNavButton.hide(),n&&this._nextNavButton.hide()}}},_setupSlideShow:function(){var t=this,e=t.option("slideshowDelay");clearTimeout(t._slideshowTimer),e&&(t._slideshowTimer=setTimeout(function(){t._userInteraction?t._setupSlideShow():t.nextItem(!0).done(t._setupSlideShow)},e))},_elementWidth:function(){return this._cacheElementWidth||(this._cacheElementWidth=this.$element().width()),this._cacheElementWidth},_clearCacheWidth:function(){delete this._cacheElementWidth},_swipeStartHandler:function(t){this._releaseInvisibleItems(),this._clearCacheWidth(),this._elementWidth();var e=this._itemsCount();if(e){if(this._stopItemAnimations(),this._startSwipe(),this._userInteraction=!0,!this.option("loop")){var i=this.option("selectedIndex"),n=e-i-this._itemsPerPage(),s=i,a=this.option("rtlEnabled");t.event.maxLeftOffset=a?s:n,t.event.maxRightOffset=a?n:s}}else t.event.cancel=!0},_stopItemAnimations:function(){u.Z.stop(this._$container,!0)},_swipeUpdateHandler:function(t){var e=this.option("wrapAround")?1:0,i=this._offsetDirection()*t.event.offset*(this._itemsPerPage()+e)-this.option("selectedIndex");i<0&&this._loadNextPageIfNeeded(Math.ceil(Math.abs(i))),this._renderContainerPosition(i)},_swipeEndHandler:function(t){var e=t.event.targetOffset*this._offsetDirection()*this._itemsPerPage(),i=this.option("selectedIndex"),n=this._fitIndex(i-e),s=this._fitPaginatedIndex(n);Math.abs(e)<this._itemsPerPage()?this._relocateItems(i):this._itemsPerPage()!==this._itemsCount()?this.option("selectedIndex",s):this._relocateItems(e>0?-e:0)},_setFocusOnSelect:function(){this._userInteraction=!0;var t=this.itemElements().filter(".dx-gallery-item-selected");this.option("focusedElement",(0,_.u)(t)),this._userInteraction=!1},_flipIndex:function(t){var e=this._itemsCount();return(t%=e)>(e+1)/2&&(t-=e),t<-(e-1)/2&&(t+=e),t},_fitIndex:function(t){if(!this.option("loop"))return t;var e=this._itemsCount();return(t>=e||t<0)&&(this._goToGhostItem=!0),t>=e&&(t=e-t),(t%=e)<0&&(t+=e),t},_clean:function(){this.callBase(),this._cleanIndicators(),this._cleanNavButtons()},_dispose:function(){clearTimeout(this._slideshowTimer),this.callBase()},_updateSelection:function(t,e){this._stopItemAnimations(),this._renderNavButtonsVisibility(),this._renderSelectedItem(),this._relocateItems(t[0],e[0]),this._renderSelectedPageIndicator()},_relocateItems:function(t,e,i){void 0===e&&(e=t);var n=this._calculateIndexOffset(t,e);this._renderContainerPosition(n,!0,this.option("animationEnabled")&&!i).done(function(){this._setFocusOnSelect(),this._userInteraction=!1,this._setupSlideShow()})},_focusInHandler:function(){u.Z.isAnimating(this._$container)||this._userInteraction||this.callBase.apply(this,arguments)},_focusOutHandler:function(){u.Z.isAnimating(this._$container)||this._userInteraction||this.callBase.apply(this,arguments)},_selectFocusedItem:d.ZT,_moveFocus:function(){this._stopItemAnimations(),this.callBase.apply(this,arguments);var t=this.itemElements().index((0,o.Z)(this.option("focusedElement")));this.goToItem(t,this.option("animationEnabled"))},_visibilityChanged:function(t){t&&this._reviseDimensions()},_calculateIndexOffset:function(t,e){void 0===e&&(e=t);var i=e-t;return this.option("loop")&&!this._needLongMove&&this._goToGhostItem&&(this._isItemOnFirstPage(t)&&this._isItemOnLastPage(e)?i=-this._itemsPerPage():this._isItemOnLastPage(t)&&this._isItemOnFirstPage(e)&&(i=this._itemsPerPage()),this._goToGhostItem=!1),this._needLongMove=!1,i-e},_isItemOnLastPage:function(t){return t>=this._itemsCount()-this._itemsPerPage()},_isItemOnFirstPage:function(t){return t<=this._itemsPerPage()},_optionChanged:function(t){switch(t.name){case"width":case"initialItemWidth":this.callBase.apply(this,arguments),this._dimensionChanged();break;case"animationDuration":this._renderNavButtonsVisibility();break;case"animationEnabled":break;case"loop":this.$element().toggleClass(O,t.value),this.option("loopItemFocus",t.value),(0,c.Ym)()&&(this._cloneDuplicateItems(),this._renderItemPositions(),this._renderNavButtonsVisibility());break;case"showIndicator":this._renderIndicator();break;case"showNavButtons":this._renderNavButtons();break;case"slideshowDelay":this._setupSlideShow();break;case"wrapAround":case"stretchImages":(0,c.Ym)()&&(this._renderItemSizes(),this._renderItemPositions(),this._renderItemVisibility());break;case"swipeEnabled":this._renderUserInteraction();break;case"indicatorEnabled":this._toggleIndicatorInteraction(t.value);break;default:this.callBase(t)}},goToItem:function(t,e){var i=this.option("selectedIndex"),n=this._itemsCount();return void 0!==e&&(this._animationOverride=e),t=this._fitIndex(t),this._deferredAnimate=new x.BH,t>n-1||t<0||i===t?this._deferredAnimate.resolveWith(this).promise():(this.option("selectedIndex",t),this._deferredAnimate.promise())},prevItem:function(t){return this.goToItem(this.option("selectedIndex")-1,t)},nextItem:function(t){return this.goToItem(this.option("selectedIndex")+1,t)}});(0,h.Z)("dxGallery",N);const W=N;var A=i(86101),k=i(52177);let $=(()=>{let t=class extends A.Ay{constructor(t,e,i,n,s,a,o,r){super(t,e,i,n,o,r),this._watcherHelper=n,this._idh=s,this._createEventEmitters([{subscribe:"contentReady",emit:"onContentReady"},{subscribe:"disposing",emit:"onDisposing"},{subscribe:"initialized",emit:"onInitialized"},{subscribe:"itemClick",emit:"onItemClick"},{subscribe:"itemContextMenu",emit:"onItemContextMenu"},{subscribe:"itemHold",emit:"onItemHold"},{subscribe:"itemRendered",emit:"onItemRendered"},{subscribe:"optionChanged",emit:"onOptionChanged"},{subscribe:"selectionChanged",emit:"onSelectionChanged"},{emit:"accessKeyChange"},{emit:"animationDurationChange"},{emit:"animationEnabledChange"},{emit:"dataSourceChange"},{emit:"disabledChange"},{emit:"elementAttrChange"},{emit:"focusStateEnabledChange"},{emit:"heightChange"},{emit:"hintChange"},{emit:"hoverStateEnabledChange"},{emit:"indicatorEnabledChange"},{emit:"initialItemWidthChange"},{emit:"itemHoldTimeoutChange"},{emit:"itemsChange"},{emit:"itemTemplateChange"},{emit:"loopChange"},{emit:"noDataTextChange"},{emit:"rtlEnabledChange"},{emit:"selectedIndexChange"},{emit:"selectedItemChange"},{emit:"showIndicatorChange"},{emit:"showNavButtonsChange"},{emit:"slideshowDelayChange"},{emit:"stretchImagesChange"},{emit:"swipeEnabledChange"},{emit:"tabIndexChange"},{emit:"visibleChange"},{emit:"widthChange"},{emit:"wrapAroundChange"}]),this._idh.setHost(this),a.setHost(this)}get accessKey(){return this._getOption("accessKey")}set accessKey(t){this._setOption("accessKey",t)}get animationDuration(){return this._getOption("animationDuration")}set animationDuration(t){this._setOption("animationDuration",t)}get animationEnabled(){return this._getOption("animationEnabled")}set animationEnabled(t){this._setOption("animationEnabled",t)}get dataSource(){return this._getOption("dataSource")}set dataSource(t){this._setOption("dataSource",t)}get disabled(){return this._getOption("disabled")}set disabled(t){this._setOption("disabled",t)}get elementAttr(){return this._getOption("elementAttr")}set elementAttr(t){this._setOption("elementAttr",t)}get focusStateEnabled(){return this._getOption("focusStateEnabled")}set focusStateEnabled(t){this._setOption("focusStateEnabled",t)}get height(){return this._getOption("height")}set height(t){this._setOption("height",t)}get hint(){return this._getOption("hint")}set hint(t){this._setOption("hint",t)}get hoverStateEnabled(){return this._getOption("hoverStateEnabled")}set hoverStateEnabled(t){this._setOption("hoverStateEnabled",t)}get indicatorEnabled(){return this._getOption("indicatorEnabled")}set indicatorEnabled(t){this._setOption("indicatorEnabled",t)}get initialItemWidth(){return this._getOption("initialItemWidth")}set initialItemWidth(t){this._setOption("initialItemWidth",t)}get itemHoldTimeout(){return this._getOption("itemHoldTimeout")}set itemHoldTimeout(t){this._setOption("itemHoldTimeout",t)}get items(){return this._getOption("items")}set items(t){this._setOption("items",t)}get itemTemplate(){return this._getOption("itemTemplate")}set itemTemplate(t){this._setOption("itemTemplate",t)}get loop(){return this._getOption("loop")}set loop(t){this._setOption("loop",t)}get noDataText(){return this._getOption("noDataText")}set noDataText(t){this._setOption("noDataText",t)}get rtlEnabled(){return this._getOption("rtlEnabled")}set rtlEnabled(t){this._setOption("rtlEnabled",t)}get selectedIndex(){return this._getOption("selectedIndex")}set selectedIndex(t){this._setOption("selectedIndex",t)}get selectedItem(){return this._getOption("selectedItem")}set selectedItem(t){this._setOption("selectedItem",t)}get showIndicator(){return this._getOption("showIndicator")}set showIndicator(t){this._setOption("showIndicator",t)}get showNavButtons(){return this._getOption("showNavButtons")}set showNavButtons(t){this._setOption("showNavButtons",t)}get slideshowDelay(){return this._getOption("slideshowDelay")}set slideshowDelay(t){this._setOption("slideshowDelay",t)}get stretchImages(){return this._getOption("stretchImages")}set stretchImages(t){this._setOption("stretchImages",t)}get swipeEnabled(){return this._getOption("swipeEnabled")}set swipeEnabled(t){this._setOption("swipeEnabled",t)}get tabIndex(){return this._getOption("tabIndex")}set tabIndex(t){this._setOption("tabIndex",t)}get visible(){return this._getOption("visible")}set visible(t){this._setOption("visible",t)}get width(){return this._getOption("width")}set width(t){this._setOption("width",t)}get wrapAround(){return this._getOption("wrapAround")}set wrapAround(t){this._setOption("wrapAround",t)}get itemsChildren(){return this._getOption("items")}set itemsChildren(t){this.setChildren("items",t)}_createInstance(t,e){return new W(t,e)}ngOnDestroy(){this._destroyWidget()}ngOnChanges(t){super.ngOnChanges(t),this.setupChanges("dataSource",t),this.setupChanges("items",t)}setupChanges(t,e){t in this._optionsToUpdate||this._idh.setup(t,e)}ngDoCheck(){this._idh.doCheck("dataSource"),this._idh.doCheck("items"),this._watcherHelper.checkWatchers(),super.ngDoCheck(),super.clearChangedOptions()}_setOption(t,e){let i=this._idh.setupSingle(t,e),n=null!==this._idh.getChanges(t,e);(i||n)&&super._setOption(t,e)}};return t.\u0275fac=function(e){return new(e||t)(a.Y36(a.SBq),a.Y36(a.R0b),a.Y36(A._5),a.Y36(A._h),a.Y36(A.i9),a.Y36(A.al),a.Y36(s.ki),a.Y36(a.Lbi))},t.\u0275cmp=a.Xpm({type:t,selectors:[["dx-gallery"]],contentQueries:function(t,e,i){if(1&t&&a.Suo(i,k.ZT3,4),2&t){let t;a.iGM(t=a.CRH())&&(e.itemsChildren=t)}},inputs:{accessKey:"accessKey",animationDuration:"animationDuration",animationEnabled:"animationEnabled",dataSource:"dataSource",disabled:"disabled",elementAttr:"elementAttr",focusStateEnabled:"focusStateEnabled",height:"height",hint:"hint",hoverStateEnabled:"hoverStateEnabled",indicatorEnabled:"indicatorEnabled",initialItemWidth:"initialItemWidth",itemHoldTimeout:"itemHoldTimeout",items:"items",itemTemplate:"itemTemplate",loop:"loop",noDataText:"noDataText",rtlEnabled:"rtlEnabled",selectedIndex:"selectedIndex",selectedItem:"selectedItem",showIndicator:"showIndicator",showNavButtons:"showNavButtons",slideshowDelay:"slideshowDelay",stretchImages:"stretchImages",swipeEnabled:"swipeEnabled",tabIndex:"tabIndex",visible:"visible",width:"width",wrapAround:"wrapAround"},outputs:{onContentReady:"onContentReady",onDisposing:"onDisposing",onInitialized:"onInitialized",onItemClick:"onItemClick",onItemContextMenu:"onItemContextMenu",onItemHold:"onItemHold",onItemRendered:"onItemRendered",onOptionChanged:"onOptionChanged",onSelectionChanged:"onSelectionChanged",accessKeyChange:"accessKeyChange",animationDurationChange:"animationDurationChange",animationEnabledChange:"animationEnabledChange",dataSourceChange:"dataSourceChange",disabledChange:"disabledChange",elementAttrChange:"elementAttrChange",focusStateEnabledChange:"focusStateEnabledChange",heightChange:"heightChange",hintChange:"hintChange",hoverStateEnabledChange:"hoverStateEnabledChange",indicatorEnabledChange:"indicatorEnabledChange",initialItemWidthChange:"initialItemWidthChange",itemHoldTimeoutChange:"itemHoldTimeoutChange",itemsChange:"itemsChange",itemTemplateChange:"itemTemplateChange",loopChange:"loopChange",noDataTextChange:"noDataTextChange",rtlEnabledChange:"rtlEnabledChange",selectedIndexChange:"selectedIndexChange",selectedItemChange:"selectedItemChange",showIndicatorChange:"showIndicatorChange",showNavButtonsChange:"showNavButtonsChange",slideshowDelayChange:"slideshowDelayChange",stretchImagesChange:"stretchImagesChange",swipeEnabledChange:"swipeEnabledChange",tabIndexChange:"tabIndexChange",visibleChange:"visibleChange",widthChange:"widthChange",wrapAroundChange:"wrapAroundChange"},features:[a._Bn([A._5,A._h,A.al,A.i9]),a.qOj,a.TTD],decls:0,vars:0,template:function(t,e){},encapsulation:2}),t=(0,n.gn)([(0,n.fM)(7,(0,a.tBr)(a.Lbi)),(0,n.w6)("design:paramtypes",[a.SBq,a.R0b,A._5,A._h,A.i9,A.al,s.ki,Object])],t),t})(),H=(()=>{let t=class{};return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=a.oAB({type:t}),t.\u0275inj=a.cJS({imports:[[k.Q8p,A.Lz,A.ie,s.Cu],k.Q8p,A.ie]}),t})()}}]);