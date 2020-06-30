const express = require('express');

const app = express();
const connectDb = require('./config/db');

const port = process.env.PORT || 8000;

connectDb();

app.use('/', require('./routes/user'));
app.use('/', require('./routes/auth'));
app.use('/', require('./routes/profile'));
app.use('/', require('./routes/posts'));

app.listen(port, () => console.log(`server is running on port: ${port}`));
