(()=>{const e=document.querySelector("#addTaskForm"),t=document.querySelector("#addTaskButton"),o=document.querySelector("#addTaskModal"),r=document.querySelector("#editTaskModal"),a=document.querySelector("#tasksContainer"),n=document.querySelectorAll(".taskCard");let s=document.querySelectorAll(".taskCardDeleteButton"),c=document.querySelectorAll(".taskCardEditButton");const d=document.querySelector("#projectsContainer"),i=document.querySelectorAll(".projectButton");function l(){n.forEach((e=>{e.remove()})),p.forEach((e=>{const t=document.createElement("div");t.classList.add("taskCard"),t.innerHTML=`\n            <div class="taskCardTitle">\n                <h3>${e.title}</h3>\n            </div>\n            <div class="taskCardDescription">\n                <p>${e.description}</p>\n            </div>\n            <div class="taskCardDueDate">\n                <p><b>Due Date:</b> ${e.date}</p>\n            </div>\n            <div class="taskCardPriority">\n                <p><b>Priority:</b> ${e.priority}</p>\n            </div>\n            <div class="taskCardProject">\n                <p><b>Project:</b> ${e.project}</p>\n            </div>\n            <div class="taskCardActions">\n                <button class="taskCardEditButton" id="${e.id}">Edit</button>\n                    <button class="taskCardDeleteButton" id="${e.id}" >Delete</button>\n            </div>  \n        `,a&&a.appendChild(t),s.forEach((e=>{e.addEventListener("click",(e=>{const t=e.target.id;p.forEach(((e,o)=>{e.id==t&&(p.splice(o,1),localStorage.setItem("tasks",JSON.stringify(p)),l())}))}))})),c.forEach((e=>{e.addEventListener("click",(e=>{const t=e.target.id,o=p.findIndex((e=>e.id==t)),a=p[o],n=document.querySelector("#editTaskForm"),s=document.querySelector("#editTaskTitle"),c=document.querySelector("#editTaskDescription"),d=document.querySelector("#editTaskDueDate"),i=document.querySelector("#editTaskPriority"),u=document.querySelector("#editTaskProject");s.value=a.title,c.value=a.description,d.value=a.date,i.value=a.priority,u.value=a.project,r.style.display="flex",n.addEventListener("submit",(e=>{e.preventDefault();const a=s.value,n=c.value,y=d.value,v=i.value,k=u.value;p[o]=new m(a,n,y,v,k,t),localStorage.setItem("tasks",JSON.stringify(p)),l(),r.style.display="none"}))}))}))}))}function u(){i.forEach((e=>{e.remove()})),y.forEach((e=>{const t=document.createElement("button");t.classList.add("projectButton"),t.innerHTML=`\n            <span>${e.project}</span>\n\n        `,d&&d.appendChild(t)}))}t.addEventListener("click",(()=>{o.style.display="flex"})),e.addEventListener("submit",(function(e){const t=document.querySelector("#taskTitle").value,r=document.querySelector("#taskDescription").value,a=document.querySelector("#taskDueDate").value,n=document.querySelector("#taskPriority").value,s=document.querySelector("#taskProject").value,c=Math.floor(1e8*Math.random());e.preventDefault(),p.push(new m(t,r,a,n,s,c)),localStorage.setItem("tasks",JSON.stringify(p)),o.style.display="none",l()})),document.querySelector("#addProjectForm").addEventListener("submit",(function(e){e.preventDefault();const t=document.querySelector("#addProjectTitle").value;y.push(new v(t)),localStorage.setItem("projects",JSON.stringify(y)),u(),console.log(y)})),window.addEventListener("load",(()=>{const e=localStorage.getItem("tasks"),t=localStorage.getItem("projects");e?(p=JSON.parse(e),l()):t&&(y=JSON.parse(t),u())})),window.addEventListener("click",(e=>{e.target==o?o.style.display="none":e.target==r&&(r.style.display="none")}));let p=[],y=[];class m{constructor(e,t,o,r,a,n){this.title=e,this.description=t,this.date=o,this.priority=r,this.project=a,this.id=n}}class v{constructor(e){this.project=e}}})();