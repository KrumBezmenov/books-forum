const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const { authMiddleware } = require("./middlewares/authMiddeware");

const port = process.env.PORT || 4000;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.json());
app.use(authMiddleware);

app.use(routes);

mongoose
  .connect(`mongodb://127.0.0.1:27017/books-rest-server`)
  .then(() => {
    console.log(`DB Connected`);
    app.listen(port, () =>
      console.log(`Server is listening on http://localhost:${port}`)
    );
  })
  .catch((err) => {
    console.log(`Cannot connect to DB`);
    console.log(err);
  });
