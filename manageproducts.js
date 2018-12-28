const productMangingList=[
    {id:1,name:"Danone Curd",price:3,typeofproduct:"curd",suppliers:"Danone",quantity:12},
    {id:2,name:"Viva Milk",price:6.50,typeofproduct:"milk",suppliers:"Viva",quantity:6},
    {id:3,name:"Tilda Basmatic Rice",price:3,typeofproduct:"rice",suppliers:"VT cash and carry",quantity:10},
    {id:4,name:"Amul Ghee",price:3,typeofproduct:"ghee",suppliers:"Durga Suppliers",quantity:2}
    ]
    function getProductMangingList(){
        return productMangingList;
    }
    module.exports.productMangingList=getProductMangingList;
    //ProductsMangingList
    //console.log(productMangingList);
    //Users List
    //const userList=require('ecommerceuserlist');
    //console.log(userList.getUsersList());
    //Suppliers List
    //const suppliersList=require('suppliers');
    //console.log(suppliersList.getSuppliers());
    //Bankers List
    //const bankersList=require('bankers');
    //console.log(bankersList.bankinglist());
    