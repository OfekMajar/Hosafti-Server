const {app} = require("./app")
const mongoose=require("mongoose")
const url= "mongodb://localhost:27017/Hosafti"


mongoose
  .connect(url,{socketTimeoutMS: 45000})
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

  const connection=async()=>{
    try {
      const connectionParams={
        useNewUrl
      }
    } catch (error) {
      
    }
  }
const PORT = process.env.PORT || 1010;
app.listen(PORT, () => {
  console.log("the server is running");
});
