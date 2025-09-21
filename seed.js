
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/shopDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  image: String
});
const Product = mongoose.model("Product", productSchema);

const products = [
  { name: "Fender Stratocaster", category: "Guitars", price: 799, image: "img/stratocaster.jpg" },
  { name: "Yamaha P-125 Digital Piano", category: "Pianos", price: 649, image: "img/yamaha_p125.jpg" },
  { name: "Roland TD-1K Drum Set", category: "Drums", price: 499, image: "img/roland_td1k.jpg" },
  { name: "Ibanez SR300E Bass", category: "Basses", price: 349, image: "img/ibanez_sr300e.jpg" },
  { name: "Shure SM7B Microphone", category: "Recording", price: 399, image: "img/shure_sm7b.jpg" },
  { name: "Casio CT-S300", category: "Keyboards & MIDI", price: 149, image: "img/casio_cts300.jpg" }
];

Product.insertMany(products)
  .then(() => {
    console.log("Sample products inserted!");
    mongoose.connection.close();
  })
  .catch(err => {
    console.error("Error inserting products:", err);
    mongoose.connection.close();
  });
