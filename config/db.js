const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true

        }, () => console.log("Db connected"))
    } catch (error) {
        console.log('Error : ' + error);
        process.exit(1)

    }
}

module.exports = connectDB;