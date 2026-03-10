const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

console.log("Conectando a", url);

mongoose
  .connect(url)
  .then((result) => {
    console.log("✅ Conectado con éxito a MongoDB Atlas");
  })
  .catch((error) => {
    console.log("❌ Error conectando a MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
  },
  number: {
    type: String,
    required: true,
    minlength: 2,
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema, "People");
