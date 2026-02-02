let table = document.getElementById("specTable");
let savedPanel = document.getElementById("savedPanel");

init();

function init(){
  addRow();
  renderSaved();
}

function goBack(){
  if(document.referrer){
    window.history.back();
  }else{
    window.location.href = "index.html";
  }
}

/* ---------- ADD ROW ---------- */

function addRow(){
  let row = table.insertRow();

  row.innerHTML = `
  <td>${table.rows.length-1}</td>
  <td><input></td>
  <td><input></td>
  <td><input></td>
  <td><input></td>
  <td><input></td>
  <td><input></td>
  `;
}

/* ---------- SAVE ---------- */

function saveSpec(){

  let style = document.getElementById("style").value || "";
  let brand = document.getElementById("brand").value || "";
  let colour = document.getElementById("colour").value || "";
  let qty = document.getElementById("qty").value || "";

  if(!style){
    alert("Enter style name");
    return;
  }

  let rows = [];

  for(let i=1;i<table.rows.length;i++){
    let cells = table.rows[i].querySelectorAll("input");

    rows.push({
      material: cells[0].value || "",
      desc: cells[1].value || "",
      perpcs: cells[2].value || "",
      unit: cells[3].value || "",
      cost: cells[4].value || "",
      total: cells[5].value || ""
    });
  }

  let data = {
    style,
    brand,
    colour,
    qty,
    rows
  };

  localStorage.setItem("spec_"+style, JSON.stringify(data));

  renderSaved();
  alert("Saved!");
}

/* ---------- LOAD ---------- */

function loadStyle(style){

  let data = JSON.parse(localStorage.getItem("spec_"+style));
  if(!data) return;

  document.getElementById("style").value = data.style || "";
  document.getElementById("brand").value = data.brand || "";
  document.getElementById("colour").value = data.colour || "";
  document.getElementById("qty").value = data.qty || "";

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
  </tr>`;

  data.rows.forEach((r,i)=>{
    addRow();
    let cells = table.rows[i+1].querySelectorAll("input");

    cells[0].value = r.material;
    cells[1].value = r.desc;
    cells[2].value = r.perpcs;
    cells[3].value = r.unit;
    cells[4].value = r.cost;
    cells[5].value = r.total;
  });

}

/* ---------- SAVED LIST ---------- */

function renderSaved(){

  savedPanel.innerHTML = "<h3>Saved Styles</h3>";

  for(let key in localStorage){

    if(key.startsWith("spec_")){

      let style = key.replace("spec_","");

      savedPanel.innerHTML += `
      <div class="saved-item">
        <button onclick="loadStyle('${style}')">${style}</button>
        <button onclick="deleteStyle('${style}')">❌</button>
      </div>`;
    }
  }
}

function deleteStyle(style){
  localStorage.removeItem("spec_"+style);
  renderSaved();
}

/* ---------- EXPORT PDF ---------- */

function exportPDF(){
  const { jsPDF } = window.jspdf;
  let doc = new jsPDF();

  doc.text("Spec Sheet", 20,20);

  let y = 30;

  for(let i=1;i<table.rows.length;i++){
    let row = table.rows[i];
    let text = "";

    row.querySelectorAll("input").forEach(input=>{
      text += input.value + " | ";
    });

    doc.text(text,20,y);
    y+=8;
  }

  doc.save("spec.pdf");
}

/* ---------- EXPORT EXCEL ---------- */

function exportExcel(){

  let data = [];

  for(let i=1;i<table.rows.length;i++){
    let row = [];
    table.rows[i].querySelectorAll("input").forEach(input=>{
      row.push(input.value);
    });
    data.push(row);
  }

  let ws = XLSX.utils.aoa_to_sheet(data);
  let wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Spec");
  XLSX.writeFile(wb, "spec.xlsx");
}
