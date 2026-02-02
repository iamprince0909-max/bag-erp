console.log("APP STARTED");

/* ---------- LOAD STORAGE ---------- */

let specs = JSON.parse(localStorage.getItem("specSheets")) || {};
let plan = JSON.parse(localStorage.getItem("cuttingPlan")) || {};

console.log("Loaded specs:", specs);
console.log("Loaded plan:", plan);

/* ---------- INIT ---------- */

window.onload = () => {

  buildDropdown();
  renderTable();
};

/* ---------- DROPDOWN ---------- */

function buildDropdown(){

  const select = document.getElementById("styleSelect");

  if(!select){
    console.log("Dropdown not found");
    return;
  }

  select.innerHTML = `<option value="">Select Style</option>`;

  Object.keys(specs).forEach(style => {

    const opt = document.createElement("option");
    opt.value = style;
    opt.textContent = style;

    select.appendChild(opt);
  });

  console.log("Dropdown built");
}

/* ---------- ADD STYLE ---------- */

function addFromSpec(){

  const select = document.getElementById("styleSelect");
  const style = select.value;

  console.log("Add clicked:", style);

  if(!style){
    alert("Select style first");
    return;
  }

  if(plan[style]){
    alert("Already added");
    return;
  }

  const data = specs[style] || {};

  plan[style] = {
    qty: 0,
    colour: data.colour || data.Colour || ""
  };

  savePlan();
  renderTable();
}

/* ---------- TABLE ---------- */

function renderTable(){

  const table = document.getElementById("cutTable");

  if(!table){
    console.log("Table not found");
    return;
  }

  table.innerHTML = `
  <tr>
    <th>Style</th>
    <th>Colour</th>
    <th>Qty</th>
    <th>Delete</th>
  </tr>`;

  Object.keys(plan).forEach(style => {

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${style}</td>
      <td>${plan[style].colour || ""}</td>
      <td>
        <input type="number"
          value="${plan[style].qty}"
          onchange="updateQty('${style}',this.value)">
      </td>
      <td>
        <button onclick="removeStyle('${style}')">❌</button>
      </td>
    `;

    table.appendChild(row);
  });

  console.log("Table rendered");
}

/* ---------- QTY UPDATE ---------- */

function updateQty(style,val){

  console.log("Qty update:", style, val);

  plan[style].qty = Number(val);

  savePlan();
}

/* ---------- DELETE ---------- */

function removeStyle(style){

  delete plan[style];

  savePlan();
  renderTable();
}

/* ---------- SAVE ---------- */

function savePlan(){

  localStorage.setItem("cuttingPlan", JSON.stringify(plan));

  console.log("Plan saved:", plan);
}
