(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,n,t){e.exports=t(36)},36:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(13),u=t.n(o),l=t(2),c=function(e){var n=e.AddName,t=e.newName,a=e.handleNameChange,o=e.newNumber,u=e.handleNumberChange;return r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:t,onChange:a})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:o,onChange:u})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},i=function(e){var n=e.filter,t=e.handleFilterChange;return r.a.createElement("div",null,"filter shown with ",r.a.createElement("input",{value:n,onChange:t}))},m=function(e){return r.a.createElement(r.a.Fragment,null,e.name," ",e.number)},d=function(e){var n=e.persons,t=e.filter,a=e.removePerson;return r.a.createElement("ul",{style:{listStyleType:"none",margin:"0",padding:"0"}},n.filter((function(e){return e.name.toLowerCase().includes(t.toLowerCase())})).map((function(e){return r.a.createElement("li",{key:e.name},r.a.createElement(m,{name:e.name,number:e.number})," ",r.a.createElement("button",{name:e.name,id:e.id,onClick:a},"delete"))})))},s=function(e){var n=e.message;return null===n?null:r.a.createElement("div",{style:{color:"green",fontSize:20,backgroundColor:"lightgrey",borderRadius:5,border:"solid",padding:10,marginBottom:10}},n)},f=function(e){var n=e.message;return null===n?null:r.a.createElement("div",{style:{color:"red",fontSize:20,backgroundColor:"lightgrey",borderRadius:5,border:"solid",padding:10,marginBottom:10}},n)},h=t(3),b=t.n(h),g=function(){return b.a.get("/api/persons").then((function(e){return e.data}))},p=function(e){return b.a.post("/api/persons",e).then((function(e){return e.data}))},E=function(e){return b.a.delete("".concat("/api/persons","/").concat(e)).then((function(e){return e.data}))},v=function(e,n){return b.a.put("".concat("/api/persons","/").concat(e),n).then((function(e){return e.data}))},w=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],o=n[1],u=Object(a.useState)(""),m=Object(l.a)(u,2),h=m[0],b=m[1],w=Object(a.useState)(""),C=Object(l.a)(w,2),j=C[0],O=C[1],y=Object(a.useState)(""),N=Object(l.a)(y,2),k=N[0],S=N[1],A=Object(a.useState)(null),B=Object(l.a)(A,2),F=B[0],P=B[1],z=Object(a.useState)(null),D=Object(l.a)(z,2),I=D[0],J=D[1];Object(a.useEffect)((function(){g().then((function(e){return o(e)}))}),[]);return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(i,{filter:k,handleFilterChange:function(e){S(e.target.value)}}),r.a.createElement("h2",null,"add a new"),r.a.createElement(s,{message:F}),r.a.createElement(f,{message:I}),r.a.createElement(c,{AddName:function(e){e.preventDefault();var n={name:h,number:j},a=function(){P("Added ".concat(h)),setTimeout((function(){P(null)}),3e3)},r=t.filter((function(e){return e.name===h}));""!==n.name&&0===r.length&&""!==n.number?p(n).then((function(e){o(t.concat(e)),a()})).catch((function(e){console.log(e.response.data)})):0!==r.length&&window.confirm("".concat(h," is already added to phonebook, replace the old number with a new one?"))&&v(r[0].id,n).then((function(e){o(t.map((function(n){return n.id!==r[0].id?n:e}))),a()})).catch((function(e){J("Information of ".concat(h," has already been removed from server"))})),b(""),O("")},newName:h,handleNameChange:function(e){b(e.target.value)},newNumber:j,handleNumberChange:function(e){O(e.target.value)}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(d,{persons:t,filter:k,removePerson:function(e){window.confirm("Delete ".concat(e.target.name,"?"))&&E(e.target.id).then(o(t.filter((function(n){return n.id!==e.target.id}))))}}))};u.a.render(r.a.createElement(w,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.3d109e21.chunk.js.map