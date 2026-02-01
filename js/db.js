let db=null;

const request=indexedDB.open("BagERP_DB",1);

request.onupgradeneeded=e=>{
  db=e.target.result;
  if(!db.objectStoreNames.contains("orders")){
    db.createObjectStore("orders",{keyPath:"id",autoIncrement:true});
  }
};

request.onsuccess=e=>{
  db=e.target.result;
  document.dispatchEvent(new Event("db-ready"));
};

function addOrder(o){
  db.transaction("orders","readwrite").objectStore("orders").add(o);
}
function getOrders(cb){
  const r=db.transaction("orders","readonly").objectStore("orders").getAll();
  r.onsuccess=()=>cb(r.result);
}
function clearOrders(){
  db.transaction("orders","readwrite").objectStore("orders").clear();
}
