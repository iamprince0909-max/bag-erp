let specs = JSON.parse(localStorage.getItem("specs") || "{}");
let plan = JSON.parse(localStorage.getItem("cutPlan") || "{}");

let total = {};

Object.keys(plan).forEach(style=>{

  let qty = plan[style].qty;
  let spec = specs[style];

  if(!spec) return;

  spec.rows.forEach(r=>{

    if(!total[r.material]) total[r.material]=0;

    total[r.material] += r.per * qty;
  });
});

render();

function render(){

  let html = `
  <table>
  <tr><th>Material</th><th>Total Required</th></tr>`;

  Object.keys(total).forEach(m=>{
    html += `<tr>
    <td>${m}</td>
    <td>${total[m].toFixed(2)}</td>
    </tr>`;
  });

  html += "</table>";

  document.getElementById("materialWrap").innerHTML = html;
}
