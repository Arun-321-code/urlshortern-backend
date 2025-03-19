const express = require('express');
const router = express.Router();
const urlController = require('../controller/urlController')
const Auth = require('../middleware/auth')

router.post('/url',Auth,urlController.convertUrl)
router.get('/url/:shortCode',Auth,urlController.geturl)
router.put('/url',Auth,urlController.updateUrl)
router.get('/url/states/:shortCode',Auth,urlController.geturl)
router.get('/urlall',Auth,urlController.listallurl)

module.exports= router
