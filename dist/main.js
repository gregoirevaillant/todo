(()=>{const e=document.querySelector("#addTaskForm"),t=document.querySelector("#addTaskButton"),n=document.querySelector("#addTaskModal");function s(){const e=document.querySelector("#tasksContainer");document.querySelectorAll(".taskCard").forEach((e=>{e.remove()})),a.forEach((t=>{const n=document.createElement("div");n.classList.add("taskCard"),n.innerHTML=`\n            <div class="taskCardTitle">\n                <h3>${t.title}</h3>\n            </div>\n            <div class="taskCardDescription">\n                <p>${t.description}</p>\n            </div>\n            <div class="taskCardActions">\n                <button class="taskCardEditButton" id="${t.id}">Edit</button>\n                <button class="taskCardDeleteButton" id="${t.id}" >Delete</button>\n            </div>  \n        `,e&&e.appendChild(n),document.querySelectorAll(".taskCardDeleteButton").forEach((e=>{e.addEventListener("click",(e=>{const t=e.target.id;a.forEach(((e,n)=>{e.id==t&&(a.splice(n,1),localStorage.setItem("tasks",JSON.stringify(a)),s())}))}))})),document.querySelectorAll(".taskCardEditButton").forEach((e=>{e.addEventListener("click",(e=>{const t=e.target.id,n=a.findIndex((e=>e.id==t)),o=a[n],i=document.querySelector("#editTaskForm"),l=document.querySelector("#editTaskTitle"),r=document.querySelector("#editTaskDescription");l.value=o.title,r.value=o.description;const c=document.querySelector("#editTaskModal");c.style.display="flex",i.addEventListener("submit",(e=>{e.preventDefault();const o=l.value,i=r.value;a[n]=new d(o,i,t),localStorage.setItem("tasks",JSON.stringify(a)),s(),c.style.display="none"})),document.querySelector(".close").addEventListener("click",(()=>{c.style.display="none"}))}))}))}))}t.addEventListener("click",(()=>{n.style.display="flex"})),e.addEventListener("submit",(function(e){e.preventDefault();const t=document.querySelector("#addTaskTitle").value,o=document.querySelector("#addTaskDescription").value,i=Math.floor(1e8*Math.random());a.push(new d(t,o,i)),localStorage.setItem("tasks",JSON.stringify(a)),n.style.display="none",s()}));let a=[];window.addEventListener("load",(()=>{const e=localStorage.getItem("tasks");e&&(a=JSON.parse(e),s())}));class d{constructor(e,t,n){this.title=e,this.description=t,this.id=n}}})();