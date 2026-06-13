(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))r(l);new MutationObserver(l=>{for(const i of l)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(l){const i={};return l.integrity&&(i.integrity=l.integrity),l.referrerPolicy&&(i.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?i.credentials="include":l.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(l){if(l.ep)return;l.ep=!0;const i=n(l);fetch(l.href,i)}})();function ic(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Qs={exports:{}},tl={},Ks={exports:{}},T={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Gn=Symbol.for("react.element"),oc=Symbol.for("react.portal"),sc=Symbol.for("react.fragment"),ac=Symbol.for("react.strict_mode"),uc=Symbol.for("react.profiler"),cc=Symbol.for("react.provider"),dc=Symbol.for("react.context"),fc=Symbol.for("react.forward_ref"),pc=Symbol.for("react.suspense"),mc=Symbol.for("react.memo"),hc=Symbol.for("react.lazy"),Do=Symbol.iterator;function gc(e){return e===null||typeof e!="object"?null:(e=Do&&e[Do]||e["@@iterator"],typeof e=="function"?e:null)}var Ys={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Xs=Object.assign,Gs={};function ln(e,t,n){this.props=e,this.context=t,this.refs=Gs,this.updater=n||Ys}ln.prototype.isReactComponent={};ln.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};ln.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Zs(){}Zs.prototype=ln.prototype;function Ai(e,t,n){this.props=e,this.context=t,this.refs=Gs,this.updater=n||Ys}var Vi=Ai.prototype=new Zs;Vi.constructor=Ai;Xs(Vi,ln.prototype);Vi.isPureReactComponent=!0;var Fo=Array.isArray,Js=Object.prototype.hasOwnProperty,Hi={current:null},bs={key:!0,ref:!0,__self:!0,__source:!0};function qs(e,t,n){var r,l={},i=null,o=null;if(t!=null)for(r in t.ref!==void 0&&(o=t.ref),t.key!==void 0&&(i=""+t.key),t)Js.call(t,r)&&!bs.hasOwnProperty(r)&&(l[r]=t[r]);var s=arguments.length-2;if(s===1)l.children=n;else if(1<s){for(var a=Array(s),c=0;c<s;c++)a[c]=arguments[c+2];l.children=a}if(e&&e.defaultProps)for(r in s=e.defaultProps,s)l[r]===void 0&&(l[r]=s[r]);return{$$typeof:Gn,type:e,key:i,ref:o,props:l,_owner:Hi.current}}function vc(e,t){return{$$typeof:Gn,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Bi(e){return typeof e=="object"&&e!==null&&e.$$typeof===Gn}function yc(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var Uo=/\/+/g;function wl(e,t){return typeof e=="object"&&e!==null&&e.key!=null?yc(""+e.key):t.toString(36)}function xr(e,t,n,r,l){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var o=!1;if(e===null)o=!0;else switch(i){case"string":case"number":o=!0;break;case"object":switch(e.$$typeof){case Gn:case oc:o=!0}}if(o)return o=e,l=l(o),e=r===""?"."+wl(o,0):r,Fo(l)?(n="",e!=null&&(n=e.replace(Uo,"$&/")+"/"),xr(l,t,n,"",function(c){return c})):l!=null&&(Bi(l)&&(l=vc(l,n+(!l.key||o&&o.key===l.key?"":(""+l.key).replace(Uo,"$&/")+"/")+e)),t.push(l)),1;if(o=0,r=r===""?".":r+":",Fo(e))for(var s=0;s<e.length;s++){i=e[s];var a=r+wl(i,s);o+=xr(i,t,n,a,l)}else if(a=gc(e),typeof a=="function")for(e=a.call(e),s=0;!(i=e.next()).done;)i=i.value,a=r+wl(i,s++),o+=xr(i,t,n,a,l);else if(i==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return o}function nr(e,t,n){if(e==null)return e;var r=[],l=0;return xr(e,r,"","",function(i){return t.call(n,i,l++)}),r}function xc(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var ae={current:null},wr={transition:null},wc={ReactCurrentDispatcher:ae,ReactCurrentBatchConfig:wr,ReactCurrentOwner:Hi};function ea(){throw Error("act(...) is not supported in production builds of React.")}T.Children={map:nr,forEach:function(e,t,n){nr(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return nr(e,function(){t++}),t},toArray:function(e){return nr(e,function(t){return t})||[]},only:function(e){if(!Bi(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};T.Component=ln;T.Fragment=sc;T.Profiler=uc;T.PureComponent=Ai;T.StrictMode=ac;T.Suspense=pc;T.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=wc;T.act=ea;T.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Xs({},e.props),l=e.key,i=e.ref,o=e._owner;if(t!=null){if(t.ref!==void 0&&(i=t.ref,o=Hi.current),t.key!==void 0&&(l=""+t.key),e.type&&e.type.defaultProps)var s=e.type.defaultProps;for(a in t)Js.call(t,a)&&!bs.hasOwnProperty(a)&&(r[a]=t[a]===void 0&&s!==void 0?s[a]:t[a])}var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){s=Array(a);for(var c=0;c<a;c++)s[c]=arguments[c+2];r.children=s}return{$$typeof:Gn,type:e.type,key:l,ref:i,props:r,_owner:o}};T.createContext=function(e){return e={$$typeof:dc,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:cc,_context:e},e.Consumer=e};T.createElement=qs;T.createFactory=function(e){var t=qs.bind(null,e);return t.type=e,t};T.createRef=function(){return{current:null}};T.forwardRef=function(e){return{$$typeof:fc,render:e}};T.isValidElement=Bi;T.lazy=function(e){return{$$typeof:hc,_payload:{_status:-1,_result:e},_init:xc}};T.memo=function(e,t){return{$$typeof:mc,type:e,compare:t===void 0?null:t}};T.startTransition=function(e){var t=wr.transition;wr.transition={};try{e()}finally{wr.transition=t}};T.unstable_act=ea;T.useCallback=function(e,t){return ae.current.useCallback(e,t)};T.useContext=function(e){return ae.current.useContext(e)};T.useDebugValue=function(){};T.useDeferredValue=function(e){return ae.current.useDeferredValue(e)};T.useEffect=function(e,t){return ae.current.useEffect(e,t)};T.useId=function(){return ae.current.useId()};T.useImperativeHandle=function(e,t,n){return ae.current.useImperativeHandle(e,t,n)};T.useInsertionEffect=function(e,t){return ae.current.useInsertionEffect(e,t)};T.useLayoutEffect=function(e,t){return ae.current.useLayoutEffect(e,t)};T.useMemo=function(e,t){return ae.current.useMemo(e,t)};T.useReducer=function(e,t,n){return ae.current.useReducer(e,t,n)};T.useRef=function(e){return ae.current.useRef(e)};T.useState=function(e){return ae.current.useState(e)};T.useSyncExternalStore=function(e,t,n){return ae.current.useSyncExternalStore(e,t,n)};T.useTransition=function(){return ae.current.useTransition()};T.version="18.3.1";Ks.exports=T;var z=Ks.exports;const kc=ic(z);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Sc=z,Ec=Symbol.for("react.element"),Nc=Symbol.for("react.fragment"),Cc=Object.prototype.hasOwnProperty,_c=Sc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,jc={key:!0,ref:!0,__self:!0,__source:!0};function ta(e,t,n){var r,l={},i=null,o=null;n!==void 0&&(i=""+n),t.key!==void 0&&(i=""+t.key),t.ref!==void 0&&(o=t.ref);for(r in t)Cc.call(t,r)&&!jc.hasOwnProperty(r)&&(l[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)l[r]===void 0&&(l[r]=t[r]);return{$$typeof:Ec,type:e,key:i,ref:o,props:l,_owner:_c.current}}tl.Fragment=Nc;tl.jsx=ta;tl.jsxs=ta;Qs.exports=tl;var d=Qs.exports,Yl={},na={exports:{}},xe={},ra={exports:{}},la={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(N,P){var L=N.length;N.push(P);e:for(;0<L;){var Q=L-1>>>1,Z=N[Q];if(0<l(Z,P))N[Q]=P,N[L]=Z,L=Q;else break e}}function n(N){return N.length===0?null:N[0]}function r(N){if(N.length===0)return null;var P=N[0],L=N.pop();if(L!==P){N[0]=L;e:for(var Q=0,Z=N.length,er=Z>>>1;Q<er;){var gt=2*(Q+1)-1,xl=N[gt],vt=gt+1,tr=N[vt];if(0>l(xl,L))vt<Z&&0>l(tr,xl)?(N[Q]=tr,N[vt]=L,Q=vt):(N[Q]=xl,N[gt]=L,Q=gt);else if(vt<Z&&0>l(tr,L))N[Q]=tr,N[vt]=L,Q=vt;else break e}}return P}function l(N,P){var L=N.sortIndex-P.sortIndex;return L!==0?L:N.id-P.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;e.unstable_now=function(){return i.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var a=[],c=[],g=1,h=null,m=3,v=!1,w=!1,S=!1,O=typeof setTimeout=="function"?setTimeout:null,p=typeof clearTimeout=="function"?clearTimeout:null,u=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function f(N){for(var P=n(c);P!==null;){if(P.callback===null)r(c);else if(P.startTime<=N)r(c),P.sortIndex=P.expirationTime,t(a,P);else break;P=n(c)}}function y(N){if(S=!1,f(N),!w)if(n(a)!==null)w=!0,vl(k);else{var P=n(c);P!==null&&yl(y,P.startTime-N)}}function k(N,P){w=!1,S&&(S=!1,p(j),j=-1),v=!0;var L=m;try{for(f(P),h=n(a);h!==null&&(!(h.expirationTime>P)||N&&!je());){var Q=h.callback;if(typeof Q=="function"){h.callback=null,m=h.priorityLevel;var Z=Q(h.expirationTime<=P);P=e.unstable_now(),typeof Z=="function"?h.callback=Z:h===n(a)&&r(a),f(P)}else r(a);h=n(a)}if(h!==null)var er=!0;else{var gt=n(c);gt!==null&&yl(y,gt.startTime-P),er=!1}return er}finally{h=null,m=L,v=!1}}var C=!1,_=null,j=-1,W=5,M=-1;function je(){return!(e.unstable_now()-M<W)}function un(){if(_!==null){var N=e.unstable_now();M=N;var P=!0;try{P=_(!0,N)}finally{P?cn():(C=!1,_=null)}}else C=!1}var cn;if(typeof u=="function")cn=function(){u(un)};else if(typeof MessageChannel<"u"){var Oo=new MessageChannel,lc=Oo.port2;Oo.port1.onmessage=un,cn=function(){lc.postMessage(null)}}else cn=function(){O(un,0)};function vl(N){_=N,C||(C=!0,cn())}function yl(N,P){j=O(function(){N(e.unstable_now())},P)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(N){N.callback=null},e.unstable_continueExecution=function(){w||v||(w=!0,vl(k))},e.unstable_forceFrameRate=function(N){0>N||125<N?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):W=0<N?Math.floor(1e3/N):5},e.unstable_getCurrentPriorityLevel=function(){return m},e.unstable_getFirstCallbackNode=function(){return n(a)},e.unstable_next=function(N){switch(m){case 1:case 2:case 3:var P=3;break;default:P=m}var L=m;m=P;try{return N()}finally{m=L}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(N,P){switch(N){case 1:case 2:case 3:case 4:case 5:break;default:N=3}var L=m;m=N;try{return P()}finally{m=L}},e.unstable_scheduleCallback=function(N,P,L){var Q=e.unstable_now();switch(typeof L=="object"&&L!==null?(L=L.delay,L=typeof L=="number"&&0<L?Q+L:Q):L=Q,N){case 1:var Z=-1;break;case 2:Z=250;break;case 5:Z=1073741823;break;case 4:Z=1e4;break;default:Z=5e3}return Z=L+Z,N={id:g++,callback:P,priorityLevel:N,startTime:L,expirationTime:Z,sortIndex:-1},L>Q?(N.sortIndex=L,t(c,N),n(a)===null&&N===n(c)&&(S?(p(j),j=-1):S=!0,yl(y,L-Q))):(N.sortIndex=Z,t(a,N),w||v||(w=!0,vl(k))),N},e.unstable_shouldYield=je,e.unstable_wrapCallback=function(N){var P=m;return function(){var L=m;m=P;try{return N.apply(this,arguments)}finally{m=L}}}})(la);ra.exports=la;var zc=ra.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Pc=z,ye=zc;function x(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var ia=new Set,Mn={};function Lt(e,t){Jt(e,t),Jt(e+"Capture",t)}function Jt(e,t){for(Mn[e]=t,e=0;e<t.length;e++)ia.add(t[e])}var Qe=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Xl=Object.prototype.hasOwnProperty,Lc=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,$o={},Ao={};function Tc(e){return Xl.call(Ao,e)?!0:Xl.call($o,e)?!1:Lc.test(e)?Ao[e]=!0:($o[e]=!0,!1)}function Mc(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Rc(e,t,n,r){if(t===null||typeof t>"u"||Mc(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function ue(e,t,n,r,l,i,o){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=l,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=i,this.removeEmptyString=o}var te={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){te[e]=new ue(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];te[t]=new ue(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){te[e]=new ue(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){te[e]=new ue(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){te[e]=new ue(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){te[e]=new ue(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){te[e]=new ue(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){te[e]=new ue(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){te[e]=new ue(e,5,!1,e.toLowerCase(),null,!1,!1)});var Wi=/[\-:]([a-z])/g;function Qi(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Wi,Qi);te[t]=new ue(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Wi,Qi);te[t]=new ue(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Wi,Qi);te[t]=new ue(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){te[e]=new ue(e,1,!1,e.toLowerCase(),null,!1,!1)});te.xlinkHref=new ue("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){te[e]=new ue(e,1,!1,e.toLowerCase(),null,!0,!0)});function Ki(e,t,n,r){var l=te.hasOwnProperty(t)?te[t]:null;(l!==null?l.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Rc(t,n,l,r)&&(n=null),r||l===null?Tc(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):l.mustUseProperty?e[l.propertyName]=n===null?l.type===3?!1:"":n:(t=l.attributeName,r=l.attributeNamespace,n===null?e.removeAttribute(t):(l=l.type,n=l===3||l===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var Ge=Pc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,rr=Symbol.for("react.element"),Rt=Symbol.for("react.portal"),It=Symbol.for("react.fragment"),Yi=Symbol.for("react.strict_mode"),Gl=Symbol.for("react.profiler"),oa=Symbol.for("react.provider"),sa=Symbol.for("react.context"),Xi=Symbol.for("react.forward_ref"),Zl=Symbol.for("react.suspense"),Jl=Symbol.for("react.suspense_list"),Gi=Symbol.for("react.memo"),Je=Symbol.for("react.lazy"),aa=Symbol.for("react.offscreen"),Vo=Symbol.iterator;function dn(e){return e===null||typeof e!="object"?null:(e=Vo&&e[Vo]||e["@@iterator"],typeof e=="function"?e:null)}var H=Object.assign,kl;function xn(e){if(kl===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);kl=t&&t[1]||""}return`
`+kl+e}var Sl=!1;function El(e,t){if(!e||Sl)return"";Sl=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(c){var r=c}Reflect.construct(e,[],t)}else{try{t.call()}catch(c){r=c}e.call(t.prototype)}else{try{throw Error()}catch(c){r=c}e()}}catch(c){if(c&&r&&typeof c.stack=="string"){for(var l=c.stack.split(`
`),i=r.stack.split(`
`),o=l.length-1,s=i.length-1;1<=o&&0<=s&&l[o]!==i[s];)s--;for(;1<=o&&0<=s;o--,s--)if(l[o]!==i[s]){if(o!==1||s!==1)do if(o--,s--,0>s||l[o]!==i[s]){var a=`
`+l[o].replace(" at new "," at ");return e.displayName&&a.includes("<anonymous>")&&(a=a.replace("<anonymous>",e.displayName)),a}while(1<=o&&0<=s);break}}}finally{Sl=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?xn(e):""}function Ic(e){switch(e.tag){case 5:return xn(e.type);case 16:return xn("Lazy");case 13:return xn("Suspense");case 19:return xn("SuspenseList");case 0:case 2:case 15:return e=El(e.type,!1),e;case 11:return e=El(e.type.render,!1),e;case 1:return e=El(e.type,!0),e;default:return""}}function bl(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case It:return"Fragment";case Rt:return"Portal";case Gl:return"Profiler";case Yi:return"StrictMode";case Zl:return"Suspense";case Jl:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case sa:return(e.displayName||"Context")+".Consumer";case oa:return(e._context.displayName||"Context")+".Provider";case Xi:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Gi:return t=e.displayName||null,t!==null?t:bl(e.type)||"Memo";case Je:t=e._payload,e=e._init;try{return bl(e(t))}catch{}}return null}function Oc(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return bl(t);case 8:return t===Yi?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function dt(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function ua(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Dc(e){var t=ua(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var l=n.get,i=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return l.call(this)},set:function(o){r=""+o,i.call(this,o)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function lr(e){e._valueTracker||(e._valueTracker=Dc(e))}function ca(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=ua(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function Tr(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function ql(e,t){var n=t.checked;return H({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Ho(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=dt(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function da(e,t){t=t.checked,t!=null&&Ki(e,"checked",t,!1)}function ei(e,t){da(e,t);var n=dt(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?ti(e,t.type,n):t.hasOwnProperty("defaultValue")&&ti(e,t.type,dt(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Bo(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function ti(e,t,n){(t!=="number"||Tr(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var wn=Array.isArray;function Qt(e,t,n,r){if(e=e.options,t){t={};for(var l=0;l<n.length;l++)t["$"+n[l]]=!0;for(n=0;n<e.length;n++)l=t.hasOwnProperty("$"+e[n].value),e[n].selected!==l&&(e[n].selected=l),l&&r&&(e[n].defaultSelected=!0)}else{for(n=""+dt(n),t=null,l=0;l<e.length;l++){if(e[l].value===n){e[l].selected=!0,r&&(e[l].defaultSelected=!0);return}t!==null||e[l].disabled||(t=e[l])}t!==null&&(t.selected=!0)}}function ni(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(x(91));return H({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Wo(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(x(92));if(wn(n)){if(1<n.length)throw Error(x(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:dt(n)}}function fa(e,t){var n=dt(t.value),r=dt(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function Qo(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function pa(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function ri(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?pa(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var ir,ma=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,l){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,l)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(ir=ir||document.createElement("div"),ir.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=ir.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Rn(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var En={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Fc=["Webkit","ms","Moz","O"];Object.keys(En).forEach(function(e){Fc.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),En[t]=En[e]})});function ha(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||En.hasOwnProperty(e)&&En[e]?(""+t).trim():t+"px"}function ga(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,l=ha(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,l):e[n]=l}}var Uc=H({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function li(e,t){if(t){if(Uc[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(x(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(x(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(x(61))}if(t.style!=null&&typeof t.style!="object")throw Error(x(62))}}function ii(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var oi=null;function Zi(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var si=null,Kt=null,Yt=null;function Ko(e){if(e=bn(e)){if(typeof si!="function")throw Error(x(280));var t=e.stateNode;t&&(t=ol(t),si(e.stateNode,e.type,t))}}function va(e){Kt?Yt?Yt.push(e):Yt=[e]:Kt=e}function ya(){if(Kt){var e=Kt,t=Yt;if(Yt=Kt=null,Ko(e),t)for(e=0;e<t.length;e++)Ko(t[e])}}function xa(e,t){return e(t)}function wa(){}var Nl=!1;function ka(e,t,n){if(Nl)return e(t,n);Nl=!0;try{return xa(e,t,n)}finally{Nl=!1,(Kt!==null||Yt!==null)&&(wa(),ya())}}function In(e,t){var n=e.stateNode;if(n===null)return null;var r=ol(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(x(231,t,typeof n));return n}var ai=!1;if(Qe)try{var fn={};Object.defineProperty(fn,"passive",{get:function(){ai=!0}}),window.addEventListener("test",fn,fn),window.removeEventListener("test",fn,fn)}catch{ai=!1}function $c(e,t,n,r,l,i,o,s,a){var c=Array.prototype.slice.call(arguments,3);try{t.apply(n,c)}catch(g){this.onError(g)}}var Nn=!1,Mr=null,Rr=!1,ui=null,Ac={onError:function(e){Nn=!0,Mr=e}};function Vc(e,t,n,r,l,i,o,s,a){Nn=!1,Mr=null,$c.apply(Ac,arguments)}function Hc(e,t,n,r,l,i,o,s,a){if(Vc.apply(this,arguments),Nn){if(Nn){var c=Mr;Nn=!1,Mr=null}else throw Error(x(198));Rr||(Rr=!0,ui=c)}}function Tt(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function Sa(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Yo(e){if(Tt(e)!==e)throw Error(x(188))}function Bc(e){var t=e.alternate;if(!t){if(t=Tt(e),t===null)throw Error(x(188));return t!==e?null:e}for(var n=e,r=t;;){var l=n.return;if(l===null)break;var i=l.alternate;if(i===null){if(r=l.return,r!==null){n=r;continue}break}if(l.child===i.child){for(i=l.child;i;){if(i===n)return Yo(l),e;if(i===r)return Yo(l),t;i=i.sibling}throw Error(x(188))}if(n.return!==r.return)n=l,r=i;else{for(var o=!1,s=l.child;s;){if(s===n){o=!0,n=l,r=i;break}if(s===r){o=!0,r=l,n=i;break}s=s.sibling}if(!o){for(s=i.child;s;){if(s===n){o=!0,n=i,r=l;break}if(s===r){o=!0,r=i,n=l;break}s=s.sibling}if(!o)throw Error(x(189))}}if(n.alternate!==r)throw Error(x(190))}if(n.tag!==3)throw Error(x(188));return n.stateNode.current===n?e:t}function Ea(e){return e=Bc(e),e!==null?Na(e):null}function Na(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Na(e);if(t!==null)return t;e=e.sibling}return null}var Ca=ye.unstable_scheduleCallback,Xo=ye.unstable_cancelCallback,Wc=ye.unstable_shouldYield,Qc=ye.unstable_requestPaint,K=ye.unstable_now,Kc=ye.unstable_getCurrentPriorityLevel,Ji=ye.unstable_ImmediatePriority,_a=ye.unstable_UserBlockingPriority,Ir=ye.unstable_NormalPriority,Yc=ye.unstable_LowPriority,ja=ye.unstable_IdlePriority,nl=null,Ue=null;function Xc(e){if(Ue&&typeof Ue.onCommitFiberRoot=="function")try{Ue.onCommitFiberRoot(nl,e,void 0,(e.current.flags&128)===128)}catch{}}var Me=Math.clz32?Math.clz32:Jc,Gc=Math.log,Zc=Math.LN2;function Jc(e){return e>>>=0,e===0?32:31-(Gc(e)/Zc|0)|0}var or=64,sr=4194304;function kn(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Or(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,l=e.suspendedLanes,i=e.pingedLanes,o=n&268435455;if(o!==0){var s=o&~l;s!==0?r=kn(s):(i&=o,i!==0&&(r=kn(i)))}else o=n&~l,o!==0?r=kn(o):i!==0&&(r=kn(i));if(r===0)return 0;if(t!==0&&t!==r&&!(t&l)&&(l=r&-r,i=t&-t,l>=i||l===16&&(i&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-Me(t),l=1<<n,r|=e[n],t&=~l;return r}function bc(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function qc(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,l=e.expirationTimes,i=e.pendingLanes;0<i;){var o=31-Me(i),s=1<<o,a=l[o];a===-1?(!(s&n)||s&r)&&(l[o]=bc(s,t)):a<=t&&(e.expiredLanes|=s),i&=~s}}function ci(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function za(){var e=or;return or<<=1,!(or&4194240)&&(or=64),e}function Cl(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Zn(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Me(t),e[t]=n}function ed(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var l=31-Me(n),i=1<<l;t[l]=0,r[l]=-1,e[l]=-1,n&=~i}}function bi(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Me(n),l=1<<r;l&t|e[r]&t&&(e[r]|=t),n&=~l}}var I=0;function Pa(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var La,qi,Ta,Ma,Ra,di=!1,ar=[],rt=null,lt=null,it=null,On=new Map,Dn=new Map,qe=[],td="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Go(e,t){switch(e){case"focusin":case"focusout":rt=null;break;case"dragenter":case"dragleave":lt=null;break;case"mouseover":case"mouseout":it=null;break;case"pointerover":case"pointerout":On.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Dn.delete(t.pointerId)}}function pn(e,t,n,r,l,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:i,targetContainers:[l]},t!==null&&(t=bn(t),t!==null&&qi(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,l!==null&&t.indexOf(l)===-1&&t.push(l),e)}function nd(e,t,n,r,l){switch(t){case"focusin":return rt=pn(rt,e,t,n,r,l),!0;case"dragenter":return lt=pn(lt,e,t,n,r,l),!0;case"mouseover":return it=pn(it,e,t,n,r,l),!0;case"pointerover":var i=l.pointerId;return On.set(i,pn(On.get(i)||null,e,t,n,r,l)),!0;case"gotpointercapture":return i=l.pointerId,Dn.set(i,pn(Dn.get(i)||null,e,t,n,r,l)),!0}return!1}function Ia(e){var t=wt(e.target);if(t!==null){var n=Tt(t);if(n!==null){if(t=n.tag,t===13){if(t=Sa(n),t!==null){e.blockedOn=t,Ra(e.priority,function(){Ta(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function kr(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=fi(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);oi=r,n.target.dispatchEvent(r),oi=null}else return t=bn(n),t!==null&&qi(t),e.blockedOn=n,!1;t.shift()}return!0}function Zo(e,t,n){kr(e)&&n.delete(t)}function rd(){di=!1,rt!==null&&kr(rt)&&(rt=null),lt!==null&&kr(lt)&&(lt=null),it!==null&&kr(it)&&(it=null),On.forEach(Zo),Dn.forEach(Zo)}function mn(e,t){e.blockedOn===t&&(e.blockedOn=null,di||(di=!0,ye.unstable_scheduleCallback(ye.unstable_NormalPriority,rd)))}function Fn(e){function t(l){return mn(l,e)}if(0<ar.length){mn(ar[0],e);for(var n=1;n<ar.length;n++){var r=ar[n];r.blockedOn===e&&(r.blockedOn=null)}}for(rt!==null&&mn(rt,e),lt!==null&&mn(lt,e),it!==null&&mn(it,e),On.forEach(t),Dn.forEach(t),n=0;n<qe.length;n++)r=qe[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<qe.length&&(n=qe[0],n.blockedOn===null);)Ia(n),n.blockedOn===null&&qe.shift()}var Xt=Ge.ReactCurrentBatchConfig,Dr=!0;function ld(e,t,n,r){var l=I,i=Xt.transition;Xt.transition=null;try{I=1,eo(e,t,n,r)}finally{I=l,Xt.transition=i}}function id(e,t,n,r){var l=I,i=Xt.transition;Xt.transition=null;try{I=4,eo(e,t,n,r)}finally{I=l,Xt.transition=i}}function eo(e,t,n,r){if(Dr){var l=fi(e,t,n,r);if(l===null)Ol(e,t,r,Fr,n),Go(e,r);else if(nd(l,e,t,n,r))r.stopPropagation();else if(Go(e,r),t&4&&-1<td.indexOf(e)){for(;l!==null;){var i=bn(l);if(i!==null&&La(i),i=fi(e,t,n,r),i===null&&Ol(e,t,r,Fr,n),i===l)break;l=i}l!==null&&r.stopPropagation()}else Ol(e,t,r,null,n)}}var Fr=null;function fi(e,t,n,r){if(Fr=null,e=Zi(r),e=wt(e),e!==null)if(t=Tt(e),t===null)e=null;else if(n=t.tag,n===13){if(e=Sa(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Fr=e,null}function Oa(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Kc()){case Ji:return 1;case _a:return 4;case Ir:case Yc:return 16;case ja:return 536870912;default:return 16}default:return 16}}var tt=null,to=null,Sr=null;function Da(){if(Sr)return Sr;var e,t=to,n=t.length,r,l="value"in tt?tt.value:tt.textContent,i=l.length;for(e=0;e<n&&t[e]===l[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===l[i-r];r++);return Sr=l.slice(e,1<r?1-r:void 0)}function Er(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function ur(){return!0}function Jo(){return!1}function we(e){function t(n,r,l,i,o){this._reactName=n,this._targetInst=l,this.type=r,this.nativeEvent=i,this.target=o,this.currentTarget=null;for(var s in e)e.hasOwnProperty(s)&&(n=e[s],this[s]=n?n(i):i[s]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?ur:Jo,this.isPropagationStopped=Jo,this}return H(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=ur)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=ur)},persist:function(){},isPersistent:ur}),t}var on={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},no=we(on),Jn=H({},on,{view:0,detail:0}),od=we(Jn),_l,jl,hn,rl=H({},Jn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ro,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==hn&&(hn&&e.type==="mousemove"?(_l=e.screenX-hn.screenX,jl=e.screenY-hn.screenY):jl=_l=0,hn=e),_l)},movementY:function(e){return"movementY"in e?e.movementY:jl}}),bo=we(rl),sd=H({},rl,{dataTransfer:0}),ad=we(sd),ud=H({},Jn,{relatedTarget:0}),zl=we(ud),cd=H({},on,{animationName:0,elapsedTime:0,pseudoElement:0}),dd=we(cd),fd=H({},on,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),pd=we(fd),md=H({},on,{data:0}),qo=we(md),hd={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},gd={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},vd={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function yd(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=vd[e])?!!t[e]:!1}function ro(){return yd}var xd=H({},Jn,{key:function(e){if(e.key){var t=hd[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Er(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?gd[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ro,charCode:function(e){return e.type==="keypress"?Er(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Er(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),wd=we(xd),kd=H({},rl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),es=we(kd),Sd=H({},Jn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ro}),Ed=we(Sd),Nd=H({},on,{propertyName:0,elapsedTime:0,pseudoElement:0}),Cd=we(Nd),_d=H({},rl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),jd=we(_d),zd=[9,13,27,32],lo=Qe&&"CompositionEvent"in window,Cn=null;Qe&&"documentMode"in document&&(Cn=document.documentMode);var Pd=Qe&&"TextEvent"in window&&!Cn,Fa=Qe&&(!lo||Cn&&8<Cn&&11>=Cn),ts=" ",ns=!1;function Ua(e,t){switch(e){case"keyup":return zd.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function $a(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Ot=!1;function Ld(e,t){switch(e){case"compositionend":return $a(t);case"keypress":return t.which!==32?null:(ns=!0,ts);case"textInput":return e=t.data,e===ts&&ns?null:e;default:return null}}function Td(e,t){if(Ot)return e==="compositionend"||!lo&&Ua(e,t)?(e=Da(),Sr=to=tt=null,Ot=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Fa&&t.locale!=="ko"?null:t.data;default:return null}}var Md={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function rs(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Md[e.type]:t==="textarea"}function Aa(e,t,n,r){va(r),t=Ur(t,"onChange"),0<t.length&&(n=new no("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var _n=null,Un=null;function Rd(e){Ja(e,0)}function ll(e){var t=Ut(e);if(ca(t))return e}function Id(e,t){if(e==="change")return t}var Va=!1;if(Qe){var Pl;if(Qe){var Ll="oninput"in document;if(!Ll){var ls=document.createElement("div");ls.setAttribute("oninput","return;"),Ll=typeof ls.oninput=="function"}Pl=Ll}else Pl=!1;Va=Pl&&(!document.documentMode||9<document.documentMode)}function is(){_n&&(_n.detachEvent("onpropertychange",Ha),Un=_n=null)}function Ha(e){if(e.propertyName==="value"&&ll(Un)){var t=[];Aa(t,Un,e,Zi(e)),ka(Rd,t)}}function Od(e,t,n){e==="focusin"?(is(),_n=t,Un=n,_n.attachEvent("onpropertychange",Ha)):e==="focusout"&&is()}function Dd(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return ll(Un)}function Fd(e,t){if(e==="click")return ll(t)}function Ud(e,t){if(e==="input"||e==="change")return ll(t)}function $d(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Ie=typeof Object.is=="function"?Object.is:$d;function $n(e,t){if(Ie(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var l=n[r];if(!Xl.call(t,l)||!Ie(e[l],t[l]))return!1}return!0}function os(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function ss(e,t){var n=os(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=os(n)}}function Ba(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Ba(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Wa(){for(var e=window,t=Tr();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Tr(e.document)}return t}function io(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Ad(e){var t=Wa(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Ba(n.ownerDocument.documentElement,n)){if(r!==null&&io(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var l=n.textContent.length,i=Math.min(r.start,l);r=r.end===void 0?i:Math.min(r.end,l),!e.extend&&i>r&&(l=r,r=i,i=l),l=ss(n,i);var o=ss(n,r);l&&o&&(e.rangeCount!==1||e.anchorNode!==l.node||e.anchorOffset!==l.offset||e.focusNode!==o.node||e.focusOffset!==o.offset)&&(t=t.createRange(),t.setStart(l.node,l.offset),e.removeAllRanges(),i>r?(e.addRange(t),e.extend(o.node,o.offset)):(t.setEnd(o.node,o.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Vd=Qe&&"documentMode"in document&&11>=document.documentMode,Dt=null,pi=null,jn=null,mi=!1;function as(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;mi||Dt==null||Dt!==Tr(r)||(r=Dt,"selectionStart"in r&&io(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),jn&&$n(jn,r)||(jn=r,r=Ur(pi,"onSelect"),0<r.length&&(t=new no("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=Dt)))}function cr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Ft={animationend:cr("Animation","AnimationEnd"),animationiteration:cr("Animation","AnimationIteration"),animationstart:cr("Animation","AnimationStart"),transitionend:cr("Transition","TransitionEnd")},Tl={},Qa={};Qe&&(Qa=document.createElement("div").style,"AnimationEvent"in window||(delete Ft.animationend.animation,delete Ft.animationiteration.animation,delete Ft.animationstart.animation),"TransitionEvent"in window||delete Ft.transitionend.transition);function il(e){if(Tl[e])return Tl[e];if(!Ft[e])return e;var t=Ft[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Qa)return Tl[e]=t[n];return e}var Ka=il("animationend"),Ya=il("animationiteration"),Xa=il("animationstart"),Ga=il("transitionend"),Za=new Map,us="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function pt(e,t){Za.set(e,t),Lt(t,[e])}for(var Ml=0;Ml<us.length;Ml++){var Rl=us[Ml],Hd=Rl.toLowerCase(),Bd=Rl[0].toUpperCase()+Rl.slice(1);pt(Hd,"on"+Bd)}pt(Ka,"onAnimationEnd");pt(Ya,"onAnimationIteration");pt(Xa,"onAnimationStart");pt("dblclick","onDoubleClick");pt("focusin","onFocus");pt("focusout","onBlur");pt(Ga,"onTransitionEnd");Jt("onMouseEnter",["mouseout","mouseover"]);Jt("onMouseLeave",["mouseout","mouseover"]);Jt("onPointerEnter",["pointerout","pointerover"]);Jt("onPointerLeave",["pointerout","pointerover"]);Lt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Lt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Lt("onBeforeInput",["compositionend","keypress","textInput","paste"]);Lt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Lt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Lt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Sn="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Wd=new Set("cancel close invalid load scroll toggle".split(" ").concat(Sn));function cs(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,Hc(r,t,void 0,e),e.currentTarget=null}function Ja(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],l=r.event;r=r.listeners;e:{var i=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],a=s.instance,c=s.currentTarget;if(s=s.listener,a!==i&&l.isPropagationStopped())break e;cs(l,s,c),i=a}else for(o=0;o<r.length;o++){if(s=r[o],a=s.instance,c=s.currentTarget,s=s.listener,a!==i&&l.isPropagationStopped())break e;cs(l,s,c),i=a}}}if(Rr)throw e=ui,Rr=!1,ui=null,e}function F(e,t){var n=t[xi];n===void 0&&(n=t[xi]=new Set);var r=e+"__bubble";n.has(r)||(ba(t,e,2,!1),n.add(r))}function Il(e,t,n){var r=0;t&&(r|=4),ba(n,e,r,t)}var dr="_reactListening"+Math.random().toString(36).slice(2);function An(e){if(!e[dr]){e[dr]=!0,ia.forEach(function(n){n!=="selectionchange"&&(Wd.has(n)||Il(n,!1,e),Il(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[dr]||(t[dr]=!0,Il("selectionchange",!1,t))}}function ba(e,t,n,r){switch(Oa(t)){case 1:var l=ld;break;case 4:l=id;break;default:l=eo}n=l.bind(null,t,n,e),l=void 0,!ai||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(l=!0),r?l!==void 0?e.addEventListener(t,n,{capture:!0,passive:l}):e.addEventListener(t,n,!0):l!==void 0?e.addEventListener(t,n,{passive:l}):e.addEventListener(t,n,!1)}function Ol(e,t,n,r,l){var i=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var s=r.stateNode.containerInfo;if(s===l||s.nodeType===8&&s.parentNode===l)break;if(o===4)for(o=r.return;o!==null;){var a=o.tag;if((a===3||a===4)&&(a=o.stateNode.containerInfo,a===l||a.nodeType===8&&a.parentNode===l))return;o=o.return}for(;s!==null;){if(o=wt(s),o===null)return;if(a=o.tag,a===5||a===6){r=i=o;continue e}s=s.parentNode}}r=r.return}ka(function(){var c=i,g=Zi(n),h=[];e:{var m=Za.get(e);if(m!==void 0){var v=no,w=e;switch(e){case"keypress":if(Er(n)===0)break e;case"keydown":case"keyup":v=wd;break;case"focusin":w="focus",v=zl;break;case"focusout":w="blur",v=zl;break;case"beforeblur":case"afterblur":v=zl;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":v=bo;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":v=ad;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":v=Ed;break;case Ka:case Ya:case Xa:v=dd;break;case Ga:v=Cd;break;case"scroll":v=od;break;case"wheel":v=jd;break;case"copy":case"cut":case"paste":v=pd;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":v=es}var S=(t&4)!==0,O=!S&&e==="scroll",p=S?m!==null?m+"Capture":null:m;S=[];for(var u=c,f;u!==null;){f=u;var y=f.stateNode;if(f.tag===5&&y!==null&&(f=y,p!==null&&(y=In(u,p),y!=null&&S.push(Vn(u,y,f)))),O)break;u=u.return}0<S.length&&(m=new v(m,w,null,n,g),h.push({event:m,listeners:S}))}}if(!(t&7)){e:{if(m=e==="mouseover"||e==="pointerover",v=e==="mouseout"||e==="pointerout",m&&n!==oi&&(w=n.relatedTarget||n.fromElement)&&(wt(w)||w[Ke]))break e;if((v||m)&&(m=g.window===g?g:(m=g.ownerDocument)?m.defaultView||m.parentWindow:window,v?(w=n.relatedTarget||n.toElement,v=c,w=w?wt(w):null,w!==null&&(O=Tt(w),w!==O||w.tag!==5&&w.tag!==6)&&(w=null)):(v=null,w=c),v!==w)){if(S=bo,y="onMouseLeave",p="onMouseEnter",u="mouse",(e==="pointerout"||e==="pointerover")&&(S=es,y="onPointerLeave",p="onPointerEnter",u="pointer"),O=v==null?m:Ut(v),f=w==null?m:Ut(w),m=new S(y,u+"leave",v,n,g),m.target=O,m.relatedTarget=f,y=null,wt(g)===c&&(S=new S(p,u+"enter",w,n,g),S.target=f,S.relatedTarget=O,y=S),O=y,v&&w)t:{for(S=v,p=w,u=0,f=S;f;f=Mt(f))u++;for(f=0,y=p;y;y=Mt(y))f++;for(;0<u-f;)S=Mt(S),u--;for(;0<f-u;)p=Mt(p),f--;for(;u--;){if(S===p||p!==null&&S===p.alternate)break t;S=Mt(S),p=Mt(p)}S=null}else S=null;v!==null&&ds(h,m,v,S,!1),w!==null&&O!==null&&ds(h,O,w,S,!0)}}e:{if(m=c?Ut(c):window,v=m.nodeName&&m.nodeName.toLowerCase(),v==="select"||v==="input"&&m.type==="file")var k=Id;else if(rs(m))if(Va)k=Ud;else{k=Dd;var C=Od}else(v=m.nodeName)&&v.toLowerCase()==="input"&&(m.type==="checkbox"||m.type==="radio")&&(k=Fd);if(k&&(k=k(e,c))){Aa(h,k,n,g);break e}C&&C(e,m,c),e==="focusout"&&(C=m._wrapperState)&&C.controlled&&m.type==="number"&&ti(m,"number",m.value)}switch(C=c?Ut(c):window,e){case"focusin":(rs(C)||C.contentEditable==="true")&&(Dt=C,pi=c,jn=null);break;case"focusout":jn=pi=Dt=null;break;case"mousedown":mi=!0;break;case"contextmenu":case"mouseup":case"dragend":mi=!1,as(h,n,g);break;case"selectionchange":if(Vd)break;case"keydown":case"keyup":as(h,n,g)}var _;if(lo)e:{switch(e){case"compositionstart":var j="onCompositionStart";break e;case"compositionend":j="onCompositionEnd";break e;case"compositionupdate":j="onCompositionUpdate";break e}j=void 0}else Ot?Ua(e,n)&&(j="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(j="onCompositionStart");j&&(Fa&&n.locale!=="ko"&&(Ot||j!=="onCompositionStart"?j==="onCompositionEnd"&&Ot&&(_=Da()):(tt=g,to="value"in tt?tt.value:tt.textContent,Ot=!0)),C=Ur(c,j),0<C.length&&(j=new qo(j,e,null,n,g),h.push({event:j,listeners:C}),_?j.data=_:(_=$a(n),_!==null&&(j.data=_)))),(_=Pd?Ld(e,n):Td(e,n))&&(c=Ur(c,"onBeforeInput"),0<c.length&&(g=new qo("onBeforeInput","beforeinput",null,n,g),h.push({event:g,listeners:c}),g.data=_))}Ja(h,t)})}function Vn(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Ur(e,t){for(var n=t+"Capture",r=[];e!==null;){var l=e,i=l.stateNode;l.tag===5&&i!==null&&(l=i,i=In(e,n),i!=null&&r.unshift(Vn(e,i,l)),i=In(e,t),i!=null&&r.push(Vn(e,i,l))),e=e.return}return r}function Mt(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function ds(e,t,n,r,l){for(var i=t._reactName,o=[];n!==null&&n!==r;){var s=n,a=s.alternate,c=s.stateNode;if(a!==null&&a===r)break;s.tag===5&&c!==null&&(s=c,l?(a=In(n,i),a!=null&&o.unshift(Vn(n,a,s))):l||(a=In(n,i),a!=null&&o.push(Vn(n,a,s)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var Qd=/\r\n?/g,Kd=/\u0000|\uFFFD/g;function fs(e){return(typeof e=="string"?e:""+e).replace(Qd,`
`).replace(Kd,"")}function fr(e,t,n){if(t=fs(t),fs(e)!==t&&n)throw Error(x(425))}function $r(){}var hi=null,gi=null;function vi(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var yi=typeof setTimeout=="function"?setTimeout:void 0,Yd=typeof clearTimeout=="function"?clearTimeout:void 0,ps=typeof Promise=="function"?Promise:void 0,Xd=typeof queueMicrotask=="function"?queueMicrotask:typeof ps<"u"?function(e){return ps.resolve(null).then(e).catch(Gd)}:yi;function Gd(e){setTimeout(function(){throw e})}function Dl(e,t){var n=t,r=0;do{var l=n.nextSibling;if(e.removeChild(n),l&&l.nodeType===8)if(n=l.data,n==="/$"){if(r===0){e.removeChild(l),Fn(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=l}while(n);Fn(t)}function ot(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function ms(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var sn=Math.random().toString(36).slice(2),Fe="__reactFiber$"+sn,Hn="__reactProps$"+sn,Ke="__reactContainer$"+sn,xi="__reactEvents$"+sn,Zd="__reactListeners$"+sn,Jd="__reactHandles$"+sn;function wt(e){var t=e[Fe];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Ke]||n[Fe]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=ms(e);e!==null;){if(n=e[Fe])return n;e=ms(e)}return t}e=n,n=e.parentNode}return null}function bn(e){return e=e[Fe]||e[Ke],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Ut(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(x(33))}function ol(e){return e[Hn]||null}var wi=[],$t=-1;function mt(e){return{current:e}}function U(e){0>$t||(e.current=wi[$t],wi[$t]=null,$t--)}function D(e,t){$t++,wi[$t]=e.current,e.current=t}var ft={},ie=mt(ft),fe=mt(!1),Ct=ft;function bt(e,t){var n=e.type.contextTypes;if(!n)return ft;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var l={},i;for(i in n)l[i]=t[i];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=l),l}function pe(e){return e=e.childContextTypes,e!=null}function Ar(){U(fe),U(ie)}function hs(e,t,n){if(ie.current!==ft)throw Error(x(168));D(ie,t),D(fe,n)}function qa(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var l in r)if(!(l in t))throw Error(x(108,Oc(e)||"Unknown",l));return H({},n,r)}function Vr(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||ft,Ct=ie.current,D(ie,e),D(fe,fe.current),!0}function gs(e,t,n){var r=e.stateNode;if(!r)throw Error(x(169));n?(e=qa(e,t,Ct),r.__reactInternalMemoizedMergedChildContext=e,U(fe),U(ie),D(ie,e)):U(fe),D(fe,n)}var Ve=null,sl=!1,Fl=!1;function eu(e){Ve===null?Ve=[e]:Ve.push(e)}function bd(e){sl=!0,eu(e)}function ht(){if(!Fl&&Ve!==null){Fl=!0;var e=0,t=I;try{var n=Ve;for(I=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}Ve=null,sl=!1}catch(l){throw Ve!==null&&(Ve=Ve.slice(e+1)),Ca(Ji,ht),l}finally{I=t,Fl=!1}}return null}var At=[],Vt=0,Hr=null,Br=0,ke=[],Se=0,_t=null,He=1,Be="";function yt(e,t){At[Vt++]=Br,At[Vt++]=Hr,Hr=e,Br=t}function tu(e,t,n){ke[Se++]=He,ke[Se++]=Be,ke[Se++]=_t,_t=e;var r=He;e=Be;var l=32-Me(r)-1;r&=~(1<<l),n+=1;var i=32-Me(t)+l;if(30<i){var o=l-l%5;i=(r&(1<<o)-1).toString(32),r>>=o,l-=o,He=1<<32-Me(t)+l|n<<l|r,Be=i+e}else He=1<<i|n<<l|r,Be=e}function oo(e){e.return!==null&&(yt(e,1),tu(e,1,0))}function so(e){for(;e===Hr;)Hr=At[--Vt],At[Vt]=null,Br=At[--Vt],At[Vt]=null;for(;e===_t;)_t=ke[--Se],ke[Se]=null,Be=ke[--Se],ke[Se]=null,He=ke[--Se],ke[Se]=null}var ve=null,ge=null,$=!1,Te=null;function nu(e,t){var n=Ee(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function vs(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,ve=e,ge=ot(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,ve=e,ge=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=_t!==null?{id:He,overflow:Be}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Ee(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,ve=e,ge=null,!0):!1;default:return!1}}function ki(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Si(e){if($){var t=ge;if(t){var n=t;if(!vs(e,t)){if(ki(e))throw Error(x(418));t=ot(n.nextSibling);var r=ve;t&&vs(e,t)?nu(r,n):(e.flags=e.flags&-4097|2,$=!1,ve=e)}}else{if(ki(e))throw Error(x(418));e.flags=e.flags&-4097|2,$=!1,ve=e}}}function ys(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;ve=e}function pr(e){if(e!==ve)return!1;if(!$)return ys(e),$=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!vi(e.type,e.memoizedProps)),t&&(t=ge)){if(ki(e))throw ru(),Error(x(418));for(;t;)nu(e,t),t=ot(t.nextSibling)}if(ys(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(x(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){ge=ot(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}ge=null}}else ge=ve?ot(e.stateNode.nextSibling):null;return!0}function ru(){for(var e=ge;e;)e=ot(e.nextSibling)}function qt(){ge=ve=null,$=!1}function ao(e){Te===null?Te=[e]:Te.push(e)}var qd=Ge.ReactCurrentBatchConfig;function gn(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(x(309));var r=n.stateNode}if(!r)throw Error(x(147,e));var l=r,i=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===i?t.ref:(t=function(o){var s=l.refs;o===null?delete s[i]:s[i]=o},t._stringRef=i,t)}if(typeof e!="string")throw Error(x(284));if(!n._owner)throw Error(x(290,e))}return e}function mr(e,t){throw e=Object.prototype.toString.call(t),Error(x(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function xs(e){var t=e._init;return t(e._payload)}function lu(e){function t(p,u){if(e){var f=p.deletions;f===null?(p.deletions=[u],p.flags|=16):f.push(u)}}function n(p,u){if(!e)return null;for(;u!==null;)t(p,u),u=u.sibling;return null}function r(p,u){for(p=new Map;u!==null;)u.key!==null?p.set(u.key,u):p.set(u.index,u),u=u.sibling;return p}function l(p,u){return p=ct(p,u),p.index=0,p.sibling=null,p}function i(p,u,f){return p.index=f,e?(f=p.alternate,f!==null?(f=f.index,f<u?(p.flags|=2,u):f):(p.flags|=2,u)):(p.flags|=1048576,u)}function o(p){return e&&p.alternate===null&&(p.flags|=2),p}function s(p,u,f,y){return u===null||u.tag!==6?(u=Wl(f,p.mode,y),u.return=p,u):(u=l(u,f),u.return=p,u)}function a(p,u,f,y){var k=f.type;return k===It?g(p,u,f.props.children,y,f.key):u!==null&&(u.elementType===k||typeof k=="object"&&k!==null&&k.$$typeof===Je&&xs(k)===u.type)?(y=l(u,f.props),y.ref=gn(p,u,f),y.return=p,y):(y=Lr(f.type,f.key,f.props,null,p.mode,y),y.ref=gn(p,u,f),y.return=p,y)}function c(p,u,f,y){return u===null||u.tag!==4||u.stateNode.containerInfo!==f.containerInfo||u.stateNode.implementation!==f.implementation?(u=Ql(f,p.mode,y),u.return=p,u):(u=l(u,f.children||[]),u.return=p,u)}function g(p,u,f,y,k){return u===null||u.tag!==7?(u=Nt(f,p.mode,y,k),u.return=p,u):(u=l(u,f),u.return=p,u)}function h(p,u,f){if(typeof u=="string"&&u!==""||typeof u=="number")return u=Wl(""+u,p.mode,f),u.return=p,u;if(typeof u=="object"&&u!==null){switch(u.$$typeof){case rr:return f=Lr(u.type,u.key,u.props,null,p.mode,f),f.ref=gn(p,null,u),f.return=p,f;case Rt:return u=Ql(u,p.mode,f),u.return=p,u;case Je:var y=u._init;return h(p,y(u._payload),f)}if(wn(u)||dn(u))return u=Nt(u,p.mode,f,null),u.return=p,u;mr(p,u)}return null}function m(p,u,f,y){var k=u!==null?u.key:null;if(typeof f=="string"&&f!==""||typeof f=="number")return k!==null?null:s(p,u,""+f,y);if(typeof f=="object"&&f!==null){switch(f.$$typeof){case rr:return f.key===k?a(p,u,f,y):null;case Rt:return f.key===k?c(p,u,f,y):null;case Je:return k=f._init,m(p,u,k(f._payload),y)}if(wn(f)||dn(f))return k!==null?null:g(p,u,f,y,null);mr(p,f)}return null}function v(p,u,f,y,k){if(typeof y=="string"&&y!==""||typeof y=="number")return p=p.get(f)||null,s(u,p,""+y,k);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case rr:return p=p.get(y.key===null?f:y.key)||null,a(u,p,y,k);case Rt:return p=p.get(y.key===null?f:y.key)||null,c(u,p,y,k);case Je:var C=y._init;return v(p,u,f,C(y._payload),k)}if(wn(y)||dn(y))return p=p.get(f)||null,g(u,p,y,k,null);mr(u,y)}return null}function w(p,u,f,y){for(var k=null,C=null,_=u,j=u=0,W=null;_!==null&&j<f.length;j++){_.index>j?(W=_,_=null):W=_.sibling;var M=m(p,_,f[j],y);if(M===null){_===null&&(_=W);break}e&&_&&M.alternate===null&&t(p,_),u=i(M,u,j),C===null?k=M:C.sibling=M,C=M,_=W}if(j===f.length)return n(p,_),$&&yt(p,j),k;if(_===null){for(;j<f.length;j++)_=h(p,f[j],y),_!==null&&(u=i(_,u,j),C===null?k=_:C.sibling=_,C=_);return $&&yt(p,j),k}for(_=r(p,_);j<f.length;j++)W=v(_,p,j,f[j],y),W!==null&&(e&&W.alternate!==null&&_.delete(W.key===null?j:W.key),u=i(W,u,j),C===null?k=W:C.sibling=W,C=W);return e&&_.forEach(function(je){return t(p,je)}),$&&yt(p,j),k}function S(p,u,f,y){var k=dn(f);if(typeof k!="function")throw Error(x(150));if(f=k.call(f),f==null)throw Error(x(151));for(var C=k=null,_=u,j=u=0,W=null,M=f.next();_!==null&&!M.done;j++,M=f.next()){_.index>j?(W=_,_=null):W=_.sibling;var je=m(p,_,M.value,y);if(je===null){_===null&&(_=W);break}e&&_&&je.alternate===null&&t(p,_),u=i(je,u,j),C===null?k=je:C.sibling=je,C=je,_=W}if(M.done)return n(p,_),$&&yt(p,j),k;if(_===null){for(;!M.done;j++,M=f.next())M=h(p,M.value,y),M!==null&&(u=i(M,u,j),C===null?k=M:C.sibling=M,C=M);return $&&yt(p,j),k}for(_=r(p,_);!M.done;j++,M=f.next())M=v(_,p,j,M.value,y),M!==null&&(e&&M.alternate!==null&&_.delete(M.key===null?j:M.key),u=i(M,u,j),C===null?k=M:C.sibling=M,C=M);return e&&_.forEach(function(un){return t(p,un)}),$&&yt(p,j),k}function O(p,u,f,y){if(typeof f=="object"&&f!==null&&f.type===It&&f.key===null&&(f=f.props.children),typeof f=="object"&&f!==null){switch(f.$$typeof){case rr:e:{for(var k=f.key,C=u;C!==null;){if(C.key===k){if(k=f.type,k===It){if(C.tag===7){n(p,C.sibling),u=l(C,f.props.children),u.return=p,p=u;break e}}else if(C.elementType===k||typeof k=="object"&&k!==null&&k.$$typeof===Je&&xs(k)===C.type){n(p,C.sibling),u=l(C,f.props),u.ref=gn(p,C,f),u.return=p,p=u;break e}n(p,C);break}else t(p,C);C=C.sibling}f.type===It?(u=Nt(f.props.children,p.mode,y,f.key),u.return=p,p=u):(y=Lr(f.type,f.key,f.props,null,p.mode,y),y.ref=gn(p,u,f),y.return=p,p=y)}return o(p);case Rt:e:{for(C=f.key;u!==null;){if(u.key===C)if(u.tag===4&&u.stateNode.containerInfo===f.containerInfo&&u.stateNode.implementation===f.implementation){n(p,u.sibling),u=l(u,f.children||[]),u.return=p,p=u;break e}else{n(p,u);break}else t(p,u);u=u.sibling}u=Ql(f,p.mode,y),u.return=p,p=u}return o(p);case Je:return C=f._init,O(p,u,C(f._payload),y)}if(wn(f))return w(p,u,f,y);if(dn(f))return S(p,u,f,y);mr(p,f)}return typeof f=="string"&&f!==""||typeof f=="number"?(f=""+f,u!==null&&u.tag===6?(n(p,u.sibling),u=l(u,f),u.return=p,p=u):(n(p,u),u=Wl(f,p.mode,y),u.return=p,p=u),o(p)):n(p,u)}return O}var en=lu(!0),iu=lu(!1),Wr=mt(null),Qr=null,Ht=null,uo=null;function co(){uo=Ht=Qr=null}function fo(e){var t=Wr.current;U(Wr),e._currentValue=t}function Ei(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function Gt(e,t){Qr=e,uo=Ht=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(de=!0),e.firstContext=null)}function Ce(e){var t=e._currentValue;if(uo!==e)if(e={context:e,memoizedValue:t,next:null},Ht===null){if(Qr===null)throw Error(x(308));Ht=e,Qr.dependencies={lanes:0,firstContext:e}}else Ht=Ht.next=e;return t}var kt=null;function po(e){kt===null?kt=[e]:kt.push(e)}function ou(e,t,n,r){var l=t.interleaved;return l===null?(n.next=n,po(t)):(n.next=l.next,l.next=n),t.interleaved=n,Ye(e,r)}function Ye(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var be=!1;function mo(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function su(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function We(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function st(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,R&2){var l=r.pending;return l===null?t.next=t:(t.next=l.next,l.next=t),r.pending=t,Ye(e,n)}return l=r.interleaved,l===null?(t.next=t,po(r)):(t.next=l.next,l.next=t),r.interleaved=t,Ye(e,n)}function Nr(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,bi(e,n)}}function ws(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var l=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};i===null?l=i=o:i=i.next=o,n=n.next}while(n!==null);i===null?l=i=t:i=i.next=t}else l=i=t;n={baseState:r.baseState,firstBaseUpdate:l,lastBaseUpdate:i,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function Kr(e,t,n,r){var l=e.updateQueue;be=!1;var i=l.firstBaseUpdate,o=l.lastBaseUpdate,s=l.shared.pending;if(s!==null){l.shared.pending=null;var a=s,c=a.next;a.next=null,o===null?i=c:o.next=c,o=a;var g=e.alternate;g!==null&&(g=g.updateQueue,s=g.lastBaseUpdate,s!==o&&(s===null?g.firstBaseUpdate=c:s.next=c,g.lastBaseUpdate=a))}if(i!==null){var h=l.baseState;o=0,g=c=a=null,s=i;do{var m=s.lane,v=s.eventTime;if((r&m)===m){g!==null&&(g=g.next={eventTime:v,lane:0,tag:s.tag,payload:s.payload,callback:s.callback,next:null});e:{var w=e,S=s;switch(m=t,v=n,S.tag){case 1:if(w=S.payload,typeof w=="function"){h=w.call(v,h,m);break e}h=w;break e;case 3:w.flags=w.flags&-65537|128;case 0:if(w=S.payload,m=typeof w=="function"?w.call(v,h,m):w,m==null)break e;h=H({},h,m);break e;case 2:be=!0}}s.callback!==null&&s.lane!==0&&(e.flags|=64,m=l.effects,m===null?l.effects=[s]:m.push(s))}else v={eventTime:v,lane:m,tag:s.tag,payload:s.payload,callback:s.callback,next:null},g===null?(c=g=v,a=h):g=g.next=v,o|=m;if(s=s.next,s===null){if(s=l.shared.pending,s===null)break;m=s,s=m.next,m.next=null,l.lastBaseUpdate=m,l.shared.pending=null}}while(!0);if(g===null&&(a=h),l.baseState=a,l.firstBaseUpdate=c,l.lastBaseUpdate=g,t=l.shared.interleaved,t!==null){l=t;do o|=l.lane,l=l.next;while(l!==t)}else i===null&&(l.shared.lanes=0);zt|=o,e.lanes=o,e.memoizedState=h}}function ks(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],l=r.callback;if(l!==null){if(r.callback=null,r=n,typeof l!="function")throw Error(x(191,l));l.call(r)}}}var qn={},$e=mt(qn),Bn=mt(qn),Wn=mt(qn);function St(e){if(e===qn)throw Error(x(174));return e}function ho(e,t){switch(D(Wn,t),D(Bn,e),D($e,qn),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:ri(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=ri(t,e)}U($e),D($e,t)}function tn(){U($e),U(Bn),U(Wn)}function au(e){St(Wn.current);var t=St($e.current),n=ri(t,e.type);t!==n&&(D(Bn,e),D($e,n))}function go(e){Bn.current===e&&(U($e),U(Bn))}var A=mt(0);function Yr(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Ul=[];function vo(){for(var e=0;e<Ul.length;e++)Ul[e]._workInProgressVersionPrimary=null;Ul.length=0}var Cr=Ge.ReactCurrentDispatcher,$l=Ge.ReactCurrentBatchConfig,jt=0,V=null,X=null,J=null,Xr=!1,zn=!1,Qn=0,ef=0;function ne(){throw Error(x(321))}function yo(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Ie(e[n],t[n]))return!1;return!0}function xo(e,t,n,r,l,i){if(jt=i,V=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Cr.current=e===null||e.memoizedState===null?lf:of,e=n(r,l),zn){i=0;do{if(zn=!1,Qn=0,25<=i)throw Error(x(301));i+=1,J=X=null,t.updateQueue=null,Cr.current=sf,e=n(r,l)}while(zn)}if(Cr.current=Gr,t=X!==null&&X.next!==null,jt=0,J=X=V=null,Xr=!1,t)throw Error(x(300));return e}function wo(){var e=Qn!==0;return Qn=0,e}function De(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return J===null?V.memoizedState=J=e:J=J.next=e,J}function _e(){if(X===null){var e=V.alternate;e=e!==null?e.memoizedState:null}else e=X.next;var t=J===null?V.memoizedState:J.next;if(t!==null)J=t,X=e;else{if(e===null)throw Error(x(310));X=e,e={memoizedState:X.memoizedState,baseState:X.baseState,baseQueue:X.baseQueue,queue:X.queue,next:null},J===null?V.memoizedState=J=e:J=J.next=e}return J}function Kn(e,t){return typeof t=="function"?t(e):t}function Al(e){var t=_e(),n=t.queue;if(n===null)throw Error(x(311));n.lastRenderedReducer=e;var r=X,l=r.baseQueue,i=n.pending;if(i!==null){if(l!==null){var o=l.next;l.next=i.next,i.next=o}r.baseQueue=l=i,n.pending=null}if(l!==null){i=l.next,r=r.baseState;var s=o=null,a=null,c=i;do{var g=c.lane;if((jt&g)===g)a!==null&&(a=a.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),r=c.hasEagerState?c.eagerState:e(r,c.action);else{var h={lane:g,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};a===null?(s=a=h,o=r):a=a.next=h,V.lanes|=g,zt|=g}c=c.next}while(c!==null&&c!==i);a===null?o=r:a.next=s,Ie(r,t.memoizedState)||(de=!0),t.memoizedState=r,t.baseState=o,t.baseQueue=a,n.lastRenderedState=r}if(e=n.interleaved,e!==null){l=e;do i=l.lane,V.lanes|=i,zt|=i,l=l.next;while(l!==e)}else l===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Vl(e){var t=_e(),n=t.queue;if(n===null)throw Error(x(311));n.lastRenderedReducer=e;var r=n.dispatch,l=n.pending,i=t.memoizedState;if(l!==null){n.pending=null;var o=l=l.next;do i=e(i,o.action),o=o.next;while(o!==l);Ie(i,t.memoizedState)||(de=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),n.lastRenderedState=i}return[i,r]}function uu(){}function cu(e,t){var n=V,r=_e(),l=t(),i=!Ie(r.memoizedState,l);if(i&&(r.memoizedState=l,de=!0),r=r.queue,ko(pu.bind(null,n,r,e),[e]),r.getSnapshot!==t||i||J!==null&&J.memoizedState.tag&1){if(n.flags|=2048,Yn(9,fu.bind(null,n,r,l,t),void 0,null),b===null)throw Error(x(349));jt&30||du(n,t,l)}return l}function du(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=V.updateQueue,t===null?(t={lastEffect:null,stores:null},V.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function fu(e,t,n,r){t.value=n,t.getSnapshot=r,mu(t)&&hu(e)}function pu(e,t,n){return n(function(){mu(t)&&hu(e)})}function mu(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Ie(e,n)}catch{return!0}}function hu(e){var t=Ye(e,1);t!==null&&Re(t,e,1,-1)}function Ss(e){var t=De();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Kn,lastRenderedState:e},t.queue=e,e=e.dispatch=rf.bind(null,V,e),[t.memoizedState,e]}function Yn(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=V.updateQueue,t===null?(t={lastEffect:null,stores:null},V.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function gu(){return _e().memoizedState}function _r(e,t,n,r){var l=De();V.flags|=e,l.memoizedState=Yn(1|t,n,void 0,r===void 0?null:r)}function al(e,t,n,r){var l=_e();r=r===void 0?null:r;var i=void 0;if(X!==null){var o=X.memoizedState;if(i=o.destroy,r!==null&&yo(r,o.deps)){l.memoizedState=Yn(t,n,i,r);return}}V.flags|=e,l.memoizedState=Yn(1|t,n,i,r)}function Es(e,t){return _r(8390656,8,e,t)}function ko(e,t){return al(2048,8,e,t)}function vu(e,t){return al(4,2,e,t)}function yu(e,t){return al(4,4,e,t)}function xu(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function wu(e,t,n){return n=n!=null?n.concat([e]):null,al(4,4,xu.bind(null,t,e),n)}function So(){}function ku(e,t){var n=_e();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&yo(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Su(e,t){var n=_e();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&yo(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Eu(e,t,n){return jt&21?(Ie(n,t)||(n=za(),V.lanes|=n,zt|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,de=!0),e.memoizedState=n)}function tf(e,t){var n=I;I=n!==0&&4>n?n:4,e(!0);var r=$l.transition;$l.transition={};try{e(!1),t()}finally{I=n,$l.transition=r}}function Nu(){return _e().memoizedState}function nf(e,t,n){var r=ut(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Cu(e))_u(t,n);else if(n=ou(e,t,n,r),n!==null){var l=se();Re(n,e,r,l),ju(n,t,r)}}function rf(e,t,n){var r=ut(e),l={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Cu(e))_u(t,l);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var o=t.lastRenderedState,s=i(o,n);if(l.hasEagerState=!0,l.eagerState=s,Ie(s,o)){var a=t.interleaved;a===null?(l.next=l,po(t)):(l.next=a.next,a.next=l),t.interleaved=l;return}}catch{}finally{}n=ou(e,t,l,r),n!==null&&(l=se(),Re(n,e,r,l),ju(n,t,r))}}function Cu(e){var t=e.alternate;return e===V||t!==null&&t===V}function _u(e,t){zn=Xr=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function ju(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,bi(e,n)}}var Gr={readContext:Ce,useCallback:ne,useContext:ne,useEffect:ne,useImperativeHandle:ne,useInsertionEffect:ne,useLayoutEffect:ne,useMemo:ne,useReducer:ne,useRef:ne,useState:ne,useDebugValue:ne,useDeferredValue:ne,useTransition:ne,useMutableSource:ne,useSyncExternalStore:ne,useId:ne,unstable_isNewReconciler:!1},lf={readContext:Ce,useCallback:function(e,t){return De().memoizedState=[e,t===void 0?null:t],e},useContext:Ce,useEffect:Es,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,_r(4194308,4,xu.bind(null,t,e),n)},useLayoutEffect:function(e,t){return _r(4194308,4,e,t)},useInsertionEffect:function(e,t){return _r(4,2,e,t)},useMemo:function(e,t){var n=De();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=De();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=nf.bind(null,V,e),[r.memoizedState,e]},useRef:function(e){var t=De();return e={current:e},t.memoizedState=e},useState:Ss,useDebugValue:So,useDeferredValue:function(e){return De().memoizedState=e},useTransition:function(){var e=Ss(!1),t=e[0];return e=tf.bind(null,e[1]),De().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=V,l=De();if($){if(n===void 0)throw Error(x(407));n=n()}else{if(n=t(),b===null)throw Error(x(349));jt&30||du(r,t,n)}l.memoizedState=n;var i={value:n,getSnapshot:t};return l.queue=i,Es(pu.bind(null,r,i,e),[e]),r.flags|=2048,Yn(9,fu.bind(null,r,i,n,t),void 0,null),n},useId:function(){var e=De(),t=b.identifierPrefix;if($){var n=Be,r=He;n=(r&~(1<<32-Me(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=Qn++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=ef++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},of={readContext:Ce,useCallback:ku,useContext:Ce,useEffect:ko,useImperativeHandle:wu,useInsertionEffect:vu,useLayoutEffect:yu,useMemo:Su,useReducer:Al,useRef:gu,useState:function(){return Al(Kn)},useDebugValue:So,useDeferredValue:function(e){var t=_e();return Eu(t,X.memoizedState,e)},useTransition:function(){var e=Al(Kn)[0],t=_e().memoizedState;return[e,t]},useMutableSource:uu,useSyncExternalStore:cu,useId:Nu,unstable_isNewReconciler:!1},sf={readContext:Ce,useCallback:ku,useContext:Ce,useEffect:ko,useImperativeHandle:wu,useInsertionEffect:vu,useLayoutEffect:yu,useMemo:Su,useReducer:Vl,useRef:gu,useState:function(){return Vl(Kn)},useDebugValue:So,useDeferredValue:function(e){var t=_e();return X===null?t.memoizedState=e:Eu(t,X.memoizedState,e)},useTransition:function(){var e=Vl(Kn)[0],t=_e().memoizedState;return[e,t]},useMutableSource:uu,useSyncExternalStore:cu,useId:Nu,unstable_isNewReconciler:!1};function Pe(e,t){if(e&&e.defaultProps){t=H({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Ni(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:H({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var ul={isMounted:function(e){return(e=e._reactInternals)?Tt(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=se(),l=ut(e),i=We(r,l);i.payload=t,n!=null&&(i.callback=n),t=st(e,i,l),t!==null&&(Re(t,e,l,r),Nr(t,e,l))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=se(),l=ut(e),i=We(r,l);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=st(e,i,l),t!==null&&(Re(t,e,l,r),Nr(t,e,l))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=se(),r=ut(e),l=We(n,r);l.tag=2,t!=null&&(l.callback=t),t=st(e,l,r),t!==null&&(Re(t,e,r,n),Nr(t,e,r))}};function Ns(e,t,n,r,l,i,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,i,o):t.prototype&&t.prototype.isPureReactComponent?!$n(n,r)||!$n(l,i):!0}function zu(e,t,n){var r=!1,l=ft,i=t.contextType;return typeof i=="object"&&i!==null?i=Ce(i):(l=pe(t)?Ct:ie.current,r=t.contextTypes,i=(r=r!=null)?bt(e,l):ft),t=new t(n,i),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=ul,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=l,e.__reactInternalMemoizedMaskedChildContext=i),t}function Cs(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&ul.enqueueReplaceState(t,t.state,null)}function Ci(e,t,n,r){var l=e.stateNode;l.props=n,l.state=e.memoizedState,l.refs={},mo(e);var i=t.contextType;typeof i=="object"&&i!==null?l.context=Ce(i):(i=pe(t)?Ct:ie.current,l.context=bt(e,i)),l.state=e.memoizedState,i=t.getDerivedStateFromProps,typeof i=="function"&&(Ni(e,t,i,n),l.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof l.getSnapshotBeforeUpdate=="function"||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(t=l.state,typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount(),t!==l.state&&ul.enqueueReplaceState(l,l.state,null),Kr(e,n,l,r),l.state=e.memoizedState),typeof l.componentDidMount=="function"&&(e.flags|=4194308)}function nn(e,t){try{var n="",r=t;do n+=Ic(r),r=r.return;while(r);var l=n}catch(i){l=`
Error generating stack: `+i.message+`
`+i.stack}return{value:e,source:t,stack:l,digest:null}}function Hl(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function _i(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var af=typeof WeakMap=="function"?WeakMap:Map;function Pu(e,t,n){n=We(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Jr||(Jr=!0,Di=r),_i(e,t)},n}function Lu(e,t,n){n=We(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var l=t.value;n.payload=function(){return r(l)},n.callback=function(){_i(e,t)}}var i=e.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(n.callback=function(){_i(e,t),typeof r!="function"&&(at===null?at=new Set([this]):at.add(this));var o=t.stack;this.componentDidCatch(t.value,{componentStack:o!==null?o:""})}),n}function _s(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new af;var l=new Set;r.set(t,l)}else l=r.get(t),l===void 0&&(l=new Set,r.set(t,l));l.has(n)||(l.add(n),e=Sf.bind(null,e,t,n),t.then(e,e))}function js(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function zs(e,t,n,r,l){return e.mode&1?(e.flags|=65536,e.lanes=l,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=We(-1,1),t.tag=2,st(n,t,1))),n.lanes|=1),e)}var uf=Ge.ReactCurrentOwner,de=!1;function oe(e,t,n,r){t.child=e===null?iu(t,null,n,r):en(t,e.child,n,r)}function Ps(e,t,n,r,l){n=n.render;var i=t.ref;return Gt(t,l),r=xo(e,t,n,r,i,l),n=wo(),e!==null&&!de?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,Xe(e,t,l)):($&&n&&oo(t),t.flags|=1,oe(e,t,r,l),t.child)}function Ls(e,t,n,r,l){if(e===null){var i=n.type;return typeof i=="function"&&!Lo(i)&&i.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=i,Tu(e,t,i,r,l)):(e=Lr(n.type,null,r,t,t.mode,l),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,!(e.lanes&l)){var o=i.memoizedProps;if(n=n.compare,n=n!==null?n:$n,n(o,r)&&e.ref===t.ref)return Xe(e,t,l)}return t.flags|=1,e=ct(i,r),e.ref=t.ref,e.return=t,t.child=e}function Tu(e,t,n,r,l){if(e!==null){var i=e.memoizedProps;if($n(i,r)&&e.ref===t.ref)if(de=!1,t.pendingProps=r=i,(e.lanes&l)!==0)e.flags&131072&&(de=!0);else return t.lanes=e.lanes,Xe(e,t,l)}return ji(e,t,n,r,l)}function Mu(e,t,n){var r=t.pendingProps,l=r.children,i=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},D(Wt,he),he|=n;else{if(!(n&1073741824))return e=i!==null?i.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,D(Wt,he),he|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=i!==null?i.baseLanes:n,D(Wt,he),he|=r}else i!==null?(r=i.baseLanes|n,t.memoizedState=null):r=n,D(Wt,he),he|=r;return oe(e,t,l,n),t.child}function Ru(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function ji(e,t,n,r,l){var i=pe(n)?Ct:ie.current;return i=bt(t,i),Gt(t,l),n=xo(e,t,n,r,i,l),r=wo(),e!==null&&!de?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,Xe(e,t,l)):($&&r&&oo(t),t.flags|=1,oe(e,t,n,l),t.child)}function Ts(e,t,n,r,l){if(pe(n)){var i=!0;Vr(t)}else i=!1;if(Gt(t,l),t.stateNode===null)jr(e,t),zu(t,n,r),Ci(t,n,r,l),r=!0;else if(e===null){var o=t.stateNode,s=t.memoizedProps;o.props=s;var a=o.context,c=n.contextType;typeof c=="object"&&c!==null?c=Ce(c):(c=pe(n)?Ct:ie.current,c=bt(t,c));var g=n.getDerivedStateFromProps,h=typeof g=="function"||typeof o.getSnapshotBeforeUpdate=="function";h||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(s!==r||a!==c)&&Cs(t,o,r,c),be=!1;var m=t.memoizedState;o.state=m,Kr(t,r,o,l),a=t.memoizedState,s!==r||m!==a||fe.current||be?(typeof g=="function"&&(Ni(t,n,g,r),a=t.memoizedState),(s=be||Ns(t,n,s,r,m,a,c))?(h||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(t.flags|=4194308)):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=a),o.props=r,o.state=a,o.context=c,r=s):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{o=t.stateNode,su(e,t),s=t.memoizedProps,c=t.type===t.elementType?s:Pe(t.type,s),o.props=c,h=t.pendingProps,m=o.context,a=n.contextType,typeof a=="object"&&a!==null?a=Ce(a):(a=pe(n)?Ct:ie.current,a=bt(t,a));var v=n.getDerivedStateFromProps;(g=typeof v=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(s!==h||m!==a)&&Cs(t,o,r,a),be=!1,m=t.memoizedState,o.state=m,Kr(t,r,o,l);var w=t.memoizedState;s!==h||m!==w||fe.current||be?(typeof v=="function"&&(Ni(t,n,v,r),w=t.memoizedState),(c=be||Ns(t,n,c,r,m,w,a)||!1)?(g||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,w,a),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,w,a)),typeof o.componentDidUpdate=="function"&&(t.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof o.componentDidUpdate!="function"||s===e.memoizedProps&&m===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&m===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=w),o.props=r,o.state=w,o.context=a,r=c):(typeof o.componentDidUpdate!="function"||s===e.memoizedProps&&m===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&m===e.memoizedState||(t.flags|=1024),r=!1)}return zi(e,t,n,r,i,l)}function zi(e,t,n,r,l,i){Ru(e,t);var o=(t.flags&128)!==0;if(!r&&!o)return l&&gs(t,n,!1),Xe(e,t,i);r=t.stateNode,uf.current=t;var s=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&o?(t.child=en(t,e.child,null,i),t.child=en(t,null,s,i)):oe(e,t,s,i),t.memoizedState=r.state,l&&gs(t,n,!0),t.child}function Iu(e){var t=e.stateNode;t.pendingContext?hs(e,t.pendingContext,t.pendingContext!==t.context):t.context&&hs(e,t.context,!1),ho(e,t.containerInfo)}function Ms(e,t,n,r,l){return qt(),ao(l),t.flags|=256,oe(e,t,n,r),t.child}var Pi={dehydrated:null,treeContext:null,retryLane:0};function Li(e){return{baseLanes:e,cachePool:null,transitions:null}}function Ou(e,t,n){var r=t.pendingProps,l=A.current,i=!1,o=(t.flags&128)!==0,s;if((s=o)||(s=e!==null&&e.memoizedState===null?!1:(l&2)!==0),s?(i=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(l|=1),D(A,l&1),e===null)return Si(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(o=r.children,e=r.fallback,i?(r=t.mode,i=t.child,o={mode:"hidden",children:o},!(r&1)&&i!==null?(i.childLanes=0,i.pendingProps=o):i=fl(o,r,0,null),e=Nt(e,r,n,null),i.return=t,e.return=t,i.sibling=e,t.child=i,t.child.memoizedState=Li(n),t.memoizedState=Pi,e):Eo(t,o));if(l=e.memoizedState,l!==null&&(s=l.dehydrated,s!==null))return cf(e,t,o,r,s,l,n);if(i){i=r.fallback,o=t.mode,l=e.child,s=l.sibling;var a={mode:"hidden",children:r.children};return!(o&1)&&t.child!==l?(r=t.child,r.childLanes=0,r.pendingProps=a,t.deletions=null):(r=ct(l,a),r.subtreeFlags=l.subtreeFlags&14680064),s!==null?i=ct(s,i):(i=Nt(i,o,n,null),i.flags|=2),i.return=t,r.return=t,r.sibling=i,t.child=r,r=i,i=t.child,o=e.child.memoizedState,o=o===null?Li(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},i.memoizedState=o,i.childLanes=e.childLanes&~n,t.memoizedState=Pi,r}return i=e.child,e=i.sibling,r=ct(i,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function Eo(e,t){return t=fl({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function hr(e,t,n,r){return r!==null&&ao(r),en(t,e.child,null,n),e=Eo(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function cf(e,t,n,r,l,i,o){if(n)return t.flags&256?(t.flags&=-257,r=Hl(Error(x(422))),hr(e,t,o,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(i=r.fallback,l=t.mode,r=fl({mode:"visible",children:r.children},l,0,null),i=Nt(i,l,o,null),i.flags|=2,r.return=t,i.return=t,r.sibling=i,t.child=r,t.mode&1&&en(t,e.child,null,o),t.child.memoizedState=Li(o),t.memoizedState=Pi,i);if(!(t.mode&1))return hr(e,t,o,null);if(l.data==="$!"){if(r=l.nextSibling&&l.nextSibling.dataset,r)var s=r.dgst;return r=s,i=Error(x(419)),r=Hl(i,r,void 0),hr(e,t,o,r)}if(s=(o&e.childLanes)!==0,de||s){if(r=b,r!==null){switch(o&-o){case 4:l=2;break;case 16:l=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:l=32;break;case 536870912:l=268435456;break;default:l=0}l=l&(r.suspendedLanes|o)?0:l,l!==0&&l!==i.retryLane&&(i.retryLane=l,Ye(e,l),Re(r,e,l,-1))}return Po(),r=Hl(Error(x(421))),hr(e,t,o,r)}return l.data==="$?"?(t.flags|=128,t.child=e.child,t=Ef.bind(null,e),l._reactRetry=t,null):(e=i.treeContext,ge=ot(l.nextSibling),ve=t,$=!0,Te=null,e!==null&&(ke[Se++]=He,ke[Se++]=Be,ke[Se++]=_t,He=e.id,Be=e.overflow,_t=t),t=Eo(t,r.children),t.flags|=4096,t)}function Rs(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Ei(e.return,t,n)}function Bl(e,t,n,r,l){var i=e.memoizedState;i===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:l}:(i.isBackwards=t,i.rendering=null,i.renderingStartTime=0,i.last=r,i.tail=n,i.tailMode=l)}function Du(e,t,n){var r=t.pendingProps,l=r.revealOrder,i=r.tail;if(oe(e,t,r.children,n),r=A.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Rs(e,n,t);else if(e.tag===19)Rs(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(D(A,r),!(t.mode&1))t.memoizedState=null;else switch(l){case"forwards":for(n=t.child,l=null;n!==null;)e=n.alternate,e!==null&&Yr(e)===null&&(l=n),n=n.sibling;n=l,n===null?(l=t.child,t.child=null):(l=n.sibling,n.sibling=null),Bl(t,!1,l,n,i);break;case"backwards":for(n=null,l=t.child,t.child=null;l!==null;){if(e=l.alternate,e!==null&&Yr(e)===null){t.child=l;break}e=l.sibling,l.sibling=n,n=l,l=e}Bl(t,!0,n,null,i);break;case"together":Bl(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function jr(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Xe(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),zt|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(x(153));if(t.child!==null){for(e=t.child,n=ct(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=ct(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function df(e,t,n){switch(t.tag){case 3:Iu(t),qt();break;case 5:au(t);break;case 1:pe(t.type)&&Vr(t);break;case 4:ho(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,l=t.memoizedProps.value;D(Wr,r._currentValue),r._currentValue=l;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(D(A,A.current&1),t.flags|=128,null):n&t.child.childLanes?Ou(e,t,n):(D(A,A.current&1),e=Xe(e,t,n),e!==null?e.sibling:null);D(A,A.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return Du(e,t,n);t.flags|=128}if(l=t.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),D(A,A.current),r)break;return null;case 22:case 23:return t.lanes=0,Mu(e,t,n)}return Xe(e,t,n)}var Fu,Ti,Uu,$u;Fu=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Ti=function(){};Uu=function(e,t,n,r){var l=e.memoizedProps;if(l!==r){e=t.stateNode,St($e.current);var i=null;switch(n){case"input":l=ql(e,l),r=ql(e,r),i=[];break;case"select":l=H({},l,{value:void 0}),r=H({},r,{value:void 0}),i=[];break;case"textarea":l=ni(e,l),r=ni(e,r),i=[];break;default:typeof l.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=$r)}li(n,r);var o;n=null;for(c in l)if(!r.hasOwnProperty(c)&&l.hasOwnProperty(c)&&l[c]!=null)if(c==="style"){var s=l[c];for(o in s)s.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(Mn.hasOwnProperty(c)?i||(i=[]):(i=i||[]).push(c,null));for(c in r){var a=r[c];if(s=l!=null?l[c]:void 0,r.hasOwnProperty(c)&&a!==s&&(a!=null||s!=null))if(c==="style")if(s){for(o in s)!s.hasOwnProperty(o)||a&&a.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in a)a.hasOwnProperty(o)&&s[o]!==a[o]&&(n||(n={}),n[o]=a[o])}else n||(i||(i=[]),i.push(c,n)),n=a;else c==="dangerouslySetInnerHTML"?(a=a?a.__html:void 0,s=s?s.__html:void 0,a!=null&&s!==a&&(i=i||[]).push(c,a)):c==="children"?typeof a!="string"&&typeof a!="number"||(i=i||[]).push(c,""+a):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(Mn.hasOwnProperty(c)?(a!=null&&c==="onScroll"&&F("scroll",e),i||s===a||(i=[])):(i=i||[]).push(c,a))}n&&(i=i||[]).push("style",n);var c=i;(t.updateQueue=c)&&(t.flags|=4)}};$u=function(e,t,n,r){n!==r&&(t.flags|=4)};function vn(e,t){if(!$)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function re(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var l=e.child;l!==null;)n|=l.lanes|l.childLanes,r|=l.subtreeFlags&14680064,r|=l.flags&14680064,l.return=e,l=l.sibling;else for(l=e.child;l!==null;)n|=l.lanes|l.childLanes,r|=l.subtreeFlags,r|=l.flags,l.return=e,l=l.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function ff(e,t,n){var r=t.pendingProps;switch(so(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return re(t),null;case 1:return pe(t.type)&&Ar(),re(t),null;case 3:return r=t.stateNode,tn(),U(fe),U(ie),vo(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(pr(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Te!==null&&($i(Te),Te=null))),Ti(e,t),re(t),null;case 5:go(t);var l=St(Wn.current);if(n=t.type,e!==null&&t.stateNode!=null)Uu(e,t,n,r,l),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(x(166));return re(t),null}if(e=St($e.current),pr(t)){r=t.stateNode,n=t.type;var i=t.memoizedProps;switch(r[Fe]=t,r[Hn]=i,e=(t.mode&1)!==0,n){case"dialog":F("cancel",r),F("close",r);break;case"iframe":case"object":case"embed":F("load",r);break;case"video":case"audio":for(l=0;l<Sn.length;l++)F(Sn[l],r);break;case"source":F("error",r);break;case"img":case"image":case"link":F("error",r),F("load",r);break;case"details":F("toggle",r);break;case"input":Ho(r,i),F("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!i.multiple},F("invalid",r);break;case"textarea":Wo(r,i),F("invalid",r)}li(n,i),l=null;for(var o in i)if(i.hasOwnProperty(o)){var s=i[o];o==="children"?typeof s=="string"?r.textContent!==s&&(i.suppressHydrationWarning!==!0&&fr(r.textContent,s,e),l=["children",s]):typeof s=="number"&&r.textContent!==""+s&&(i.suppressHydrationWarning!==!0&&fr(r.textContent,s,e),l=["children",""+s]):Mn.hasOwnProperty(o)&&s!=null&&o==="onScroll"&&F("scroll",r)}switch(n){case"input":lr(r),Bo(r,i,!0);break;case"textarea":lr(r),Qo(r);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(r.onclick=$r)}r=l,t.updateQueue=r,r!==null&&(t.flags|=4)}else{o=l.nodeType===9?l:l.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=pa(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=o.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=o.createElement(n,{is:r.is}):(e=o.createElement(n),n==="select"&&(o=e,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):e=o.createElementNS(e,n),e[Fe]=t,e[Hn]=r,Fu(e,t,!1,!1),t.stateNode=e;e:{switch(o=ii(n,r),n){case"dialog":F("cancel",e),F("close",e),l=r;break;case"iframe":case"object":case"embed":F("load",e),l=r;break;case"video":case"audio":for(l=0;l<Sn.length;l++)F(Sn[l],e);l=r;break;case"source":F("error",e),l=r;break;case"img":case"image":case"link":F("error",e),F("load",e),l=r;break;case"details":F("toggle",e),l=r;break;case"input":Ho(e,r),l=ql(e,r),F("invalid",e);break;case"option":l=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},l=H({},r,{value:void 0}),F("invalid",e);break;case"textarea":Wo(e,r),l=ni(e,r),F("invalid",e);break;default:l=r}li(n,l),s=l;for(i in s)if(s.hasOwnProperty(i)){var a=s[i];i==="style"?ga(e,a):i==="dangerouslySetInnerHTML"?(a=a?a.__html:void 0,a!=null&&ma(e,a)):i==="children"?typeof a=="string"?(n!=="textarea"||a!=="")&&Rn(e,a):typeof a=="number"&&Rn(e,""+a):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(Mn.hasOwnProperty(i)?a!=null&&i==="onScroll"&&F("scroll",e):a!=null&&Ki(e,i,a,o))}switch(n){case"input":lr(e),Bo(e,r,!1);break;case"textarea":lr(e),Qo(e);break;case"option":r.value!=null&&e.setAttribute("value",""+dt(r.value));break;case"select":e.multiple=!!r.multiple,i=r.value,i!=null?Qt(e,!!r.multiple,i,!1):r.defaultValue!=null&&Qt(e,!!r.multiple,r.defaultValue,!0);break;default:typeof l.onClick=="function"&&(e.onclick=$r)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return re(t),null;case 6:if(e&&t.stateNode!=null)$u(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(x(166));if(n=St(Wn.current),St($e.current),pr(t)){if(r=t.stateNode,n=t.memoizedProps,r[Fe]=t,(i=r.nodeValue!==n)&&(e=ve,e!==null))switch(e.tag){case 3:fr(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&fr(r.nodeValue,n,(e.mode&1)!==0)}i&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[Fe]=t,t.stateNode=r}return re(t),null;case 13:if(U(A),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if($&&ge!==null&&t.mode&1&&!(t.flags&128))ru(),qt(),t.flags|=98560,i=!1;else if(i=pr(t),r!==null&&r.dehydrated!==null){if(e===null){if(!i)throw Error(x(318));if(i=t.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(x(317));i[Fe]=t}else qt(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;re(t),i=!1}else Te!==null&&($i(Te),Te=null),i=!0;if(!i)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||A.current&1?G===0&&(G=3):Po())),t.updateQueue!==null&&(t.flags|=4),re(t),null);case 4:return tn(),Ti(e,t),e===null&&An(t.stateNode.containerInfo),re(t),null;case 10:return fo(t.type._context),re(t),null;case 17:return pe(t.type)&&Ar(),re(t),null;case 19:if(U(A),i=t.memoizedState,i===null)return re(t),null;if(r=(t.flags&128)!==0,o=i.rendering,o===null)if(r)vn(i,!1);else{if(G!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=Yr(e),o!==null){for(t.flags|=128,vn(i,!1),r=o.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)i=n,e=r,i.flags&=14680066,o=i.alternate,o===null?(i.childLanes=0,i.lanes=e,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=o.childLanes,i.lanes=o.lanes,i.child=o.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=o.memoizedProps,i.memoizedState=o.memoizedState,i.updateQueue=o.updateQueue,i.type=o.type,e=o.dependencies,i.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return D(A,A.current&1|2),t.child}e=e.sibling}i.tail!==null&&K()>rn&&(t.flags|=128,r=!0,vn(i,!1),t.lanes=4194304)}else{if(!r)if(e=Yr(o),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),vn(i,!0),i.tail===null&&i.tailMode==="hidden"&&!o.alternate&&!$)return re(t),null}else 2*K()-i.renderingStartTime>rn&&n!==1073741824&&(t.flags|=128,r=!0,vn(i,!1),t.lanes=4194304);i.isBackwards?(o.sibling=t.child,t.child=o):(n=i.last,n!==null?n.sibling=o:t.child=o,i.last=o)}return i.tail!==null?(t=i.tail,i.rendering=t,i.tail=t.sibling,i.renderingStartTime=K(),t.sibling=null,n=A.current,D(A,r?n&1|2:n&1),t):(re(t),null);case 22:case 23:return zo(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?he&1073741824&&(re(t),t.subtreeFlags&6&&(t.flags|=8192)):re(t),null;case 24:return null;case 25:return null}throw Error(x(156,t.tag))}function pf(e,t){switch(so(t),t.tag){case 1:return pe(t.type)&&Ar(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return tn(),U(fe),U(ie),vo(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return go(t),null;case 13:if(U(A),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(x(340));qt()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return U(A),null;case 4:return tn(),null;case 10:return fo(t.type._context),null;case 22:case 23:return zo(),null;case 24:return null;default:return null}}var gr=!1,le=!1,mf=typeof WeakSet=="function"?WeakSet:Set,E=null;function Bt(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){B(e,t,r)}else n.current=null}function Mi(e,t,n){try{n()}catch(r){B(e,t,r)}}var Is=!1;function hf(e,t){if(hi=Dr,e=Wa(),io(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var l=r.anchorOffset,i=r.focusNode;r=r.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var o=0,s=-1,a=-1,c=0,g=0,h=e,m=null;t:for(;;){for(var v;h!==n||l!==0&&h.nodeType!==3||(s=o+l),h!==i||r!==0&&h.nodeType!==3||(a=o+r),h.nodeType===3&&(o+=h.nodeValue.length),(v=h.firstChild)!==null;)m=h,h=v;for(;;){if(h===e)break t;if(m===n&&++c===l&&(s=o),m===i&&++g===r&&(a=o),(v=h.nextSibling)!==null)break;h=m,m=h.parentNode}h=v}n=s===-1||a===-1?null:{start:s,end:a}}else n=null}n=n||{start:0,end:0}}else n=null;for(gi={focusedElem:e,selectionRange:n},Dr=!1,E=t;E!==null;)if(t=E,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,E=e;else for(;E!==null;){t=E;try{var w=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(w!==null){var S=w.memoizedProps,O=w.memoizedState,p=t.stateNode,u=p.getSnapshotBeforeUpdate(t.elementType===t.type?S:Pe(t.type,S),O);p.__reactInternalSnapshotBeforeUpdate=u}break;case 3:var f=t.stateNode.containerInfo;f.nodeType===1?f.textContent="":f.nodeType===9&&f.documentElement&&f.removeChild(f.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(x(163))}}catch(y){B(t,t.return,y)}if(e=t.sibling,e!==null){e.return=t.return,E=e;break}E=t.return}return w=Is,Is=!1,w}function Pn(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var l=r=r.next;do{if((l.tag&e)===e){var i=l.destroy;l.destroy=void 0,i!==void 0&&Mi(t,n,i)}l=l.next}while(l!==r)}}function cl(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function Ri(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function Au(e){var t=e.alternate;t!==null&&(e.alternate=null,Au(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Fe],delete t[Hn],delete t[xi],delete t[Zd],delete t[Jd])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Vu(e){return e.tag===5||e.tag===3||e.tag===4}function Os(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Vu(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Ii(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=$r));else if(r!==4&&(e=e.child,e!==null))for(Ii(e,t,n),e=e.sibling;e!==null;)Ii(e,t,n),e=e.sibling}function Oi(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Oi(e,t,n),e=e.sibling;e!==null;)Oi(e,t,n),e=e.sibling}var q=null,Le=!1;function Ze(e,t,n){for(n=n.child;n!==null;)Hu(e,t,n),n=n.sibling}function Hu(e,t,n){if(Ue&&typeof Ue.onCommitFiberUnmount=="function")try{Ue.onCommitFiberUnmount(nl,n)}catch{}switch(n.tag){case 5:le||Bt(n,t);case 6:var r=q,l=Le;q=null,Ze(e,t,n),q=r,Le=l,q!==null&&(Le?(e=q,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):q.removeChild(n.stateNode));break;case 18:q!==null&&(Le?(e=q,n=n.stateNode,e.nodeType===8?Dl(e.parentNode,n):e.nodeType===1&&Dl(e,n),Fn(e)):Dl(q,n.stateNode));break;case 4:r=q,l=Le,q=n.stateNode.containerInfo,Le=!0,Ze(e,t,n),q=r,Le=l;break;case 0:case 11:case 14:case 15:if(!le&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){l=r=r.next;do{var i=l,o=i.destroy;i=i.tag,o!==void 0&&(i&2||i&4)&&Mi(n,t,o),l=l.next}while(l!==r)}Ze(e,t,n);break;case 1:if(!le&&(Bt(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(s){B(n,t,s)}Ze(e,t,n);break;case 21:Ze(e,t,n);break;case 22:n.mode&1?(le=(r=le)||n.memoizedState!==null,Ze(e,t,n),le=r):Ze(e,t,n);break;default:Ze(e,t,n)}}function Ds(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new mf),t.forEach(function(r){var l=Nf.bind(null,e,r);n.has(r)||(n.add(r),r.then(l,l))})}}function ze(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var l=n[r];try{var i=e,o=t,s=o;e:for(;s!==null;){switch(s.tag){case 5:q=s.stateNode,Le=!1;break e;case 3:q=s.stateNode.containerInfo,Le=!0;break e;case 4:q=s.stateNode.containerInfo,Le=!0;break e}s=s.return}if(q===null)throw Error(x(160));Hu(i,o,l),q=null,Le=!1;var a=l.alternate;a!==null&&(a.return=null),l.return=null}catch(c){B(l,t,c)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Bu(t,e),t=t.sibling}function Bu(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(ze(t,e),Oe(e),r&4){try{Pn(3,e,e.return),cl(3,e)}catch(S){B(e,e.return,S)}try{Pn(5,e,e.return)}catch(S){B(e,e.return,S)}}break;case 1:ze(t,e),Oe(e),r&512&&n!==null&&Bt(n,n.return);break;case 5:if(ze(t,e),Oe(e),r&512&&n!==null&&Bt(n,n.return),e.flags&32){var l=e.stateNode;try{Rn(l,"")}catch(S){B(e,e.return,S)}}if(r&4&&(l=e.stateNode,l!=null)){var i=e.memoizedProps,o=n!==null?n.memoizedProps:i,s=e.type,a=e.updateQueue;if(e.updateQueue=null,a!==null)try{s==="input"&&i.type==="radio"&&i.name!=null&&da(l,i),ii(s,o);var c=ii(s,i);for(o=0;o<a.length;o+=2){var g=a[o],h=a[o+1];g==="style"?ga(l,h):g==="dangerouslySetInnerHTML"?ma(l,h):g==="children"?Rn(l,h):Ki(l,g,h,c)}switch(s){case"input":ei(l,i);break;case"textarea":fa(l,i);break;case"select":var m=l._wrapperState.wasMultiple;l._wrapperState.wasMultiple=!!i.multiple;var v=i.value;v!=null?Qt(l,!!i.multiple,v,!1):m!==!!i.multiple&&(i.defaultValue!=null?Qt(l,!!i.multiple,i.defaultValue,!0):Qt(l,!!i.multiple,i.multiple?[]:"",!1))}l[Hn]=i}catch(S){B(e,e.return,S)}}break;case 6:if(ze(t,e),Oe(e),r&4){if(e.stateNode===null)throw Error(x(162));l=e.stateNode,i=e.memoizedProps;try{l.nodeValue=i}catch(S){B(e,e.return,S)}}break;case 3:if(ze(t,e),Oe(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Fn(t.containerInfo)}catch(S){B(e,e.return,S)}break;case 4:ze(t,e),Oe(e);break;case 13:ze(t,e),Oe(e),l=e.child,l.flags&8192&&(i=l.memoizedState!==null,l.stateNode.isHidden=i,!i||l.alternate!==null&&l.alternate.memoizedState!==null||(_o=K())),r&4&&Ds(e);break;case 22:if(g=n!==null&&n.memoizedState!==null,e.mode&1?(le=(c=le)||g,ze(t,e),le=c):ze(t,e),Oe(e),r&8192){if(c=e.memoizedState!==null,(e.stateNode.isHidden=c)&&!g&&e.mode&1)for(E=e,g=e.child;g!==null;){for(h=E=g;E!==null;){switch(m=E,v=m.child,m.tag){case 0:case 11:case 14:case 15:Pn(4,m,m.return);break;case 1:Bt(m,m.return);var w=m.stateNode;if(typeof w.componentWillUnmount=="function"){r=m,n=m.return;try{t=r,w.props=t.memoizedProps,w.state=t.memoizedState,w.componentWillUnmount()}catch(S){B(r,n,S)}}break;case 5:Bt(m,m.return);break;case 22:if(m.memoizedState!==null){Us(h);continue}}v!==null?(v.return=m,E=v):Us(h)}g=g.sibling}e:for(g=null,h=e;;){if(h.tag===5){if(g===null){g=h;try{l=h.stateNode,c?(i=l.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(s=h.stateNode,a=h.memoizedProps.style,o=a!=null&&a.hasOwnProperty("display")?a.display:null,s.style.display=ha("display",o))}catch(S){B(e,e.return,S)}}}else if(h.tag===6){if(g===null)try{h.stateNode.nodeValue=c?"":h.memoizedProps}catch(S){B(e,e.return,S)}}else if((h.tag!==22&&h.tag!==23||h.memoizedState===null||h===e)&&h.child!==null){h.child.return=h,h=h.child;continue}if(h===e)break e;for(;h.sibling===null;){if(h.return===null||h.return===e)break e;g===h&&(g=null),h=h.return}g===h&&(g=null),h.sibling.return=h.return,h=h.sibling}}break;case 19:ze(t,e),Oe(e),r&4&&Ds(e);break;case 21:break;default:ze(t,e),Oe(e)}}function Oe(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Vu(n)){var r=n;break e}n=n.return}throw Error(x(160))}switch(r.tag){case 5:var l=r.stateNode;r.flags&32&&(Rn(l,""),r.flags&=-33);var i=Os(e);Oi(e,i,l);break;case 3:case 4:var o=r.stateNode.containerInfo,s=Os(e);Ii(e,s,o);break;default:throw Error(x(161))}}catch(a){B(e,e.return,a)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function gf(e,t,n){E=e,Wu(e)}function Wu(e,t,n){for(var r=(e.mode&1)!==0;E!==null;){var l=E,i=l.child;if(l.tag===22&&r){var o=l.memoizedState!==null||gr;if(!o){var s=l.alternate,a=s!==null&&s.memoizedState!==null||le;s=gr;var c=le;if(gr=o,(le=a)&&!c)for(E=l;E!==null;)o=E,a=o.child,o.tag===22&&o.memoizedState!==null?$s(l):a!==null?(a.return=o,E=a):$s(l);for(;i!==null;)E=i,Wu(i),i=i.sibling;E=l,gr=s,le=c}Fs(e)}else l.subtreeFlags&8772&&i!==null?(i.return=l,E=i):Fs(e)}}function Fs(e){for(;E!==null;){var t=E;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:le||cl(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!le)if(n===null)r.componentDidMount();else{var l=t.elementType===t.type?n.memoizedProps:Pe(t.type,n.memoizedProps);r.componentDidUpdate(l,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var i=t.updateQueue;i!==null&&ks(t,i,r);break;case 3:var o=t.updateQueue;if(o!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}ks(t,o,n)}break;case 5:var s=t.stateNode;if(n===null&&t.flags&4){n=s;var a=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":a.autoFocus&&n.focus();break;case"img":a.src&&(n.src=a.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var c=t.alternate;if(c!==null){var g=c.memoizedState;if(g!==null){var h=g.dehydrated;h!==null&&Fn(h)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(x(163))}le||t.flags&512&&Ri(t)}catch(m){B(t,t.return,m)}}if(t===e){E=null;break}if(n=t.sibling,n!==null){n.return=t.return,E=n;break}E=t.return}}function Us(e){for(;E!==null;){var t=E;if(t===e){E=null;break}var n=t.sibling;if(n!==null){n.return=t.return,E=n;break}E=t.return}}function $s(e){for(;E!==null;){var t=E;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{cl(4,t)}catch(a){B(t,n,a)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var l=t.return;try{r.componentDidMount()}catch(a){B(t,l,a)}}var i=t.return;try{Ri(t)}catch(a){B(t,i,a)}break;case 5:var o=t.return;try{Ri(t)}catch(a){B(t,o,a)}}}catch(a){B(t,t.return,a)}if(t===e){E=null;break}var s=t.sibling;if(s!==null){s.return=t.return,E=s;break}E=t.return}}var vf=Math.ceil,Zr=Ge.ReactCurrentDispatcher,No=Ge.ReactCurrentOwner,Ne=Ge.ReactCurrentBatchConfig,R=0,b=null,Y=null,ee=0,he=0,Wt=mt(0),G=0,Xn=null,zt=0,dl=0,Co=0,Ln=null,ce=null,_o=0,rn=1/0,Ae=null,Jr=!1,Di=null,at=null,vr=!1,nt=null,br=0,Tn=0,Fi=null,zr=-1,Pr=0;function se(){return R&6?K():zr!==-1?zr:zr=K()}function ut(e){return e.mode&1?R&2&&ee!==0?ee&-ee:qd.transition!==null?(Pr===0&&(Pr=za()),Pr):(e=I,e!==0||(e=window.event,e=e===void 0?16:Oa(e.type)),e):1}function Re(e,t,n,r){if(50<Tn)throw Tn=0,Fi=null,Error(x(185));Zn(e,n,r),(!(R&2)||e!==b)&&(e===b&&(!(R&2)&&(dl|=n),G===4&&et(e,ee)),me(e,r),n===1&&R===0&&!(t.mode&1)&&(rn=K()+500,sl&&ht()))}function me(e,t){var n=e.callbackNode;qc(e,t);var r=Or(e,e===b?ee:0);if(r===0)n!==null&&Xo(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&Xo(n),t===1)e.tag===0?bd(As.bind(null,e)):eu(As.bind(null,e)),Xd(function(){!(R&6)&&ht()}),n=null;else{switch(Pa(r)){case 1:n=Ji;break;case 4:n=_a;break;case 16:n=Ir;break;case 536870912:n=ja;break;default:n=Ir}n=bu(n,Qu.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function Qu(e,t){if(zr=-1,Pr=0,R&6)throw Error(x(327));var n=e.callbackNode;if(Zt()&&e.callbackNode!==n)return null;var r=Or(e,e===b?ee:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=qr(e,r);else{t=r;var l=R;R|=2;var i=Yu();(b!==e||ee!==t)&&(Ae=null,rn=K()+500,Et(e,t));do try{wf();break}catch(s){Ku(e,s)}while(!0);co(),Zr.current=i,R=l,Y!==null?t=0:(b=null,ee=0,t=G)}if(t!==0){if(t===2&&(l=ci(e),l!==0&&(r=l,t=Ui(e,l))),t===1)throw n=Xn,Et(e,0),et(e,r),me(e,K()),n;if(t===6)et(e,r);else{if(l=e.current.alternate,!(r&30)&&!yf(l)&&(t=qr(e,r),t===2&&(i=ci(e),i!==0&&(r=i,t=Ui(e,i))),t===1))throw n=Xn,Et(e,0),et(e,r),me(e,K()),n;switch(e.finishedWork=l,e.finishedLanes=r,t){case 0:case 1:throw Error(x(345));case 2:xt(e,ce,Ae);break;case 3:if(et(e,r),(r&130023424)===r&&(t=_o+500-K(),10<t)){if(Or(e,0)!==0)break;if(l=e.suspendedLanes,(l&r)!==r){se(),e.pingedLanes|=e.suspendedLanes&l;break}e.timeoutHandle=yi(xt.bind(null,e,ce,Ae),t);break}xt(e,ce,Ae);break;case 4:if(et(e,r),(r&4194240)===r)break;for(t=e.eventTimes,l=-1;0<r;){var o=31-Me(r);i=1<<o,o=t[o],o>l&&(l=o),r&=~i}if(r=l,r=K()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*vf(r/1960))-r,10<r){e.timeoutHandle=yi(xt.bind(null,e,ce,Ae),r);break}xt(e,ce,Ae);break;case 5:xt(e,ce,Ae);break;default:throw Error(x(329))}}}return me(e,K()),e.callbackNode===n?Qu.bind(null,e):null}function Ui(e,t){var n=Ln;return e.current.memoizedState.isDehydrated&&(Et(e,t).flags|=256),e=qr(e,t),e!==2&&(t=ce,ce=n,t!==null&&$i(t)),e}function $i(e){ce===null?ce=e:ce.push.apply(ce,e)}function yf(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var l=n[r],i=l.getSnapshot;l=l.value;try{if(!Ie(i(),l))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function et(e,t){for(t&=~Co,t&=~dl,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Me(t),r=1<<n;e[n]=-1,t&=~r}}function As(e){if(R&6)throw Error(x(327));Zt();var t=Or(e,0);if(!(t&1))return me(e,K()),null;var n=qr(e,t);if(e.tag!==0&&n===2){var r=ci(e);r!==0&&(t=r,n=Ui(e,r))}if(n===1)throw n=Xn,Et(e,0),et(e,t),me(e,K()),n;if(n===6)throw Error(x(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,xt(e,ce,Ae),me(e,K()),null}function jo(e,t){var n=R;R|=1;try{return e(t)}finally{R=n,R===0&&(rn=K()+500,sl&&ht())}}function Pt(e){nt!==null&&nt.tag===0&&!(R&6)&&Zt();var t=R;R|=1;var n=Ne.transition,r=I;try{if(Ne.transition=null,I=1,e)return e()}finally{I=r,Ne.transition=n,R=t,!(R&6)&&ht()}}function zo(){he=Wt.current,U(Wt)}function Et(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,Yd(n)),Y!==null)for(n=Y.return;n!==null;){var r=n;switch(so(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Ar();break;case 3:tn(),U(fe),U(ie),vo();break;case 5:go(r);break;case 4:tn();break;case 13:U(A);break;case 19:U(A);break;case 10:fo(r.type._context);break;case 22:case 23:zo()}n=n.return}if(b=e,Y=e=ct(e.current,null),ee=he=t,G=0,Xn=null,Co=dl=zt=0,ce=Ln=null,kt!==null){for(t=0;t<kt.length;t++)if(n=kt[t],r=n.interleaved,r!==null){n.interleaved=null;var l=r.next,i=n.pending;if(i!==null){var o=i.next;i.next=l,r.next=o}n.pending=r}kt=null}return e}function Ku(e,t){do{var n=Y;try{if(co(),Cr.current=Gr,Xr){for(var r=V.memoizedState;r!==null;){var l=r.queue;l!==null&&(l.pending=null),r=r.next}Xr=!1}if(jt=0,J=X=V=null,zn=!1,Qn=0,No.current=null,n===null||n.return===null){G=1,Xn=t,Y=null;break}e:{var i=e,o=n.return,s=n,a=t;if(t=ee,s.flags|=32768,a!==null&&typeof a=="object"&&typeof a.then=="function"){var c=a,g=s,h=g.tag;if(!(g.mode&1)&&(h===0||h===11||h===15)){var m=g.alternate;m?(g.updateQueue=m.updateQueue,g.memoizedState=m.memoizedState,g.lanes=m.lanes):(g.updateQueue=null,g.memoizedState=null)}var v=js(o);if(v!==null){v.flags&=-257,zs(v,o,s,i,t),v.mode&1&&_s(i,c,t),t=v,a=c;var w=t.updateQueue;if(w===null){var S=new Set;S.add(a),t.updateQueue=S}else w.add(a);break e}else{if(!(t&1)){_s(i,c,t),Po();break e}a=Error(x(426))}}else if($&&s.mode&1){var O=js(o);if(O!==null){!(O.flags&65536)&&(O.flags|=256),zs(O,o,s,i,t),ao(nn(a,s));break e}}i=a=nn(a,s),G!==4&&(G=2),Ln===null?Ln=[i]:Ln.push(i),i=o;do{switch(i.tag){case 3:i.flags|=65536,t&=-t,i.lanes|=t;var p=Pu(i,a,t);ws(i,p);break e;case 1:s=a;var u=i.type,f=i.stateNode;if(!(i.flags&128)&&(typeof u.getDerivedStateFromError=="function"||f!==null&&typeof f.componentDidCatch=="function"&&(at===null||!at.has(f)))){i.flags|=65536,t&=-t,i.lanes|=t;var y=Lu(i,s,t);ws(i,y);break e}}i=i.return}while(i!==null)}Gu(n)}catch(k){t=k,Y===n&&n!==null&&(Y=n=n.return);continue}break}while(!0)}function Yu(){var e=Zr.current;return Zr.current=Gr,e===null?Gr:e}function Po(){(G===0||G===3||G===2)&&(G=4),b===null||!(zt&268435455)&&!(dl&268435455)||et(b,ee)}function qr(e,t){var n=R;R|=2;var r=Yu();(b!==e||ee!==t)&&(Ae=null,Et(e,t));do try{xf();break}catch(l){Ku(e,l)}while(!0);if(co(),R=n,Zr.current=r,Y!==null)throw Error(x(261));return b=null,ee=0,G}function xf(){for(;Y!==null;)Xu(Y)}function wf(){for(;Y!==null&&!Wc();)Xu(Y)}function Xu(e){var t=Ju(e.alternate,e,he);e.memoizedProps=e.pendingProps,t===null?Gu(e):Y=t,No.current=null}function Gu(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=pf(n,t),n!==null){n.flags&=32767,Y=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{G=6,Y=null;return}}else if(n=ff(n,t,he),n!==null){Y=n;return}if(t=t.sibling,t!==null){Y=t;return}Y=t=e}while(t!==null);G===0&&(G=5)}function xt(e,t,n){var r=I,l=Ne.transition;try{Ne.transition=null,I=1,kf(e,t,n,r)}finally{Ne.transition=l,I=r}return null}function kf(e,t,n,r){do Zt();while(nt!==null);if(R&6)throw Error(x(327));n=e.finishedWork;var l=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(x(177));e.callbackNode=null,e.callbackPriority=0;var i=n.lanes|n.childLanes;if(ed(e,i),e===b&&(Y=b=null,ee=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||vr||(vr=!0,bu(Ir,function(){return Zt(),null})),i=(n.flags&15990)!==0,n.subtreeFlags&15990||i){i=Ne.transition,Ne.transition=null;var o=I;I=1;var s=R;R|=4,No.current=null,hf(e,n),Bu(n,e),Ad(gi),Dr=!!hi,gi=hi=null,e.current=n,gf(n),Qc(),R=s,I=o,Ne.transition=i}else e.current=n;if(vr&&(vr=!1,nt=e,br=l),i=e.pendingLanes,i===0&&(at=null),Xc(n.stateNode),me(e,K()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)l=t[n],r(l.value,{componentStack:l.stack,digest:l.digest});if(Jr)throw Jr=!1,e=Di,Di=null,e;return br&1&&e.tag!==0&&Zt(),i=e.pendingLanes,i&1?e===Fi?Tn++:(Tn=0,Fi=e):Tn=0,ht(),null}function Zt(){if(nt!==null){var e=Pa(br),t=Ne.transition,n=I;try{if(Ne.transition=null,I=16>e?16:e,nt===null)var r=!1;else{if(e=nt,nt=null,br=0,R&6)throw Error(x(331));var l=R;for(R|=4,E=e.current;E!==null;){var i=E,o=i.child;if(E.flags&16){var s=i.deletions;if(s!==null){for(var a=0;a<s.length;a++){var c=s[a];for(E=c;E!==null;){var g=E;switch(g.tag){case 0:case 11:case 15:Pn(8,g,i)}var h=g.child;if(h!==null)h.return=g,E=h;else for(;E!==null;){g=E;var m=g.sibling,v=g.return;if(Au(g),g===c){E=null;break}if(m!==null){m.return=v,E=m;break}E=v}}}var w=i.alternate;if(w!==null){var S=w.child;if(S!==null){w.child=null;do{var O=S.sibling;S.sibling=null,S=O}while(S!==null)}}E=i}}if(i.subtreeFlags&2064&&o!==null)o.return=i,E=o;else e:for(;E!==null;){if(i=E,i.flags&2048)switch(i.tag){case 0:case 11:case 15:Pn(9,i,i.return)}var p=i.sibling;if(p!==null){p.return=i.return,E=p;break e}E=i.return}}var u=e.current;for(E=u;E!==null;){o=E;var f=o.child;if(o.subtreeFlags&2064&&f!==null)f.return=o,E=f;else e:for(o=u;E!==null;){if(s=E,s.flags&2048)try{switch(s.tag){case 0:case 11:case 15:cl(9,s)}}catch(k){B(s,s.return,k)}if(s===o){E=null;break e}var y=s.sibling;if(y!==null){y.return=s.return,E=y;break e}E=s.return}}if(R=l,ht(),Ue&&typeof Ue.onPostCommitFiberRoot=="function")try{Ue.onPostCommitFiberRoot(nl,e)}catch{}r=!0}return r}finally{I=n,Ne.transition=t}}return!1}function Vs(e,t,n){t=nn(n,t),t=Pu(e,t,1),e=st(e,t,1),t=se(),e!==null&&(Zn(e,1,t),me(e,t))}function B(e,t,n){if(e.tag===3)Vs(e,e,n);else for(;t!==null;){if(t.tag===3){Vs(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(at===null||!at.has(r))){e=nn(n,e),e=Lu(t,e,1),t=st(t,e,1),e=se(),t!==null&&(Zn(t,1,e),me(t,e));break}}t=t.return}}function Sf(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=se(),e.pingedLanes|=e.suspendedLanes&n,b===e&&(ee&n)===n&&(G===4||G===3&&(ee&130023424)===ee&&500>K()-_o?Et(e,0):Co|=n),me(e,t)}function Zu(e,t){t===0&&(e.mode&1?(t=sr,sr<<=1,!(sr&130023424)&&(sr=4194304)):t=1);var n=se();e=Ye(e,t),e!==null&&(Zn(e,t,n),me(e,n))}function Ef(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Zu(e,n)}function Nf(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,l=e.memoizedState;l!==null&&(n=l.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(x(314))}r!==null&&r.delete(t),Zu(e,n)}var Ju;Ju=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||fe.current)de=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return de=!1,df(e,t,n);de=!!(e.flags&131072)}else de=!1,$&&t.flags&1048576&&tu(t,Br,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;jr(e,t),e=t.pendingProps;var l=bt(t,ie.current);Gt(t,n),l=xo(null,t,r,e,l,n);var i=wo();return t.flags|=1,typeof l=="object"&&l!==null&&typeof l.render=="function"&&l.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,pe(r)?(i=!0,Vr(t)):i=!1,t.memoizedState=l.state!==null&&l.state!==void 0?l.state:null,mo(t),l.updater=ul,t.stateNode=l,l._reactInternals=t,Ci(t,r,e,n),t=zi(null,t,r,!0,i,n)):(t.tag=0,$&&i&&oo(t),oe(null,t,l,n),t=t.child),t;case 16:r=t.elementType;e:{switch(jr(e,t),e=t.pendingProps,l=r._init,r=l(r._payload),t.type=r,l=t.tag=_f(r),e=Pe(r,e),l){case 0:t=ji(null,t,r,e,n);break e;case 1:t=Ts(null,t,r,e,n);break e;case 11:t=Ps(null,t,r,e,n);break e;case 14:t=Ls(null,t,r,Pe(r.type,e),n);break e}throw Error(x(306,r,""))}return t;case 0:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Pe(r,l),ji(e,t,r,l,n);case 1:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Pe(r,l),Ts(e,t,r,l,n);case 3:e:{if(Iu(t),e===null)throw Error(x(387));r=t.pendingProps,i=t.memoizedState,l=i.element,su(e,t),Kr(t,r,null,n);var o=t.memoizedState;if(r=o.element,i.isDehydrated)if(i={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){l=nn(Error(x(423)),t),t=Ms(e,t,r,n,l);break e}else if(r!==l){l=nn(Error(x(424)),t),t=Ms(e,t,r,n,l);break e}else for(ge=ot(t.stateNode.containerInfo.firstChild),ve=t,$=!0,Te=null,n=iu(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(qt(),r===l){t=Xe(e,t,n);break e}oe(e,t,r,n)}t=t.child}return t;case 5:return au(t),e===null&&Si(t),r=t.type,l=t.pendingProps,i=e!==null?e.memoizedProps:null,o=l.children,vi(r,l)?o=null:i!==null&&vi(r,i)&&(t.flags|=32),Ru(e,t),oe(e,t,o,n),t.child;case 6:return e===null&&Si(t),null;case 13:return Ou(e,t,n);case 4:return ho(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=en(t,null,r,n):oe(e,t,r,n),t.child;case 11:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Pe(r,l),Ps(e,t,r,l,n);case 7:return oe(e,t,t.pendingProps,n),t.child;case 8:return oe(e,t,t.pendingProps.children,n),t.child;case 12:return oe(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,l=t.pendingProps,i=t.memoizedProps,o=l.value,D(Wr,r._currentValue),r._currentValue=o,i!==null)if(Ie(i.value,o)){if(i.children===l.children&&!fe.current){t=Xe(e,t,n);break e}}else for(i=t.child,i!==null&&(i.return=t);i!==null;){var s=i.dependencies;if(s!==null){o=i.child;for(var a=s.firstContext;a!==null;){if(a.context===r){if(i.tag===1){a=We(-1,n&-n),a.tag=2;var c=i.updateQueue;if(c!==null){c=c.shared;var g=c.pending;g===null?a.next=a:(a.next=g.next,g.next=a),c.pending=a}}i.lanes|=n,a=i.alternate,a!==null&&(a.lanes|=n),Ei(i.return,n,t),s.lanes|=n;break}a=a.next}}else if(i.tag===10)o=i.type===t.type?null:i.child;else if(i.tag===18){if(o=i.return,o===null)throw Error(x(341));o.lanes|=n,s=o.alternate,s!==null&&(s.lanes|=n),Ei(o,n,t),o=i.sibling}else o=i.child;if(o!==null)o.return=i;else for(o=i;o!==null;){if(o===t){o=null;break}if(i=o.sibling,i!==null){i.return=o.return,o=i;break}o=o.return}i=o}oe(e,t,l.children,n),t=t.child}return t;case 9:return l=t.type,r=t.pendingProps.children,Gt(t,n),l=Ce(l),r=r(l),t.flags|=1,oe(e,t,r,n),t.child;case 14:return r=t.type,l=Pe(r,t.pendingProps),l=Pe(r.type,l),Ls(e,t,r,l,n);case 15:return Tu(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Pe(r,l),jr(e,t),t.tag=1,pe(r)?(e=!0,Vr(t)):e=!1,Gt(t,n),zu(t,r,l),Ci(t,r,l,n),zi(null,t,r,!0,e,n);case 19:return Du(e,t,n);case 22:return Mu(e,t,n)}throw Error(x(156,t.tag))};function bu(e,t){return Ca(e,t)}function Cf(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ee(e,t,n,r){return new Cf(e,t,n,r)}function Lo(e){return e=e.prototype,!(!e||!e.isReactComponent)}function _f(e){if(typeof e=="function")return Lo(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Xi)return 11;if(e===Gi)return 14}return 2}function ct(e,t){var n=e.alternate;return n===null?(n=Ee(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Lr(e,t,n,r,l,i){var o=2;if(r=e,typeof e=="function")Lo(e)&&(o=1);else if(typeof e=="string")o=5;else e:switch(e){case It:return Nt(n.children,l,i,t);case Yi:o=8,l|=8;break;case Gl:return e=Ee(12,n,t,l|2),e.elementType=Gl,e.lanes=i,e;case Zl:return e=Ee(13,n,t,l),e.elementType=Zl,e.lanes=i,e;case Jl:return e=Ee(19,n,t,l),e.elementType=Jl,e.lanes=i,e;case aa:return fl(n,l,i,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case oa:o=10;break e;case sa:o=9;break e;case Xi:o=11;break e;case Gi:o=14;break e;case Je:o=16,r=null;break e}throw Error(x(130,e==null?e:typeof e,""))}return t=Ee(o,n,t,l),t.elementType=e,t.type=r,t.lanes=i,t}function Nt(e,t,n,r){return e=Ee(7,e,r,t),e.lanes=n,e}function fl(e,t,n,r){return e=Ee(22,e,r,t),e.elementType=aa,e.lanes=n,e.stateNode={isHidden:!1},e}function Wl(e,t,n){return e=Ee(6,e,null,t),e.lanes=n,e}function Ql(e,t,n){return t=Ee(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function jf(e,t,n,r,l){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Cl(0),this.expirationTimes=Cl(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Cl(0),this.identifierPrefix=r,this.onRecoverableError=l,this.mutableSourceEagerHydrationData=null}function To(e,t,n,r,l,i,o,s,a){return e=new jf(e,t,n,s,a),t===1?(t=1,i===!0&&(t|=8)):t=0,i=Ee(3,null,null,t),e.current=i,i.stateNode=e,i.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},mo(i),e}function zf(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Rt,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function qu(e){if(!e)return ft;e=e._reactInternals;e:{if(Tt(e)!==e||e.tag!==1)throw Error(x(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(pe(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(x(171))}if(e.tag===1){var n=e.type;if(pe(n))return qa(e,n,t)}return t}function ec(e,t,n,r,l,i,o,s,a){return e=To(n,r,!0,e,l,i,o,s,a),e.context=qu(null),n=e.current,r=se(),l=ut(n),i=We(r,l),i.callback=t??null,st(n,i,l),e.current.lanes=l,Zn(e,l,r),me(e,r),e}function pl(e,t,n,r){var l=t.current,i=se(),o=ut(l);return n=qu(n),t.context===null?t.context=n:t.pendingContext=n,t=We(i,o),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=st(l,t,o),e!==null&&(Re(e,l,o,i),Nr(e,l,o)),o}function el(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Hs(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Mo(e,t){Hs(e,t),(e=e.alternate)&&Hs(e,t)}function Pf(){return null}var tc=typeof reportError=="function"?reportError:function(e){console.error(e)};function Ro(e){this._internalRoot=e}ml.prototype.render=Ro.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(x(409));pl(e,t,null,null)};ml.prototype.unmount=Ro.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Pt(function(){pl(null,e,null,null)}),t[Ke]=null}};function ml(e){this._internalRoot=e}ml.prototype.unstable_scheduleHydration=function(e){if(e){var t=Ma();e={blockedOn:null,target:e,priority:t};for(var n=0;n<qe.length&&t!==0&&t<qe[n].priority;n++);qe.splice(n,0,e),n===0&&Ia(e)}};function Io(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function hl(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Bs(){}function Lf(e,t,n,r,l){if(l){if(typeof r=="function"){var i=r;r=function(){var c=el(o);i.call(c)}}var o=ec(t,r,e,0,null,!1,!1,"",Bs);return e._reactRootContainer=o,e[Ke]=o.current,An(e.nodeType===8?e.parentNode:e),Pt(),o}for(;l=e.lastChild;)e.removeChild(l);if(typeof r=="function"){var s=r;r=function(){var c=el(a);s.call(c)}}var a=To(e,0,!1,null,null,!1,!1,"",Bs);return e._reactRootContainer=a,e[Ke]=a.current,An(e.nodeType===8?e.parentNode:e),Pt(function(){pl(t,a,n,r)}),a}function gl(e,t,n,r,l){var i=n._reactRootContainer;if(i){var o=i;if(typeof l=="function"){var s=l;l=function(){var a=el(o);s.call(a)}}pl(t,o,e,l)}else o=Lf(n,t,e,l,r);return el(o)}La=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=kn(t.pendingLanes);n!==0&&(bi(t,n|1),me(t,K()),!(R&6)&&(rn=K()+500,ht()))}break;case 13:Pt(function(){var r=Ye(e,1);if(r!==null){var l=se();Re(r,e,1,l)}}),Mo(e,1)}};qi=function(e){if(e.tag===13){var t=Ye(e,134217728);if(t!==null){var n=se();Re(t,e,134217728,n)}Mo(e,134217728)}};Ta=function(e){if(e.tag===13){var t=ut(e),n=Ye(e,t);if(n!==null){var r=se();Re(n,e,t,r)}Mo(e,t)}};Ma=function(){return I};Ra=function(e,t){var n=I;try{return I=e,t()}finally{I=n}};si=function(e,t,n){switch(t){case"input":if(ei(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var l=ol(r);if(!l)throw Error(x(90));ca(r),ei(r,l)}}}break;case"textarea":fa(e,n);break;case"select":t=n.value,t!=null&&Qt(e,!!n.multiple,t,!1)}};xa=jo;wa=Pt;var Tf={usingClientEntryPoint:!1,Events:[bn,Ut,ol,va,ya,jo]},yn={findFiberByHostInstance:wt,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Mf={bundleType:yn.bundleType,version:yn.version,rendererPackageName:yn.rendererPackageName,rendererConfig:yn.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Ge.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Ea(e),e===null?null:e.stateNode},findFiberByHostInstance:yn.findFiberByHostInstance||Pf,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var yr=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!yr.isDisabled&&yr.supportsFiber)try{nl=yr.inject(Mf),Ue=yr}catch{}}xe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Tf;xe.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Io(t))throw Error(x(200));return zf(e,t,null,n)};xe.createRoot=function(e,t){if(!Io(e))throw Error(x(299));var n=!1,r="",l=tc;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(l=t.onRecoverableError)),t=To(e,1,!1,null,null,n,!1,r,l),e[Ke]=t.current,An(e.nodeType===8?e.parentNode:e),new Ro(t)};xe.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(x(188)):(e=Object.keys(e).join(","),Error(x(268,e)));return e=Ea(t),e=e===null?null:e.stateNode,e};xe.flushSync=function(e){return Pt(e)};xe.hydrate=function(e,t,n){if(!hl(t))throw Error(x(200));return gl(null,e,t,!0,n)};xe.hydrateRoot=function(e,t,n){if(!Io(e))throw Error(x(405));var r=n!=null&&n.hydratedSources||null,l=!1,i="",o=tc;if(n!=null&&(n.unstable_strictMode===!0&&(l=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),t=ec(t,null,e,1,n??null,l,!1,i,o),e[Ke]=t.current,An(e),r)for(e=0;e<r.length;e++)n=r[e],l=n._getVersion,l=l(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,l]:t.mutableSourceEagerHydrationData.push(n,l);return new ml(t)};xe.render=function(e,t,n){if(!hl(t))throw Error(x(200));return gl(null,e,t,!1,n)};xe.unmountComponentAtNode=function(e){if(!hl(e))throw Error(x(40));return e._reactRootContainer?(Pt(function(){gl(null,null,e,!1,function(){e._reactRootContainer=null,e[Ke]=null})}),!0):!1};xe.unstable_batchedUpdates=jo;xe.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!hl(n))throw Error(x(200));if(e==null||e._reactInternals===void 0)throw Error(x(38));return gl(e,t,n,!1,r)};xe.version="18.3.1-next-f1338f8080-20240426";function nc(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(nc)}catch(e){console.error(e)}}nc(),na.exports=xe;var Rf=na.exports,Ws=Rf;Yl.createRoot=Ws.createRoot,Yl.hydrateRoot=Ws.hydrateRoot;const If="http://127.0.0.1:8000";async function an(e,t={}){const n=`${If}${e}`,r={headers:{"Content-Type":"application/json",...t.headers},...t},l=await fetch(n,r);if(!l.ok){const o=await l.text();let s=`HTTP ${l.status}: ${l.statusText}`;try{const a=JSON.parse(o);s=a.detail||a.message||s}catch{s=o||s}throw new Error(s)}const i=l.headers.get("content-type");return i&&i.includes("application/json")?l.json():l.text()}async function Of(){return an("/session/start",{method:"POST",body:JSON.stringify({})})}async function Df(e,t){return an("/query",{method:"POST",body:JSON.stringify({session_id:e,query:t})})}async function Ff(){return an("/memories")}async function Uf(){return an("/stats")}async function rc(){return an("/settings")}async function $f(){return an("/health")}function Af(){const[e,t]=z.useState(null),[n,r]=z.useState(!1),[l,i]=z.useState(null),o=z.useCallback(async()=>{r(!1),i(null),t(null);try{const s=await Of();t(s.session_id),r(!0)}catch(s){i(s.message||"Failed to start session"),r(!1)}},[]);return z.useEffect(()=>{o()},[o]),{sessionId:e,isReady:n,error:l,restartSession:o}}function Vf({onSettingsOpen:e}){const[t,n]=z.useState(null),[r,l]=z.useState(null),[i,o]=z.useState(!1);z.useEffect(()=>{const a=async()=>{try{const h=await $f();n(h),o(!1)}catch{o(!0)}},c=async()=>{try{const h=await rc();l(h.model_name||"Unknown model")}catch{l("Unknown model")}};a(),c();const g=setInterval(a,15e3);return()=>clearInterval(g)},[]);const s=t&&t.status==="healthy"&&!i;return d.jsxs("header",{className:"header",children:[d.jsx("div",{className:"header-left",children:d.jsxs("div",{className:"header-brand",children:[d.jsx("span",{className:"header-brain-icon",children:"🧠"}),d.jsxs("div",{className:"header-titles",children:[d.jsx("h1",{className:"header-title",children:"AM-LLM"}),d.jsx("p",{className:"header-subtitle",children:"Adaptive Memory-Augmented Language Model"})]})]})}),d.jsxs("div",{className:"header-right",children:[r&&d.jsxs("div",{className:"header-model-badge",children:[d.jsx("span",{className:"model-icon",children:"⚡"}),d.jsx("span",{className:"model-name",children:r})]}),d.jsxs("div",{className:"health-indicator",title:s?`Backend healthy — ${(t==null?void 0:t.faiss_vectors)??0} vectors, ${(t==null?void 0:t.db_memories)??0} memories`:"Backend unavailable",children:[d.jsx("span",{className:`health-dot ${s?"healthy":"unhealthy"}`}),d.jsx("span",{className:"health-label",children:s?"Online":"Offline"})]}),d.jsx("button",{className:"settings-btn",onClick:e,title:"Open Settings","aria-label":"Open Settings",children:d.jsx("span",{className:"settings-icon",children:"⚙️"})})]}),d.jsx("style",{children:`
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          height: 64px;
          background: rgba(17, 17, 24, 0.9);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border);
          position: sticky;
          top: 0;
          z-index: 100;
          flex-shrink: 0;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .header-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .header-brain-icon {
          font-size: 28px;
          filter: drop-shadow(0 0 8px rgba(108, 99, 255, 0.6));
          animation: glow 3s ease-in-out infinite;
        }

        .header-titles {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }

        .header-title {
          font-size: 1.25rem;
          font-weight: 800;
          background: var(--accent-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.5px;
          line-height: 1.2;
        }

        .header-subtitle {
          font-size: 0.68rem;
          color: var(--text-muted);
          font-weight: 400;
          letter-spacing: 0.3px;
          line-height: 1;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .header-model-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          background: rgba(108, 99, 255, 0.12);
          border: 1px solid var(--border-accent);
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--accent-secondary);
        }

        .model-icon {
          font-size: 0.8rem;
        }

        .model-name {
          font-family: 'Inter', monospace;
          letter-spacing: 0.2px;
        }

        .health-indicator {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 20px;
          cursor: default;
          transition: background 0.2s ease-in-out;
        }

        .health-indicator:hover {
          background: var(--bg-card-hover);
        }

        .health-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .health-dot.healthy {
          background: var(--success);
          box-shadow: 0 0 6px var(--success);
          animation: pulse 2s ease-in-out infinite;
        }

        .health-dot.unhealthy {
          background: var(--danger);
          box-shadow: 0 0 6px var(--danger);
        }

        .health-label {
          font-size: 0.72rem;
          font-weight: 500;
          color: var(--text-secondary);
        }

        .settings-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--bg-card);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          transition: all 0.2s ease-in-out;
        }

        .settings-btn:hover {
          background: var(--bg-card-hover);
          border-color: var(--border-accent);
          transform: rotate(30deg);
        }

        .settings-btn:active {
          transform: rotate(60deg) scale(0.95);
        }

        .settings-icon {
          line-height: 1;
        }
      `})]})}function Hf(e){return e.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}function Bf({memory:e}){var t,n;return d.jsxs("div",{className:"memory-snippet",children:[d.jsx("span",{className:"memory-snippet-score",title:"Current score",children:(e.current_score??e.importance_score??0).toFixed(2)}),d.jsxs("span",{className:"memory-snippet-text",children:[(t=e.text)==null?void 0:t.slice(0,120),((n=e.text)==null?void 0:n.length)>120?"…":""]})]})}function Wf({role:e,content:t,memoriesUsed:n=[],timestamp:r}){const[l,i]=z.useState(!1),o=e==="user",s=n&&n.length>0;return d.jsxs("div",{className:`message-wrapper ${o?"user":"assistant"}`,children:[!o&&d.jsx("div",{className:"message-avatar",children:"🧠"}),d.jsxs("div",{className:"message-content-group",children:[d.jsx("div",{className:`message-bubble ${o?"user-bubble":"assistant-bubble"}`,children:d.jsx("div",{className:"message-text",children:t})}),d.jsxs("div",{className:`message-meta ${o?"meta-right":"meta-left"}`,children:[d.jsx("span",{className:"message-timestamp",children:Hf(r)}),s&&!o&&d.jsxs("button",{className:"memory-chip",onClick:()=>i(!l),title:"Click to see memories used",children:["🧠 ",n.length," ",n.length===1?"memory":"memories"," used",d.jsx("span",{className:"memory-chip-arrow",children:l?"▲":"▼"})]})]}),s&&!o&&l&&d.jsxs("div",{className:"memories-collapse",children:[d.jsx("div",{className:"memories-collapse-header",children:d.jsx("span",{children:"Referenced Memories"})}),d.jsx("div",{className:"memories-collapse-list",children:n.map((a,c)=>d.jsx(Bf,{memory:a},a.id||c))})]})]}),o&&d.jsx("div",{className:"message-avatar user-avatar",children:"👤"}),d.jsx("style",{children:`
        .message-wrapper {
          display: flex;
          align-items: flex-end;
          gap: 10px;
          animation: fadeIn 0.35s ease-in-out;
          max-width: 100%;
        }

        .message-wrapper.user {
          flex-direction: row-reverse;
        }

        .message-wrapper.assistant {
          flex-direction: row;
        }

        .message-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(108, 99, 255, 0.15);
          border: 1px solid var(--border-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          flex-shrink: 0;
          margin-bottom: 22px;
        }

        .user-avatar {
          background: rgba(167, 139, 250, 0.15);
          border-color: rgba(167, 139, 250, 0.3);
        }

        .message-content-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          max-width: calc(100% - 80px);
        }

        .message-bubble {
          padding: 12px 16px;
          border-radius: var(--radius-lg);
          line-height: 1.65;
          font-size: 0.9rem;
          word-break: break-word;
          white-space: pre-wrap;
        }

        .user-bubble {
          background: var(--accent-gradient);
          color: #fff;
          border-bottom-right-radius: 4px;
          box-shadow: 0 4px 16px rgba(108, 99, 255, 0.3);
          animation: slideInRight 0.3s ease-in-out;
        }

        .assistant-bubble {
          background: var(--glass);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--glass-border);
          color: var(--text-primary);
          border-bottom-left-radius: 4px;
          box-shadow: var(--shadow);
          animation: slideInLeft 0.3s ease-in-out;
        }

        .message-text {
          line-height: 1.7;
        }

        .message-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .meta-right {
          justify-content: flex-end;
        }

        .meta-left {
          justify-content: flex-start;
        }

        .message-timestamp {
          font-size: 0.68rem;
          color: var(--text-muted);
        }

        .memory-chip {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 2px 10px;
          background: rgba(108, 99, 255, 0.1);
          border: 1px solid var(--border-accent);
          border-radius: 12px;
          font-size: 0.7rem;
          color: var(--accent-secondary);
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
        }

        .memory-chip:hover {
          background: rgba(108, 99, 255, 0.2);
          border-color: var(--accent-primary);
        }

        .memory-chip-arrow {
          font-size: 0.55rem;
          opacity: 0.7;
        }

        .memories-collapse {
          background: rgba(108, 99, 255, 0.06);
          border: 1px solid var(--border-accent);
          border-radius: var(--radius-sm);
          overflow: hidden;
          animation: fadeIn 0.2s ease-in-out;
        }

        .memories-collapse-header {
          padding: 7px 12px;
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--accent-secondary);
          border-bottom: 1px solid var(--border-accent);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .memories-collapse-list {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .memory-snippet {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          padding: 8px 12px;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          transition: background 0.15s ease-in-out;
        }

        .memory-snippet:last-child {
          border-bottom: none;
        }

        .memory-snippet:hover {
          background: rgba(108, 99, 255, 0.08);
        }

        .memory-snippet-score {
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--accent-primary);
          background: rgba(108, 99, 255, 0.15);
          padding: 2px 6px;
          border-radius: 6px;
          flex-shrink: 0;
          margin-top: 1px;
          font-variant-numeric: tabular-nums;
        }

        .memory-snippet-text {
          font-size: 0.75rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }
      `})]})}function Qf(){return d.jsxs("div",{className:"typing-indicator-wrapper",children:[d.jsx("div",{className:"typing-avatar",children:"🧠"}),d.jsxs("div",{className:"typing-bubble",children:[d.jsx("span",{className:"dot",style:{animationDelay:"0ms"}}),d.jsx("span",{className:"dot",style:{animationDelay:"160ms"}}),d.jsx("span",{className:"dot",style:{animationDelay:"320ms"}})]}),d.jsx("style",{children:`
        .typing-indicator-wrapper {
          display: flex;
          align-items: flex-end;
          gap: 10px;
          animation: fadeIn 0.3s ease-in-out;
          padding: 4px 0;
        }

        .typing-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(108, 99, 255, 0.15);
          border: 1px solid var(--border-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          flex-shrink: 0;
        }

        .typing-bubble {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 12px 16px;
          background: var(--glass);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          border-bottom-left-radius: 4px;
        }

        .dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent-secondary);
          opacity: 0.7;
          display: inline-block;
          animation: bounce 1.2s ease-in-out infinite;
        }
      `})]})}const Kf=["What is adaptive memory in AI systems?","Explain how FAISS vector search works","What makes a memory important in this system?","How does long-term memory differ from short-term memory here?"];function Yf({sessionId:e,isReady:t,onMemoryHighlight:n}){const[r,l]=z.useState([]),[i,o]=z.useState(""),[s,a]=z.useState(!1),[c,g]=z.useState(null),h=z.useRef(null),m=z.useRef(null),v=z.useCallback(()=>{var u;(u=h.current)==null||u.scrollIntoView({behavior:"smooth"})},[]);z.useEffect(()=>{v()},[r,s,v]);const w=z.useCallback(async u=>{const f=(u||i).trim();if(!f||!e||s)return;o(""),g(null);const y={id:Date.now(),role:"user",content:f,memoriesUsed:[],timestamp:new Date};l(k=>[...k,y]),a(!0);try{const k=await Df(e,f),C={id:Date.now()+1,role:"assistant",content:k.response,memoriesUsed:k.memories_used||[],timestamp:new Date,queryCount:k.query_count,maintenanceReport:k.maintenance_report};l(_=>[..._,C])}catch(k){g(k.message||"Failed to get response");const C={id:Date.now()+1,role:"assistant",content:`⚠️ Error: ${k.message||"Failed to get response. Please check if the backend is running."}`,memoriesUsed:[],timestamp:new Date};l(_=>[..._,C])}finally{a(!1),setTimeout(()=>{var k;return(k=m.current)==null?void 0:k.focus()},100)}},[i,e,s]),S=z.useCallback(u=>{u.key==="Enter"&&!u.shiftKey&&(u.preventDefault(),w())},[w]),O=u=>{var f;o(u),(f=m.current)==null||f.focus()},p=r.length===0;return d.jsxs("div",{className:"chat-interface",children:[d.jsxs("div",{className:"chat-messages",children:[p&&!s&&d.jsxs("div",{className:"chat-empty-state",children:[d.jsx("div",{className:"empty-brain",children:"🧠"}),d.jsx("h2",{className:"empty-title",children:"AM-LLM is ready"}),d.jsx("p",{className:"empty-subtitle",children:t?"Your session is active. Ask me anything — I remember across conversations.":"Connecting to backend…"}),t&&d.jsxs("div",{className:"example-queries",children:[d.jsx("p",{className:"example-label",children:"Try asking:"}),d.jsx("div",{className:"example-list",children:Kf.map(u=>d.jsx("button",{className:"example-chip",onClick:()=>O(u),children:u},u))})]})]}),d.jsxs("div",{className:"messages-list",children:[r.map(u=>{var f;return d.jsxs("div",{className:"message-row",children:[d.jsx(Wf,{role:u.role,content:u.content,memoriesUsed:u.memoriesUsed,timestamp:u.timestamp}),((f=u.memoriesUsed)==null?void 0:f.length)>0&&d.jsx("button",{className:"highlight-memory-btn",onClick:n,title:"View in Memory Panel",style:{alignSelf:u.role==="user"?"flex-end":"flex-start",marginLeft:u.role==="user"?0:"42px"},children:"View in Memory Panel →"})]},u.id)}),s&&d.jsx("div",{className:"message-row",children:d.jsx(Qf,{})})]}),d.jsx("div",{ref:h})]}),d.jsxs("div",{className:"chat-input-area",children:[c&&d.jsxs("div",{className:"chat-error",children:[d.jsxs("span",{children:["⚠️ ",c]}),d.jsx("button",{onClick:()=>g(null),children:"✕"})]}),d.jsxs("div",{className:`chat-input-row ${t?"":"disabled"}`,children:[d.jsx("textarea",{ref:m,className:"chat-textarea",value:i,onChange:u=>o(u.target.value),onKeyDown:S,placeholder:t?"Ask anything… (Enter to send, Shift+Enter for newline)":"Starting session…",disabled:!t||s,rows:1}),d.jsx("button",{className:"send-btn",onClick:()=>w(),disabled:!t||s||!i.trim(),title:"Send message","aria-label":"Send message",children:s?d.jsx("span",{className:"send-spinner",children:"⟳"}):d.jsx("span",{className:"send-icon",children:"➤"})})]}),d.jsx("div",{className:"chat-footer-hint",children:t?"Session active • Press Enter to send":"Initializing session…"})]}),d.jsx("style",{children:`
        .chat-interface {
          display: flex;
          flex-direction: column;
          height: 100%;
          overflow: hidden;
          background: var(--bg-primary);
        }

        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 24px 20px;
          display: flex;
          flex-direction: column;
        }

        .chat-empty-state {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 40px 20px;
          animation: fadeIn 0.5s ease-in-out;
        }

        .empty-brain {
          font-size: 4rem;
          margin-bottom: 20px;
          filter: drop-shadow(0 0 20px rgba(108, 99, 255, 0.5));
          animation: glow 3s ease-in-out infinite;
        }

        .empty-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 10px;
        }

        .empty-subtitle {
          font-size: 0.9rem;
          color: var(--text-secondary);
          max-width: 400px;
          line-height: 1.6;
          margin-bottom: 32px;
        }

        .example-queries {
          width: 100%;
          max-width: 520px;
        }

        .example-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          font-weight: 500;
        }

        .example-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .example-chip {
          padding: 10px 16px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          font-size: 0.83rem;
          text-align: left;
          transition: all 0.2s ease-in-out;
          cursor: pointer;
        }

        .example-chip:hover {
          background: var(--bg-card-hover);
          border-color: var(--border-accent);
          color: var(--text-primary);
          transform: translateX(4px);
        }

        .messages-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          width: 100%;
        }

        .message-row {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .highlight-memory-btn {
          font-size: 0.68rem;
          color: var(--accent-secondary);
          background: none;
          border: none;
          cursor: pointer;
          opacity: 0.6;
          transition: opacity 0.2s ease-in-out;
          padding: 0 4px;
        }

        .highlight-memory-btn:hover {
          opacity: 1;
          text-decoration: underline;
        }

        .chat-input-area {
          padding: 16px 20px;
          background: rgba(17, 17, 24, 0.95);
          border-top: 1px solid var(--border);
          flex-shrink: 0;
        }

        .chat-error {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 14px;
          background: rgba(248, 113, 113, 0.1);
          border: 1px solid rgba(248, 113, 113, 0.3);
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          color: var(--danger);
          margin-bottom: 10px;
          animation: fadeIn 0.2s ease-in-out;
        }

        .chat-error button {
          color: var(--danger);
          font-size: 0.85rem;
          opacity: 0.7;
          transition: opacity 0.2s;
        }

        .chat-error button:hover {
          opacity: 1;
        }

        .chat-input-row {
          display: flex;
          align-items: flex-end;
          gap: 12px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 8px 8px 8px 16px;
          transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        }

        .chat-input-row:focus-within {
          border-color: var(--border-accent);
          box-shadow: 0 0 0 3px rgba(108, 99, 255, 0.1);
        }

        .chat-input-row.disabled {
          opacity: 0.5;
        }

        .chat-textarea {
          flex: 1;
          background: transparent;
          color: var(--text-primary);
          font-size: 0.9rem;
          line-height: 1.6;
          resize: none;
          max-height: 160px;
          overflow-y: auto;
          padding: 4px 0;
          border: none;
          outline: none;
        }

        .chat-textarea::placeholder {
          color: var(--text-muted);
        }

        .send-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--accent-gradient);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          flex-shrink: 0;
          transition: all 0.2s ease-in-out;
          box-shadow: 0 2px 12px rgba(108, 99, 255, 0.4);
        }

        .send-btn:hover:not(:disabled) {
          transform: scale(1.08);
          box-shadow: 0 4px 20px rgba(108, 99, 255, 0.6);
        }

        .send-btn:active:not(:disabled) {
          transform: scale(0.95);
        }

        .send-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          box-shadow: none;
        }

        .send-icon {
          color: white;
          font-size: 0.9rem;
          transform: translateX(1px);
        }

        .send-spinner {
          color: white;
          font-size: 1.1rem;
          animation: spin 1s linear infinite;
          display: inline-block;
        }

        .chat-footer-hint {
          margin-top: 8px;
          font-size: 0.67rem;
          color: var(--text-muted);
          text-align: center;
          letter-spacing: 0.3px;
        }
      `})]})}function Xf(e){return e>=.7?"var(--success)":e>=.4?"var(--warning)":"var(--danger)"}function Gf(e){return e>=.7?"High":e>=.4?"Medium":"Low"}function Zf(e){if(!e)return"Unknown";const t=new Date(e);return isNaN(t.getTime())?e:t.toLocaleDateString([],{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}function Jf({memory:e}){const t=e.current_score??e.importance_score??0,n=Xf(t),r=Gf(t),l=e.text||"",i=l.length>100?l.slice(0,100)+"…":l;return d.jsxs("div",{className:"memory-card",style:{"--score-color":n},children:[d.jsxs("div",{className:"memory-card-header",children:[d.jsx("div",{className:"memory-card-id",children:d.jsxs("span",{className:"memory-id-badge",children:["#",String(e.id??e.faiss_id??"?").slice(-4)]})}),d.jsxs("div",{className:"memory-card-score-info",children:[d.jsx("span",{className:"score-label-badge",style:{color:n,borderColor:n,background:`${n}18`},children:r}),d.jsx("span",{className:"score-number",children:t.toFixed(3)})]})]}),d.jsx("div",{className:"memory-card-text",title:l,children:i}),d.jsx("div",{className:"memory-score-bar-container",children:d.jsx("div",{className:"memory-score-bar",style:{width:`${Math.min(100,Math.max(0,t*100))}%`,background:n}})}),d.jsxs("div",{className:"memory-card-footer",children:[d.jsxs("div",{className:"memory-stat",children:[d.jsx("span",{className:"memory-stat-icon",children:"👁️"}),d.jsx("span",{className:"memory-stat-value",children:e.access_count??0})]}),d.jsxs("div",{className:"memory-stat",title:"Created at",children:[d.jsx("span",{className:"memory-stat-icon",children:"🕐"}),d.jsx("span",{className:"memory-stat-value",children:Zf(e.created_at)})]})]}),d.jsx("style",{children:`
        .memory-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 12px 14px;
          transition: all 0.2s ease-in-out;
          cursor: default;
          position: relative;
          overflow: hidden;
        }

        .memory-card::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: var(--score-color);
          border-radius: 3px 0 0 3px;
        }

        .memory-card:hover {
          background: var(--bg-card-hover);
          border-color: rgba(255, 255, 255, 0.12);
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
        }

        .memory-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .memory-id-badge {
          font-size: 0.65rem;
          color: var(--text-muted);
          font-variant-numeric: tabular-nums;
          letter-spacing: 0.5px;
          font-weight: 600;
        }

        .memory-card-score-info {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .score-label-badge {
          font-size: 0.63rem;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 10px;
          border: 1px solid;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .score-number {
          font-size: 0.7rem;
          color: var(--text-muted);
          font-variant-numeric: tabular-nums;
          font-weight: 600;
        }

        .memory-card-text {
          font-size: 0.8rem;
          color: var(--text-secondary);
          line-height: 1.55;
          margin-bottom: 10px;
        }

        .memory-score-bar-container {
          height: 3px;
          background: rgba(255, 255, 255, 0.06);
          border-radius: 2px;
          margin-bottom: 10px;
          overflow: hidden;
        }

        .memory-score-bar {
          height: 100%;
          border-radius: 2px;
          transition: width 0.6s ease-in-out;
          opacity: 0.8;
        }

        .memory-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }

        .memory-stat {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .memory-stat-icon {
          font-size: 0.7rem;
        }

        .memory-stat-value {
          font-size: 0.67rem;
          color: var(--text-muted);
          font-variant-numeric: tabular-nums;
        }
      `})]})}function bf({highlighted:e}){const[t,n]=z.useState([]),[r,l]=z.useState(0),[i,o]=z.useState(!0),[s,a]=z.useState(null),[c,g]=z.useState(!1),h=z.useRef(null),m=z.useCallback(async(v=!1)=>{v&&g(!0),a(null);try{const w=await Ff();n(w.memories||[]),l(w.count??(w.memories||[]).length)}catch(w){a(w.message||"Failed to load memories")}finally{o(!1),v&&g(!1)}},[]);return z.useEffect(()=>{m();const v=setInterval(()=>m(),1e4);return()=>clearInterval(v)},[m]),z.useEffect(()=>{e&&h.current&&(h.current.classList.add("panel-highlight"),setTimeout(()=>{var v;return(v=h.current)==null?void 0:v.classList.remove("panel-highlight")},1200))},[e]),d.jsxs("div",{className:"memory-panel",ref:h,children:[d.jsxs("div",{className:"memory-panel-header",children:[d.jsxs("div",{className:"memory-panel-title",children:[d.jsx("span",{className:"memory-panel-icon",children:"💾"}),d.jsx("span",{children:"Long-Term Memory"}),d.jsx("span",{className:"memory-count-badge",children:r})]}),d.jsx("button",{className:`memory-refresh-btn ${c?"spinning":""}`,onClick:()=>m(!0),title:"Refresh memories",disabled:c,"aria-label":"Refresh memories",children:"↻"})]}),d.jsxs("div",{className:"memory-panel-body",children:[i&&d.jsxs("div",{className:"memory-loading",children:[d.jsxs("div",{className:"loading-dots",children:[d.jsx("span",{}),d.jsx("span",{}),d.jsx("span",{})]}),d.jsx("p",{children:"Loading memories…"})]}),!i&&s&&d.jsxs("div",{className:"memory-error",children:[d.jsx("span",{className:"memory-error-icon",children:"⚠️"}),d.jsx("p",{children:s}),d.jsx("button",{onClick:()=>m(!0),children:"Retry"})]}),!i&&!s&&t.length===0&&d.jsxs("div",{className:"memory-empty",children:[d.jsx("div",{className:"memory-empty-icon",children:"🌱"}),d.jsx("p",{className:"memory-empty-title",children:"No memories yet"}),d.jsx("p",{className:"memory-empty-sub",children:"Memories will form as you have more conversations. Keep chatting!"})]}),!i&&!s&&t.length>0&&d.jsx("div",{className:"memory-list",children:t.map(v=>d.jsx(Jf,{memory:v},v.id??v.faiss_id))})]}),d.jsx("style",{children:`
        .memory-panel {
          display: flex;
          flex-direction: column;
          height: 100%;
          background: var(--bg-secondary);
          border-left: 1px solid var(--border);
          overflow: hidden;
          transition: box-shadow 0.3s ease-in-out;
        }

        .memory-panel.panel-highlight {
          box-shadow: inset 0 0 0 2px var(--accent-primary);
          animation: glow 0.6s ease-in-out 2;
        }

        .memory-panel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 16px 12px;
          border-bottom: 1px solid var(--border);
          flex-shrink: 0;
          background: rgba(17, 17, 24, 0.8);
        }

        .memory-panel-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--text-primary);
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }

        .memory-panel-icon {
          font-size: 0.9rem;
        }

        .memory-count-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 22px;
          height: 18px;
          padding: 0 6px;
          background: rgba(108, 99, 255, 0.2);
          border: 1px solid var(--border-accent);
          border-radius: 9px;
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--accent-secondary);
          font-variant-numeric: tabular-nums;
        }

        .memory-refresh-btn {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--bg-card);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          color: var(--text-secondary);
          transition: all 0.2s ease-in-out;
          line-height: 1;
        }

        .memory-refresh-btn:hover:not(:disabled) {
          background: var(--bg-card-hover);
          color: var(--accent-secondary);
          border-color: var(--border-accent);
        }

        .memory-refresh-btn.spinning {
          animation: spin 0.8s linear infinite;
        }

        .memory-panel-body {
          flex: 1;
          overflow-y: auto;
          padding: 12px;
        }

        .memory-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 40px 20px;
          color: var(--text-muted);
          font-size: 0.8rem;
        }

        .loading-dots {
          display: flex;
          gap: 6px;
        }

        .loading-dots span {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent-primary);
          animation: bounce 1.2s ease-in-out infinite;
        }

        .loading-dots span:nth-child(2) {
          animation-delay: 160ms;
        }

        .loading-dots span:nth-child(3) {
          animation-delay: 320ms;
        }

        .memory-error {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          padding: 32px 16px;
          text-align: center;
        }

        .memory-error-icon {
          font-size: 1.8rem;
        }

        .memory-error p {
          font-size: 0.78rem;
          color: var(--danger);
          line-height: 1.5;
        }

        .memory-error button {
          padding: 6px 16px;
          background: rgba(248, 113, 113, 0.1);
          border: 1px solid rgba(248, 113, 113, 0.3);
          border-radius: 20px;
          font-size: 0.75rem;
          color: var(--danger);
          cursor: pointer;
          transition: all 0.2s ease-in-out;
        }

        .memory-error button:hover {
          background: rgba(248, 113, 113, 0.2);
        }

        .memory-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 48px 20px;
          text-align: center;
          animation: fadeIn 0.3s ease-in-out;
        }

        .memory-empty-icon {
          font-size: 2.5rem;
          margin-bottom: 4px;
        }

        .memory-empty-title {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .memory-empty-sub {
          font-size: 0.75rem;
          color: var(--text-muted);
          line-height: 1.6;
          max-width: 200px;
        }

        .memory-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          animation: fadeIn 0.3s ease-in-out;
        }
      `})]})}const qf=[{key:"total_memories",label:"Memories",icon:"💾"},{key:"faiss_vectors",label:"FAISS Vectors",icon:"🔢"},{key:"stm_turns",label:"STM Turns",icon:"🔄"},{key:"staging_pending",label:"Staging",icon:"⏳"},{key:"active_sessions",label:"Sessions",icon:"🟢"}];function ep(){const[e,t]=z.useState(null),[n,r]=z.useState(!1),l=z.useCallback(async()=>{try{const i=await Uf();t(i),r(!1)}catch{r(!0)}},[]);return z.useEffect(()=>{l();const i=setInterval(l,5e3);return()=>clearInterval(i)},[l]),d.jsxs("div",{className:"stats-bar",children:[n&&d.jsxs("div",{className:"stats-error",children:[d.jsx("span",{children:"⚠️"}),d.jsx("span",{children:"Stats unavailable"})]}),!n&&d.jsx("div",{className:"stats-list",children:qf.map(({key:i,label:o,icon:s})=>d.jsxs("div",{className:"stat-pill",children:[d.jsx("span",{className:"stat-pill-icon",children:s}),d.jsx("span",{className:"stat-pill-value",children:e?e[i]??0:"—"}),d.jsx("span",{className:"stat-pill-label",children:o})]},i))}),d.jsx("div",{className:"stats-bar-brand",children:"AM-LLM • Adaptive Memory AI"}),d.jsx("style",{children:`
        .stats-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
          height: 40px;
          background: rgba(10, 10, 15, 0.98);
          border-top: 1px solid var(--border);
          flex-shrink: 0;
          gap: 12px;
        }

        .stats-list {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: nowrap;
          overflow-x: auto;
        }

        .stat-pill {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 3px 10px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 14px;
          white-space: nowrap;
          transition: all 0.2s ease-in-out;
          cursor: default;
        }

        .stat-pill:hover {
          background: var(--bg-card-hover);
          border-color: var(--border-accent);
        }

        .stat-pill-icon {
          font-size: 0.72rem;
          line-height: 1;
        }

        .stat-pill-value {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--accent-secondary);
          font-variant-numeric: tabular-nums;
          min-width: 16px;
          text-align: center;
        }

        .stat-pill-label {
          font-size: 0.65rem;
          color: var(--text-muted);
          font-weight: 500;
          letter-spacing: 0.3px;
        }

        .stats-error {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.72rem;
          color: var(--warning);
          opacity: 0.7;
        }

        .stats-bar-brand {
          font-size: 0.63rem;
          color: var(--text-muted);
          letter-spacing: 0.8px;
          font-weight: 500;
          white-space: nowrap;
          opacity: 0.6;
        }
      `})]})}const Kl=[{key:"provider",label:"Provider",icon:"🏭",type:"text"},{key:"model_name",label:"Model Name",icon:"🤖",type:"text"},{key:"temperature",label:"Temperature",icon:"🌡️",type:"number"},{key:"max_tokens",label:"Max Tokens",icon:"📝",type:"number"},{key:"mock_mode",label:"Mock Mode",icon:"🎭",type:"boolean"},{key:"free_tier",label:"Free Tier",icon:"🆓",type:"boolean"},{key:"rate_limit",label:"Rate Limit",icon:"⏱️",type:"text"}];function tp({isOpen:e,onClose:t}){const[n,r]=z.useState(null),[l,i]=z.useState(!1),[o,s]=z.useState(null),a=z.useRef(null),c=z.useCallback(async()=>{i(!0),s(null);try{const m=await rc();r(m)}catch(m){s(m.message||"Failed to load settings")}finally{i(!1)}},[]);z.useEffect(()=>{e&&c()},[e,c]),z.useEffect(()=>{const m=v=>{v.key==="Escape"&&e&&t()};return document.addEventListener("keydown",m),()=>document.removeEventListener("keydown",m)},[e,t]);const g=m=>{m.target===a.current&&t()},h=(m,v,w)=>w==="boolean"?d.jsx("span",{className:`settings-badge ${v?"badge-on":"badge-off"}`,children:v?"✓ Enabled":"✗ Disabled"}):v==null?d.jsx("span",{className:"settings-val-null",children:"—"}):d.jsx("span",{className:"settings-val",children:String(v)});return e?d.jsxs("div",{className:"modal-overlay",ref:a,onClick:g,role:"dialog","aria-modal":"true","aria-label":"Settings",children:[d.jsxs("div",{className:"modal-container",children:[d.jsxs("div",{className:"modal-header",children:[d.jsxs("div",{className:"modal-title",children:[d.jsx("span",{className:"modal-title-icon",children:"⚙️"}),d.jsx("span",{children:"System Settings"})]}),d.jsx("button",{className:"modal-close-btn",onClick:t,"aria-label":"Close settings",children:"✕"})]}),d.jsxs("div",{className:"modal-body",children:[l&&d.jsxs("div",{className:"modal-loading",children:[d.jsx("div",{className:"modal-spinner"}),d.jsx("p",{children:"Loading settings…"})]}),!l&&o&&d.jsxs("div",{className:"modal-error",children:[d.jsx("span",{children:"⚠️"}),d.jsx("p",{children:o}),d.jsx("button",{onClick:c,children:"Retry"})]}),!l&&!o&&n&&d.jsxs("div",{className:"settings-list",children:[Kl.map(({key:m,label:v,icon:w,type:S})=>d.jsxs("div",{className:"settings-row",children:[d.jsxs("div",{className:"settings-row-label",children:[d.jsx("span",{className:"settings-row-icon",children:w}),d.jsx("span",{children:v})]}),d.jsx("div",{className:"settings-row-value",children:h(m,n[m],S)})]},m)),Object.keys(n).filter(m=>!Kl.map(v=>v.key).includes(m)).length>0&&d.jsxs("div",{className:"settings-extra",children:[d.jsx("div",{className:"settings-extra-label",children:"Additional Configuration"}),Object.keys(n).filter(m=>!Kl.map(v=>v.key).includes(m)).map(m=>d.jsxs("div",{className:"settings-row",children:[d.jsxs("div",{className:"settings-row-label",children:[d.jsx("span",{className:"settings-row-icon",children:"🔧"}),d.jsx("span",{children:m})]}),d.jsx("div",{className:"settings-row-value",children:d.jsx("span",{className:"settings-val",children:String(n[m])})})]},m))]})]})]}),d.jsxs("div",{className:"modal-footer",children:[d.jsx("p",{className:"modal-footer-note",children:"ℹ️ Settings are read-only. Configure via backend environment variables."}),d.jsx("button",{className:"modal-close-footer-btn",onClick:t,children:"Close"})]})]}),d.jsx("style",{children:`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.2s ease-in-out;
          padding: 20px;
        }

        .modal-container {
          width: 100%;
          max-width: 460px;
          background: #15151e;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          box-shadow: 0 24px 64px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(108, 99, 255, 0.1);
          display: flex;
          flex-direction: column;
          max-height: 80vh;
          animation: fadeIn 0.25s ease-in-out;
          overflow: hidden;
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px 16px;
          border-bottom: 1px solid var(--border);
          flex-shrink: 0;
        }

        .modal-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .modal-title-icon {
          font-size: 1.1rem;
        }

        .modal-close-btn {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: var(--bg-card);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          color: var(--text-secondary);
          transition: all 0.2s ease-in-out;
        }

        .modal-close-btn:hover {
          background: rgba(248, 113, 113, 0.1);
          border-color: rgba(248, 113, 113, 0.3);
          color: var(--danger);
        }

        .modal-body {
          flex: 1;
          overflow-y: auto;
          padding: 16px 24px;
        }

        .modal-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          padding: 40px 20px;
          color: var(--text-muted);
          font-size: 0.85rem;
        }

        .modal-spinner {
          width: 32px;
          height: 32px;
          border: 3px solid var(--border);
          border-top-color: var(--accent-primary);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        .modal-error {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          padding: 32px 16px;
          text-align: center;
        }

        .modal-error p {
          font-size: 0.82rem;
          color: var(--danger);
        }

        .modal-error button {
          padding: 6px 20px;
          background: rgba(248, 113, 113, 0.1);
          border: 1px solid rgba(248, 113, 113, 0.3);
          border-radius: 20px;
          font-size: 0.78rem;
          color: var(--danger);
          cursor: pointer;
          transition: all 0.2s ease-in-out;
        }

        .settings-list {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .settings-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 12px;
          border-radius: var(--radius-sm);
          transition: background 0.15s ease-in-out;
          gap: 12px;
        }

        .settings-row:hover {
          background: var(--bg-card);
        }

        .settings-row-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .settings-row-icon {
          font-size: 0.85rem;
          width: 20px;
          text-align: center;
          flex-shrink: 0;
        }

        .settings-row-value {
          flex-shrink: 0;
        }

        .settings-val {
          font-size: 0.82rem;
          color: var(--text-primary);
          font-weight: 500;
          font-variant-numeric: tabular-nums;
        }

        .settings-val-null {
          font-size: 0.82rem;
          color: var(--text-muted);
        }

        .settings-badge {
          font-size: 0.72rem;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 12px;
          letter-spacing: 0.3px;
        }

        .badge-on {
          background: rgba(74, 222, 128, 0.12);
          color: var(--success);
          border: 1px solid rgba(74, 222, 128, 0.3);
        }

        .badge-off {
          background: rgba(85, 85, 102, 0.2);
          color: var(--text-muted);
          border: 1px solid var(--border);
        }

        .settings-extra {
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid var(--border);
        }

        .settings-extra-label {
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          color: var(--text-muted);
          font-weight: 600;
          margin-bottom: 8px;
          padding: 0 12px;
        }

        .modal-footer {
          padding: 14px 24px 20px;
          border-top: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-shrink: 0;
        }

        .modal-footer-note {
          font-size: 0.7rem;
          color: var(--text-muted);
          line-height: 1.4;
          flex: 1;
        }

        .modal-close-footer-btn {
          padding: 8px 20px;
          background: var(--accent-gradient);
          border-radius: 20px;
          font-size: 0.82rem;
          font-weight: 600;
          color: white;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
          flex-shrink: 0;
          box-shadow: 0 2px 12px rgba(108, 99, 255, 0.3);
        }

        .modal-close-footer-btn:hover {
          box-shadow: 0 4px 20px rgba(108, 99, 255, 0.5);
          transform: translateY(-1px);
        }
      `})]}):null}function np(){const{sessionId:e,isReady:t,error:n,restartSession:r}=Af(),[l,i]=z.useState(!1),[o,s]=z.useState(0),a=z.useCallback(()=>{s(c=>c+1)},[]);return d.jsxs("div",{className:"app-root",children:[d.jsx(Vf,{onSettingsOpen:()=>i(!0)}),n&&d.jsxs("div",{className:"session-error-banner",children:[d.jsxs("span",{children:["⚠️ Session error: ",n]}),d.jsx("button",{onClick:r,children:"Reconnect"})]}),d.jsxs("div",{className:"app-body",children:[d.jsx("div",{className:"app-chat-panel",children:d.jsx(Yf,{sessionId:e,isReady:t,onMemoryHighlight:a})}),d.jsx("div",{className:"app-memory-panel",children:d.jsx(bf,{highlighted:o})})]}),d.jsx(ep,{}),d.jsx(tp,{isOpen:l,onClose:()=>i(!1)}),d.jsx("style",{children:`
        .app-root {
          display: flex;
          flex-direction: column;
          height: 100vh;
          overflow: hidden;
        }

        .session-error-banner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 8px 20px;
          background: rgba(248, 113, 113, 0.1);
          border-bottom: 1px solid rgba(248, 113, 113, 0.2);
          font-size: 0.8rem;
          color: var(--danger);
          animation: fadeIn 0.3s ease-in-out;
          flex-shrink: 0;
        }

        .session-error-banner button {
          padding: 4px 14px;
          background: rgba(248, 113, 113, 0.15);
          border: 1px solid rgba(248, 113, 113, 0.3);
          border-radius: 14px;
          font-size: 0.75rem;
          color: var(--danger);
          cursor: pointer;
          transition: all 0.2s ease-in-out;
        }

        .session-error-banner button:hover {
          background: rgba(248, 113, 113, 0.25);
        }

        .app-body {
          flex: 1;
          display: flex;
          overflow: hidden;
          min-height: 0;
        }

        .app-chat-panel {
          flex: 0 0 70%;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          min-width: 0;
        }

        .app-memory-panel {
          flex: 0 0 30%;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          min-width: 240px;
        }

        @media (max-width: 768px) {
          .app-body {
            flex-direction: column;
          }

          .app-chat-panel {
            flex: 0 0 60%;
          }

          .app-memory-panel {
            flex: 0 0 40%;
            border-left: none;
            border-top: 1px solid var(--border);
          }
        }
      `})]})}Yl.createRoot(document.getElementById("root")).render(d.jsx(kc.StrictMode,{children:d.jsx(np,{})}));
