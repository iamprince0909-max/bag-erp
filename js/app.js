let specs = JSON.parse(localStorage.getItem("specs") || "{}");
let plan = JSON.parse(localStorage.getItem("cutPlan") || "{}");

function loadDropdown(){

  let sel = document.getElementById("styleSelect");
  sel.innerHTML = "";

  Object.keys(specs).forEach(s=>{
    sel.innerHTML += `<option>${s}</option>`;
  });
}

function addStyle(){

  let style = document.getElementById("styleSelect").value;
  let qty = Number(prompt("Enter qty"));

  if(!style || !qty) return;

  plan[style] = { qty };

  localStorage.setItem("cutPlan", JSON.stringify(plan));

  render();
}

function render(){

  let table = document.getElementById("cutTable");

  table.innerHTML = `
  <tr><th>Style</th><th>Qty</th><th>Delete</th></tr>`;

  Object.keys(plan).forEach(s=>{
    table.innerHTML += `
    <tr>
      <td>${s}</td>
      <td>${plan[s].qty}</td>
      <td><button onclick="del('${s}')">❌</button></td>
    </tr>`;
  });
}

function del(s){
  delete plan[s];
  localStorage.setItem("cutPlan", JSON.stringify(plan));
  render();
}

function exportExcel(){

  let data=[["Style","Qty"]];

  Object.keys(plan).forEach(s=>{
    data.push([s,plan[s].qty]);
  });

  let ws=XLSX.utils.aoa_to_sheet(data);
  let wb=XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb,ws,"Cutting");
  XLSX.writeFile(wb,"cutting.xlsx");
}

loadDropdown();
render();
