const express = require ( 'express' );

const auth_middleware = require ('../middleware/auth-middleware');
const admin_middleware = require ('../middleware/admin-middleware');

const upload_middleware = require ('../middleware/upload-middleware');

const { fetch_images_controller, upload_image_controller } = require ('../controllers/imageController');

const router = express.Router();

// upload the image
router.post ( 
    '/upload',                              //
    auth_middleware,                       //  check if user is authenticated, return user info
    admin_middleware,                      //  check if admin
    upload_middleware.single('image'),
    upload_image_controller
);

// get all images
router.get ( '/get', auth_middleware, fetch_images_controller );
module.exports = router;