(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3e45b754"],{"159b":function(t,e,s){var i=s("da84"),a=s("fdbc"),n=s("17c2"),r=s("9112");for(var c in a){var o=i[c],l=o&&o.prototype;if(l&&l.forEach!==n)try{r(l,"forEach",n)}catch(d){l.forEach=n}}},"17c2":function(t,e,s){"use strict";var i=s("b727").forEach,a=s("a640"),n=s("ae40"),r=a("forEach"),c=n("forEach");t.exports=r&&c?[].forEach:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}},"181d":function(t,e,s){},"2ed5":function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("layout-default",[s("div",{staticClass:"history"},[s("div",[s("form",{staticClass:"md-layout",attrs:{novalidate:"",id:"app",action:"#",method:"post"}},[s("md-card",{staticClass:"md-layout-item md-small-size-100"},[s("md-card-header",[s("div",{staticClass:"md-title"},[t._v("Package History")])]),s("md-card-content",[s("label",{attrs:{for:"pId"}},[t._v("Package ID")]),s("md-field",[s("md-input",{attrs:{name:"pId",id:"pId"},on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:(e.preventDefault(),t.refresh(e))}},model:{value:t.pId,callback:function(e){t.pId=e},expression:"pId"}}),s("md-button",{staticClass:"md-icon-button",staticStyle:{margin:"0"},on:{click:function(e){t.showQrScanner=!t.showQrScanner}}},[s("md-icon",[t._v("qr_code_scanner")])],1)],1),s("md-card-actions",[s("md-button",{staticClass:"md-primary md-raised",attrs:{type:"button"},on:{click:t.refresh}},[t._v("check")])],1),t.showHistory&&!t.packageExists?s("div",{staticStyle:{"text-align":"center",color:"red"}},[s("small",[s("b",[t._v("Sorry, we cannot detect a package with the given package ID.")])])]):t._e()],1)],1)],1),t.showHistory&&t.packageExists?s("div",{staticClass:"history-container"},[s("md-card",{staticClass:"md-layout-item md-small-size-100"},[s("md-card-header",{staticClass:"history-card-header"},[s("div",{staticClass:"md-title"},[t.packageDelivered?s("span",{staticClass:"md-title-icon success"},[s("i",{staticClass:"material-icons"},[t._v("check")])]):s("span",{staticClass:"md-title-icon"},[s("i",{staticClass:"material-icons"},[t._v("local_shipping")])]),s("div",{staticClass:"md-title-label"},[t._v("PID "+t._s(t.keyId))])]),s("div",{staticClass:"history-progress"},[s("div",{staticClass:"history-progress-bar",class:{success:t.packageDelivered}},[s("div",{staticClass:"history-progress-bar-element"}),s("div",{staticClass:"history-progress-bar-element"})])]),t.packageDelivered?s("div",{staticClass:"history-status success"},[t._v("Package delivered")]):s("div",{staticClass:"history-status"},[t._v("Package in transit")]),s("div",{staticClass:"history-current-owner"},[t._v("Current owner: "+t._s(t.lastDestination.owner))])]),s("md-card-content",[s("div",{staticClass:"timeline"},t._l(t.history,(function(e){return s("div",{key:e.txId,staticClass:"timeline-event"},[s("div",{staticClass:"timeline-content"},[s("div",{staticClass:"timeline-content-date"},[t._v(t._s(e.date))]),s("div",{staticClass:"timeline-content-time-destination",class:{success:e.delivered}},[t._v(t._s(e.time))]),s("div",{staticClass:"timeline-content-time-destination",class:{success:e.delivered}},[t._v(t._s(e.owner))])]),e.delivered?s("div",{staticClass:"timeline-badge success"},[s("i",{staticClass:"material-icons"},[t._v("check")])]):s("div",{staticClass:"timeline-badge"},[s("i",{staticClass:"material-icons"},[t._v("arrow_upward")])])])})),0)])],1)],1):t._e()])]),s("QrCodeScanner",{attrs:{openDialog:t.showQrScanner},on:{qrCodeScanned:t.onQrDecode}})],1)},a=[],n=(s("4160"),s("c975"),s("d3b7"),s("ac1f"),s("1276"),s("159b"),s("96cf"),s("1da1")),r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"LayoutDefault"},[s("main",{staticClass:"LayoutDefault__main"},[t._t("default")],2)])},c=[],o={name:"LayoutDefault",data:function(){return{}},created:function(){}},l=o,d=(s("7661"),s("2877")),u=Object(d["a"])(l,r,c,!1,null,null,null),h=u.exports,f=s("51be"),p={name:"History",components:{LayoutDefault:h},data:function(){return{history:[],keyId:"",pId:"",packageExists:!1,packageDelivered:!1,firstDestination:null,lastDestination:null,showHistory:!1,showQrScanner:!1}},mounted:function(){this.$route.path&&this.$route.path.indexOf("showHistory")>=0&&this.$route.query.pid&&""!==this.$route.query.pid&&(this.pId=this.$route.query.pid,this.refresh())},methods:{onQrDecode:function(t){this.pId=t&&""!==t?t:"",this.refresh()},refresh:function(){var t=Object(n["a"])(regeneratorRuntime.mark((function t(){var e,s,i,a,n=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(this.history=[],this.showHistory=!1,this.packageExists=!1,this.packageDelivered=!1,this.firstDestination=null,this.lastDestination=null,!this.pId||""===this.pId){t.next=18;break}return t.next=9,fetch(f["API_LOCATION"]+"getHistory/"+this.pId);case 9:return e=t.sent,t.next=12,e.json();case 12:s=t.sent,this.keyId=s.key,i=JSON.parse(s.value),a=[],i.length>0&&(this.packageExists=!0,i.forEach((function(t){var e={},s="date not obtained",i="time not obtained",r="";if(e.txId=t.TxId,e.owner=t.Packet.owner,e.ts=t.Packet.scanned,t.Packet.scanned&&""!==t.Packet.scanned){var c=t.Packet.scanned.split(" ");c[0]&&""!==c[0]&&(s=c[0]),c[1]&&""!==c[1]&&(i=c[1])}e.date=s,e.time=i;var o=s.split(".");r+=o[2]+"-"+o[1]+"-"+o[0],e.sort=new Date(r+" "+i),"aircraft_takeoff"===e.owner&&(e.delivered=!0,n.packageDelivered=!0),a.push(e)})),a.length>0&&(a.sort((function(t,e){return e.sort-t.sort})),this.firstDestination=a[a.length-1],this.lastDestination=a[0])),this.history=a;case 18:this.showHistory=!0;case 19:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()}},v=p,m=(s("4482"),Object(d["a"])(v,i,a,!1,null,"4656afa9",null));e["default"]=m.exports},4160:function(t,e,s){"use strict";var i=s("23e7"),a=s("17c2");i({target:"Array",proto:!0,forced:[].forEach!=a},{forEach:a})},4482:function(t,e,s){"use strict";var i=s("7607"),a=s.n(i);a.a},"51be":function(t,e,s){"use strict";t.exports={API_LOCATION:"https://nb-tracking.samlinux.com/api2/"}},"65f0":function(t,e,s){var i=s("861d"),a=s("e8b5"),n=s("b622"),r=n("species");t.exports=function(t,e){var s;return a(t)&&(s=t.constructor,"function"!=typeof s||s!==Array&&!a(s.prototype)?i(s)&&(s=s[r],null===s&&(s=void 0)):s=void 0),new(void 0===s?Array:s)(0===e?0:e)}},7607:function(t,e,s){},7661:function(t,e,s){"use strict";var i=s("181d"),a=s.n(i);a.a},b727:function(t,e,s){var i=s("0366"),a=s("44ad"),n=s("7b0b"),r=s("50c4"),c=s("65f0"),o=[].push,l=function(t){var e=1==t,s=2==t,l=3==t,d=4==t,u=6==t,h=5==t||u;return function(f,p,v,m){for(var y,k,C=n(f),g=a(C),b=i(p,v,3),_=r(g.length),w=0,L=m||c,D=e?L(f,_):s?L(f,0):void 0;_>w;w++)if((h||w in g)&&(y=g[w],k=b(y,w,C),t))if(e)D[w]=k;else if(k)switch(t){case 3:return!0;case 5:return y;case 6:return w;case 2:o.call(D,y)}else if(d)return!1;return u?-1:l||d?d:D}};t.exports={forEach:l(0),map:l(1),filter:l(2),some:l(3),every:l(4),find:l(5),findIndex:l(6)}},e8b5:function(t,e,s){var i=s("c6b6");t.exports=Array.isArray||function(t){return"Array"==i(t)}},fdbc:function(t,e){t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}}}]);
//# sourceMappingURL=chunk-3e45b754.e0fd7727.js.map