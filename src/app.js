import config from './config/index.js'
import { logger } from './utils/logger.js'
// import EmailService from './services/email/send.js'
import emailQueueConsumer from './services/queue/consume.js'

logger.info(config.app)

async function startApplication() {
    try {
        await emailQueueConsumer.start()
        logger.info('Application started successfully')
    } catch (error) {
        logger.error('Failed to start application:', error)
        process.exit(1)
    }
}

process.on('SIGTERM', async () => {
    try {
        // Gracefully stop the RabbitMQ consumer
        await emailQueueConsumer.stop()
        logger.info('Consumer stopped successfully')
    } catch (error) {
        logger.error('Error while stopping consumer:', error)
    } finally {
        process.exit(0)
    }
})
startApplication()
