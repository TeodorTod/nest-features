export const appConfig = () => {
    return {
        environment : process.env.NODE_ENV || 'production',
        database : {
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT) || 5432,
            username: process.env.DB_USERNAME || 'admin',
            password: process.env.DB_PASSWORD || '123456',
            database: process.env.DB_DATABASE || 'nestjs',
            synchronize: process.env.DB_SYNC === 'true' ? true : false,
            autoloadEntities: process.env.DB_AUTOLOAD === 'true' ? true : false,
        }
    };
}
