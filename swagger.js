const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title:'Users Api',
        description: 'Users Api'
    },
    host: 'project1-q588.onrender.com',
    schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);