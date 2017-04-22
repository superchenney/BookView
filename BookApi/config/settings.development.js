export default {
    db: {
        psql: {
            host: process.env.POSTGRES_HOST,
            dialect: 'postgres',
            name: 'hooview',
            user: process.env.POSTGRES_USER,
            pwd: process.env.POSTGRES_PASSWORD,
            port: 5432,
            //timezone: '+08:00'
        },
        redis: {
            master: {
                ip: process.env.REDIS_HOST,
                port: 6379
            }
        }
    };
}
