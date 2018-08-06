/*! Built with http://stenciljs.com */
App.loadBundle("mhwjejms",["exports"],function(e){var t=window.App.h,r=function(){function e(){this.src="",this.hasError=!1,this.hasPlaceholder=!1,this.content=!1}return e.prototype.componentWillLoad=function(){this.fetchNewContent()},e.prototype.componentDidLoad=function(){this.placeholderElement=this.element.querySelector("async-placeholder"),this.errorElement=this.element.querySelector("async-error")},e.prototype.fetchNewContent=function(){var e=this,t=this.src;(t=t.trim()).endsWith("html")?fetch(this.src).then(function(e){if(e.status>=200&&e.status<300)return e;var t=new Error(e.statusText);throw t.name=""+e.status,t}).then(function(e){return e.text()}).then(function(t){e.content=t,e.placeholderElement&&e.placeholderElement.cancel(),e.errorElement&&e.errorElement.cancel()}).catch(function(t){e.hasError=!0,e.errorElement&&e.errorElement.setStatus(t.name,t.message)}):(this.hasError=!0,this.errorElement&&this.errorElement.setStatus(415,"Refusing to fetch non-HTML content"))},e.prototype.handleHasPlaceholder=function(){this.hasPlaceholder=!0},e.prototype.handleHasError=function(){this.content||(this.hasError=!0)},e.prototype.hostData=function(){return{class:{"is-loading":this.hasPlaceholder&&!this.content&&!this.hasError,"has-loaded":!!this.content,"has-error":this.hasError&&!this.content}}},e.prototype.render=function(){return this.content?t("div",{innerHTML:this.content}):this.hasError?t("slot",{name:"error"}):this.hasPlaceholder?t("slot",{name:"placeholder"}):null},Object.defineProperty(e,"is",{get:function(){return"async-content"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{content:{state:!0},element:{elementRef:!0},hasError:{state:!0},hasPlaceholder:{state:!0},src:{type:String,attr:"src",watchCallbacks:["fetchNewContent"]}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"listeners",{get:function(){return[{name:"hasPlaceholder",method:"handleHasPlaceholder"},{name:"hasError",method:"handleHasError"}]},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return".sc-async-content-h{display:block;overflow:hidden}.is-loading.sc-async-content-h{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}"},enumerable:!0,configurable:!0}),e}(),n=function(){function e(){this.ms=1e4,this.errorRender=null,this.timeout=!1,this.timer=null}return e.prototype.componentWillLoad=function(){this.startTimer()},e.prototype.componentWillUnload=function(){this.clearTimer()},e.prototype.startTimer=function(){var e=this;this.timer=setTimeout(function(){e.timeout=!0,e.status=408,e.message="The server took too long to respond",e.hasError.emit()},this.ms)},e.prototype.clearTimer=function(){this.timer&&clearTimeout(this.timer)},e.prototype.setStatus=function(e,t){this.status=e,this.message=t||""},e.prototype.cancel=function(){this.clearTimer()},e.prototype.render=function(){return this.errorRender?this.errorRender({status:this.status,message:this.message}):t("slot",null)},Object.defineProperty(e,"is",{get:function(){return"async-error"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"host",{get:function(){return{slot:"error"}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{cancel:{method:!0},errorRender:{type:"Any",attr:"error-render"},message:{state:!0},ms:{type:Number,attr:"ms"},setStatus:{method:!0},status:{state:!0},timeout:{state:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"events",{get:function(){return[{name:"hasError",method:"hasError",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),e}(),o=function(){function e(){this.ms=600,this.component=null,this.componentProps={},this.timeout=!1,this.timer=null}return e.prototype.componentWillLoad=function(){this.startTimer()},e.prototype.componentWillUnload=function(){this.clearTimer()},e.prototype.startTimer=function(){var e=this;this.timer=setTimeout(function(){e.timeout=!0,e.hasPlaceholder.emit()},this.ms)},e.prototype.clearTimer=function(){this.timer&&clearTimeout(this.timer)},e.prototype.cancel=function(){this.clearTimer()},e.prototype.render=function(){if(this.component){var e=this.component;return t(e,Object.assign({},this.componentProps))}return t("slot",null)},Object.defineProperty(e,"is",{get:function(){return"async-placeholder"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"host",{get:function(){return{slot:"placeholder"}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{cancel:{method:!0},component:{type:String,attr:"component"},componentProps:{type:"Any",attr:"component-props"},ms:{type:Number,attr:"ms"},timeout:{state:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"events",{get:function(){return[{name:"hasPlaceholder",method:"hasPlaceholder",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),e}();e.AsyncContent=r,e.AsyncError=n,e.AsyncPlaceholder=o,Object.defineProperty(e,"__esModule",{value:!0})});