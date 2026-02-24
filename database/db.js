const mongoose = require ('mongoose');
const connect_to_db = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        // await mongoose.connect(
        //     'mongodb+srv://fugadoomer_db_user:L0PwwH1RjrhtGgTG@cluster0.wzzmetm.mongodb.net/'
        // );
        console.log('MongoDB connected successfully');

    } catch (e) {
        console.error ('MongoDB connection failed');
        process. exit(1);
    }
}

module.exports = connect_to_db