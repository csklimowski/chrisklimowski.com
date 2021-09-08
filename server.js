const express = require('express');
const apiRoutes = require('./api');
const path = require('path');

// initialize server
const app = express();
app.use(express.json());

// serve static files
app.use('/projects/ogopogo', (req, res) => {
    return res.redirect(301, 'https://otteretto.app');
});
app.use('/projects/otteretto', (req, res) => {
    return res.redirect(301, 'https://otteretto.app');
});

app.use('/', express.static(path.resolve('./dist')));
app.use('/api/', apiRoutes);

// test API
app.get('/api/test', (req, res) => {
    res.send('test');
});

app.listen(8001, function () {
    console.log(`App listening to 8001....`);
    console.log('Press Ctrl+C to quit.');
});
