const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const ProductModel = require('../cart/Model/productModel.js')

console.log(ProductModel)
const app = express();
dotenv.config()
const PORT = process.env.PORT || 3000;
const MongoURL = process.env.MONGO_URL

// Connect to MongoDB
mongoose.connect(MongoURL).then(() => {
  console.log('Database connected to Database')
})


app.use(express.static(path.join(__dirname)))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/products', async (req, res) => {
  ProductModel.find({}).then(function(users){
    res.json(users)
  })
  .catch(error => console.log(error))
});
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'))
})

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
/* const express = require('express');
const mongoose = require('mongoose');
const data = require('./data.json');


const app = express();
const PORT = 3000;

fetch('http://localhost:3000/data')
  .then(res => res.json())
  .then(data => console.log("console", data))
  .catch(error => console.log(error))


app.get('/data', (req, res) => {
  
  res.json(data)
})

app.listen(PORT, () => {
  console.log(`serve is running http://localhost:${PORT}`)
}) */