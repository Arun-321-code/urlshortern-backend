const express = require('express');
const router = express.Router();
const urlController = require('../controller/urlController')

router.post('/url',urlController.convertUrl)
router.get('/url/:shortCode',urlController.geturl)
router.put('/url',urlController.updateUrl)
router.get('/url/states/:shortCode',urlController.geturl)
router.get('/urlall',urlController.listallurl)

module.exports= router