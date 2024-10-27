import nodemailer from 'nodemailer'
import config from '../../config/index.js'
import { logger } from '../../utils/logger.js'

class EmailServices {
    constructor() {
        this.transporter = nodemailer.createTransport(config.email.smtp)
    }

    async verifyConnection() {
        try {
            await this.transporter.verify()
            logger.info('SMTP connection verified successfully')
            return true
        } catch (error) {
            logger.error(error)
            logger.error('SMTP connection verification failed:', error)
            return false
        }
    }

    async sendEmail({ to, subject, text }) {
        try {
            await this.transporter.sendMail({
                from: config.email.smtp.auth.user,
                to,
                subject,
                text
            })
            logger.info(`Email sent to ${to}`)
        } catch (error) {
            logger.error(error)
        }
    }
}

export default new EmailServices()
