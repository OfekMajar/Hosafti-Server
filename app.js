const express = require("express");
const userRouter = require("./routes/user.routes");
const productRouter = require("./routes/product.routes");
const groupRouter = require("./routes/group.routes");
const groceryListRouter = require("./routes/groceryList.routes");
const tokenManipulationRouter = require("./routes/tokenManipulation.routes");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/groups", groupRouter);
app.use("/api/v1/groceryLists", groceryListRouter);
app.use("/api/v1/tokenManipulation",tokenManipulationRouter)

module.exports = { app };
