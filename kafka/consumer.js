
const { Kafka } = require('kafkajs')
const config = require('./config');
const { elasticsearchService } = require('../services');

// Config Kafka Client
const kafka = new Kafka({
    clientId: config.kafka.CLIENTID,
    brokers: config.kafka.BROKERS
})

const topic = config.kafka.TOPIC
const consumer = kafka.consumer({
    groupId: config.kafka.GROUPID,
    heartbeatInterval: 10000, // should be lower than sessionTimeout
    minBytes: 1,
    maxBytes: 10000, // get the average size of a message, and set this accordingly (if you need 10 messages in batch, message size is 1000 bytes, set this to 10000 (1000 * 10))
    sessionTimeout: 60000,
})

const run = async () => {
    await consumer.connect()
    await consumer.subscribe({ topic, fromBeginning: true })
    await consumer.run({
        eachMessage: async ({ message }) => {
            try {
                const jsonObj = JSON.parse(message.value.toString())
                let productInfo = filterProductInfo(jsonObj)
                // console.log("productInfo", productInfo)
                if (productInfo) {
                    console.log(
                        '******* Products Info *********',
                        productInfo
                    )

                    // Calling Elastic search service functions

                    config.kafka.ES_INDEXES.forEach(index => {
                        if (!elasticsearchService.indexExists(index)) {
                            elasticsearchService.initIndex(index);
                        }

                         //Put Mapping in ES
                        elasticsearchService.initMapping(index, 'document', productInfo);
                    })

                }
            } catch (error) {
                console.log('err=', error)
            }
        }
    })
}

function filterProductInfo(jsonObj) {
    let returnVal = null

    console.log(`Product Name ${jsonObj.name} received!`)

    // Extra filtering if needed
    if(true){

    }

    returnVal = jsonObj

    return returnVal
}

run().catch(e => console.error(`[product/consumer] ${e.message}`, e))

const errorTypes = ['unhandledRejection', 'uncaughtException']
const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2']

errorTypes.map(type => {
    process.on(type, async e => {
        try {
            console.log(`process.on ${type}`)
            console.error(e)
            await consumer.disconnect()
            process.exit(0)
        } catch (_) {
            process.exit(1)
        }
    })
})

signalTraps.map(type => {
    process.once(type, async () => {
        try {
            await consumer.disconnect()
        } finally {
            process.kill(process.pid, type)
        }
    })
})

module.exports = {
    filterProductInfo
}