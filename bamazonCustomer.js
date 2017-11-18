var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");
const DEBUG = true;
function log(val){
  if(DEBUG) console.log(val);
}

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "Rorick23Raven",
    database: "bamazon"
  });

  var order = {
    item_id:0,
    Name:"Tony",
    price:0,
    product_quantity:0,
    purchaseAmount:0,
    totalPrice:0

  };


/**
 * ->START login or create user account(limit to role of Customer or Minor based on age, Managers and Supervisors are added via different means)
 * 
 */


  Start();

  function Start(){
    console.log("*************************");
    console.log();
    console.log("Welcome to Bamazon! The CLI Shopping Hub!");
    console.log("*************************");

    // setTimeout(function(){
      PrintProductsAndPromptToSelectProduct();
    // },2000);
    

  }

function PrintProductsAndPromptToSelectProduct(){
  
  connection.query(`SELECT  p.item_id AS 'ID',
                            p.product_name AS 'Name',
                            d.description AS 'Department',
                            '$' + p.price AS 'Price',
                            p.stock_quantity AS 'Stock'
                    FROM products p 
                    JOIN lu_departments d ON p.department_id = d.ID`,function(err,result){

    console.table(result);
    // connection.end();                    
    PromptToSelectProduct();
  }) 

}

function PromptToSelectProduct(){
  var prompt = [{
    type:"input",
    message:"Please enter a Product ID to buy or type Exit to leave:",
    name: "productID"
  }]

  inquirer.prompt(prompt).then(function(response){
    log(response.productID);
    if(response.productID == "exit"){
      ExitProgram();
    }
    else if(isNaN(response.productID)){
      console.log();
      console.log("Sorry - that was not an ID number.")
      console.log();
      PromptToSelectProduct();
    }else{
      // log("promptTOSelectProduct 88");
      connection.query(`SELECT  * from products WHERE item_id = ?`,[parseInt(response.productID)],function(err,results){
        if(err) throw err;
 
        
        if(results.length == 0){
          console.log();
          console.log("Sorry - that was not a valid Product ID.");
          console.log();
          PromptToSelectProduct();
        }else{
          //  log("Length: " + results.length);
          //  log(results);

          console.log("You have selected " + results[0].product_name);

          order.item_id = results[0].item_id;
          order.Name = results[0].product_name;
          order.price = results[0].price;
          order.product_quantity = results[0].stock_quantity;
          
          
          PromptProductAmountToBuy();
        }
      });
    }

  });
}



function PromptProductAmountToBuy(){
  
  prompt = [{
    type:"input",
    message: "Please enter the quatinty you wish to purchase: ",
    name:"purchaseQuantity"
  }];

  inquirer.prompt(prompt).then(function(response){
    if(isNaN(response.purchaseQuantity)){
      console.log();
      console.log("Sorry - invalid input.");
      PromptProductAmountToBuy();
    }else if(parseInt(response.purchaseQuantity) > order.product_quantity){
      console.log();
      console.log("You can only order up to " + order.product_quantity + " of " + order.Name);
      console.log();
      PromptProductAmountToBuy();
    }else{
      order.purchaseAmount = parseInt(response.purchaseQuantity);
      finalizePurchase();
    }
  });
}

function finalizePurchase(){
  var prompt = [{type:"confirm",message:"Finalize Purchase?",name:"confirmation"}];
  console.log()
  console.log(order.purchaseAmount + "x " + order.Name + " at $" + order.price);
  console.log("Total Price = $" + (order.price * order.purchaseAmount));

  inquirer.prompt(prompt).then(function(res){
    if(res){
      connection.query("UPDATE products SET stock_quantity = " + (order.product_quantity - order.purchaseAmount) + " WHERE item_id = " + order.item_id,function(err,results){
        if(err) throw err;
        console.log("Order Finalized! Thank You for your purchase!");        
      });
    }else{
      console.log("Order Canceled.");
    }
    PrintProductsAndPromptToSelectProduct();
  });

}

function ExitProgram(){
  console.log();
  console.log("Thank you for shopping on Bamazon! Please visit us again!");
  console.log();
  connection.end();
}
 
