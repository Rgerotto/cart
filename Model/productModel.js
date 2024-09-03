const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    id: Number,
    name: String,
    price: Number,
    quantity: Number,
    imageUrl: String,
    description: String
  });
  
  //export default mongoose.model('eproducts', ProductSchema)
  const ProductModel = mongoose.model('eproducts', ProductSchema);