const {mongoose } = require("mongoose");
const dbconnect = ()=>{
   mongoose
     .connect(process.env.MONGDB)
     .then(() => {
       console.log("mongodb is connected");
     })
     .catch((e) => console.log(e));
}
module.exports = dbconnect;