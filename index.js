'use strict';

const Hapi          = require('hapi');
const Inert         = require('inert');
const Vision        = require('vision');
const HapiSwagger   = require('hapi-swagger');

const server        = new Hapi.Server();
var port            = process.env.PORT || 3001;


const optionsSwager =
{
    info: {
        'title': 'XPRESS services',
        'version': '1.0.0',
    }
};

server.connection({ port: port});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello, world!');
    }
});

server.register(
    [
        Inert,
        Vision,
        {
            'register': HapiSwagger,
            'options': optionsSwager
        }
    ],
    (err) =>{
        if(err)
        {
            throw err;
        }

        // Start the server
        server.start((err) =>{
            console.log('Server running at:', server.info.uri);
        });
    });
