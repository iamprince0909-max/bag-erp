let DB = JSON.parse(localStorage.getItem("BAG_ERP_DB")) || { styles:{} };

function saveDB(){
localStorage.setItem("BAG_ERP_DB", JSON.stringify(DB));
}
