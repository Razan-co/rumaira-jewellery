
const pool = require('./db');

// const { toTitleCase } = require('../lib/common-function/toTittleCase');


var order = {
    getAllOrder: function (req, callback) {
        pool.query(`SELECT o.*, 
              p.*, pt.*
        FROM orders o
        LEFT JOIN profile_users p ON o.user_id = p.id
        LEFT JOIN product pt ON o.product_id = pt.id`, function (err, result) {
            if (err) {
                response={
                    status:false,
                    message:"Error!! while fetching datas"
                }
         
                callback(err,response);
            }
               else {
               
                callback(null, result.rows);

            }

        });

    },
   
    addOrder: function (req, callback) {
  
      
        pool.query("INSERT INTO orders (user_id,total_price,status,product_id,quantity) VALUES ($1,$2,$3,$4,$5)", [req.user_id,req.total_price,req.status,req.product_id,req.quantity], function (err, result) {
        //    console.log(err,result );
            //    console.log(req,"req" );
            response={
                status:false,
                message:"Error!! while Inserting datas"
            }
            if (err) {
         
                callback(err, response);
            }
                else if(result.rowCount==0){
                callback("Error!!",response);

                }else {
                 
                callback(null, result);
            }

        });

    },
    getOrderById: function (req, callback) {
        
        pool.query(`SELECT o.*, 
              p.*, pt.*
        FROM orders o
        LEFT JOIN profile_users p ON o.user_id = p.id
        LEFT JOIN product pt ON o.product_id = pt.id  where p.id=$1`,[req.params.id], function (err, result) {
            response={
                status:false,
                message:"Error!! while fetching datas"
            }
            if (err) {
         
                callback(err, response);
            }
                else if(result.rowCount==0){
                callback("Error!!",response);

                } else {
               
                callback(null, result.rows);

           
            }

        });

    },
    updateOrder: function (req, callback) {
        const { user_id, total_price, status,product_id,quantity} = req.body;
        const{id}=req.params;
        pool.query(`UPDATE orders SET user_id=$1, total_price=$2, status=$3, product_id=$4, quantity=$5 WHERE id =$6`, [user_id, total_price, status,product_id,quantity, id], function (err, result) {
            console.log(err,"update");
            
            response={
                status:false,
                message:"Error!! while updating datas"
            }
            if (err) {
         
                callback(err,response);
            }
                else if(result.rowCount==0){
                callback("Error!!",response);

                } else {
               
                callback(null, result);
            }
        

        });

    },
    deleteorder: function (req, callback) {
        pool.query(
            `DELETE FROM orders WHERE id=$1`,
            [req.params.id],
            function (err, result) {
                if (err) {
                    
                    callback(err, 'Error!! while Deleting datas');
                } else if (result.rowCount == 0) {
                    callback('Error!! while Deleting datas', 'Error!!');
                } else {
                    callback(null, result);
                }
            }
        );
    },
}

module.exports = order;