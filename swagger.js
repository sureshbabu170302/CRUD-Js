const { ServerDescription } = require('mongodb');
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'User CRUD API',
            version: '1.0.0',
            description: 'API documentation for User CRUD application',
        },
    },
    apis: ['./routers/usersRouter.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;