(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-57800529"],{"2ed5":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("layout-default",[a("div",{staticClass:"trace-view"},[e.transactionInProgress?a("div",{staticClass:"trace-view-locked"}):e._e(),a("div",[a("form",{staticClass:"md-layout",attrs:{novalidate:"",id:"app",action:"#",method:"post"}},[a("md-card",{staticClass:"md-layout-item md-small-size-100"},[a("md-card-header",[a("div",{staticClass:"md-title"},[e._v("Trace crop")])]),a("md-card-content",[a("div",{staticClass:"md-layout md-gutter"},[a("div",{staticClass:"md-layout-item md-xsmall-size-100 md-small-size-50"},[a("md-field",[a("label",[e._v("FPO name")]),a("md-input",{on:{input:e.fpoChanged},model:{value:e.filterData.fpoName,callback:function(t){e.$set(e.filterData,"fpoName",t)},expression:"filterData.fpoName"}})],1)],1),a("div",{staticClass:"md-layout-item md-xsmall-size-100 md-small-size-50"},[e.filterData.fpoName?a("md-field",[a("label",[e._v("Crop name")]),a("md-input",{on:{input:e.nameChanged},model:{value:e.filterData.cropName,callback:function(t){e.$set(e.filterData,"cropName",t)},expression:"filterData.cropName"}})],1):e._e()],1),a("div",{staticClass:"md-layout-item md-xsmall-size-100 md-small-size-50"},[e.filterData.cropName?a("md-field",[a("label",[e._v("Year")]),a("md-input",{on:{input:e.yearChanged},model:{value:e.filterData.cropYear,callback:function(t){e.$set(e.filterData,"cropYear",t)},expression:"filterData.cropYear"}})],1):e._e()],1),a("div",{staticClass:"md-layout-item md-xsmall-size-100 md-small-size-50"},[e.filterData.cropYear?a("md-field",[a("label",[e._v("Crop ID")]),a("md-input",{model:{value:e.filterData.cropId,callback:function(t){e.$set(e.filterData,"cropId",t)},expression:"filterData.cropId"}})],1):e._e()],1)]),e.formError?a("div",{staticClass:"response response-error"},[e._v(" "+e._s(e.formError)+" ")]):e._e(),e.showTracing&&0===e.searchResult.length?a("div",{staticClass:"response response-error"},[a("b",[e._v("No crop was found.")])]):e._e(),a("md-card-actions",[e.transactionInProgress?a("div",{staticClass:"rq-spinner-container"},[a("md-progress-spinner",{attrs:{"md-mode":"indeterminate","md-diameter":30,"md-stroke":3}})],1):e._e(),e.transactionInProgress?e._e():a("md-button",{staticClass:"md-primary md-raised",attrs:{type:"button"},on:{click:e.searchData}},[e._v("Search")])],1)],1)],1)],1)]),e.showTracing&&e.searchResult.length>0?a("div",{staticClass:"crop-list-container"},[a("md-table",{attrs:{"md-sort":"CropName","md-sort-order":"asc","md-card":""},scopedSlots:e._u([{key:"md-table-row",fn:function(t){var r=t.item;return a("md-table-row",{on:{click:function(t){return e.openKeyDetail(r.Key)}}},[a("md-table-cell",{attrs:{"md-label":"FPO name","md-sort-by":"FpoName"}},[e._v(e._s(r.FpoName))]),a("md-table-cell",{attrs:{"md-label":"Crop name","md-sort-by":"CropName"}},[e._v(e._s(r.CropName))]),a("md-table-cell",{attrs:{"md-label":"Date","md-sort-by":"CropDate"}},[e._v(e._s(e.formatDate(r.CropDate)))]),a("md-table-cell",{attrs:{"md-label":"Crop ID","md-sort-by":"CropId"}},[e._v(e._s(r.CropId))])],1)}}],null,!1,3736586087),model:{value:e.searchResult,callback:function(t){e.searchResult=t},expression:"searchResult"}},[a("md-table-toolbar",[a("h1",{staticClass:"md-title"},[e._v("Search result")])])],1)],1):e._e()])])},s=[],o=(a("4160"),a("c975"),a("d3b7"),a("ac1f"),a("1276"),a("159b"),a("96cf"),a("1da1")),i=a("c1df"),n=a.n(i),l=a("7c64"),c=a("51be"),m={name:"History",components:{LayoutDefault:l["a"]},data:function(){return{searchResult:[],keyId:"",key:"",filterData:{},formError:null,showTracing:!1,transactionInProgress:!1}},mounted:function(){this.$route.path&&this.$route.path.indexOf("showTracing")>=0&&this.$route.query.key&&""!==this.$route.query.key&&(this.key=this.$route.query.key,this.searchData())},methods:{onBarcodeDecode:function(e){this.key=e&&""!==e?e:"",this.searchData()},searchData:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(){var t,a,r,s,o,i,n,l=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(this.searchResult=[],this.showTracing=!1,this.formError=null,!this.filterData.fpoName||""===this.filterData.fpoName){e.next=24;break}return this.transactionInProgress=!0,t=!0,a="getCropByFpo",r={fpoName:this.filterData.fpoName},this.filterData.cropName&&""!==this.filterData.cropName&&(a="getCropByFpoCrop",r.cropName=this.filterData.cropName),this.filterData.cropYear&&""!==this.filterData.cropYear&&(a="getCropByFpoCropYear",r.cropYear=this.filterData.cropYear),this.filterData.cropId&&""!==this.filterData.cropId&&(a="getCrop",r={key:this.filterData.fpoName+"~"+this.filterData.cropName+"~"+this.filterData.cropYear+"~"+this.filterData.cropId},t=!1),r={data:r},s={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)},e.next=15,fetch(c["API_LOCATION"]+a,s);case 15:return o=e.sent,e.next=18,o.json();case 18:i=e.sent,n=[],i&&(i.r||i.length>0&&i.forEach((function(e){e.Key&&e.Value&&(e.Value.Key=e.Key,e.Value.CropId=l.cropIdTemplate(e.Value),n.push(e.Value))}))),!t&&i.key&&"noKey"!==i.key?this.openKeyDetail(i.key):(this.transactionInProgress=!1,this.searchResult=n,this.showTracing=!0),e.next=25;break;case 24:this.formError="At least the FPO name must be set to search for a crop.";case 25:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),fpoChanged:function(){this.filterData.fpoName&&""!==this.filterData.fpoName||(this.filterData.cropName="",this.filterData.cropYear="",this.filterData.cropId="")},nameChanged:function(){this.filterData.cropName&&""!==this.filterData.cropName||(this.filterData.cropYear="",this.filterData.cropId="")},yearChanged:function(){this.filterData.cropYear&&""!==this.filterData.cropYear||(this.filterData.cropId="")},cropIdTemplate:function(e){var t="";if(e&&e.Key){var a=e.Key.split("~");a.length>0&&(t=a[a.length-1])}return t},formatDate:function(e){return e?n()(String(e)).format("DD/MM/YYYY"):""},openKeyDetail:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(t){var a,r,s,o,i,n,l;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t){e.next=12;break}return this.transactionInProgress=!0,a={data:{key:t}},r={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)},e.next=6,fetch(c["API_LOCATION"]+"getCrop",r);case 6:return s=e.sent,e.next=9,s.json();case 9:o=e.sent,this.transactionInProgress=!1,o&&o.value&&(i={barCode:null,fpoName:o.value.FpoName,cropName:o.value.CropName,cropDate:new Date(o.value.CropDate),cropId:o.value.CropId},n=[],l=[],o.value.Farmer&&o.value.Farmer.forEach((function(e){e.Name&&""!==e.Name&&(e.index=n.length,n.push(e))})),o.value.Inputs&&o.value.Inputs.forEach((function(e){e.Name&&""!==e.Name&&(e.index=l.length,l.push(e))})),i.farmer=n,i.inputs=l,i.key=t,i.seedData={},o.value.Seed&&(i.seedData={cropName2:o.value.Seed.CropName,cropVarityName:o.value.Seed.CropVarityName,purchasedFrom:o.value.Seed.PurchasedFrom,seedDate:new Date(o.value.Seed.SeedDate)}),this.$router.push({name:"store",params:{cropData:i}}));case 12:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()}},d=m,p=(a("4e11"),a("2877")),u=Object(p["a"])(d,r,s,!1,null,"0f0504a9",null);t["default"]=u.exports},"4e11":function(e,t,a){"use strict";var r=a("ba5c"),s=a.n(r);s.a},ba5c:function(e,t,a){}}]);
//# sourceMappingURL=chunk-57800529.7905f21a.js.map