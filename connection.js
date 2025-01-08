const mongoose = require("mongoose");

async function connectedMongoDb(url){
  return  mongoose.connect(url)
 
};

module.exports = {
    connectedMongoDb,
}