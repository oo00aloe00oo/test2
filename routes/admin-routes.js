const express = require ('express');
const router = express.Router();
const auth_middleware = require ('../middleware/auth-middleware');
const admin_middleware = require ('../middleware/admin-middleware');

console.log('Admin routes loaded');
router.get ('/welcome', auth_middleware, admin_middleware, (req, res)=> {
    res.json( {
        message: 'Welkommen! admin !!!'
    })
} );

module.exports = router;
