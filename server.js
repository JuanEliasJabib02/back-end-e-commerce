const { app } = require("./app.js");
const { db } = require("./utils/db.util.js");
const { initModels } = require('./models/initModels')

db.authenticate()
    .then(() => console.log("db authenticated"))
    .catch(err => console.log(err));


initModels();
    
db.sync()
    .then(() => console.log("db sync"))
    .catch(err => console.log(err));


const PORT = process.env.PORT || 4000; // Para que azure pueda hacer deploy tenemos que permitir que nos de el puerto


app.listen(PORT, () => {
    console.log("Express are working");
});