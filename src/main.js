import { animate, inView } from "motion";
window.__rv=1;
const S=[["Grass cutting","Regular mowing, edging and strimming, weekly or fortnightly."],["Hedges","Trimmed square and sharp, with all the cuttings taken away."],["Small trees","Pruning, shaping and lifting of small trees."],["Windows","Cleaned for a clear, streak-free finish."],["Pressure washing","Patios, drives and paths brought back to life."],["Gutter cleaning","Cleared by hand so water runs where it should."]];
const T={w:[["Gutter clear-out","Autumn leaves block downpipes. Clear them before the wet weather.","Gutter cleaning"],["Winter pruning","Dormant trees and hedges take cutting back well.","Small trees"],["Path and patio wash","Remove slippery algae before it gets icy.","Pressure washing"]],
sp:[["First mow of the year","Start with a high cut, then lower gradually.","Grass cutting"],["Hedge tidy","Trim before birds start nesting.","Hedges"],["Patio refresh","Wash off the winter green.","Pressure washing"]],
su:[["Regular mowing","Weekly cuts keep the lawn thick and weed-free.","Grass cutting"],["Hedge shaping","Second trim of the year for fast growers.","Hedges"],["Drive wash","Best done in dry weather.","Pressure washing"]],
a:[["Leaf clearance","Leaves smother lawns. Clear them often.","Grass cutting"],["Gutter cleaning","Do this once the leaves have fallen.","Gutter cleaning"],["Final hedge cut","One last tidy before winter.","Hedges"]]};
const M=["January","February","March","April","May","June","July","August","September","October","November","December"];
const now=new Date(),m=now.getMonth(),k=m<2||m==11?"w":m<5?"sp":m<8?"su":"a";
document.getElementById("mon").textContent=M[m];
const sel=new Set();let day=null,time=null;
const chips=document.getElementById("chips");
function paintChips(){chips.innerHTML="";S.forEach(([n])=>{const b=document.createElement("button");b.className="chip";b.textContent=n;b.setAttribute("aria-pressed",sel.has(n));b.onclick=()=>{sel.has(n)?sel.delete(n):sel.add(n);paintChips()};chips.appendChild(b)})}
paintChips();
document.getElementById("svc").innerHTML=S.map(([n,d],i)=>`<div class="card"><div class="n">0${i+1}</div><h3>${n}</h3><p>${d}</p><button data-s="${n}">Book this →</button></div>`).join("");
document.getElementById("tasks").innerHTML=T[k].map(([n,d,s])=>`<div class="card"><h3>${n}</h3><p>${d}</p><button data-s="${s}">Book ${s.toLowerCase()} →</button></div>`).join("");
document.querySelectorAll("[data-s]").forEach(b=>b.onclick=()=>{sel.add(b.dataset.s);paintChips();location.hash="book"});
const dn=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dd=document.getElementById("days");
for(let i=1,c=0;c<14;i++){const d=new Date(now.getFullYear(),now.getMonth(),now.getDate()+i);if(d.getDay()==0)continue;c++;
const b=document.createElement("button");b.className="day";b.setAttribute("aria-pressed","false");b.innerHTML=`${dn[d.getDay()]}<b>${d.getDate()}</b>${M[d.getMonth()].slice(0,3)}`;
b.onclick=()=>{day=d;dd.querySelectorAll(".day").forEach(x=>x.setAttribute("aria-pressed","false"));b.setAttribute("aria-pressed","true")};dd.appendChild(b)}
const TM=[["Morning","8am–12pm",9],["Afternoon","12pm–4pm",13]],tw=document.getElementById("times");
TM.forEach(([n,r,h])=>{const b=document.createElement("button");b.className="chip";b.setAttribute("aria-pressed","false");b.textContent=`${n} (${r})`;b.onclick=()=>{time=[n,r,h];tw.querySelectorAll(".chip").forEach(x=>x.setAttribute("aria-pressed","false"));b.setAttribute("aria-pressed","true")};tw.appendChild(b)});
const $=id=>document.getElementById(id),p2=n=>String(n).padStart(2,"0");
const fmt=(d,h)=>`${d.getFullYear()}${p2(d.getMonth()+1)}${p2(d.getDate())}T${p2(h)}0000`;
$("go").onclick=()=>{const e=$("err");
if(!sel.size)return e.textContent="Please choose at least one service.";
if(!day)return e.textContent="Please pick a day.";
if(!time)return e.textContent="Please choose morning or afternoon.";
if(!$("nm").value.trim()||!$("ph").value.trim()||!$("pc").value.trim())return e.textContent="Please add your name, phone and postcode.";
e.textContent="";
const sv=[...sel].join(", "),ds=`${dn[day.getDay()]} ${day.getDate()} ${M[day.getMonth()]}`,
det=`Services: ${sv}\nCustomer: ${$("nm").value.trim()}\nPhone: ${$("ph").value.trim()}\nPostcode: ${$("pc").value.trim()}${$("em").value?"\nEmail: "+$("em").value:""}${$("nt").value?"\nNotes: "+$("nt").value:""}`;
$("dl").innerHTML=`<dt>Services</dt><dd>${sv}</dd><dt>Day</dt><dd>${ds}</dd><dt>Time</dt><dd>${time[0]} (${time[1]})</dd><dt>Name</dt><dd>${$("nm").value.trim()}</dd><dt>Postcode</dt><dd>${$("pc").value.trim().toUpperCase()}</dd>`;
$("gcal").href="https://calendar.google.com/calendar/render?action=TEMPLATE&text="+encodeURIComponent("JT Garden: "+sv+" ("+$("nm").value.trim()+")")+"&dates="+fmt(day,time[2])+"/"+fmt(day,time[2]+2)+"&ctz=Europe/London&location="+encodeURIComponent($("pc").value.trim())+"&details="+encodeURIComponent(det);
$("mail").href="mailto:gardenmaintenancejt@gmail.com?subject="+encodeURIComponent("Booking request: "+ds)+"&body="+encodeURIComponent(det+"\nDay: "+ds+" ("+time[1]+")");
$("form").style.display="none";$("side").style.display="none";$("sum").classList.add("on")};
$("redo").onclick=()=>{$("sum").classList.remove("on");$("form").style.display="";$("side").style.display=""};

const RV=".hero .eyebrow,.hero h1,.hero p,.hero .cta,.hero .facts,.hc,section .eyebrow,section h2,section .sub,#svc .card,#tasks .card,.who .card,.book .panel,.band .w";
if(!matchMedia("(prefers-reduced-motion: reduce)").matches){
  const ease=[.22,1,.36,1];
  document.querySelectorAll(RV).forEach(el=>{
    const i=[...el.parentElement.children].filter(c=>c.matches(RV)).indexOf(el);
    inView(el,()=>{animate(el,{opacity:[0,1],transform:["translateY(26px)","translateY(0px)"]},{duration:.8,delay:Math.min(i,5)*.09,ease})},{margin:"0px 0px -10% 0px"});
  });
  animate(".bar",{transform:["scaleX(0)","scaleX(0)"]},{duration:0});
}
const bar=document.querySelector(".bar"),hd=document.querySelector("header");
addEventListener("scroll",()=>{hd.classList.toggle("sc",scrollY>8);bar.style.transform="scaleX("+(scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight))+")"},{passive:true});
