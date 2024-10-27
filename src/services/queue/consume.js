import RabbitMQConnection from './connection.js'
import { logger } from '../../utils/logger.js'
import config from '../../config/index.js'
import EmailService from '../email/send.js'

class RabbitMQConsumer {
    constructor() {
        this.channel = null
    }

    async start() {
        try {
            this.channel = await RabbitMQConnection.connect()
            this.channel.consume(
                config.rabbitmq.queue.email,
                async (message) => {
                    if (message !== null) {
                        const content = message.content.toString()
                        // Proses pesan (misalnya, mengirim email atau melakukan tindakan lain)
                        await this.processMessage(content)
                    }
                },
                {
                    noAck: true
                }
            )
        } catch (error) {
            logger.error('Error starting RabbitMQ consumer:', error)
        }
    }

    async processMessage(content) {
        try {
            const data = JSON.parse(content)
            await EmailService.sendEmail({
                to: data.to,
                subject: data.subject,
                text: data.body
            })
        } catch (error) {
            logger.error('Error processing message:', error)
        }
    }

    async stop() {
        try {
            await RabbitMQConnection.close()
        } catch (error) {
            logger.error('Error stopping RabbitMQ consumer:', error)
        }
    }
}

export default new RabbitMQConsumer()
