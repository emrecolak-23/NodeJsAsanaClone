// Import package
const mongoose = require('mongoose');

const db = mongoose.connection;

db.once('open', ()=> {
  console.log('DB bağlantısı tamamlandı');
})

const connectDB = async () => {
  await mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}

module.exports = {
  connectDB
}