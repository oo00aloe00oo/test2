const mongoose = require ('mongoose');

const user_schema = new mongoose.Schema ( 

    {
        user_name : {
            type : String,
            required :true,
            unique : true, // ?
            trim : true
        },
        email : {
            type : String,
            unique : true,
            trim : true,
            lowercase : true
        },
        password : {
            type : String,
            required : true
        },
        role : {
            type : String,
            enum : ['user', 'admin' ],
            default : 'user' 
        }
        
    } , {

        timestamps : true
    
    }
);

module.exports = mongoose.model('User', user_schema);
