function loadMaterialDropdown(){
let sel=document.getElementById("styleSelect");
sel.innerHTML="";
getAllStyles().forEach(s=>{
sel.innerHTML+=`<option>${s}</option>`;
});
}

function loadMaterial(){
let style=styleSelect.value;
let s=getStyle(style);
if(!s) return;

let sum={};

s.bom.forEach(r=>{
if(!sum[r.mat]) sum[r.mat]=0;
sum[r.mat]+=Number(r.qty||0);
});

let html="<h3>Summary</h3>";
for(let m in sum){
html+=`<p>${m}: <b>${sum[m]}</b></p>`;
}

summary.innerHTML=html;
}

window.onload=()=>{
loadMaterialDropdown();
loadMaterial();
};
