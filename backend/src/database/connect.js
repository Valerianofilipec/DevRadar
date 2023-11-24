import mongoose from 'mongoose';
const DB_CONNECT = process.env.DB_CONNECT, DB_NAME = process.env.DB_NAME;

const dbConnect = mongoose.connect(DB_CONNECT,{
    dbName: DB_NAME,
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

export {dbConnect};