/*! Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license */
"use strict";(self.webpackChunknexus=self.webpackChunknexus||[]).push([[243],{368:(t,e,n)=>{function o(t){return null!==t&&"Object"==t.constructor.name&&Object.keys(t).length}function r(t){return("string"==typeof t||t instanceof String)&&t.length}function i(t){return r(t)&&!isNaN(new Date(t))}function l(t){return"object"==typeof t?!Object.keys(t).length:!t||!t.length}n.d(e,{bT:()=>o,fw:()=>r,iX:()=>i,xb:()=>l})},947:(t,e,n)=>{function o(t,e){return Math.floor(Math.random()*(e-t+1)+t)}function r(t,e){return t.length>e&&(t=t.substr(0,e-5)+"(...)"),t}function i(t=10){var e=1;t>10&&(e+=Math.ceil(t/10));for(var n="",o=0;o<e;o++)n+=Math.random().toString(36).substr(2,10);return n.substr(0,t)}function l(t){if(""==t||0==t.length)return"";for(var e={À:"A",Á:"A",Â:"A",Ã:"A",Ä:"A",Å:"A",à:"a",á:"a",â:"a",ã:"a",ä:"a",å:"a",ă:"a",ą:"a",Ò:"O",Ó:"O",Ô:"O",Õ:"O",Õ:"O",Ö:"O",Ø:"O",ò:"o",ó:"o",ô:"o",õ:"o",ö:"o",ø:"o",È:"E",É:"E",Ê:"E",Ë:"E",è:"e",é:"e",ê:"e",ë:"e",ð:"e",ę:"e",Ç:"C",ç:"c",ć:"c",č:"c",Ð:"D",đ:"d",ğ:"g",Ì:"I",Í:"I",Î:"I",Ï:"I",ì:"i",í:"i",î:"i",ï:"i",Ł:"L",ł:"l",Ñ:"N",ñ:"n",ń:"n",Š:"S",š:"s",Ù:"U",Ú:"U",Û:"U",Ü:"U",ù:"u",ú:"u",û:"u",ü:"u",Ÿ:"Y",ÿ:"y",ý:"y",Ž:"Z",ž:"z",Ż:"Z",ż:"z",ɶ:"oe",Œ:"OE",æ:"ae",Æ:"AE",ß:"ss"},n=Object.keys(e),o=0;o<n.length;o++){var r=n[o],i=e[r];t=t.replace(r,i)}return t}function s(t){return t.replace(/[.*+?^${}()/|[\]\\]/g,"\\$&")}n.d(e,{Iy:()=>o,Oq:()=>r,O1:()=>i,V7:()=>l,hr:()=>s})},811:(t,e,n)=>{function o(){return s("localStorage")?localStorage:null}function r(){return s("sessionStorage")?sessionStorage:null}function i(t,e=!0){var n,o=(n=JSON.stringify(t),(new TextEncoder).encode(n).length);return e&&(o/=1e3),o}function l(t,e=2e3){for(var n=i(t,!0),o=0;o<t.length&&!(n<e);o++){var r=t.key(o),l=i(t.getItem(r),!0);t.removeItem(r),n-=l}return n}function s(t){var e;try{e=window[t];var n="__storage_test__";return e.setItem(n,n),e.removeItem(n),!0}catch(t){return t instanceof DOMException&&(22===t.code||1014===t.code||"QuotaExceededError"===t.name||"NS_ERROR_DOM_QUOTA_REACHED"===t.name)&&e&&0!==e.length}}function u(t,e){navigator.clipboard.writeText(t).then((()=>e()))}n.d(e,{$o:()=>o,G:()=>r,$w:()=>i,hh:()=>l,vQ:()=>u})},954:(t,e,n)=>{function o(t){t.scrollIntoView({block:"end",behavior:"smooth"})}n.d(e,{SZ:()=>o})},753:(t,e,n)=>{function o(t){let e;try{e=new URL(t)}catch(t){return!1}return"http:"===e.protocol||"https:"===e.protocol}function r(t){return fetch(t).then((t=>t.json()))}function i(t,e,n=null,o=null){e=e.toLowerCase();var r={youtube:"https://youtube.com/oembed?url=",vimeo:"https://vimeo.com/api/oembed.json?url=",soundcloud:"https://soundcloud.com/oembed?format=json&url="};return!!r.hasOwnProperty(e)&&(t=r[e]+encodeURIComponent(t),null!=n&&(t+="&maxwidth="+n),null!=o&&(t+="&maxheight="+o),t)}function l(t){return r(t).then((t=>{if(t&&t.hasOwnProperty("html"))return t;throw"invalid oembed response"}))}function s(t){var e=t.html.split('src="')[1].split('"')[0],n=document.createElement("IFRAME");return n.width=t.width,n.height=t.height,n.frameborder="no",n.scrolling="no",n.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",n.allowfullscreen=!0,n.title=t.title,n.src=e,n}function u(t){return t.split(/[\\/]/).pop()}function a(t,e,n=null){return n||!function(t,e){if(document.styleSheets.length)for(var n=u(e),o=0;o<document.styleSheets.length;o++){var r=document.styleSheets[o].href;if(r){if(r==e||u(r)==n)return!0;if(r.startsWith(window.location.origin)&&document.styleSheets[o].hasOwnProperty("cssRules")){var i=document.styleSheets[o].cssRules;for(let e=0;e<i.length;e++)if(i[e].selectorText==t)return!0}}}return!1}(t,e)?new Promise(((t,o)=>{var r=document.createElement("link");r.rel="stylesheet",r.type="text/css",r.onload=t,r.onerror=o,r.href=e,n?n.append(r):document.head.append(r)})):Promise.resolve(!0)}function c(t,e=!0){var n=t.replace(/^(https?:\/\/)?/,"").split("/");if(t=n[0],e&&n.length>1){n.length>2&&(t+="/...");var o=n.pop();o.length>18&&(o="..."+o.substr(-15)),t+="/"+o}return t}function p(t){for(var e=t.replace(/^(https?:\/\/)?(www.)?/,"").split(":")[0].split("/")[0].split("."),n=0;n<e.length;n++)if(e[n].includes("-"))e[n]=e[n].split("-").map((t=>t[0])).join("-");else{for(var o=e[n].split(""),r=0,i=0;i<o.length;i++)["a","e","i","o","u","y"].includes(o[i])&&(0!==r&&i!==r+1?o[i]="":r=i);e[n]=o.join("")}return e.join(".")}n.d(e,{HH:()=>o,_l:()=>r,ip:()=>i,ie:()=>l,qm:()=>s,Yc:()=>a,Fj:()=>c,AB:()=>p})},931:(t,e,n)=>{function o(t,e=200,n=null){f(t);let o=t.offsetHeight;t.style.overflow="hidden",t.style.height=0,t.style.paddingTop=0,t.style.paddingBottom=0,t.style.marginTop=0,t.style.marginBottom=0,t.offsetHeight,t.style.boxSizing="border-box",t.style.transitionProperty="height, margin, padding",t.style.transitionDuration=e+"ms",t.style.height=o+"px",t.style.removeProperty("padding-top"),t.style.removeProperty("padding-bottom"),t.style.removeProperty("margin-top"),t.style.removeProperty("margin-bottom"),window.setTimeout((()=>{t.style.removeProperty("height"),t.style.removeProperty("overflow"),t.style.removeProperty("transition-duration"),t.style.removeProperty("transition-property"),"function"==typeof n&&n()}),e)}function r(t,e=null){t.style.opacity=1,function n(){(t.style.opacity-=.1)<0?(t.style.display="none","function"==typeof e&&e()):requestAnimationFrame(n)}()}function i(t,e=null){t.style.opacity=0,f(t),function n(){var o=parseFloat(t.style.opacity);(o+=.1)>1?"function"==typeof e&&e():(t.style.opacity=o,requestAnimationFrame(n))}()}function l(t,e=200,n=null){var o=[r,i];(function(t){if(!t)return!1;do{if(t instanceof Element){if(t.hidden||!t.offsetHeight)return!0;var e=window.getComputedStyle(t);if("0"==e.width||"0"==e.height||"0"==e.opacity||"none"==e.display||"hidden"==e.visibility)return!0}}while(t=t.parentNode);return!1})(t)&&o.reverse(),o[0](t,(function(){"function"==typeof n&&n(),window.setTimeout((()=>{o[1](t)}),e)}))}function s(t,e=200,n=null){r(t),function(t,e=200,n=null){t.style.transitionProperty="height, margin, padding",t.style.transitionDuration=e+"ms",t.style.boxSizing="border-box",t.style.height=t.offsetHeight+"px",t.offsetHeight,t.style.overflow="hidden",t.style.height=0,t.style.paddingTop=0,t.style.paddingBottom=0,t.style.marginTop=0,t.style.marginBottom=0,window.setTimeout((()=>{t.style.display="none",t.style.removeProperty("height"),t.style.removeProperty("padding-top"),t.style.removeProperty("padding-bottom"),t.style.removeProperty("margin-top"),t.style.removeProperty("margin-bottom"),t.style.removeProperty("overflow"),t.style.removeProperty("transition-duration"),t.style.removeProperty("transition-property"),"function"==typeof n&&n()}),e)}(t,e,n)}function u(t,e=200,n=null){t.style.opacity=0;var r=e-200;r<200&&(r=200),setTimeout((function(){i(t,n)}),r),o(t,e,n)}function a(t,e,n=20){var o,r,i,l=t.textContent.split(""),s=e.split(""),u=l.length,a=s.length;u>a?(o=u,r=0,i=function(){o>a?l.pop():l[o-1]=s[o-1],o--}):(o=0,r=a,i=function(){o<u?l[o]=s[o]:l.push(s[o]),o++});var c=setInterval((function(){i(),t.textContent=l.join(""),o==r&&clearInterval(c)}),n)}function c(t,e,n=!1,r=!0,i=200,l=null){var s,a;return e.style.display="none",r?(e.style.opacity=0,s=u):s=o,a=n?function(){t.prepend(e)}:function(){t.append(e)},y(t,e,a,(function(){s(e,i,l)}))}function p(t,e,n=null){e.style.opacity=0;var o=t.parentNode,l=t.offsetHeight,s=function(){t.replaceWith(e)},a=function(){var t=e.offsetHeight;!function(t,e,n,o=null){e===n?i(t,o):u(t,200,o)}(e,l,t,n)};r(t,(function(){y(o,e,s,a)}))}function y(t,e,n,o=null){t instanceof Element||(t=document.body);var r="m"+Math.random().toString(20).substr(2);return e.classList.add(r),new Promise((i=>{var l=new MutationObserver((()=>{t.querySelector("."+r)&&(e.classList.remove(r),l.disconnect(),"function"==typeof o&&o(),i(!0))}));l.observe(t,{childList:!0}),n()}))}function f(t){t.style.removeProperty("display");let e=window.getComputedStyle(t).display;"none"===e&&(e="block"),t.style.display=e}n.d(e,{Vn:()=>l,Vv:()=>s,YQ:()=>u,Po:()=>a,am:()=>c,Mo:()=>p})}}]);