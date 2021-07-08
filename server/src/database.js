import db from "./models";

db.sequelize.sync()
    .then(() => {
        console.log("Synchronized");
    })
    .catch(err => console.error(err));