var mySQL = require("mySQL");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "Rorick23Raven",
    database: "bamazon"
  });

var sqlQueries = function(){
    
    //queryOptions should return either arrays of JSONs or bools
    
    //Database Options

        //****************************** */
        //Account Queries
        doesAccountExist = function(emailName){connection.query("SELECT * FROM users WHERE email = '" + emailName + "'"),
            
            function(err,result){
                if(err) throw err;

                let value = false;
                value = result.length > 0;
                return value;
            }
            
        };
    
        checkPasswordForAccount = function(userEmail,userPassword){

            connection.query(`SELECT TOP 1 * FROM users WHERE ? AND ?`,[{email:userEmail},{password:userPassword}],
            function(err,result){
                if(err) throw err;
                if(result.length > 0){
                    return true;
                }else{
                    return false;
                }
            });
        };

        getAccount = function(userEmail){
            conncection.query("SELECT TOP 1 * FROM users WHERE ?",[{email:userEmail}],
            function(err,result){
                
            });
        }

        addAccount = function(account){
            connection.query(`INSERT INTO users (email,name,password,role_id)
                            VALUES(` + account.email + `,` + account.name + `,` + account.password + `,` + account.role_id + `)`, 
                        function(err,result){
                            console.log();
                            console.log("Account for " + account.email + " has been created.");
                            console.log();
                        });
                            
        };
        //END Users Queries
        //****************** */

        //********************* */
        //Product Queries

        getAllProducts = function(){
            connection.query(`SELECT * FROM products`,function(err,result){
                return result;
            });
        };





        //END Product Queries
        //********************** */




};

module.exports = sqlQueries;