let table = document.getElementById("specTable");

window.onload = () => {
  addRow();
  showSaved();
};

function goBack(){
  window.location="index.html";
}

/* ---------------- ADD ROW ---------------- */

function addRow(data={}){
  let row = table.insertRow();

  let index = table.rows.length - 1;

  row.innerHTML = `
    <td>${index}</td>
    <td><input value="${data.material||""}"></td>
    <td><input value="${data.desc||""}"></td>
    <td><input value="${data.per||""}"></td>
    <td><input value="${data.unit||""}"></td>
    <td><input value="${data.cost||""}"></td>
    <td><input value="${data.total||""}"></td>
  `;
}

/* ---------------- SAVE ---------------- */

function saveSpec(){

  let style = document.getElementById("style").value;
  if(!style) return alert("Enter style");

  let spec = {
    style,
    brand: brand.value,
    colour: colour.value,
    qty: qty.value,
    materials:[]
  };

  for(let i=1;i<table.rows.length;i++){

    let cells = table.rows[i].cells;

    spec.materials.push({
      material: cells[1].children[0].value,
      desc: cells[2].children[0].value,
      per: parseFloat(cells[3].children[0].value)||0,
      unit: cells[4].children[0].value,
      cost: cells[5].children[0].value,
      total: cells[6].children[0].value
    });
  }

  localStorage.setItem("spec_"+style,JSON.stringify(spec));

  showSaved();
  alert("Saved");
}

/* ---------------- SHOW SAVED ---------------- */

function showSaved(){

  let panel = document.getElementById("savedPanel");
  panel.innerHTML = "<h3>Saved Styles</h3>";

  Object.keys(localStorage).forEach(key=>{

    if(!key.startsWith("spec_")) return;

    let style = key.replace("spec_","");

    panel.innerHTML += `
      <div class="saved-item">
        <button onclick="loadSpec('${style}')">${style}</button>
        <button onclick="deleteSpec('${style}')">✖</button>
      </div>
    `;
  });
}

/* ---------------- LOAD ---------------- */

function loadSpec(style){

  let spec = JSON.parse(localStorage.getItem("spec_"+style));
  if(!spec) return;

  document.getElementById("style").value = spec.style;
  document.getElementById("brand").value = spec.brand;
  document.getElementById("colour").value = spec.colour;
  document.getElementById("qty").value = spec.qty;

  // clear table
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

  spec.materials.forEach(m=>addRow(m));
}

/* ---------------- DELETE ---------------- */

function deleteSpec(style){
  if(confirm("Delete "+style+" ?")){
    localStorage.removeItem("spec_"+style);
    showSaved();
  }
}
