window.onload = loadMaterial;

function loadMaterial(){

  let totals = {};
  let found = false;

  Object.keys(localStorage).forEach(key=>{

    if(!key.startsWith("spec_")) return;

    found = true;

    let spec = JSON.parse(localStorage.getItem(key));

    spec.materials.forEach(m=>{

      let need = m.per * spec.qty;

      if(!totals[m.material]){
        totals[m.material] = {
          unit: m.unit,
          total: 0
        };
      }

      totals[m.material].total += need;

    });

  });

  render(totals,found);
}

function render(data,found){

  let wrap = document.getElementById("materialWrap");

  if(!found){
    wrap.innerHTML = `
      <h2>No BOM data found</h2>
      <p>Create Spec Sheet first</p>
    `;
    return;
  }

  let html = `
  <table>
  <tr>
    <th>Material</th>
    <th>Total Required</th>
    <th>Unit</th>
  </tr>
  `;

  Object.keys(data).forEach(name=>{
    html += `
      <tr>
        <td>${name}</td>
        <td>${data[name].total.toFixed(2)}</td>
        <td>${data[name].unit}</td>
      </tr>
    `;
  });

  html += "</table>";

  wrap.innerHTML = html;
}
