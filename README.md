# Product Index System with Nodejs and Kafka

## Overview
This project involves building a backend service in Nodejs that integrates with Apache Kafka for data flow management and Elasticsearch for data indexing. 
The primary feature of this service is an autocomplete search endpoint that enhances user experience in searching product data.

## Requirements

### Index Structure
Create an Elasticsearch index called `product` with fields:
- `title`: String
- `brand`: String
- `keywords`: Array of strings
- `category`: String
- `SKU`: String

### Kafka Integration
- **Producer**: Setup a Kafka producer to publish batches of product data.
- **Consumer**: Develop a Kafka consumer that processes data in batches of 10 from the producer's topic and indexes it into Elasticsearch.

### Data Import and Indexing
Data should be imported and indexed in batches of 10 using Kafka for efficient processing.
data will stored on file called `products_sample.json` in the root directory.


### Search Endpoint
Implement an HTTP endpoint for autocomplete suggestions that queries the Elasticsearch index based on `title`, `brand`, and `keywords`.

## Extra Points

1. **Typo Tolerance in Search**: Implement typo-tolerant search capabilities.
2. **Advanced Tokenization**: Utilize advanced tokenization techniques for input text processing.
3. **Field Weighting**: Configure field-level boosting in Elasticsearch.


### Prerequisites
- Docker and Docker Compose
- Go programming environment
- Access to an Apache Kafka service
- Elasticsearch setup



## Setup Instructions
- docker-compose -f es.yml ## for normal build 
- docker-compose -f es_m1.yml ## for M1 mac build
- docker-compose -f kafka.yml up  ## for kafka setup
- docker-compose -f kafka.yml up ## for kafka setup
