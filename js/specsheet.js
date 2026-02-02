function goBack(){
  window.location.href="index.html";
}

window.onload = ()=>{
  addRow();
  loadSaved();
}

function addRow(){

  let table = document.getElementById("specTable");
  let row = table.insertRow();

  let index = table.rows.length-1;

  row.innerHTML = `
    <td>${index}</td>
    <td><input></td>
    <td><input></td>
    <td><input type="number"></td>
    <td><input></td>
    <td><input type="number"></td>
  `;
}

function saveSpec(){

  let style = document.getElementById("style").value.trim();
  if(!style){
    alert("Enter style number");
    return;
  }

  let brand = document.getElementById("brand").value;
  let colour = document.getElementById("colour").value;
  let qty = Number(document.getElementById("qty").value)||0;

  let rows = document.querySelectorAll("#specTable tr");
  let materials = [];

  rows.forEach((row,i)=>{
    if(i===0) return;

    let inputs = row.querySelectorAll("input");
    if(inputs.length<5) return;

    let item = {
      material: inputs[0].value,
      desc: inputs[1].value,
      per: Number(inputs[2].value)||0,
      unit: inputs[3].value,
      cost: Number(inputs[4].value)||0
    };

    if(item.material) materials.push(item);
  });

  let spec = {style,brand,colour,qty,materials};

  localStorage.setItem("spec_"+style,JSON.stringify(spec));

  alert("Saved ✔");
  loadSaved();
}

function loadSaved(){

  let panel = document.getElementById("savedPanel");
  panel.innerHTML="";

  Object.keys(localStorage).forEach(key=>{

    if(!key.startsWith("spec_")) return;

    let name = key.replace("spec_","");

    let div = document.createElement("div");
    div.className="saved-item";

    div.innerHTML = `
      <button onclick="editSpec('${name}')">${name}</button>
      <button onclick="deleteSpec('${name}')">✕</button>
    `;

    panel.appendChild(div);
  });
}

function editSpec(name){

  let data = JSON.parse(localStorage.getItem("spec_"+name));

  document.getElementById("style").value = data.style;
  document.getElementById("brand").value = data.brand;
  document.getElementById("colour").value = data.colour;
  document.getElementById("qty").value = data.qty;

  let table = document.getElementById("specTable");
  table.innerHTML = `
  <tr>
  <th>#</th>
  <th>Material</th>
  <th>Description</th>
  <th>Per Pcs</th>
  <th>Unit</th>
  <th>Unit Cost</th>
  </tr>
  `;

  data.materials.forEach((m,i)=>{
    let row = table.insertRow();
    row.innerHTML = `
      <td>${i+1}</td>
      <td><input value="${m.material}"></td>
      <td><input value="${m.desc}"></td>
      <td><input type="number" value="${m.per}"></td>
      <td><input value="${m.unit}"></td>
      <td><input type="number" value="${m.cost}"></td>
    `;
  });

}

function deleteSpec(name){
  localStorage.removeItem("spec_"+name);
  loadSaved();
}
