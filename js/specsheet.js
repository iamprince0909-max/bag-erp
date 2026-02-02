window.addEventListener("DOMContentLoaded", () => {

window.table = document.getElementById("specTable");

document.getElementById("style").addEventListener("change", e=>{
loadSpec(e.target.value);
});

addRow();

});

/* ---------- TABLE ---------- */

function addRow(data={}){

const row = table.insertRow();

row.innerHTML = `
<td>${table.rows.length-1}</td>
<td contenteditable>${data.mat||""}</td>
<td contenteditable>${data.desc||""}</td>
<td contenteditable oninput="calc(this)">${data.per||""}</td>
<td contenteditable>${data.unit||""}</td>
<td contenteditable oninput="calc(this)">${data.cost||""}</td>
<td>${data.total||""}</td>
`;

}

function calc(cell){

const row = cell.parentNode;
const per = Number(row.cells[3].innerText)||0;
const cost = Number(row.cells[5].innerText)||0;

row.cells[6].innerText = (per*cost).toFixed(2);

}

/* ---------- SAVE ---------- */

function saveSpec(){

const style = document.getElementById("style").value;
if(!style) return alert("Enter style");

const rows=[];

for(let i=1;i<table.rows.length;i++){

const r=table.rows[i];

rows.push({
mat:r.cells[1].innerText,
desc:r.cells[2].innerText,
per:r.cells[3].innerText,
unit:r.cells[4].innerText,
cost:r.cells[5].innerText,
total:r.cells[6].innerText
});

}

localStorage.setItem("spec_"+style, JSON.stringify(rows));

alert("Saved ✔");

}

/* ---------- LOAD ---------- */

function loadSpec(style){

const data = JSON.parse(localStorage.getItem("spec_"+style)||"[]");

table.innerHTML = `
<tr>
<th>#</th>
<th>Material</th>
<th>Description</th>
<th>Per Pcs</th>
<th>Unit</th>
<th>Unit Cost</th>
<th>Total Cost</th>
</tr>
`;

data.forEach(addRow);

}

/* ---------- NAV ---------- */

function goBack(){
window.location.href = "index.html";
}

/* ---------- SAVED LIST ---------- */

function showSaved(){

renderSaved("");

}

function filterSaved(){

const q = document.getElementById("searchBox").value.toLowerCase();
renderSaved(q);

}

function renderSaved(query){

const box = document.getElementById("savedList");
box.innerHTML = "<h3>Saved Styles</h3>";

let found=false;

for(let i=0;i<localStorage.length;i++){

const key = localStorage.key(i);

if(!key.startsWith("spec_")) continue;

const style = key.replace("spec_","");

if(query && !style.toLowerCase().includes(query)) continue;

found=true;

box.innerHTML += `
<div class="saved-item">
<span>${style}</span>

<button onclick="loadFromList('${style}')">✏ Edit</button>
<button onclick="deleteSpec('${style}')">❌</button>

</div>
`;

}

if(!found) box.innerHTML+="<p>No saved specs</p>";

}

function deleteSpec(style){

if(!confirm("Delete "+style+" ?")) return;

localStorage.removeItem("spec_"+style);

renderSaved("");

}

