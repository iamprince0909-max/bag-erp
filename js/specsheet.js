// BACK BUTTON
function goBack(){
  window.history.back();
}

// TABLE ROW ADD
function addRow(){
  const table = document.getElementById("specTable");

  const row = table.insertRow();
  const index = table.rows.length - 1;

  row.innerHTML = `
    <td>${index}</td>
    <td><input></td>
    <td><input></td>
    <td><input type="number"></td>
    <td><input></td>
    <td><input type="number"></td>
    <td><input type="number"></td>
  `;
}

// SAVE SPEC
function saveSpec(){

  const style = document.getElementById("style").value;
  if(!style){
    alert("Enter style name");
    return;
  }

  const brand = document.getElementById("brand").value;
  const colour = document.getElementById("colour").value;
  const qty = document.getElementById("qty").value;

  const rows = [];
  document.querySelectorAll("#specTable tr").forEach((tr,i)=>{
    if(i===0) return;

    const inputs = tr.querySelectorAll("input");
    rows.push({
      material: inputs[0].value,
      desc: inputs[1].value,
      per: inputs[2].value,
      unit: inputs[3].value,
      cost: inputs[4].value,
      total: inputs[5].value
    });
  });

  const data = {
    style,
    brand,
    colour,
    qty,
    rows
  };

  localStorage.setItem("spec_"+style, JSON.stringify(data));
  alert("Saved");

  loadSaved();
}

// LOAD SAVED PANEL
function loadSaved(){

  const panel = document.getElementById("savedPanel");
  panel.innerHTML = "<h3>Saved Styles</h3>";

  Object.keys(localStorage).forEach(key=>{
    if(!key.startsWith("spec_")) return;

    const style = key.replace("spec_","");

    const div = document.createElement("div");
    div.className = "saved-item";

    div.innerHTML = `
      ${style}
      <button onclick="editSpec('${style}')">✏ Edit</button>
      <button onclick="deleteSpec('${style}')">❌</button>
    `;

    panel.appendChild(div);
  });
}

// EDIT SPEC
function editSpec(style){

  const data = JSON.parse(localStorage.getItem("spec_"+style));
  if(!data) return;

  document.getElementById("style").value = data.style;
  document.getElementById("brand").value = data.brand;
  document.getElementById("colour").value = data.colour;
  document.getElementById("qty").value = data.qty;

  const table = document.getElementById("specTable");
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

  data.rows.forEach(r=>{
    const row = table.insertRow();
    row.innerHTML = `
      <td>${table.rows.length-1}</td>
      <td><input value="${r.material}"></td>
      <td><input value="${r.desc}"></td>
      <td><input value="${r.per}"></td>
      <td><input value="${r.unit}"></td>
      <td><input value="${r.cost}"></td>
      <td><input value="${r.total}"></td>
    `;
  });
}

// DELETE SPEC
function deleteSpec(style){
  if(confirm("Delete "+style+" ?")){
    localStorage.removeItem("spec_"+style);
    loadSaved();
  }
}

// EXPORT PDF
function exportPDF(){

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.text("Spec Sheet", 20, 20);

  let y = 40;

  document.querySelectorAll("#specTable tr").forEach(tr=>{
    let x = 20;

    tr.querySelectorAll("td,th").forEach(td=>{
      doc.text(td.innerText || td.querySelector("input")?.value || "", x, y);
      x += 40;
    });

    y += 10;
  });

  doc.save("specsheet.pdf");
}

// EXPORT EXCEL
function exportExcel(){

  const wb = XLSX.utils.book_new();
  const rows = [];

  document.querySelectorAll("#specTable tr").forEach(tr=>{
    const row = [];
    tr.querySelectorAll("td,th").forEach(td=>{
      row.push(td.innerText || td.querySelector("input")?.value || "");
    });
    rows.push(row);
  });

  const ws = XLSX.utils.aoa_to_sheet(rows);
  XLSX.utils.book_append_sheet(wb, ws, "Spec");

  XLSX.writeFile(wb, "specsheet.xlsx");
}

// INIT
loadSaved();
addRow();
