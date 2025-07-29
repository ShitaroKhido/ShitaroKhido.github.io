import{i as t}from"./i18n-CjCvs0Mn.js";document.addEventListener("DOMContentLoaded",async()=>{const c=document.getElementById("project-detail-container"),i=document.getElementById("comments-list"),r=document.getElementById("comment-form"),d=document.getElementById("comment-author"),g=document.getElementById("comment-text"),l=document.getElementById("lang-select"),u=new URLSearchParams(window.location.search),s=parseInt(u.get("id"));let p=u.get("lang")||localStorage.getItem("lang")||"en";async function h(){try{const n=(await(await fetch("data.json")).json()).projects.find(o=>o.id===s);L(n)}catch(e){console.error("Error fetching project data:",e),c.innerHTML=`<p>${t.t("site.detailsPage.errorLoading")}</p>`}}function L(e){document.title=e?`${e.title} | ${t.t("site.title")}`:`${t.t("site.detailsPage.projectNotFound")} | ${t.t("site.title")}`,document.querySelector(".logo").textContent=t.t("site.logo"),document.querySelector("nav ul li a").textContent=t.t("site.nav.home"),document.querySelector(".go-back-btn").textContent=t.t("site.detailsPage.goBack"),document.querySelector("#comments-section h2").textContent=t.t("site.detailsPage.comments"),d.placeholder=t.t("site.detailsPage.commentForm.namePlaceholder"),g.placeholder=t.t("site.detailsPage.commentForm.commentPlaceholder"),document.querySelector("#comment-form button").textContent=t.t("site.detailsPage.commentForm.button"),e?c.innerHTML=`
        <article class="project-detail">
          <h1>${e.title}</h1>
          <img src="${e.image}" alt="${e.title}" />
          <p>${e.description}</p>
          <h3>Technologies Used:</h3>
          <ul>
            ${e.technologies.map(n=>`<li>${n}</li>`).join("")}
          </ul>
          <a href="${e.link}" target="_blank">View Project</a>
        </article>
      `:c.innerHTML=`<p>${t.t("site.detailsPage.projectNotFound")}</p>`;let a=JSON.parse(localStorage.getItem(`comments_${s}`))||[];function m(){i.innerHTML="",a.forEach(n=>{const o=document.createElement("div");o.classList.add("comment"),o.innerHTML=`
          <p>${n.text}</p>
          <p class="author">- ${n.author}</p>
        `,i.appendChild(o)})}r.addEventListener("submit",n=>{n.preventDefault();const o={author:d.value,text:g.value};a.push(o),localStorage.setItem(`comments_${s}`,JSON.stringify(a)),m(),r.reset()}),m(),$(t.language)}function $(e){l.value=e}t.on("languageChanged",()=>{h()}),l.addEventListener("change",()=>{const e=l.value;t.changeLanguage(e),localStorage.setItem("lang",e)}),t.changeLanguage(p,h)});
