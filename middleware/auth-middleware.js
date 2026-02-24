const jwt = require ( 'jsonwebtoken')

const auth_middleware = (req, res, next) => {

    console.log ('auth middleware is called');
    const auth_header = req.headers['authorization'];
    // console.log(auth_header);
    const token = auth_header && auth_header.split(' ')[1];

    console.log(token);

    if(!token) {
        return res.status(401).json({ 
            success: false,
            message: 'Unauthorized @auth_middleware' });
    }

    try {

        const decoded_token_info = jwt.verify(  token, process.env.JWT_SECRET_KEY   );
        console.log( 'decoded_token_info : ', decoded_token_info );

        req.userInfo = decoded_token_info;

    }catch (e){

        return res.status(401).json({ 
            success: false,
            message: 'wrong token input' });
    }
    next();
    
}

module.exports = auth_middleware;
