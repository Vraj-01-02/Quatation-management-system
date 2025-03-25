   const mongoose = require("mongoose");
   require('dotenv').config()


   async function connect() {
       try {
           mongoose.connect(process.env.MONGODB_URL);
           console.log("MONGODB_URL:", process.env.MONGODB_URL);
           console.log("Mongodb connected successfully");
       } catch (error) {
           console.log("Error in mongodb connection:", error);
           process.exit(1);
       }
   }

   module.exports = connect;