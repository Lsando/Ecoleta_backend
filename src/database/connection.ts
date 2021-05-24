    import knex from 'knex';
    
    const connection = knex({
        client: 'pg',
        connection: {
            host: 'localhost',
            user: 'postgres',
            password: '20Qwerty20',
            database: 'semana_omnistack'
        }
    });

    export default connection;