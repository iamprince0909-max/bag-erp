const SPEC_URL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vTDUg2jr8nNw5ZX9SBkxitfhysESgBaSIDoUTOZWQ8vMUt1yNEoSrVm6IDTqJJLOekG_Qg2m22_N0gC/pub?output=csv";

async function loadSpecSheet(){

  const res = await fetch(SPEC_URL);
  const text = await res.text();

  const rows = text.split("\n").map(r => r.split(","));
  const headers = rows.shift();

  const data = rows.map(r=>{
    let obj={};
    headers.forEach((h,i)=>obj[h]=r[i]);
    return obj;
  });

  localStorage.setItem("specSheet",JSON.stringify(data));
}

loadSpecSheet();
