let table = document.getElementById("specTable");

function addRow(){

let row = table.insertRow(-1);

for(let i=0;i<7;i++){
let cell = row.insertCell(i);
if(i===0){
cell.innerText = table.rows.length-1;
}else{
cell.innerHTML = `<input>`;
}
}

}

function saveSpec(){

let style = document.getElementById("style").value;
if(!style) return alert("Enter style!");

let data = [];

for(let i=1;i<table.rows.length;i++){
let inputs = table.rows[i].querySelectorAll("input");
data.push([...inputs].map(x=>x.value));
}

localStorage.setItem("spec_"+style,JSON.stringify(data));

alert("Saved!");
loadSaved();

}

function loadSaved(){

let panel = document.getElementById("savedPanel");
panel.innerHTML = "<h3>Saved Styles</h3>";

for(let i=0;i<localStorage.length;i++){

let key = localStorage.key(i);
if(!key.startsWith("spec_")) continue;

let style = key.replace("spec_","");

panel.innerHTML += `
<div class="saved-item">
<span>${style}</span>
<button onclick="openSpec('${style}')">✏ Edit</button>
<button onclick="deleteSpec('${style}')">❌</button>
</div>
`;

}

}

function deleteSpec(style){

if(!confirm("Delete "+style+" ?")) return;

localStorage.removeItem("spec_"+style);
loadSaved();

}

function openSpec(style){

let data = JSON.parse(localStorage.getItem("spec_"+style));

document.getElementById("style").value = style;

table.innerHTML = table.rows[0].outerHTML;

data.forEach(row=>{
addRow();
let inputs = table.rows[table.rows.length-1].querySelectorAll("input");
inputs.forEach((inp,i)=>inp.value=row[i]);
});

}

/* PDF */
function exportPDF(){

const { jsPDF } = window.jspdf;
let doc = new jsPDF();
doc.text("Spec Sheet",10,10);
doc.autoTable({ html:'#specTable' });
doc.save("specsheet.pdf");

}

/* Excel */
function exportExcel(){

let wb = XLSX.utils.table_to_book(document.getElementById("specTable"));
XLSX.writeFile(wb,"specsheet.xlsx");

}

addRow();
loadSaved();
