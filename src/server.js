require("dotenv").config();
const express = require('express');
const cors = require('cors');
const app = express();
const bookRoute = require('./routes/book.route')

// Swagger Import
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

// express config
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger Config
const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "LogRocket Express API with Swagger",
            version: "0.1.0",
            description:
                "This is a simple CRUD API application made with Express and documented with Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "LogRocket",
                url: "https://logrocket.com",
                email: "info@email.com",
            },
        },
        servers: [
            {
                url: "http://localhost:" + process.env.SERVER_PORT,
            },
        ],
    },
    apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);

// sequelize config
const db = require('./models');
const { errors } = require('celebrate');
db.sequelize.sync();

app.get('/', (req, res) => {
    res.send('Learning Sequelize');
});

app.use('/api/books', bookRoute)

// errors from celebrate library.
app.use(errors())


app.listen(process.env.SERVER_PORT, () => console.log(`App listening on port http://localhost:${process.env.SERVER_PORT}!`));
