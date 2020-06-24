const mongoose = require('mongoose');

try {
    const user_bd = process.env.USER_BD;
    const password_bd = process.env.PASSWORD_BD;

    //----> Banco atlasDB
    const con = `mongodb+srv://${user_bd}:${password_bd}@cluster0-afrey.mongodb.net/test?retryWrites=true&w=majority`;
    mongoose.connect(con, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    
    // docker run --name mongo -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=root -d -p 27017:27017 -p 28017:28017 mongo 
    //----> Banco localhost
    // const con = `mongodb://${user_bd}:${password_bd}@localhost:27017/admin`;
    // mongoose.connect(con, {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true
    // });

    //----> Banco no docker
    // const con = `mongodb://db:27017/admin`;
    // mongoose.connect(con, {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true
    // });

} catch (error) {
    console.log('Error connect DataBase', error.message | error);
}