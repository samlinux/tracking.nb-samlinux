(function(e){function t(t){for(var r,o,i=t[0],s=t[1],c=t[2],l=0,d=[];l<i.length;l++)o=i[l],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&d.push(a[o][0]),a[o]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);m&&m(t);while(d.length)d.shift()();return u.push.apply(u,c||[]),n()}function n(){for(var e,t=0;t<u.length;t++){for(var n=u[t],r=!0,o=1;o<n.length;o++){var i=n[o];0!==a[i]&&(r=!1)}r&&(u.splice(t--,1),e=s(s.s=n[0]))}return e}var r={},o={app:0},a={app:0},u=[];function i(e){return s.p+"js/"+({}[e]||e)+"."+{"chunk-3e365c42":"1b7fc85b","chunk-1a78d7c0":"a60ad4fc","chunk-f6d29ffe":"2f93e03f"}[e]+".js"}function s(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(e){var t=[],n={"chunk-3e365c42":1,"chunk-1a78d7c0":1,"chunk-f6d29ffe":1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-3e365c42":"66e99024","chunk-1a78d7c0":"a7a60f05","chunk-f6d29ffe":"28ab08d4"}[e]+".css",a=s.p+r,u=document.getElementsByTagName("link"),i=0;i<u.length;i++){var c=u[i],l=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(l===r||l===a))return t()}var d=document.getElementsByTagName("style");for(i=0;i<d.length;i++){c=d[i],l=c.getAttribute("data-href");if(l===r||l===a)return t()}var m=document.createElement("link");m.rel="stylesheet",m.type="text/css",m.onload=t,m.onerror=function(t){var r=t&&t.target&&t.target.src||a,u=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");u.code="CSS_CHUNK_LOAD_FAILED",u.request=r,delete o[e],m.parentNode.removeChild(m),n(u)},m.href=a;var f=document.getElementsByTagName("head")[0];f.appendChild(m)})).then((function(){o[e]=0})));var r=a[e];if(0!==r)if(r)t.push(r[2]);else{var u=new Promise((function(t,n){r=a[e]=[t,n]}));t.push(r[2]=u);var c,l=document.createElement("script");l.charset="utf-8",l.timeout=120,s.nc&&l.setAttribute("nonce",s.nc),l.src=i(e);var d=new Error;c=function(t){l.onerror=l.onload=null,clearTimeout(m);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",d.name="ChunkLoadError",d.type=r,d.request=o,n[1](d)}a[e]=void 0}};var m=setTimeout((function(){c({type:"timeout",target:l})}),12e4);l.onerror=l.onload=c,document.head.appendChild(l)}return Promise.all(t)},s.m=e,s.c=r,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(n,r,function(t){return e[t]}.bind(null,r));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/",s.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],l=c.push.bind(c);c.push=t,c=c.slice();for(var d=0;d<c.length;d++)t(c[d]);var m=l;u.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),o=n("2ead"),a=n.n(o),u=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"App"},[n("md-app",{attrs:{"md-waterfall":"","md-mode":"fixed"}},[n("md-app-toolbar",{staticClass:"md-primary"},[n("md-button",{staticClass:"md-icon-button",on:{click:function(t){e.menuVisible=!e.menuVisible}}},[n("md-icon",[e._v("menu")])],1),n("span",{staticClass:"md-title"},[e._v("SingPost Secure Tracking")])],1),n("md-app-drawer",{attrs:{"md-active":e.menuVisible},on:{"update:mdActive":function(t){e.menuVisible=t},"update:md-active":function(t){e.menuVisible=t}}},[n("md-toolbar",{staticClass:"md-transparent",attrs:{"md-elevation":"0"}},[n("b",[e._v("Navigation")])]),n("md-list",[n("md-list-item",{staticClass:"sidebar-menu-item",on:{click:function(t){return e.navTo("history")}}},[n("md-icon",[e._v("local_shipping")]),n("span",{staticClass:"md-list-item-text"},[e._v(e._s(e.menuModules.history.moduleName))])],1),n("md-list-item",{staticClass:"sidebar-menu-item",on:{click:function(t){return e.navTo("store")}}},[n("md-icon",[e._v("move_to_inbox")]),n("span",{staticClass:"md-list-item-text"},[e._v(e._s(e.menuModules.store.moduleName))])],1)],1)],1),n("md-app-content",[n("router-view"),n("footer",{staticClass:"app-footer"},[e._v(" © "+e._s(e.$moment().format("YYYY"))+" - supported by "),n("a",{staticClass:"footer-link",attrs:{href:"https://samlinux.at/",target:"_blank"}},[e._v("samlinux.at")])])],1)],1)],1)},i=[],s=(n("ac1f"),n("1276"),{name:"App",data:function(){return{menuVisible:!1,currentModule:"",menuModules:{history:{moduleName:"Package History",modulePath:"/history"},store:{moduleName:"Store",modulePath:"/store"}}}},mounted:function(){var e="history",t=window.location.pathname;if(t&&""!==t){var n=t.split("/");n.length>1&&n[n.length-1]&&""!==n[n.length-1]&&(e=n[n.length-1])}this.$router.currentRoute&&this.navTo(e)},methods:{navTo:function(e){this.menuModules[e]&&(this.setCurrentModuleName(this.menuModules[e].moduleName),this.$router.push(this.menuModules[e].modulePath).catch((function(){})),this.menuVisible=!1)},setCurrentModuleName:function(e){this.currentModule=e}}}),c=s,l=(n("5c0b"),n("2877")),d=Object(l["a"])(c,u,i,!1,null,null,null),m=d.exports,f=(n("d3b7"),n("8c4f")),p=function(){return Promise.all([n.e("chunk-3e365c42"),n.e("chunk-f6d29ffe")]).then(n.bind(null,"bb51"))},h=function(){return Promise.all([n.e("chunk-3e365c42"),n.e("chunk-1a78d7c0")]).then(n.bind(null,"2c25"))};r["default"].use(f["a"]);var v=new f["a"]({routes:[{path:"/history",name:"history",component:p},{path:"/store",name:"store",component:h},{path:"*",name:"",component:p}],mode:"history"}),b=n("43f9"),g=n.n(b),y=(n("51de"),n("8a44"),n("6d12")),k=n.n(y);r["default"].config.productionTip=!1,r["default"].use(a.a,{}),r["default"].use(g.a),r["default"].use(k.a),new r["default"]({router:v,render:function(e){return e(m)}}).$mount("#app")},"5c0b":function(e,t,n){"use strict";var r=n("9c0c"),o=n.n(r);o.a},"8a44":function(e,t,n){},"9c0c":function(e,t,n){}});
//# sourceMappingURL=app.3e2433e1.js.map