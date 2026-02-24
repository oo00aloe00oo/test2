require ('dotenv').config();

const express = require ('express');
const connect_to_db = require ('./database/db');
const auth_routes = require ('./routes/auth-routes');
const { register_user, login_user } = require ('./controllers/auth-controller');
const home_routes  = require ('./routes/home-routes');
const admin_routes = require ('./routes/admin-routes');

const upload_image_routes = require ( './routes/image-routes' );

connect_to_db ();

const app = express ();
const PORT = process.env.PORT || 3000;

app.use(express.json () )

// app.use('/api/auth', register_user);
app.use('/api/auth' , auth_routes);
app.use('/api/home' , home_routes);
app.use('/api/admin', admin_routes);

app.use('/api/image', upload_image_routes);

auth_routes
app.listen( PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
})


