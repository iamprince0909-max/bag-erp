window.onload = buildMaterial;

function buildMaterial(){

  const container = document.getElementById("cardGrid");
  container.innerHTML = "";

  const plan = JSON.parse(localStorage.getItem("cuttingPlan")) || {};

  if(Object.keys(plan).length === 0){
    container.innerHTML = "<h2>No cutting plan found</h2>";
    return;
  }

  let totals = {};

  Object.keys(plan).forEach(style => {

    const qty = plan[style];
    const spec = JSON.parse(localStorage.getItem("spec_" + style));

    if(!spec || !spec.materials) return;

    spec.materials.forEach(m => {

      if(!m.material || !m.per) return;

      const key = m.material + " | " + (m.desc || "");

      const value = Number(m.per) * Number(qty);

      if(!totals[key]) totals[key] = 0;
      totals[key] += value;
    });
  });

  Object.keys(totals).forEach(k => {

    const [material, desc] = k.split("|");

    const card = document.createElement("div");
    card.className = "style-card";

    card.innerHTML = `
      <h3>${material}</h3>
      <p>${desc || ""}</p>
      <h2>${totals[k].toFixed(2)}</h2>
    `;

    container.appendChild(card);
  });
}
