const express   = require('express');
const csrf      = require('csurf');
const router    = express();

const homeController = require('../controller/home-controller');

const csrfProtection = csrf();
router.use(csrfProtection);

/* Get The home page with list of fitness option */
router.route('/').get(homeController.getHome);
router.route('/').post(homeController.sendContactForm);
router.route('/blog').get(homeController.getBlog);
module.exports = router;
