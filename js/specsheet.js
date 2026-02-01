const table = document.getElementById("specTable");

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
const per = Number(row.cells[3].innerText) || 0;
const cost = Number(row.cells[5].innerText) || 0;

row.cells[6].innerText = (per * cost).toFixed(2);

}

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

function loadSpec(style){

const data = JSON.parse(localStorage.getItem("spec_"+style)||"[]");

table.innerHTML=table.rows[0].outerHTML;

data.forEach(addRow);

}

document.getElementById("style").onchange = e=>{
loadSpec(e.target.value);
};

addRow();
