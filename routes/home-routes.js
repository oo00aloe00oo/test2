const express = require('express');
// const { route } = require ('./auth-routes');
const router = express.Router();
const auth_middleware = require ('../middleware/auth-middleware');

router.get ('/welcome', auth_middleware, ( req, res ) => {
    const { user_name, user_id, role} = req.userInfo;

    res.json ({
        message: 'welkommen!! Das ist Homepage!',
        user : {
            _id: user_id,
            user_name,
            role
        }
    }
    )
});

module.exports = router;