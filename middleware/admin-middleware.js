
const is_admin_user = (req, res, next) => {

    if ( req.userInfo.role !== 'admin'){

        return res.status(403).json ( 
            {
                success:false,
                message : 'access denied @is_admin_user'
            }
        )

    }

    next();

}

module.exports = is_admin_user;
