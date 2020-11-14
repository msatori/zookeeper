const fs = require('fs');
const path = require('path');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
//require express
const express = require('express');
const PORT = process.env.PORT || 3001;
//assign to app variable so that you can chain methods to the express server later
const app = express();
//parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
//parse incoming json
app.use(express.json());
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);
app.use(express.static('public'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

//chain the listen method to the server
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`)