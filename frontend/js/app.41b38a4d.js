(function(e){function t(t){for(var r,o,s=t[0],u=t[1],c=t[2],l=0,d=[];l<s.length;l++)o=s[l],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&d.push(a[o][0]),a[o]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);m&&m(t);while(d.length)d.shift()();return i.push.apply(i,c||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,o=1;o<n.length;o++){var s=n[o];0!==a[s]&&(r=!1)}r&&(i.splice(t--,1),e=u(u.s=n[0]))}return e}var r={},o={app:0},a={app:0},i=[];function s(e){return u.p+"js/"+({}[e]||e)+"."+{"chunk-00c35d05":"d0a4a49f","chunk-6a31fa85":"689fa22c"}[e]+".js"}function u(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(e){var t=[],n={"chunk-00c35d05":1,"chunk-6a31fa85":1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-00c35d05":"e0a2d412","chunk-6a31fa85":"a97b894f"}[e]+".css",a=u.p+r,i=document.getElementsByTagName("link"),s=0;s<i.length;s++){var c=i[s],l=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(l===r||l===a))return t()}var d=document.getElementsByTagName("style");for(s=0;s<d.length;s++){c=d[s],l=c.getAttribute("data-href");if(l===r||l===a)return t()}var m=document.createElement("link");m.rel="stylesheet",m.type="text/css",m.onload=t,m.onerror=function(t){var r=t&&t.target&&t.target.src||a,i=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=r,delete o[e],m.parentNode.removeChild(m),n(i)},m.href=a;var p=document.getElementsByTagName("head")[0];p.appendChild(m)})).then((function(){o[e]=0})));var r=a[e];if(0!==r)if(r)t.push(r[2]);else{var i=new Promise((function(t,n){r=a[e]=[t,n]}));t.push(r[2]=i);var c,l=document.createElement("script");l.charset="utf-8",l.timeout=120,u.nc&&l.setAttribute("nonce",u.nc),l.src=s(e);var d=new Error;c=function(t){l.onerror=l.onload=null,clearTimeout(m);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",d.name="ChunkLoadError",d.type=r,d.request=o,n[1](d)}a[e]=void 0}};var m=setTimeout((function(){c({type:"timeout",target:l})}),12e4);l.onerror=l.onload=c,document.head.appendChild(l)}return Promise.all(t)},u.m=e,u.c=r,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)u.d(n,r,function(t){return e[t]}.bind(null,r));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="",u.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],l=c.push.bind(c);c.push=t,c=c.slice();for(var d=0;d<c.length;d++)t(c[d]);var m=l;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"212a":function(e,t,n){"use strict";var r=n("4199"),o=n.n(r);o.a},"2b19":function(e,t,n){},4199:function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),o=n("2ead"),a=n.n(o),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"App"},[n("div",{staticClass:"app-container"},[n("md-app",{attrs:{"md-waterfall":"","md-mode":"fixed"}},[n("md-app-drawer",{attrs:{"md-active":e.menuVisible},on:{"update:mdActive":function(t){e.menuVisible=t},"update:md-active":function(t){e.menuVisible=t}}},[n("md-toolbar",{staticClass:"md-transparent",attrs:{"md-elevation":"0"}},[n("b",[e._v("Navigation")])]),n("md-list",[n("md-list-item",{staticClass:"sidebar-menu-item",on:{click:function(t){return e.navTo("history")}}},[n("md-icon",[e._v("local_shipping")]),n("span",{staticClass:"md-list-item-text"},[e._v(e._s(e.menuModules.history.moduleName))])],1),n("md-list-item",{staticClass:"sidebar-menu-item",on:{click:function(t){return e.navTo("store")}}},[n("md-icon",[e._v("move_to_inbox")]),n("span",{staticClass:"md-list-item-text"},[e._v(e._s(e.menuModules.store.moduleName))])],1)],1)],1),n("md-app-toolbar",{staticClass:"md-primary"},[n("md-button",{staticClass:"md-icon-button",on:{click:function(t){e.menuVisible=!e.menuVisible}}},[n("md-icon",[e._v("menu")])],1),n("span",{staticClass:"md-title"},[e._v("SingPost Secure Tracking")])],1),n("md-app-content",[n("router-view")],1)],1)],1),n("footer",{staticClass:"app-footer"},[e._v(" © "+e._s(e.$moment().format("YYYY"))+" - supported by "),n("a",{staticClass:"footer-link",attrs:{href:"https://samlinux.at/",target:"_blank"}},[e._v("samlinux.at")])])])},s=[],u=(n("ac1f"),n("1276"),{name:"App",data:function(){return{menuVisible:!1,currentModule:"",menuModules:{history:{moduleName:"Package History",modulePath:"/history"},store:{moduleName:"Store",modulePath:"/store"}}}},mounted:function(){var e="history",t=window.location.pathname;if(t&&""!==t){var n=t.split("/");n.length>1&&n[n.length-1]&&""!==n[n.length-1]&&(e=n[n.length-1])}this.$router.currentRoute&&this.navTo(e)},methods:{navTo:function(e){this.menuModules[e]&&(this.setCurrentModuleName(this.menuModules[e].moduleName),this.$router.push(this.menuModules[e].modulePath).catch((function(){})),this.menuVisible=!1)},setCurrentModuleName:function(e){this.currentModule=e}}}),c=u,l=(n("6e48"),n("2877")),d=Object(l["a"])(c,i,s,!1,null,"57563568",null),m=d.exports,p=(n("d3b7"),n("8c4f")),f=function(){return n.e("chunk-6a31fa85").then(n.bind(null,"2ed5"))},h=function(){return n.e("chunk-00c35d05").then(n.bind(null,"5db5"))};r["default"].use(p["a"]);var v=new p["a"]({routes:[{path:"/history",name:"history",component:f},{path:"/store",name:"store",component:h},{path:"*",name:"",component:f}],mode:"history"}),g=n("43f9"),b=n.n(g),y=(n("51de"),n("2b19"),n("6d12")),w=n.n(y),_=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("md-dialog",{staticClass:"scan-qr-dialog",attrs:{"md-fullscreen":!1,"md-active":e.showDialog},on:{"update:mdActive":function(t){e.showDialog=t},"update:md-active":function(t){e.showDialog=t}}},[n("md-dialog-title",[e._v("Scan QR package ID")]),n("md-dialog-content",{staticClass:"qr-dialog-container"},[n("div",{staticClass:"qr-code-scanner",class:{"no-camera-available":e.qrInitError}},[n("qrcode-stream",{staticClass:"qr-code-stream",on:{decode:e.onQrDecode,init:e.onQrInit}}),e.qrInitError?n("div",{staticClass:"qr-init-error"},[e._v("Error: "+e._s(e.qrInitError)+"!")]):e._e()],1)]),n("md-dialog-actions",[n("md-button",{staticClass:"md-primary",on:{click:function(t){return e.closeDialog()}}},[e._v("Close")])],1)],1)},C=[],E=(n("c975"),n("b0c0"),n("96cf"),n("1da1")),k={name:"QrCodeScanner",props:{openDialog:Boolean},watch:{openDialog:function(){this.open()}},components:{},data:function(){return{scanResult:"",qrInitError:null,showDialog:!1}},methods:{open:function(){this.showDialog=!0},closeDialog:function(e){e&&this.$emit("qrCodeScanned",this.scanResult),this.showDialog=!1},onQrDecode:function(e){var t="";if(e&&""!==e){if(e.indexOf("pid=")>=0){var n=e.split("pid=");n[1]&&""!==n[1]&&(t=n[1])}""===t&&(t=e)}this.scanResult=t,this.closeDialog(!0)},onQrInit:function(e){var t=this;return Object(E["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,e;case 3:delete t.qrInitError,n.next=9;break;case 6:n.prev=6,n.t0=n["catch"](0),"NotAllowedError"===n.t0.name?t.qrInitError="You need to grant camera access permisson":"NotFoundError"===n.t0.name?t.qrInitError="No camera available":"NotReadableError"===n.t0.name?t.qrInitError="Is the camera already in use?":"OverconstrainedError"===n.t0.name?t.qrInitError="Installed cameras are not suitable":"StreamApiNotSupportedError"===n.t0.name?t.qrInitError="This browser does not support using this device's camera":["NotSupportedError","InsecureContextError"].indexOf(n.t0.name)>=0?t.qrInitError="Secure context required (HTTPS)":t.qrInitError="No camera access available";case 9:case"end":return n.stop()}}),n,null,[[0,6]])})))()}}},q=k,x=(n("212a"),Object(l["a"])(q,_,C,!1,null,"17268f0d",null)),S=x.exports;r["default"].config.productionTip=!1,r["default"].use(a.a,{}),r["default"].use(b.a),r["default"].use(w.a),r["default"].component("QrCodeScanner",S),new r["default"]({router:v,render:function(e){return e(m)}}).$mount("#app")},"6e48":function(e,t,n){"use strict";var r=n("98eb"),o=n.n(r);o.a},"98eb":function(e,t,n){}});
//# sourceMappingURL=app.41b38a4d.js.map