(function(e){function t(t){for(var o,a,s=t[0],u=t[1],c=t[2],l=0,d=[];l<s.length;l++)a=s[l],Object.prototype.hasOwnProperty.call(r,a)&&r[a]&&d.push(r[a][0]),r[a]=0;for(o in u)Object.prototype.hasOwnProperty.call(u,o)&&(e[o]=u[o]);m&&m(t);while(d.length)d.shift()();return i.push.apply(i,c||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],o=!0,a=1;a<n.length;a++){var s=n[a];0!==r[s]&&(o=!1)}o&&(i.splice(t--,1),e=u(u.s=n[0]))}return e}var o={},a={app:0},r={app:0},i=[];function s(e){return u.p+"js/"+({}[e]||e)+"."+{"chunk-8f10e992":"038bf13e","chunk-39b8e62d":"c5eb39e3","chunk-63643bd6":"9a06839c"}[e]+".js"}function u(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(e){var t=[],n={"chunk-8f10e992":1,"chunk-39b8e62d":1,"chunk-63643bd6":1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=new Promise((function(t,n){for(var o="css/"+({}[e]||e)+"."+{"chunk-8f10e992":"a5b72307","chunk-39b8e62d":"c1a7ee7e","chunk-63643bd6":"d8f9cba2"}[e]+".css",r=u.p+o,i=document.getElementsByTagName("link"),s=0;s<i.length;s++){var c=i[s],l=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(l===o||l===r))return t()}var d=document.getElementsByTagName("style");for(s=0;s<d.length;s++){c=d[s],l=c.getAttribute("data-href");if(l===o||l===r)return t()}var m=document.createElement("link");m.rel="stylesheet",m.type="text/css",m.onload=t,m.onerror=function(t){var o=t&&t.target&&t.target.src||r,i=new Error("Loading CSS chunk "+e+" failed.\n("+o+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=o,delete a[e],m.parentNode.removeChild(m),n(i)},m.href=r;var p=document.getElementsByTagName("head")[0];p.appendChild(m)})).then((function(){a[e]=0})));var o=r[e];if(0!==o)if(o)t.push(o[2]);else{var i=new Promise((function(t,n){o=r[e]=[t,n]}));t.push(o[2]=i);var c,l=document.createElement("script");l.charset="utf-8",l.timeout=120,u.nc&&l.setAttribute("nonce",u.nc),l.src=s(e);var d=new Error;c=function(t){l.onerror=l.onload=null,clearTimeout(m);var n=r[e];if(0!==n){if(n){var o=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+o+": "+a+")",d.name="ChunkLoadError",d.type=o,d.request=a,n[1](d)}r[e]=void 0}};var m=setTimeout((function(){c({type:"timeout",target:l})}),12e4);l.onerror=l.onload=c,document.head.appendChild(l)}return Promise.all(t)},u.m=e,u.c=o,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)u.d(n,o,function(t){return e[t]}.bind(null,o));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="",u.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],l=c.push.bind(c);c.push=t,c=c.slice();for(var d=0;d<c.length;d++)t(c[d]);var m=l;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"032d":function(e,t,n){},"2b19":function(e,t,n){},"3f8f":function(e,t,n){"use strict";var o=n("b030"),a=n.n(o);a.a},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("2b0e"),a=n("2ead"),r=n.n(a),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"App"},[n("div",{staticClass:"app-container"},[n("md-app",{attrs:{"md-waterfall":"","md-mode":"fixed"}},[n("md-app-drawer",{attrs:{"md-right":"","md-fixed":"","md-active":e.menuVisible},on:{"update:mdActive":function(t){e.menuVisible=t},"update:md-active":function(t){e.menuVisible=t}}},[n("md-toolbar",{staticClass:"md-transparent md-drawer-header",attrs:{"md-elevation":"0"}},[n("b",[e._v("Navigation")])]),n("md-list",[n("md-list-item",{staticClass:"sidebar-menu-item",on:{click:function(t){return e.navTo("history")}}},[n("md-icon",[e._v("history")]),n("span",{staticClass:"md-list-item-text"},[e._v(e._s(e.menuModules.history.moduleName))])],1),n("md-list-item",{staticClass:"sidebar-menu-item",on:{click:function(t){return e.navTo("store")}}},[n("md-icon",[e._v("add_box")]),n("span",{staticClass:"md-list-item-text"},[e._v(e._s(e.menuModules.store.moduleName))])],1)],1)],1),n("md-app-toolbar",{staticClass:"md-primary"},[n("span",{staticClass:"md-title"},[n("div",{staticClass:"app-logo"},[n("span",{staticClass:"app-logo-text"},[e._v("SDG - Crop Tracing")])])]),n("div",{staticClass:"app-menu-button"},[n("md-button",{staticClass:"md-icon-button",on:{click:function(t){e.menuVisible=!e.menuVisible}}},[n("md-icon",[e._v("menu")])],1)],1)]),n("md-app-content",[n("router-view")],1)],1)],1),n("footer",{staticClass:"app-footer"},[e._v(" © "+e._s(e.$moment().format("YYYY"))+" - supported by "),n("a",{staticClass:"footer-link",attrs:{href:"https://samlinux.at/",target:"_blank"}},[e._v("samlinux.at")])])])},s=[],u=(n("ac1f"),n("1276"),{name:"App",data:function(){return{menuVisible:!1,currentModule:"",menuModules:{history:{moduleName:"Trace crop",modulePath:"/app3/history"},store:{moduleName:"Create crop",modulePath:"/app3/store"}}}},mounted:function(){var e="history",t=window.location.pathname;if(t&&""!==t){var n=t.split("/");n.length>1&&n[n.length-1]&&""!==n[n.length-1]&&(e=n[n.length-1])}new c,localStorage.removeItem("search-data"),this.$router.currentRoute&&this.navTo(e)},methods:{navTo:function(e){this.menuModules[e]&&(this.setCurrentModuleName(this.menuModules[e].moduleName,e),this.$router.push(this.menuModules[e].modulePath).catch((function(){})),this.menuVisible=!1)},setCurrentModuleName:function(e,t){this.currentModule=e,"store"===t&&window.dispatchCustomEvent(new Event("navStore"))}}}),c=function(){var e=document.createTextNode(null);window.addCustomEventListener=e.addEventListener.bind(e),window.removeCustomEventListener=e.removeEventListener.bind(e),window.dispatchCustomEvent=e.dispatchEvent.bind(e)},l=u,d=(n("3f8f"),n("2877")),m=Object(d["a"])(l,i,s,!1,null,"7ba3bad4",null),p=m.exports,f=(n("d3b7"),n("8c4f")),h=function(){return Promise.all([n.e("chunk-8f10e992"),n.e("chunk-63643bd6")]).then(n.bind(null,"2ed5"))},v=function(){return Promise.all([n.e("chunk-8f10e992"),n.e("chunk-39b8e62d")]).then(n.bind(null,"5db5"))};o["default"].use(f["a"]);var b=new f["a"]({routes:[{path:"/app3/history",name:"history",component:h},{path:"/app3/store",name:"store",component:v,props:!0},{path:"*",name:"",component:h}],mode:"history"}),g=n("43f9"),w=n.n(g),y=n("8179"),C=(n("51de"),n("2b19"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("md-dialog",{staticClass:"scan-barcode-dialog",attrs:{"md-fullscreen":!1,"md-active":e.showDialog},on:{"update:mdActive":function(t){e.showDialog=t},"update:md-active":function(t){e.showDialog=t}}},[n("md-dialog-title",[e._v("Scan crop barcode")]),n("md-dialog-content",{staticClass:"barcode-dialog-container"},[n("div",{staticClass:"barcode-scanner",class:{"no-camera-available":e.scannerInitError}},[n("v-quagga",{attrs:{onDetected:e.onBarcodeDecode,readerSize:e.readerSize}}),e.scannerInitError?n("div",{staticClass:"qr-init-error"},[e._v(" Error: No camera available or missing permissions! ")]):e._e()],1)]),n("md-dialog-actions",[n("md-button",{staticClass:"md-primary",on:{click:function(t){return e.closeDialog()}}},[e._v("Close")])],1)],1)}),_=[],k={name:"BarcodeScanner",props:{openDialog:Boolean},watch:{openDialog:function(){this.open()}},components:{},data:function(){return{scanResult:"",scannerInitError:null,showDialog:!1,readerSize:{width:640,height:480}}},methods:{open:function(){this.showDialog=!0},closeDialog:function(e){e&&this.$emit("barcodeScanned",this.scanResult),this.showDialog=!1},onBarcodeDecode:function(e){console.log("detected",e)}}},E=k,S=(n("8aea"),Object(d["a"])(E,C,_,!1,null,"89f64496",null)),x=S.exports;o["default"].config.productionTip=!1,o["default"].use(r.a,{}),o["default"].use(w.a),o["default"].use(y["a"]),o["default"].component("BarcodeScanner",x),new o["default"]({router:b,render:function(e){return e(p)}}).$mount("#app")},"8aea":function(e,t,n){"use strict";var o=n("032d"),a=n.n(o);a.a},b030:function(e,t,n){}});
//# sourceMappingURL=app.150ddb62.js.map