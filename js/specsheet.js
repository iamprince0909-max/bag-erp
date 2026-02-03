let currentStyle="";

function loadDropdown(){
let sel=document.getElementById("styleSelect");
sel.innerHTML="";
getAllStyles().forEach(s=>{
sel.innerHTML+=`<option>${s}</option>`;
});
if(sel.options.length){
currentStyle=sel.value;
loadStyle();
}
}

function newStyle(){
let name=prompt("Style name:");
createStyle(name);
loadDropdown();
}

function loadStyle(){
let sel=document.getElementById("styleSelect");
currentStyle=sel.value;
let s=getStyle(currentStyle);
if(!s) return;

brand.value=s.brand;
finish.value=s.finish;
remarks.value=s.remarks;

resetTable();
s.bom.forEach(addRow);
}

function saveCurrentStyle(){
let rows=document.querySelectorAll("#bom tr");
let bom=[];

rows.forEach((r,i)=>{
if(i===0) return;
let inp=r.querySelectorAll("input");
bom.push({
mat:inp[0].value,
desc:inp[1].value,
qty:inp[2].value,
unit:inp[3].value
});
});

saveStyle(currentStyle,{
brand:brand.value,
finish:finish.value,
remarks:remarks.value,
bom
});

alert("Saved!");
}

function resetTable(){
document.getElementById("bom").innerHTML=`
<tr>
<th>S.No</th>
<th>Material</th>
<th>Description</th>
<th>Qty</th>
<th>Unit</th>
<th>Delete</th>
</tr>`;
}

function addRow(d={}){
let t=document.getElementById("bom");
let i=t.rows.length;
let r=t.insertRow();

r.innerHTML=`
<td>${i}</td>
<td><input value="${d.mat||""}"></td>
<td><input value="${d.desc||""}"></td>
<td><input value="${d.qty||""}"></td>
<td><input value="${d.unit||""}"></td>
<td><button class="delete" onclick="this.parentElement.parentElement.remove()">X</button></td>`;
}

window.onload=loadDropdown;
