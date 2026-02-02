let specs = JSON.parse(localStorage.getItem("specSheets")) || {};
let plan = JSON.parse(localStorage.getItem("cuttingPlan")) || {};

window.onload = () => {
  buildDropdown();
  renderTable();
};

/* ---------- DROPDOWN ---------- */

function buildDropdown(){

  const select = document.getElementById("styleSelect");
  select.innerHTML = `<option value="">Select Style</option>`;

  Object.keys(specs).forEach(style => {

    const opt = document.createElement("option");
    opt.value = style;
    opt.textContent = style;

    select.appendChild(opt);
  });
}

function addFromSpec(){

  const select = document.getElementById("styleSelect");
  const style = select.value;

  if(!style){
    alert("Select style first");
    return;
  }

  if(plan[style]){
    alert("Style already added");
    return;
  }

  plan[style] = {
    qty: 0,
    colour: specs[style]?.colour || specs[style]?.Colour || ""
  };

  savePlan();
  renderTable();
}

/* ---------- TABLE ---------- */

function renderTable(){

  const table = document.getElementById("cutTable");

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
}

function updateQty(style,val){

  plan[style].qty = Number(val);

  savePlan();
}

function removeStyle(style){

  delete plan[style];

  savePlan();
  renderTable();
}

/* ---------- SAVE ---------- */

function savePlan(){

  localStorage.setItem("cuttingPlan", JSON.stringify(plan));
}
