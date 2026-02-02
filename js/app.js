let plan = {};

function addStyle(){

  const style = document.getElementById("styleSelect").value;
  const qty = Number(prompt("Enter Qty"));

  if(!style || !qty) return;

  plan[style] = { qty };

  localStorage.setItem("cutPlan", JSON.stringify(plan));

  render();
}

function render(){

  const table = document.getElementById("cutTable");

  table.innerHTML = `
    <tr>
      <th>Style</th>
      <th>Qty</th>
      <th>Delete</th>
    </tr>`;

  Object.keys(plan).forEach(style => {

    const row = table.insertRow();

    row.innerHTML = `
      <td>${style}</td>
      <td>${plan[style].qty}</td>
      <td><button onclick="del('${style}')">❌</button></td>
    `;
  });
}

function del(style){
  delete plan[style];
  localStorage.setItem("cutPlan", JSON.stringify(plan));
  render();
}

function loadDropdown(){

  const specs = JSON.parse(localStorage.getItem("specs") || "{}");

  const sel = document.getElementById("styleSelect");

  sel.innerHTML = `<option>Select Style</option>`;

  Object.keys(specs).forEach(s=>{
    sel.innerHTML += `<option>${s}</option>`;
  });
}

plan = JSON.parse(localStorage.getItem("cutPlan") || "{}");

loadDropdown();
render();
