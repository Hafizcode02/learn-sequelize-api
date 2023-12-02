require("dotenv").config();
const express = require('express');
const cors = require('cors');
const app = express();
const { errors } = require('celebrate');
const bookRoute = require('./routes/book.route')
const { initializeDatabase } = require("./models/");

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

app.get('/', (req, res) => {
    res.send('Learning Sequelize');
});

// books route
app.use('/api/books', bookRoute)
// users route
require("./routes/user.route.js")(app);

// errors from celebrate library.
app.use(errors())

// starting server
const startServer = async () => {
    try {
        await initializeDatabase();

        // Start server
        const PORT = process.env.SERVER_PORT || 8080;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}.`);
        });
    } catch (error) {
        console.error(
            "Server failed to start due to database initialization error:",
            error.message
        );
    }
};

startServer();

// app.listen(process.env.SERVER_PORT, () => console.log(`App listening on port http://localhost:${process.env.SERVER_PORT}!`));
