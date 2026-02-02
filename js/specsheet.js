let table = document.getElementById("specTable");

function addRow(){

  let r = table.insertRow();

  r.innerHTML = `
  <td>${table.rows.length-1}</td>
  <td><input></td>
  <td><input type="number"></td>
  `;
}

function saveSpec(){

  let style = document.getElementById("style").value;
  if(!style) return alert("Enter style");

  let specs = JSON.parse(localStorage.getItem("specs") || "{}");

  let rows = [];

  for(let i=1;i<table.rows.length;i++){

    let cells = table.rows[i].cells;

    rows.push({
      material: cells[1].children[0].value,
      per: Number(cells[2].children[0].value || 0)
    });
  }

  specs[style] = { rows };

  localStorage.setItem("specs", JSON.stringify(specs));

  alert("Saved ✔");
}
