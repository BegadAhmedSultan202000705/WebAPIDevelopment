const express = require("express");

const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const swaggerJSDoc = require("swagger-jsdoc");

const swaggerUi = require("swagger-ui-express");

const { verifyToken } = require("./middleware/token_verfiy");

const { authRoutes } = require("./routes/auth");
const { accessTokenRoutes } = require("./routes/accessToken");
const { recipeRoutes } = require("./routes/recipe");

const routes = express.Router();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Recipe API",
      version: "1.0.0",
      description: " managing recipes API",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
  },
  apis: [
    "./routes/recipe.js",
    "./routes/auth.js",
    "./routes/accesstoken.js",
    "./service/spoonacular.js",
  ],
};
const swaggerDocs = swaggerJSDoc(swaggerOptions);
dotenv.config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 204,
  })
);
app.use(routes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send("Welcome");
});

app.use("/api/auth", authRoutes);
app.use("/api/accessToken", verifyToken, accessTokenRoutes);
app.use("/api/recipe", verifyToken, recipeRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("App has started");
    app.listen(process.env.PORT);
  });
