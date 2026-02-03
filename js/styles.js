function createStyle(name){
if(!name) return;
if(!DB.styles[name]){
DB.styles[name]={brand:"",finish:"",remarks:"",bom:[]};
saveDB();
}
}

function getStyle(name){
return DB.styles[name] || null;
}

function saveStyle(name,data){
DB.styles[name]=data;
saveDB();
}

function getAllStyles(){
return Object.keys(DB.styles);
}
