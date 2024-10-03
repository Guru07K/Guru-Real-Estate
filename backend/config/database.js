const mongoose = require("mongoose");

const connectDataBase = ()=> { 
            mongoose.connect(process.env.DB_CONNECTION_STRING)
                    .then(()=> console.log(`Database connected with mongodb`) )
                    .catch((err)=> console.log(`Error connecting to database: ${err}`) );

        }

module.exports = connectDataBase;
