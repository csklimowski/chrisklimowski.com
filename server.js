const express = require('express');
const path = require('path');

// initialize server
const app = express();
app.use(express.json());

// serve static files
app.use('/', express.static(path.resolve('./dist')));

// test API
app.get('/api/test', (req, res) => {
    res.send('test');
});

app.listen(8001, function () {
    console.log(`App listening to 8001....`);
    console.log('Press Ctrl+C to quit.');
});
