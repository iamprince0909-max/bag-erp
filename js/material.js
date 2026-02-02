window.onload = buildMaterial;

function buildMaterial(){

  let container = document.getElementById("cardGrid");
  container.innerHTML="";

  let plan = JSON.parse(localStorage.getItem("cuttingPlan"))||{};

  let totals = {};

  Object.keys(plan).forEach(style=>{

    let qty = plan[style];
    let spec = JSON.parse(localStorage.getItem("spec_"+style));

    if(!spec) return;

    spec.materials.forEach(m=>{

      let key = m.material+"|"+m.desc;

      let value = m.per * qty;

      if(!totals[key]) totals[key]=0;

      totals[key]+=value;
    });
  });

  Object.keys(totals).forEach(mat=>{

    let [name,desc]=mat.split("|");

    container.innerHTML+=`
      <div class="style-card">
        <h3>${name}</h3>
        <p>${desc}</p>
        <h2>${totals[mat].toFixed(2)}</h2>
      </div>
    `;
  });

}
