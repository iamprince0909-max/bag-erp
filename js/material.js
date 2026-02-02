window.onload = loadMaterial;

function loadMaterial(){

  let totals = {};

  Object.keys(localStorage).forEach(key=>{

    if(!key.startsWith("spec_")) return;

    let spec = JSON.parse(localStorage.getItem(key));

    spec.materials.forEach(m=>{

      let need = m.per * spec.qty;

      if(!totals[m.material]){
        totals[m.material] = {unit:m.unit,total:0};
      }

      totals[m.material].total += need;

    });

  });

  render(totals);
}

function render(data){

  let table = document.getElementById("materialTable");

  table.innerHTML = `
  <tr>
    <th>Material</th>
    <th>Total Required</th>
    <th>Unit</th>
  </tr>
  `;

  Object.keys(data).forEach(name=>{

    let row = table.insertRow();

    row.innerHTML = `
      <td>${name}</td>
      <td>${data[name].total.toFixed(2)}</td>
      <td>${data[name].unit}</td>
    `;
  });

}
