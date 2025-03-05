const express = require('express');
const router = express.Router();

// Import the API router
const apiRouter = require('./api');



router.get("/api/csrf/restore", (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
        'XSRF-Token': csrfToken
    });
});

//router.get('/hello/world', (req, res) => {
//  res.cookie('XSRF-TOKEN', req.csrfToken());
//  res.send('Hello World!');
//});

// Connect it to `/api`
router.use('/api', apiRouter);


module.exports = router;