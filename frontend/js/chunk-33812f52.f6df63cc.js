(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-33812f52"],{"159b":function(t,e,r){var n=r("da84"),i=r("fdbc"),a=r("17c2"),o=r("9112");for(var s in i){var c=n[s],u=c&&c.prototype;if(u&&u.forEach!==a)try{o(u,"forEach",a)}catch(l){u.forEach=a}}},"17c2":function(t,e,r){"use strict";var n=r("b727").forEach,i=r("a640"),a=r("ae40"),o=i("forEach"),s=a("forEach");t.exports=o&&s?[].forEach:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}},"181d":function(t,e,r){},"1da1":function(t,e,r){"use strict";r.d(e,"a",(function(){return i}));r("d3b7");function n(t,e,r,n,i,a,o){try{var s=t[a](o),c=s.value}catch(u){return void r(u)}s.done?e(c):Promise.resolve(c).then(n,i)}function i(t){return function(){var e=this,r=arguments;return new Promise((function(i,a){var o=t.apply(e,r);function s(t){n(o,i,a,s,c,"next",t)}function c(t){n(o,i,a,s,c,"throw",t)}s(void 0)}))}}},"21bb":function(t,e,r){"use strict";var n=r("2dad"),i=r.n(n);i.a},"2dad":function(t,e,r){},4160:function(t,e,r){"use strict";var n=r("23e7"),i=r("17c2");n({target:"Array",proto:!0,forced:[].forEach!=i},{forEach:i})},"65f0":function(t,e,r){var n=r("861d"),i=r("e8b5"),a=r("b622"),o=a("species");t.exports=function(t,e){var r;return i(t)&&(r=t.constructor,"function"!=typeof r||r!==Array&&!i(r.prototype)?n(r)&&(r=r[o],null===r&&(r=void 0)):r=void 0),new(void 0===r?Array:r)(0===e?0:e)}},7661:function(t,e,r){"use strict";var n=r("181d"),i=r.n(n);i.a},"7c64":function(t,e,r){"use strict";var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"LayoutDefault"},[r("main",{staticClass:"LayoutDefault__main"},[t._t("default")],2)])},i=[],a={name:"LayoutDefault",data:function(){return{}},created:function(){}},o=a,s=(r("7661"),r("2877")),c=Object(s["a"])(o,n,i,!1,null,null,null);e["a"]=c.exports},"96cf":function(t,e,r){var n=function(t){"use strict";var e,r=Object.prototype,n=r.hasOwnProperty,i="function"===typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",o=i.asyncIterator||"@@asyncIterator",s=i.toStringTag||"@@toStringTag";function c(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(P){c=function(t,e,r){return t[e]=r}}function u(t,e,r,n){var i=e&&e.prototype instanceof y?e:y,a=Object.create(i.prototype),o=new I(n||[]);return a._invoke=C(t,r,o),a}function l(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(P){return{type:"throw",arg:P}}}t.wrap=u;var f="suspendedStart",h="suspendedYield",d="executing",p="completed",v={};function y(){}function m(){}function g(){}var w={};w[a]=function(){return this};var b=Object.getPrototypeOf,L=b&&b(b(O([])));L&&L!==r&&n.call(L,a)&&(w=L);var x=g.prototype=y.prototype=Object.create(w);function k(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function _(t,e){function r(i,a,o,s){var c=l(t[i],t,a);if("throw"!==c.type){var u=c.arg,f=u.value;return f&&"object"===typeof f&&n.call(f,"__await")?e.resolve(f.__await).then((function(t){r("next",t,o,s)}),(function(t){r("throw",t,o,s)})):e.resolve(f).then((function(t){u.value=t,o(u)}),(function(t){return r("throw",t,o,s)}))}s(c.arg)}var i;function a(t,n){function a(){return new e((function(e,i){r(t,n,e,i)}))}return i=i?i.then(a,a):a()}this._invoke=a}function C(t,e,r){var n=f;return function(i,a){if(n===d)throw new Error("Generator is already running");if(n===p){if("throw"===i)throw a;return T()}r.method=i,r.arg=a;while(1){var o=r.delegate;if(o){var s=E(o,r);if(s){if(s===v)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===f)throw n=p,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=d;var c=l(t,e,r);if("normal"===c.type){if(n=r.done?p:h,c.arg===v)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n=p,r.method="throw",r.arg=c.arg)}}}function E(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator["return"]&&(r.method="return",r.arg=e,E(t,r),"throw"===r.method))return v;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return v}var i=l(n,t.iterator,r.arg);if("throw"===i.type)return r.method="throw",r.arg=i.arg,r.delegate=null,v;var a=i.arg;return a?a.done?(r[t.resultName]=a.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,v):a:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,v)}function S(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function D(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function I(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(S,this),this.reset(!0)}function O(t){if(t){var r=t[a];if(r)return r.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var i=-1,o=function r(){while(++i<t.length)if(n.call(t,i))return r.value=t[i],r.done=!1,r;return r.value=e,r.done=!0,r};return o.next=o}}return{next:T}}function T(){return{value:e,done:!0}}return m.prototype=x.constructor=g,g.constructor=m,m.displayName=c(g,s,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===m||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,g):(t.__proto__=g,c(t,s,"GeneratorFunction")),t.prototype=Object.create(x),t},t.awrap=function(t){return{__await:t}},k(_.prototype),_.prototype[o]=function(){return this},t.AsyncIterator=_,t.async=function(e,r,n,i,a){void 0===a&&(a=Promise);var o=new _(u(e,r,n,i),a);return t.isGeneratorFunction(r)?o:o.next().then((function(t){return t.done?t.value:o.next()}))},k(x),c(x,s,"Generator"),x[a]=function(){return this},x.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){while(e.length){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=O,I.prototype={constructor:I,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(D),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function i(n,i){return s.type="throw",s.arg=t,r.next=n,i&&(r.method="next",r.arg=e),!!i}for(var a=this.tryEntries.length-1;a>=0;--a){var o=this.tryEntries[a],s=o.completion;if("root"===o.tryLoc)return i("end");if(o.tryLoc<=this.prev){var c=n.call(o,"catchLoc"),u=n.call(o,"finallyLoc");if(c&&u){if(this.prev<o.catchLoc)return i(o.catchLoc,!0);if(this.prev<o.finallyLoc)return i(o.finallyLoc)}else if(c){if(this.prev<o.catchLoc)return i(o.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return i(o.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var i=this.tryEntries[r];if(i.tryLoc<=this.prev&&n.call(i,"finallyLoc")&&this.prev<i.finallyLoc){var a=i;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var o=a?a.completion:{};return o.type=t,o.arg=e,a?(this.method="next",this.next=a.finallyLoc,v):this.complete(o)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),v},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),D(r),v}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var i=n.arg;D(r)}return i}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:O(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),v}},t}(t.exports);try{regeneratorRuntime=n}catch(i){Function("r","regeneratorRuntime = r")(n)}},a640:function(t,e,r){"use strict";var n=r("d039");t.exports=function(t,e){var r=[][t];return!!r&&n((function(){r.call(null,e||function(){throw 1},1)}))}},ae40:function(t,e,r){var n=r("83ab"),i=r("d039"),a=r("5135"),o=Object.defineProperty,s={},c=function(t){throw t};t.exports=function(t,e){if(a(s,t))return s[t];e||(e={});var r=[][t],u=!!a(e,"ACCESSORS")&&e.ACCESSORS,l=a(e,0)?e[0]:c,f=a(e,1)?e[1]:void 0;return s[t]=!!r&&!i((function(){if(u&&!n)return!0;var t={length:-1};u?o(t,1,{enumerable:!0,get:c}):t[1]=1,r.call(t,l,f)}))}},b727:function(t,e,r){var n=r("0366"),i=r("44ad"),a=r("7b0b"),o=r("50c4"),s=r("65f0"),c=[].push,u=function(t){var e=1==t,r=2==t,u=3==t,l=4==t,f=6==t,h=5==t||f;return function(d,p,v,y){for(var m,g,w=a(d),b=i(w),L=n(p,v,3),x=o(b.length),k=0,_=y||s,C=e?_(d,x):r?_(d,0):void 0;x>k;k++)if((h||k in b)&&(m=b[k],g=L(m,k,w),t))if(e)C[k]=g;else if(g)switch(t){case 3:return!0;case 5:return m;case 6:return k;case 2:c.call(C,m)}else if(l)return!1;return f?-1:u||l?l:C}};t.exports={forEach:u(0),map:u(1),filter:u(2),some:u(3),every:u(4),find:u(5),findIndex:u(6)}},bb51:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("layout-default",[r("div",{staticClass:"Home"},[r("div",[r("form",{staticClass:"md-layout",attrs:{novalidate:"",id:"app",action:"#",method:"post"}},[r("md-card",{staticClass:"md-layout-item md-small-size-100"},[r("md-card-header",[r("div",{staticClass:"md-title"},[t._v("Package History")])]),r("md-card-content",[r("label",{attrs:{for:"pId"}},[t._v("Package ID")]),r("md-field",[r("md-input",{attrs:{name:"pId",id:"pId"},on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:(e.preventDefault(),t.refresh(e))}},model:{value:t.pId,callback:function(e){t.pId=e},expression:"pId"}})],1),r("md-card-actions",[r("md-button",{staticClass:"md-primary md-raised",attrs:{type:"button"},on:{click:t.refresh}},[t._v("check")])],1),t.showHistory&&!t.packageExists?r("div",{staticStyle:{"text-align":"center",color:"red"}},[r("small",[r("b",[t._v("Sorry, we cannot detect a package for your tracking number.")])])]):t._e()],1)],1)],1),t.showHistory&&t.packageExists?r("div",{staticClass:"history-container"},[r("md-card",{staticClass:"md-layout-item md-small-size-100"},[r("md-card-header",{staticClass:"history-card-header"},[r("div",{staticClass:"md-title"},[t.packageDelivered?r("span",{staticClass:"md-title-icon success"},[r("i",{staticClass:"material-icons"},[t._v("check")])]):r("span",{staticClass:"md-title-icon"},[r("i",{staticClass:"material-icons"},[t._v("local_shipping")])]),r("div",{staticClass:"md-title-label"},[t._v("Package ID "+t._s(t.keyId))])]),r("div",{staticClass:"history-progress"},[r("div",{staticClass:"history-progress-bar",class:{success:t.packageDelivered}},[r("div",{staticClass:"history-progress-bar-element"}),r("div",{staticClass:"history-progress-bar-element"})])]),t.packageDelivered?r("div",{staticClass:"history-status success"},[t._v("Package delivered")]):r("div",{staticClass:"history-status"},[t._v("Package in transit")]),r("div",{staticClass:"history-current-owner"},[t._v("Current owner: "+t._s(t.lastDestination.owner))])]),r("md-card-content",[r("div",{staticClass:"timeline"},t._l(t.history,(function(e){return r("div",{key:e.txId,staticClass:"timeline-event"},[r("div",{staticClass:"timeline-content"},[r("div",{staticClass:"timeline-content-date"},[t._v(t._s(e.date))]),r("div",{staticClass:"timeline-content-time-destination",class:{success:e.delivered}},[t._v(t._s(e.time))]),r("div",{staticClass:"timeline-content-time-destination",class:{success:e.delivered}},[t._v(t._s(e.owner))])]),e.delivered?r("div",{staticClass:"timeline-badge success"},[r("i",{staticClass:"material-icons"},[t._v("check")])]):r("div",{staticClass:"timeline-badge"},[r("i",{staticClass:"material-icons"},[t._v("arrow_upward")])])])})),0)])],1)],1):t._e()])])])},i=[],a=(r("4160"),r("d3b7"),r("ac1f"),r("1276"),r("159b"),r("96cf"),r("1da1")),o=r("7c64"),s={name:"Home",components:{LayoutDefault:o["a"]},data:function(){return{history:[],keyId:"",pId:"",packageExists:!1,packageDelivered:!1,firstDestination:null,lastDestination:null,showHistory:!1}},methods:{refresh:function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(){var e,r,n,i=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(this.history=[],this.showHistory=!1,this.packageExists=!1,this.packageDelivered=!1,this.firstDestination=null,this.lastDestination=null,!this.pId||""===this.pId){t.next=16;break}return t.next=9,fetch("https://nb-tracking.samlinux.com/api1/getHistory/"+this.pId);case 9:return e=t.sent,t.next=12,e.json();case 12:r=t.sent,this.keyId=r.key,n=JSON.parse(r.value),n.length>0&&(this.packageExists=!0,n.forEach((function(t){var e={},r="date not obtained",n="time not obtained";if(e.txId=t.TxId,e.owner=t.Packet.owner,e.ts=t.Timestamp,t.Timestamp&&""!==t.Timestamp){var a=t.Timestamp.split(" ");a[0]&&""!==a[0]&&(r=a[0]),a[1]&&""!==a[1]&&(n=a[1])}e.date=r,e.time=n,"letter_box"===e.owner&&(e.delivered=!0,i.packageDelivered=!0),i.firstDestination||(i.firstDestination=e),i.lastDestination=e,i.history.unshift(e)})));case 16:this.showHistory=!0;case 17:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()}},c=s,u=(r("21bb"),r("2877")),l=Object(u["a"])(c,n,i,!1,null,null,null);e["default"]=l.exports},e8b5:function(t,e,r){var n=r("c6b6");t.exports=Array.isArray||function(t){return"Array"==n(t)}},fdbc:function(t,e){t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}}}]);
//# sourceMappingURL=chunk-33812f52.f6df63cc.js.map