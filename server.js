const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const multer = require('multer');

const app = express();
dotenv.config();
const PORT = process.env.PORT || 4000;
const MongoURL = process.env.MONGO_URL;

// Connect to MongoDB
mongoose.connect(MongoURL).then(() => {
  console.log('Database connected');
});

// Define Mongoose Schema and Model
const ProductSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  quantity: Number,
  imageUrl: String,
  description: String
});

const ProductModel = mongoose.model('eproducts', ProductSchema);

// Middleware setup
app.use(express.urlencoded({ extended: true })); // Use express.urlencoded for body parsing
app.use(express.static(__dirname));

app.use('/assets', express.static(path.join(__dirname, 'assets')));

const productDir = path.join(__dirname, 'assets', 'img', 'products')
// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, productDir); // Specify the upload directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({ storage: storage });

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/products', async (req, res) => {
  try {
    const products = await ProductModel.find({});
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

app.post('/add_new_product', upload.single('product_file'), async (req, res) => {
  try {
    const { product_name, product_description, product_quantity, product_price, product_id } = req.body;
    
   // Construct the new product object
    const newProduct = new ProductModel({
      id: product_id,
      price: product_price,
      name: product_name,
      quantity: product_quantity,
      description: product_description,
      imageUrl: req.file ? `../assets/img/products/${req.file.filename}` : '' // Use the generated filename
    });

    // Save the product to the database
    await newProduct.save();

    res.status(201).send('Product added successfully');
  } catch (error) {
    console.error('Error adding product:', error); // Log any errors
    res.status(500).send('Error adding product');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
