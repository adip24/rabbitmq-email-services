import dotenv from 'dotenv'
dotenv.config()

const config = {
    app: {
        port: process.env.NODE_ENV || 'development',
        name: 'email-queue-service'
    },
    rabbitmq: {
        url: process.env.RABBITMQ_URL || 'amqp://localhost/',
        queue: {
            email: 'email'
        },
        option: {
            prefetch: 1
        }
    },
    email: {
        smtp: {
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT),
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        },
        default: {
            from: process.env.EMAIL_FROM
        }
    }
}

export default config
