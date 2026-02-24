const User = require ('../models/User');
const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');

// register controller
const register_user = async ( req, res ) => {
    try {
        // console.log ( "\n=====================\n req.body : ", req.body, "\n=====================\n");
        //  get info from front end
        const { user_name, email, password, role } = req.body;
        // console.log ( " >> user_name : " , user_name);
        // console.log ( " >> email :     " , email);
        // console.log ( " >> password :  " , password);
        // console.log ( " >> role :      " , role);

        //check if the user is already exist in the DB
        const check_existing_user = await User.findOne( { $or : [ { user_name } , { email } ] } );
        // console.log("check_existing_user : ", check_existing_user);
        if( check_existing_user ) {

            return res.status (400). json ( 
                {
                    success : false,
                    message : 'User already exists @register_user'
                }
            );

        }
        console.log("=====================\n <<< hashed_password >>> \n=====================\n");
        // 5:09:31
        // hash user password, 10 is the seed for rand gen
        const salt = await bcrypt.genSalt (10);
        const hashed_password = await bcrypt.hash ( password , salt);

        // create a new user and save into the DB
        const newly_createed_user = new User (
            {
                user_name ,
                email ,
                password : hashed_password ,
                role: role || 'user'
            }
        );

        await newly_createed_user.save();

        if ( newly_createed_user ) {
            res.status (201).json( 
                {
                    success: true,
                    message: 'user registration success @ register_user'
                }
            )
        } else {
            res.status(404).json (
                {
                    success : false,
                    message: 'user registration failed @ register_user'
                }
            )
        }

    } catch (e) {
        console.log (e);
        res.status (500). json ( {
            success : false, 
            message : 'Some error occured @ register_user'
        })
    }
}


// login controller
const login_user = async ( req, res ) => {

    try {

        const { user_name, password } = req.body;
    
        // find if the current user exists within databse
        const user = await User.findOne ( { user_name} );

        if( !user ) {
            return res.status (400) .json ( {
                success : false,
                message : 'User not found @login_user, !user'
            })
        }

        // compare password
        const is_password_match = await bcrypt.compare( password, user.password);

        if( !is_password_match ) {
            return res.status (400) .json ( {
                success : false,
                message : 'Invalid password @login_user, !is_password_match'
            })
        } 

        // create a user access token
        const access_token = jwt.sign ( 
            {
                user_id     : user._id,
                user_name   : user.user_name,
                role        : user.role
            }, process.env.JWT_SECRET_KEY, {
                expiresIn: '15m'
            }
        );

        res.status(200).json( {
            success : true,
            message : 'Login successful @login_user',
            access_token
        })

    } catch (e) {
        console.log (e);
        res.status (500). json ( {
            success : false, 
            message : 'Some error occured @ login_user'
        })
    }

}

module.exports = { register_user , login_user } ; 