const specs = JSON.parse(localStorage.getItem("specs") || "{}");
const cutting = JSON.parse(localStorage.getItem("cutPlan") || "{}");

const wrap = document.getElementById("materialWrap");

let total = {};

Object.keys(cutting).forEach(style=>{

  const qty = cutting[style].qty;

  const spec = specs[style];

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
    <tr>
      <th>Material</th>
      <th>Total Required</th>
    </tr>`;

  Object.keys(total).forEach(m=>{
    html+=`<tr>
      <td>${m}</td>
      <td>${total[m].toFixed(2)}</td>
    </tr>`;
  });

  html+="</table>";

  wrap.innerHTML = html;
}
