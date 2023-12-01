const express = require('express');
const cors = require('cors');
const app = express();
const port = 5001;
const bookRoute = require('./routes/book.route')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require('./models');
const { errors } = require('celebrate');
db.sequelize.sync();

app.get('/', (req, res) => {
    res.send('Learning Sequelize');
});

app.use('/api/books', bookRoute)

app.use(errors())


app.listen(port, () => console.log(`App listening on port http://localhost:${port}!`));
