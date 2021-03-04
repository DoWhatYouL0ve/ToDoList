(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{14:function(e,t,n){},15:function(e,t,n){},16:function(e,t,n){"use strict";n.r(t);var i=n(0),a=n.n(i),c=n(8),r=n.n(c),l=(n(14),n(2)),o=n(1),u=n(6),s=n(4);n(15);function d(e){var t=Object(i.useState)(""),n=Object(o.a)(t,2),c=n[0],r=n[1],l=Object(i.useState)(null),u=Object(o.a)(l,2),s=u[0],d=u[1];return a.a.createElement("div",null,a.a.createElement("h3",null,e.title," ",a.a.createElement("button",{onClick:function(){e.deleteToDoList(e.id)}},"X")),a.a.createElement("div",null,a.a.createElement("input",{value:c,onChange:function(e){r(e.currentTarget.value)},onKeyPress:function(t){d(null),"Enter"===t.key&&(e.addTask(c,e.id),r(""))},className:s?"error":""}),a.a.createElement("button",{onClick:function(){if(""===c.trim())return d("Field is required");e.addTask(c.trim(),e.id),r("")}},"+"),s&&a.a.createElement("div",{className:"error-message"},"Field is required")),a.a.createElement("ul",null,e.tasks.map((function(t){return a.a.createElement("li",{key:t.id,className:t.isDone?"is-done":""},a.a.createElement("input",{type:"checkbox",onChange:function(n){e.changeStatus(t.id,n.currentTarget.checked,e.id)},checked:t.isDone}),a.a.createElement("span",null,t.title),a.a.createElement("button",{onClick:function(){return e.removeTask(t.id,e.id)}},"x"))}))),a.a.createElement("div",null,a.a.createElement("button",{className:"all"===e.filter?"active-filter":"",onClick:function(){return e.changeFilter("all",e.id)}},"All"),a.a.createElement("button",{className:"active"===e.filter?"active-filter":"",onClick:function(){return e.changeFilter("active",e.id)}},"Active"),a.a.createElement("button",{className:"completed"===e.filter?"active-filter":"",onClick:function(){return e.changeFilter("completed",e.id)}},"Completed")))}var f=n(18);var m=function(){var e;function t(e,t){var n=g[t].filter((function(t){return t.id!==e}));g[t]=n,D(Object(s.a)({},g))}function n(e,t){var n={id:Object(f.a)(),title:e,isDone:!1},i=g[t],a=[n].concat(Object(u.a)(i));g[t]=a,D(Object(s.a)({},g))}function c(e,t){var n=O.find((function(e){return e.id===t}));n&&(n.filter=e,h(Object(u.a)(O)))}function r(e,t,n){var i=g[n].find((function(t){return t.id===e}));i&&(i.isDone=t,D(Object(s.a)({},g)))}var m=Object(f.a)(),b=Object(f.a)(),v=Object(i.useState)([{id:m,title:"What to learn",filter:"active"},{id:b,title:"What to buy",filter:"completed"}]),j=Object(o.a)(v,2),O=j[0],h=j[1],k=function(e){var t=O.filter((function(t){return t.id!==e}));h(t),delete g[e],D(Object(s.a)({},g))},p=Object(i.useState)((e={},Object(l.a)(e,m,[{id:Object(f.a)(),title:"HTML/CSS",isDone:!0},{id:Object(f.a)(),title:"JavaScript",isDone:!0},{id:Object(f.a)(),title:"React",isDone:!1},{id:Object(f.a)(),title:"Redux",isDone:!1},{id:Object(f.a)(),title:"GraphQL",isDone:!1}]),Object(l.a)(e,b,[{id:Object(f.a)(),title:"Book",isDone:!0},{id:Object(f.a)(),title:"Monitor",isDone:!0},{id:Object(f.a)(),title:"Adapter",isDone:!1}]),e)),E=Object(o.a)(p,2),g=E[0],D=E[1];return a.a.createElement("div",{className:"App"},O.map((function(e){var i=g[e.id];return"completed"===e.filter&&(i=i.filter((function(e){return!0===e.isDone}))),"active"===e.filter&&(i=i.filter((function(e){return!1===e.isDone}))),a.a.createElement(d,{key:e.id,id:e.id,title:e.title,tasks:i,removeTask:t,changeFilter:c,addTask:n,changeStatus:r,filter:e.filter,deleteToDoList:k})})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(a.a.createElement(m,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},9:function(e,t,n){e.exports=n(16)}},[[9,1,2]]]);
//# sourceMappingURL=main.32ba4bc1.chunk.js.map