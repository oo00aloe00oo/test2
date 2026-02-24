const Image = require ( '../models/Image' );
const { upload_to_cloudinary } = require ( '../helpers/cloudinaryHelper' );
const fs = require ('fs');

const upload_image_controller = async ( req, res ) => {

    try {
        //check file is missing
        if( !req.file ){
            return res.status(400).json (
                {
                    success:false,
                    message: 'No file uploaded @upload_image'
                }
            )
        }

        // upload to cloudinary
        const { url, public_id } = await upload_to_cloudinary(req.file.path);

        //store the image url and public id along with the user id in the database
        const newly_uploaded_image = new Image ( {
            url, 
            public_id,
            uploaded_by: req.userInfo.user_id
        })

        await newly_uploaded_image.save();

        // delete the local file after upload 6:41:29
        fs.unlinkSync( req.file.path );
        res.status(201).json (
            {
                success: true,
                message: 'Image uploaded successfully @upload_image',
                image: newly_uploaded_image
            }
        );
    } catch (e) {

        console.log(e);
        res.status ( 500 ).json (
            {
                success: false,
                message: 'Image upload failed @upload_image',
            }
        );

    }

}

const fetch_images_controller = async (req, res ) => {
    try {
        const images = await Image.find ( {});
        if( images ) { 
            res.status ( 200 ).json ( 
                {
                    success : true,
                    data : images,
                }
            );
        }
    }catch(e) {
        console.log(e);
        res.status (500 ).json (
            {
                success : false,
                message : 'error @fetch_images_controller'
            }
        )
    }
}

module.exports  = {
    upload_image_controller,
    fetch_images_controller
    
}