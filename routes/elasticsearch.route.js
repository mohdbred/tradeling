const express = require('express');
const router = express.Router();
const elasticsearch_controller = require('../controllers/elasticsearch.controller');
const { validateRequest } = require('../middlewares/validate.middleware');


router.get('/ping',
    validateRequest,
    elasticsearch_controller.ping);

router.post('/initIndex',
    validateRequest,
    elasticsearch_controller.initIndex);

router.post('/indexExists',
    validateRequest,
    elasticsearch_controller.indexExists);

router.post('/initMapping',
    validateRequest,
    elasticsearch_controller.initMapping);

router.post('/addDocument',
    validateRequest,
    elasticsearch_controller.addDocument);

router.post('/updateDocument',
    validateRequest,
    elasticsearch_controller.updateDocument);

router.post('/search',
    validateRequest,
    elasticsearch_controller.search);

module.exports = router;