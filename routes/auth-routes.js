const express = require ('express');
const { register_user , login_user }  = require ('../controllers/auth-controller');
const router = express.Router ();

//  all routes are related to authentication and authorization
router.post ('/register', register_user);
router.post ('/login', login_user);


module.exports = router;