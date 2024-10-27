import amqp from 'amqplib'
import config from '../../config/index.js'
import { logger } from '../../utils/logger.js'

class RabbitMQConnection {
    constructor() {
        this.connection = null
        this.channel = null
    }

    async connect() {
        try {
            this.connection = await amqp.connect(config.rabbitmq.url)
            this.channel = await this.connection.createChannel()
            // Setup queues
            await this.channel.assertQueue(config.rabbitmq.queue.email, {
                durable: true
            })

            this.channel.prefetch(config.rabbitmq.option.prefetch)

            logger.info('Successfully connected to RabbitMQ')
            return this.channel
        } catch (error) {
            logger.error('Error connecting to RabbitMQ:', error)
            throw error
        }
    }

    async close() {
        try {
            await this.channel?.close()
            await this.connection?.close()
        } catch (error) {
            logger.error('Error closing RabbitMQ connection:', error)
        }
    }
}

export default new RabbitMQConnection()
