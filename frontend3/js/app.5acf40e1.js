(function(e){function t(t){for(var a,o,s=t[0],c=t[1],u=t[2],d=0,l=[];d<s.length;d++)o=s[d],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&l.push(r[o][0]),r[o]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(e[a]=c[a]);m&&m(t);while(l.length)l.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],a=!0,o=1;o<n.length;o++){var s=n[o];0!==r[s]&&(a=!1)}a&&(i.splice(t--,1),e=c(c.s=n[0]))}return e}var a={},o={app:0},r={app:0},i=[];function s(e){return c.p+"js/"+({}[e]||e)+"."+{"chunk-8f10e992":"038bf13e","chunk-28dddd56":"b7c300ea","chunk-6bca6976":"7f7258ee"}[e]+".js"}function c(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n={"chunk-8f10e992":1,"chunk-28dddd56":1,"chunk-6bca6976":1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise((function(t,n){for(var a="css/"+({}[e]||e)+"."+{"chunk-8f10e992":"a5b72307","chunk-28dddd56":"d8f9cba2","chunk-6bca6976":"3c0b71e4"}[e]+".css",r=c.p+a,i=document.getElementsByTagName("link"),s=0;s<i.length;s++){var u=i[s],d=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(d===a||d===r))return t()}var l=document.getElementsByTagName("style");for(s=0;s<l.length;s++){u=l[s],d=u.getAttribute("data-href");if(d===a||d===r)return t()}var m=document.createElement("link");m.rel="stylesheet",m.type="text/css",m.onload=t,m.onerror=function(t){var a=t&&t.target&&t.target.src||r,i=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=a,delete o[e],m.parentNode.removeChild(m),n(i)},m.href=r;var p=document.getElementsByTagName("head")[0];p.appendChild(m)})).then((function(){o[e]=0})));var a=r[e];if(0!==a)if(a)t.push(a[2]);else{var i=new Promise((function(t,n){a=r[e]=[t,n]}));t.push(a[2]=i);var u,d=document.createElement("script");d.charset="utf-8",d.timeout=120,c.nc&&d.setAttribute("nonce",c.nc),d.src=s(e);var l=new Error;u=function(t){d.onerror=d.onload=null,clearTimeout(m);var n=r[e];if(0!==n){if(n){var a=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;l.message="Loading chunk "+e+" failed.\n("+a+": "+o+")",l.name="ChunkLoadError",l.type=a,l.request=o,n[1](l)}r[e]=void 0}};var m=setTimeout((function(){u({type:"timeout",target:d})}),12e4);d.onerror=d.onload=u,document.head.appendChild(d)}return Promise.all(t)},c.m=e,c.c=a,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)c.d(n,a,function(t){return e[t]}.bind(null,a));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="",c.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],d=u.push.bind(u);u.push=t,u=u.slice();for(var l=0;l<u.length;l++)t(u[l]);var m=d;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"032d":function(e,t,n){},"2b19":function(e,t,n){},"3f8f":function(e,t,n){"use strict";var a=n("b030"),o=n.n(a);o.a},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),o=n("2ead"),r=n.n(o),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"App"},[n("div",{staticClass:"app-container"},[n("md-app",{attrs:{"md-waterfall":"","md-mode":"fixed"}},[n("md-app-drawer",{attrs:{"md-right":"","md-fixed":"","md-active":e.menuVisible},on:{"update:mdActive":function(t){e.menuVisible=t},"update:md-active":function(t){e.menuVisible=t}}},[n("md-toolbar",{staticClass:"md-transparent md-drawer-header",attrs:{"md-elevation":"0"}},[n("b",[e._v("Navigation")])]),n("md-list",[n("md-list-item",{staticClass:"sidebar-menu-item",on:{click:function(t){return e.navTo("history")}}},[n("md-icon",[e._v("history")]),n("span",{staticClass:"md-list-item-text"},[e._v(e._s(e.menuModules.history.moduleName))])],1),n("md-list-item",{staticClass:"sidebar-menu-item",on:{click:function(t){return e.navTo("store")}}},[n("md-icon",[e._v("add_box")]),n("span",{staticClass:"md-list-item-text"},[e._v(e._s(e.menuModules.store.moduleName))])],1)],1)],1),n("md-app-toolbar",{staticClass:"md-primary"},[n("span",{staticClass:"md-title"},[n("div",{staticClass:"app-logo"},[n("span",{staticClass:"app-logo-text"},[e._v("SDG - Crop Tracing")])])]),n("div",{staticClass:"app-menu-button"},[n("md-button",{staticClass:"md-icon-button",on:{click:function(t){e.menuVisible=!e.menuVisible}}},[n("md-icon",[e._v("menu")])],1)],1)]),n("md-app-content",[n("router-view")],1)],1)],1),n("footer",{staticClass:"app-footer"},[e._v(" © "+e._s(e.$moment().format("YYYY"))+" - supported by "),n("a",{staticClass:"footer-link",attrs:{href:"https://samlinux.at/",target:"_blank"}},[e._v("samlinux.at")])])])},s=[],c=(n("ac1f"),n("1276"),{name:"App",data:function(){return{menuVisible:!1,currentModule:"",menuModules:{history:{moduleName:"Trace crop",modulePath:"/app3/history"},store:{moduleName:"Create crop",modulePath:"/app3/store"}}}},mounted:function(){var e="history",t=window.location.pathname;if(t&&""!==t){var n=t.split("/");n.length>1&&n[n.length-1]&&""!==n[n.length-1]&&(e=n[n.length-1])}new u,localStorage.removeItem("search-data"),this.$router.currentRoute&&this.navTo(e)},methods:{navTo:function(e){this.menuModules[e]&&(this.setCurrentModuleName(this.menuModules[e].moduleName,e),this.$router.push(this.menuModules[e].modulePath).catch((function(){})),this.menuVisible=!1)},setCurrentModuleName:function(e,t){this.currentModule=e,"store"===t&&window.dispatchCustomEvent(new Event("navStore"))}}}),u=function(){var e=document.createTextNode(null);window.addCustomEventListener=e.addEventListener.bind(e),window.removeCustomEventListener=e.removeEventListener.bind(e),window.dispatchCustomEvent=e.dispatchEvent.bind(e)},d=c,l=(n("3f8f"),n("2877")),m=Object(l["a"])(d,i,s,!1,null,"7ba3bad4",null),p=m.exports,f=(n("d3b7"),n("8c4f")),h=function(){return Promise.all([n.e("chunk-8f10e992"),n.e("chunk-28dddd56")]).then(n.bind(null,"2ed5"))},v=function(){return Promise.all([n.e("chunk-8f10e992"),n.e("chunk-6bca6976")]).then(n.bind(null,"5db5"))};a["default"].use(f["a"]);var b=new f["a"]({routes:[{path:"/app3/history",name:"history",component:h},{path:"/app3/store",name:"store",component:v,props:!0},{path:"*",name:"",component:h}],mode:"history"}),g=n("43f9"),w=n.n(g),y=n("8179"),C=(n("51de"),n("2b19"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("md-dialog",{staticClass:"scan-barcode-dialog",attrs:{"md-fullscreen":!1,"md-active":e.showDialog},on:{"update:mdActive":function(t){e.showDialog=t},"update:md-active":function(t){e.showDialog=t}}},[n("md-dialog-title",[e._v("Scan crop barcode")]),n("md-dialog-content",{staticClass:"barcode-dialog-container"},[n("div",{staticClass:"barcode-scanner",class:{"no-camera-available":e.scannerInitError}},[n("v-quagga",{attrs:{onDetected:e.onBarcodeDecode,readerSize:e.readerSize}}),e.scannerInitError?n("div",{staticClass:"qr-init-error"},[e._v(" Error: No camera available or missing permissions! ")]):e._e()],1)]),n("md-dialog-actions",[n("md-button",{staticClass:"md-primary",on:{click:function(t){return e.closeDialog()}}},[e._v("Close")])],1)],1)}),_=[],k={name:"BarcodeScanner",props:{openDialog:Boolean},watch:{openDialog:function(){this.open()}},components:{},data:function(){return{scanResult:"",scannerInitError:null,showDialog:!1,readerSize:{width:640,height:480}}},methods:{open:function(){this.showDialog=!0},closeDialog:function(e){e&&!isNaN(parseInt(e))&&this.$emit("barcodeScanned",parseInt(e)),this.showDialog=!1},onBarcodeDecode:function(e){e&&e.codeResult&&e.codeResult.code&&(isNaN(parseInt(e.codeResult.code))||this.closeDialog(e.codeResult.code))}}},E=k,N=(n("8aea"),Object(l["a"])(E,C,_,!1,null,"89f64496",null)),S=N.exports;a["default"].config.productionTip=!1,a["default"].use(r.a,{}),a["default"].use(w.a),a["default"].use(y["a"]),a["default"].component("BarcodeScanner",S),new a["default"]({router:b,render:function(e){return e(p)}}).$mount("#app")},"8aea":function(e,t,n){"use strict";var a=n("032d"),o=n.n(a);o.a},b030:function(e,t,n){}});
//# sourceMappingURL=app.5acf40e1.js.map