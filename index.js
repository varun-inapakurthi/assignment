const express = require('express');
const dotenv = require('dotenv')
const app = express();

const connectDB = require('./config/db');
dotenv.config();
connectDB()

const PORT = process.env.PORT || 5000


const userRoutes = require('./routes/userRoutes')
const buyerRoutes = require('./routes/buyerRoutes')
const sellerRoutes = require('./routes/sellerRoutes')

app.use(express.json());

app.use('/api/auth', userRoutes)
app.use('/api/buyer', buyerRoutes)
app.use('/api/seller', sellerRoutes)


app.listen(PORT, () => console.log(`Server started at ${PORT}`))