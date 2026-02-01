function colourFromStyle(s){
if(s.includes("OLI")) return "Olive";
if(s.includes("BRO")) return "Brown";
if(s.includes("BLK")) return "Black";
if(s.includes("TAN")) return "Tan";
return "";
}

/* ===== WAIT FOR SPEC SHEET ===== */

document.addEventListener("spec-ready", buildUI);

function buildUI(){

const grid = document.getElementById("cardGrid");
if(!grid) return;

const saved = JSON.parse(localStorage.getItem("cuttingPlan")||"{}");
const specs = JSON.parse(localStorage.getItem("specSheet")||"[]");

const styles = [...new Set(
specs.map(r => r["Style No"] || r["Style"] || r["STYLE"])
)].filter(Boolean);

styles.forEach(style=>{

const colour = colourFromStyle(style);

grid.innerHTML += `
<div class="style-card">
<strong>${style}</strong>
<div>${colour}</div>
<input type="number" placeholder="Qty" value="${saved[style]||""}">
</div>`;

});
}

/* SAVE */

function savePlan(){
const data={};
document.querySelectorAll(".style-card").forEach(card=>{
const qty=card.querySelector("input").value;
if(qty)data[card.children[0].innerText]=qty;
});
localStorage.setItem("cuttingPlan",JSON.stringify(data));
alert("Saved");
}

/* PRINT */

const table=document.getElementById("printTable");

if(table){
const data=JSON.parse(localStorage.getItem("cuttingPlan")||"{}");
Object.keys(data).forEach(style=>{
table.innerHTML+=`
<tr>
<td>${style}</td>
<td>${colourFromStyle(style)}</td>
<td>${data[style]}</td>
</tr>`;
});
}

/* MATERIAL */

const materialGrid=document.getElementById("materialGrid");

if(materialGrid){
const plan=JSON.parse(localStorage.getItem("cuttingPlan")||"{}");

Object.keys(plan).forEach(style=>{
const qty=plan[style];

materialGrid.innerHTML+=`
<div class="style-card">
<strong>${style}</strong>
<div>Cut Qty: ${qty}</div>

<label>PU / bag</label>
<input oninput="calc('${style}',${qty},this.value,'pu')">

<label>Lining / bag</label>
<input oninput="calc('${style}',${qty},this.value,'lining')">

<label>Reinforcement / bag</label>
<input oninput="calc('${style}',${qty},this.value,'reinforce')">

<label>Trims / bag</label>
<input oninput="calc('${style}',${qty},this.value,'trims')">

<div id="total-${style}"></div>
</div>`;
});
}

function calc(style,qty,val,key){

const m=JSON.parse(localStorage.getItem("materialPlan")||"{}");
if(!m[style]) m[style]={};

m[style][key]=Number(val);
localStorage.setItem("materialPlan",JSON.stringify(m));

let s=m[style];
let html="<b>Total Requirement</b><br>";

if(s.pu) html+=`PU: ${s.pu*qty}<br>`;
if(s.lining) html+=`Lining: ${s.lining*qty}<br>`;
if(s.reinforce) html+=`Reinforcement: ${s.reinforce*qty}<br>`;
if(s.trims) html+=`Trims: ${s.trims*qty}<br>`;

document.getElementById(`total-${style}`).innerHTML=html;
}
