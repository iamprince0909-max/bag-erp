let currentSpec = { rows: [] };

function addRow(){

  const table = document.getElementById("specTable");

  const r = table.insertRow();

  r.innerHTML = `
    <td>${table.rows.length-1}</td>
    <td><input></td>
    <td><input></td>
    <td><input type="number"></td>
    <td><input></td>
    <td><input type="number"></td>
    <td></td>
  `;
}

function saveSpec(){

  const style = document.getElementById("style").value;

  const table = document.getElementById("specTable");

  currentSpec.rows = [];

  for(let i=1;i<table.rows.length;i++){

    const cells = table.rows[i].cells;

    const row = {
      material: cells[1].children[0].value,
      desc: cells[2].children[0].value,
      per: Number(cells[3].children[0].value || 0),
      unit: cells[4].children[0].value,
      cost: Number(cells[5].children[0].value || 0)
    };

    currentSpec.rows.push(row);
  }

  let specs = JSON.parse(localStorage.getItem("specs") || "{}");

  specs[style] = currentSpec;

  localStorage.setItem("specs", JSON.stringify(specs));

  alert("Spec saved");
}
