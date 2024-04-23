module.exports = {
    kafka: {
      TOPIC: 'product',
      BROKERS: ['localhost:9092'],
      GROUPID: 'tradeling-consumer-group',
      CLIENTID: 'batch-consumer',
      ES_INDEXES:['title','brand', 'keywords']
    }
  }