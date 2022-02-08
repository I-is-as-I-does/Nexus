/*! Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license */
"use strict";(self.webpackChunknexus_io=self.webpackChunknexus_io||[]).push([[20],{176:(n,t,e)=>{e.d(t,{N:()=>gn});var a=e(457),d=e(220),i=e(115),r=e(983),c=e(171),s=e(545),l=e(472),o=e(676),u=e(754);function p(){var n=(0,c.O1)(10);return{nexus:i.Gd,author:{handle:"Anonymous-"+(0,c.Iy)(100,999),about:"",url:"http://"},threads:[h(n)],index:[n]}}function h(n){return{id:n,title:n,description:"...",content:{timestamp:(new Date).toISOString().substring(0,16),main:"...",aside:"",media:{url:"",type:"",caption:""}},linked:[]}}var f=e(52),v=e(929),x=e(397);function g(){var n=(0,a.gd)("BUTTON","nx-add-link");return n.type="button",n.textContent="+",n}const D=["youtube","vimeo","soundcloud"],m={image:["jpg","jpeg","gif","svg","png","webp"],video:["mp4","webm"],audio:["mp3"]};var k=e(937),b=e(498);const I=(0,s.hb)();var E,y,L,O,N,S,A,C={dataUrl:"nexus-tmp",srcData:null,threadId:"/",threadIndex:-1},V=null,j=!1,w=new CustomEvent("IndexChange"),T=!1,U={ctrls:{prev:{symbol:x.nA,elm:null},next:{symbol:x.rQ,elm:null}},position:0,count:1},P=[],Q=null,B=null,F=null,J={up:x.MK,down:x.jF},M={handle:null,url:null,about:null},R=null;function H(n,t){C.srcData.index.splice(t,0,C.srcData.index.splice(n,1)[0]),C.srcData.threads.splice(t,0,C.srcData.threads.splice(n,1)[0])}function W(n,t){var e=C.srcData.index.indexOf(n);$(t.up,0===e),e+1===C.srcData.index.length?$(t.down,!0):$(t.down,!1)}function Y(n,t){Q.removeChild(n),Q.insertBefore(n,t),t.dispatchEvent(w),n.dispatchEvent(w)}function _(n,t){var e=(0,a.gd)("DIV","nx-edit-move"),d={up:null,down:null};n.addEventListener("IndexChange",(function(){W(t,d)})),Object.keys(d).forEach((i=>{d[i]=(0,a.gd)("A","nx-edit-move-"+i),d[i].append((0,a.cy)(J[i],16)),e.append(d[i]),d[i].addEventListener("click",(function(){!function(n,t,e){var a=function(a){var d=C.srcData.index.indexOf(e),i="up"==t;a||(i=!i),i&&0!=d?(H(d,d-1),Y(n,n.previousSibling)):i||d+1==C.srcData.index.length||(H(d,d+1),Y(n.nextSibling,n))};z(a),a(!0)}(n,i,t)}))})),W(t,d),n.append(e)}function G(n,t){var e=(0,a.gd)("FORM","nx-thread-local-form"),d=(0,a.gd)("FIELDSET");d.append(tn(["threads",n,"title"],t)),d.append(tn(["threads",n,"description"]));var i=(0,a.gd)("FIELDSET");["timestamp","main","aside"].forEach((t=>{i.append(tn(["threads",n,"content",t]))}));var r=(0,a.gd)("FIELDSET"),c=tn(["threads",n,"content","media","type"]);return r.append(tn(["threads",n,"content","media","url"],(function(n,t){if(t){var e=c.querySelector("[data-item="+function(n){for(var t=0;t<D.length;t++)if(n.includes(D[t]))return D[t];var e=n.split(".").pop();for(let[n,t]of Object.entries(m))if(t.includes(e))return n;return"page"}(n.value)+"]");e&&e.click()}}))),r.append(c),r.append(tn(["threads",n,"content","media","caption"])),e.append((0,a.a)("local thread"),d,(0,a.a)("content"),i,(0,a.a)("media",2),r),e}function $(n,t=!1){var e=n.classList.contains("nx-disabled");!t&&e?n.classList.remove("nx-disabled"):t&&!e&&n.classList.add("nx-disabled")}function q(n,t,e){var d,i=(0,a.gd)("DIV","nx-edit-distant-link"),c=tn(["threads",t,"linked",e],(function(n,t,e){t&&n.value&&(0,f.P_)(n.value).catch((()=>{e.firstChild.src=x.mb}))})),s=((d=(0,a.gd)("BUTTON","nx-delete-link")).type="button",d.textContent="-",d),l=(0,a.gd)("DIV","nx-distant-link-action");return l.append(s),s.addEventListener("click",(()=>{var a=function(a){if(a)(0,r.Vv)(i,200,(function(){i.remove()}));else if(t===C.threadIndex&&e===C.srcData.threads[t].linked.length-1)(0,r.am)(n,i,!1,!0,200);else{var d=n.childNodes[e];n.insertBefore(i,d),(0,r.YQ)(i,200)}};z(a),a(!0)})),i.append(c,l),i}function K(n,t){var e=(0,a.gd)("LI");return e.append(t),C.threadId!=n&&(e.style.display="none"),(0,s.Ek)((function(t){t.dataUrl==C.dataUrl&&(C=t,t.threadId==n?setTimeout((function(){(0,r.YQ)(e,200)}),200):(0,r.Vv)(e,200))})),e}function X(n,t){var e=Object.assign({},C);return e.threadId=t,e.threadIndex=n,e}function Z(n,t){var e={index:{parent:Q,child:null,link:null,del:null},local:{parent:B,child:null},distant:{parent:F,child:null}};e.index.child=(0,a.gd)("LI"),e.index.link=function(n,t){var e=X(n,t),d=(0,a.j1)(e,!1);return(0,a.I$)(d,e),d.addEventListener("click",(()=>{var n=C.srcData.index.indexOf(t);(0,s.f2)(X(n,t),!0)})),d}(n,t),e.index.child.append(e.index.link),_(e.index.child,t);return e.distant.child=K(t,function(n,t){var e=(0,a.gd)("FORM","nx-thread-distant-form"),d=[],i=C.srcData.threads[n].linked.length;if(i)for(var c=0;c<i;c++){var s=q(e,n,c);d.push(s)}e.append(...d);var l=(0,a.gd)("DIV"),o=g();return o.addEventListener("click",(()=>{var n=C.srcData.index.indexOf(t),a=C.srcData.threads[n].linked.length;C.srcData.threads[n].linked.push(""),(0,r.am)(e,q(e,n,a),!1,!0,200)})),l.append((0,a.a)("linked threads"),e,o),l}(n,t)),e.local.child=K(t,G(n,(function(t,a){if(a){var d=(i=t.value,(0,c.V7)(i.trim().replace(/[\s_]/,"-")));e.index.link.firstChild.textContent=d,nn(["threads",n,"id"],d)}var i}))),e.index.del=function(n,t,e){var d=(0,a.gd)("BUTTON","nx-delete-thread");return d.type="button",d.textContent="-",d.addEventListener("click",(function(){!function(n,t,e){var a=C.srcData.index.indexOf(e),d=Q.childNodes[a],i=C.srcData.index.length,c={index:e,threads:C.srcData.threads[a]},s=function(e){if(e)Object.keys(c).forEach((n=>{C.srcData[n].splice(a,1)})),C.threadIndex=a-1,C.threadId=C.srcData.index[a-1],[t,n,d].forEach((n=>{(0,r.Vv)(n,200,(function(){n.remove()}))})),i>1&&(0===a?d.nextSibling.dispatchEvent(w):a===i-1&&d.previousSibling.dispatchEvent(w));else{if(Object.keys(c).forEach((n=>{C.srcData[n].splice(a,0,c[n])})),a<i-1){var s=Q.childNodes[a];Q.insertBefore(d,s),0===a&&s.dispatchEvent(w)}else Q.append(d),i>1&&d.previousSibling.dispatchEvent(w);(0,r.YQ)(d,200),B.append(n),F.append(t),d.firstChild.click()}};z(s),s(!0)}(n,t,e)})),d}(e.local.child,e.distant.child,t),e.index.child.append(e.index.del),e}function z(n){U.position!=U.count-1&&(P.splice(U.position),U.count=P.length+1),10===U.count?P.splice(0,1):U.count++,P.push(n),U.position=U.count-1,(0,a.eV)(U),$(O,!1)}function nn(n,t){return null===C.srcData&&(C.srcData={}),"author"===n[0]?function(n,t){C.srcData.author||(C.srcData.author={}),C.srcData.author[n[1]]=t}(n,t):(function(n){C.srcData.threads?void 0===C.srcData.threads[n[1]]&&(C.srcData.threads[n[1]]={}):C.srcData.threads=[]}(n),["linked","content"].includes(n[2])?"content"===n[2]?function(n,t){C.srcData.threads[n[1]].content||(C.srcData.threads[n[1]].content={}),"media"===n[3]?(C.srcData.threads[n[1]].content.media||(C.srcData.threads[n[1]].content.media={}),C.srcData.threads[n[1]].content.media[n[4]]=t):C.srcData.threads[n[1]].content[n[3]]=t}(n,t):void function(n,t){C.srcData.threads[n[1]].linked.length?-1===C.srcData.threads[n[1]].linked.indexOf(n[2])?C.srcData.threads[n[1]].linked.push(t):C.srcData.threads[n[1]].linked[n[3]]=t:C.srcData.threads[n[1]].linked=[]}(n,t):function(n,t){C.srcData.threads[n[1]][n[2]]=t}(n,t))}function tn(n,t=null,e=null){var d=function(n){return C.srcData?"author"==n[0]?C.srcData[n[0]][n[1]]:["linked","content"].includes(n[2])?"content"===n[2]?"media"!==n[3]?C.srcData.threads[n[1]].content[n[3]]:C.srcData.threads[n[1]].content.media[n[4]]:C.srcData.threads[n[1]].linked[n[3]]:C.srcData.threads[n[1]][n[2]]:""}(n),r=n.length-1;Number.isInteger(n[r])&&r--;var c=n[r];r--,Number.isInteger(n[r])&&r--;var s,o=n[r];s=["about","description","main","aside","caption"].includes(c)?function(n){var t=(0,a.gd)("TEXTAREA","nx-edit-textarea");return t.textContent=n,t}(d):"timestamp"==c?function(n){var t=(0,a.gd)("INPUT");return t.type="datetime-local",t.value=n,t}(d):function(n){var t=(0,a.gd)("INPUT","nx-edit-text");return t.type="text",t.value=n,t}(d);var u=n.join("-");s.id=u,s.name=u,["handle","title","main","id","url","type","timestamp","linked"].includes(c)&&(s.required=!0);var p=c;"linked"===c&&(p="url");var h,f=function(n){var t=(0,a.gd)("LABEL","nx-edit-label");t.for=n;var e=(0,a.gd)("SPAN","nx-edit-title");return e.textContent=(0,l.GY)(n),(0,v.wu)(e,n),t.append(e),t}(p),g=(0,a.gd)("SPAN","nx-edit-indication"),D=((h=(0,a.gd)("SPAN","nx-edit-feedback")).append((0,a.cy)(x.mb)),h);switch(f.append(g,D),p){case"url":g.textContent="[http]",s.pattern=i.Ni;break;case"id":s.pattern=i.Q1;break;case"type":s.pattern="("+i.WS.join("|")+")";break;case"timestamp":break;default:var m=i.m2[c];g.textContent="["+m[0]+"-"+m[1]+"]",s.setAttribute("maxlength",m[1]),s.setAttribute("minlength",m[0])}e&&(e[c]=s);var k=(0,a.gd)("DIV","nx-edit-input nx-edit-"+o+"-"+c);if(k.append(f),"type"===c){var b=i.WS;k.append((0,a.Sb)(b,s,null,"nx-edit-"+n[2]+"-"+c))}else k.append(s);return function(n,t,e,a){var d="",i=t.value;t.addEventListener("focus",(function(){i=t.value})),t.addEventListener("change",(function(){en(n,t,e,a),z((function(r){r?t.value=d:(d=t.value,t.value=i),en(n,t,e,a)}))}))}(n,s,D,t),en(n,s,D,t),k}function en(n,t,e,a){var d,i=!1;t.checkValidity()?(i=!0,nn(n,t.value),d=x.b8):d=x.mb,e.firstChild.src=d,"function"==typeof a&&a(t,i,e)}function an(n){if(!T){var t=U.position,e=!1;"next"==n&&(t-=1,e=!0),P[t](e),setTimeout(function(){T=!1}.bind(this),I),$(O,!1)}}function dn(){V!==JSON.stringify(C.srcData)?$(N,!1):$(N,!0)}function rn(n){var t=Object.assign({},C.srcData);null===n&&(n=p());var e=function(e){C.srcData.threads.length&&[Q,B,F].forEach((n=>{Array.from(n.childNodes).forEach((n=>{(0,r.Vv)(n,150,(function(){n.remove()}))}))})),C.srcData=e?n:t,C.threadIndex=0,C.threadId=C.srcData.threads[0].id,(0,s.f2)(C,!0),function(){for(let[n,t]of Object.entries(M))t.value=C.srcData.author[n]}(),on(!0)};z(e),e(!0)}function cn(){var n=function(){var n=(0,a.gd)("INPUT");return n.type="file",n.accept="application/json",n.addEventListener("change",(function(n){(0,f.eD)(n).then((n=>{n.index=(0,f.HE)(n),rn(n)})).catch((n=>{(0,b.fZ)(n.message),sn("Invalid source")}))})),n.style.display="none",n}(),t=(0,a.gd)("A","nx-open-file");t.append((0,a.cy)(x.r5,20)),t.addEventListener("click",(function(){n.click()}));var e=(0,a.gd)("SPAN");return e.append(n,t),e}function sn(n){var t=(0,l.GY)(n);R&&clearTimeout(R),(0,r.Po)(S,t,25),R=setTimeout((function(){(0,r.Po)(S,"",25)}),2e3+20*t.length)}function ln(){var n=(0,a.gd)("DIV","nx-edit-nav");S=(0,a.gd)("SPAN","nx-action-feedback"),(N=(0,a.gd)("A","nx-reset")).append((0,a.cy)(x.os,20)),dn(),N.addEventListener("click",(function(){N.classList.contains("nx-disabled")||(rn(JSON.parse(V)),$(N,!0))})),(O=(0,a.gd)("A","nx-save")).append((0,a.cy)(x.Ne,20)),$(O,!0),O.addEventListener("click",(function(){O.classList.contains("nx-disabled")||((0,o.EW)(C.dataUrl,C.srcData),sn("saved"),$(O,!0),dn())}));var t,e,d=(0,a.gd)("DIV");return d.append(N,((e=(0,a.gd)("A","nx-new")).append((0,a.cy)(x.j4,20)),e.addEventListener("click",(function(){rn(p())})),e),cn(),O,((t=(0,a.gd)("A","nx-download")).append((0,a.cy)(x.aL,20)),t.addEventListener("click",(function(n){var t=Object.assign({},C.srcData);delete t.index,(0,u.wJ)(t)||sn("Invalid Nexus data"),t=JSON.stringify(t,void 0,2);var e="data:text/json;charset=utf-8,"+encodeURIComponent(t),d=(0,a.gd)("A");d.setAttribute("href",e),d.setAttribute("download","nexus.json"),E.appendChild(d),d.click(),d.remove()})),t)),n.append(S,d),n}function on(n=!1){var t=C.srcData.index;if(t.length)for(var e=0;e<t.length;e++)un(e,t[e],n)}function un(n,t,e=!1){var a=Z(n,t);for(let[n,d]of Object.entries(a))!e||"index"!=n&&t!=C.threadId?d.parent.append(d.child):(0,r.am)(d.parent,d.child,!1,!0,200)}function pn(){L=(0,a.gd)("FORM","nx-edit-author"),["handle","url","about"].forEach((n=>{L.append(tn(["author",n],null,M))}));var n=(0,a.gd)("DIV","nx-edit-author-form");return n.append((0,a.a)("author"),L),n}function hn(){var n,t=(0,a.gd)("DIV","nx-edit-list");return t.append((0,a.a)("threads"),Q,((n=g()).addEventListener("click",(function(){var n=(0,c.O1)(10),t=C.srcData.index.length;C.srcData.threads.push(h(n)),C.srcData.index.push(n);var e=Z(t,n);["local","distant"].forEach((n=>{e[n].parent.append(e[n].child)}));var a=null;Q.childNodes.length&&(a=function(){Q.childNodes[t-1].dispatchEvent(w)}),(0,r.am)(e.index.parent,e.index.child,!1,!0,200,a),$(O,!1)})),n)),t}function fn(){var n;(y=(0,a.gd)("DIV","nx-edit-menu")).append(ln(),(n=(0,a.gd)("DIV","nx-edit-actions nx-history-nav"),(0,a.Q$)(U,an,!0),n.append(U.ctrls.prev.elm,U.ctrls.next.elm),n))}function vn(n,t){E=t;var e,d="nexus-tmp";(0,k.pm)("new")?(e=p(),n=null):(n.dataUrl&&(d=n.dataUrl),null===(e=(0,o.Ih)(d))&&(e=null!==n.srcData?n.srcData:p(),(0,o.EW)(d,e))),e.index||(e.index=(0,f.HE)(e)),V=null!==n&&null!==n.srcData?JSON.stringify(n.srcData):JSON.stringify(e);var i=e.threads[0].id,r=0;n&&"/"!==n.threadId&&e.index.includes(n.threadId)&&(i=n.threadId,r=e.index.indexOf(n.threadId)),C=function(n,t="nexus-tmp",e="/",a=-1){return{dataUrl:t,srcData:n,threadId:e,threadIndex:a}}(e,d,i,r),(0,s.f2)(C,!0),fn(),Q=(0,a.gd)("UL","nx-edit-index"),B=(0,a.gd)("UL","nx-edit-local"),F=(0,a.gd)("UL","nx-edit-distant"),on()}function xn(){return(0,a.rH)("index",[pn(),hn()],!1)}function gn(n){vn(n.state,n.nxelm);var t=(0,d.D)(n),e=(0,a.gd)("DIV");e.append(xn());var i=(0,a.gd)("DIV");i.append((0,a.rH)("local",[B],!1),(0,a.rH)("distant",[F],!1));var c=(0,a.IW)((0,a.vi)(),[(0,a._$)([y],[e,i],[],"edit")]),l=(0,a.gd)("DIV","nx-editor");return l.append(c,function(n,t){return(A=(0,a.gd)("A","nx-edit-switch")).append((0,a.cy)(x.xQ,25)),A.addEventListener("click",(function(){j=!j,(0,s.f2)(C,!0,!0),j?(A.firstChild.src=x.bR,(0,r.Mo)(t,n)):(A.firstChild.src=x.xQ,(0,r.Mo)(n,t))})),A}(t,c)),l}}}]);