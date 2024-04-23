var elasticsearch = require('elasticsearch');
var elasticClient = new elasticsearch.Client({
	host: 'localhost:9200',
	log: 'trace'
});


module.exports = {
	ping: async function () {
		try {
			await elasticClient.ping({
				requestTimeout: 30000,
			}, function (error) {
				if (error) {
					return 'Elasticsearch cluster is down!'
				} else {
					return 'Success! Elasticsearch cluster is up!'
				}
			});
		} catch (err) {
			return err
		}
	},

	// 1. Create index
	initIndex: function (indexName) {
		try {
			elasticClient.indices.create({
				index: indexName
			}).then(function (resp) {
				// console.log(resp);
				return res.json(resp)
			}, function (err) {
				// console.log(err.message);
				return res.json(err)
			});
		} catch (err) {
			return err
		}
	},

	// 2. Check if index exists
	indexExists: function (indexName) {
		try {
			elasticClient.indices.exists({
				index: indexName
			}).then(function (resp) {
				// console.log(resp);
				return true
			}, function (err) {
				// console.log(err.message);
				return false
			});
		} catch (err) {
			return err
		}
	},

	// 3.  Preparing index and its mapping
	initMapping: function (indexName, docType, payload) {
		try {
			elasticClient.indices.putMapping({
				index: indexName,
				type: docType,
				body: payload
			}).then(function (resp) {
				return res.json(resp)
			}, function (err) {
				return res.json(err)
			});
		} catch (err) {
			return err
		}
	},

	// 4. Add/Update a document
	addDocument: function (indexName, _id, docType, payload) {
		try {
			elasticClient.index({
				index: indexName,
				type: docType,
				id: _id,
				body: payload
			}).then(function (resp) {
				// console.log(resp);
				return res.json(resp)
			}, function (err) {
				// console.log(err.message);
				return res.json(err)
			});
		} catch (err) {
			return err
		}
	},

	// 5. Update a document
	updateDocument: function ( index, _id, docType, payload) {
		try {
			elasticClient.update({
				index: index,
				type: docType,
				id: _id,
				body: payload
			}, function (err, resp) {
				if (err) return res.json(err);
				return res.json(resp);
			})
		} catch (err) {
			return err
		}

	},

	// 5. Search
	search: function (indexName, docType, payload) {
		try {
			elasticClient.search({
				index: indexName,
				type: docType,
				body: payload
			}).then(function (resp) {
				console.log(resp);
				return res.json(resp)
			}, function (err) {
				console.log(err.message);
				return res.json(err.message)
			});
		} catch (err) {
			return err
		}

	}
};