let selected = [];

// load styles from spec sheet
function loadStyles() {
  let db = JSON.parse(localStorage.getItem("specSheets") || "{}");
  let sel = document.getElementById("styleSelect");
  sel.innerHTML = "";

  Object.keys(db).forEach(style => {
    let opt = document.createElement("option");
    opt.value = style;
    opt.textContent = style;
    sel.appendChild(opt);
  });
}

// add style to cutting table
function addStyle() {
  let style = document.getElementById("styleSelect").value;
  if (!style) return;

  let db = JSON.parse(localStorage.getItem("specSheets") || "{}");
  let data = db[style];

  selected.push({
    style: style,
    colour: data.colour || "",
    qty: data.qty || 0
  });

  renderTable();
}

// render cutting table
function renderTable() {
  let table = document.getElementById("cutTable");

  table.innerHTML = `
<tr>
<th>Style</th>
<th>Colour</th>
<th>Qty</th>
<th>Delete</th>
</tr>`;

  selected.forEach((item, i) => {
    table.innerHTML += `
<tr>
<td>${item.style}</td>
<td>${item.colour}</td>
<td>
<input type="number" value="${item.qty}"
oninput="updateQty(${i}, this.value)">
</td>
<td>
<button onclick="removeRow(${i})">❌</button>
</td>
</tr>`;
  });
}

// update qty
function updateQty(i, val) {
  selected[i].qty = Number(val);
}

// remove row
function removeRow(i) {
  selected.splice(i, 1);
  renderTable();
}

// export excel
function exportExcel() {
  let ws = XLSX.utils.json_to_sheet(selected);
  let wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Cutting");
  XLSX.writeFile(wb, "cutting_plan.xlsx");
}

// init
loadStyles();
renderTable();
