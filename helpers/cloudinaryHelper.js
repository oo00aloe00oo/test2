const cloudinary = require ( '../config/cloudinary' );

const upload_to_cloudinary = async (file_path) => {

    try{

        const result = await cloudinary.uploader.upload ( file_path)

        return {
            url         : result.secure_url,
            public_id   : result.public_id  
        }

    } catch (e) {

        console.error('Error uploading to Cloudinary:', e);
        throw new Error('Cloudinary upload failed');
        
    }

}

module.exports = {
    upload_to_cloudinary
}