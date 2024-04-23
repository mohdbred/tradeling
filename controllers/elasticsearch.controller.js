const { elasticsearchService } = require('../services');
const HTTP_STATUS = require('http-status');
const { RESPONSE_STATUS } = require("../constants/commonConstant");

const ping = async (req, res) => {
    try {

        let response = await elasticsearchService.ping()
        
        return res.status(HTTP_STATUS.OK).json({ status: RESPONSE_STATUS.OK, data: response  });
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
            .json({ status: RESPONSE_STATUS.ERROR, message: error.message });
    }
};

const initIndex = async (req, res) => {
    try {
        let indexName = req.body.indexName;
        let response = await elasticsearchService.initIndex(indexName)
        
        return res.status(HTTP_STATUS.OK).json({ status: RESPONSE_STATUS.OK, data: response  });
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
            .json({ status: RESPONSE_STATUS.ERROR, message: error.message });
    }
};

const indexExists = async (req, res) => {
    try {
        let indexName = req.body.indexName;
        let response = await elasticsearchService.indexExists(indexName)
        
        return res.status(HTTP_STATUS.OK).json({ status: RESPONSE_STATUS.OK, data: response  });
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
            .json({ status: RESPONSE_STATUS.ERROR, message: error.message });
    }
};

const initMapping = async (req, res) => {
    try {
        const { indexName, docType, payload } = req.body;
        let response = await elasticsearchService.initMapping(indexName, docType, payload)
        
        return res.status(HTTP_STATUS.OK).json({ status: RESPONSE_STATUS.OK, data: response  });
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
            .json({ status: RESPONSE_STATUS.ERROR, message: error.message });
    }
};

const addDocument = async (req, res) => {
    try {
        const { indexName, _id, docType, payload } = req.body;
        let response = await elasticsearchService.addDocument(indexName, _id, docType, payload)
        
        return res.status(HTTP_STATUS.OK).json({ status: RESPONSE_STATUS.OK, data: response  });
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
            .json({ status: RESPONSE_STATUS.ERROR, message: error.message });
    }
};

const updateDocument = async (req, res) => {
    try {
        const { index, _id, docType, payload } = req.body;
        let response = await elasticsearchService.updateDocument(index, _id, docType, payload)
        
        return res.status(HTTP_STATUS.OK).json({ status: RESPONSE_STATUS.OK, data: response  });
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
            .json({ status: RESPONSE_STATUS.ERROR, message: error.message });
    }
};

const search = async (req, res) => {
    try {
        const { indexName, _id, docType, payload } = req.body;
        let response = await elasticsearchService.search(indexName , _id, docType, payload)
        
        return res.status(HTTP_STATUS.OK).json({ status: RESPONSE_STATUS.OK, data: response  });
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
            .json({ status: RESPONSE_STATUS.ERROR, message: error.message });
    }
};

module.exports = {
    ping,
    initIndex,
    indexExists,
    initMapping,
    addDocument,
    updateDocument,
    search
};