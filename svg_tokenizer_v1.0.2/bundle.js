(()=>{"use strict";var o=function(o,n,t,e){return new(t||(t=Promise))((function(i,r){function c(o){try{s(e.next(o))}catch(o){r(o)}}function a(o){try{s(e.throw(o))}catch(o){r(o)}}function s(o){var n;o.done?i(o.value):(n=o.value,n instanceof t?n:new t((function(o){o(n)}))).then(c,a)}s((e=e.apply(o,n||[])).next())}))};const n=(n,t)=>o(void 0,void 0,void 0,(function*(){var o;const e=[];for(const i of n)if(t in i)for(const n of i[t]){if("SOLID"!==n.type||!n.color)continue;const t=`#${[n.color.r,n.color.g,n.color.b].map((o=>("0"+Math.round(255*o).toString(16)).slice(-2))).join("")}`;let r="-";if(null===(o=n.boundVariables)||void 0===o?void 0:o.color){const o=yield figma.variables.getVariableByIdAsync(n.boundVariables.color.id);r=(null==o?void 0:o.name)||" "}e.push({color:t,variable:r,id:i.id})}return e}));var t=function(o,n,t,e){return new(t||(t=Promise))((function(i,r){function c(o){try{s(e.next(o))}catch(o){r(o)}}function a(o){try{s(e.throw(o))}catch(o){r(o)}}function s(o){var n;o.done?i(o.value):(n=o.value,n instanceof t?n:new t((function(o){o(n)}))).then(c,a)}s((e=e.apply(o,n||[])).next())}))};figma.showUI(__html__,{width:720,height:590,themeColors:!0});const e=figma.currentPage.selection[0],i=o=>{const n=[o];return"children"in o&&o.children.forEach((o=>{n.push(...i(o))})),n};var r;r=e,t(void 0,void 0,void 0,(function*(){if(!r)return figma.notify("🙁 No element selected!"),void figma.closePlugin();const t=i(r);console.log(t);try{const i=yield(e=t,o(void 0,void 0,void 0,(function*(){const[o,t]=yield Promise.all([n(e,"fills"),n(e,"strokes")]);return[...o,...t]})));figma.ui.postMessage({type:"colors",data:i})}catch(o){console.error("Error processing colors:",o)}var e;try{if("exportAsync"in r){const o=yield r.exportAsync({format:"SVG"}),n=String.fromCharCode(...o);figma.ui.postMessage({type:"svg-code",data:n})}}catch(o){console.error("Error exporting SVG:",o)}})),figma.ui.onmessage=o=>t(void 0,void 0,void 0,(function*(){try{if("selectLayer"===o.type){const n=yield figma.getNodeByIdAsync(o.id);n?figma.currentPage.selection=[n]:console.log(`Node with ID ${o.id} not found.`)}"alert"===o.type&&figma.notify(o.data)}catch(o){console.error("Error handling UI message:",o)}}))})();