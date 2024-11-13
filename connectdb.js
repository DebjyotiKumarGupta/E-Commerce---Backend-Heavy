const {Client} = require('pg') 

const client = new Client({
    connectionString :'postgresql://karanguptadev123:JcLq4H7jtGsD@ep-small-king-a5i96tlh.us-east-2.aws.neon.tech/learningDb?sslmode=require'
});

client.connect();