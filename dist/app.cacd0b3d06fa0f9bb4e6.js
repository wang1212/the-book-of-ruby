!function(n){var r={};function o(t){if(r[t])return r[t].exports;var e=r[t]={i:t,l:!1,exports:{}};return n[t].call(e.exports,e,e.exports,o),e.l=!0,e.exports}o.m=n,o.c=r,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=1)}([function(t){t.exports=[{order:0,path:"0-index.html",title:"首页",ctime:"2017-06-01 20:30:00",mtime:"2018-11-03 21:14:00"},{order:1,path:"1-author.html",title:"关于作者",ctime:"2017-06-01 20:30:00",mtime:"2017-06-01 20:30:00"},{order:2,path:"2-introduction.html",title:"序言",ctime:"2017-06-03 18:30:00",mtime:"2017-06-03 18:30:00"}]},function(t,e,n){"use strict";n.r(e);n(2);var r=n(0),o="";r.forEach(function(t){o+='<a href="#/'+t.path+'">'+t.title+"</a>"}),document.getElementById("nav").innerHTML=o,window.onhashchange=function(){var t=location.hash.slice(2);fetch("../html/"+t).then(function(t){200==t.status?t.text().then(function(t){return document.getElementById("content").innerHTML=t}):location.hash="/"+r[0].path})},window.onhashchange()},function(t,e,n){}]);