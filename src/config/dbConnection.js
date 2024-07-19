

const mongoose = require('mongoose');


const dbConnection = async() => {
try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log('### DB CONNECTED ### -',connect.connection.host,connect.connection.name);
    
} catch (error) {
    console.log('### DB Not CONNECTED ### -');
    console.log(error.message);
}



}
module.exports = dbConnection;