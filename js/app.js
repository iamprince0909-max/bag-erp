function savePlan(){

  let plan = {};

  document.querySelectorAll(".style-card").forEach(card=>{
    let style = card.dataset.style;
    let qty = parseFloat(card.querySelector("input").value)||0;

    if(qty>0) plan[style]=qty;
  });

  localStorage.setItem("cuttingPlan",JSON.stringify(plan));

  alert("Cutting plan saved");
}
