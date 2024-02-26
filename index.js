const {app} = require("./app")
const mongoose=require("mongoose")
const {config}=require("./config")
const {MONGO_URL}=config

mongoose
  .connect(MONGO_URL,{socketTimeoutMS: 45000})
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

 
const PORT = process.env.PORT || 1010;
app.listen(PORT, () => {
  console.log(`the server is running on port ${PORT}`);
});
