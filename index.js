'use strict';

const Hapi          = require('hapi');
const Inert         = require('inert');
const Vision        = require('vision');
const HapiSwagger   = require('hapi-swagger');
const routes        = require('./route/routes.js');
const server        = new Hapi.Server();
var port            = process.env.PORT || 3001;
const crypto        = require('./lib/util/cryptoUtil');

const optionsSwager =
{
    info: {
        'title': 'XPRESS services',
        'version': '1.0.0',
    },
    grouping: 'tags'
};

// console.log(crypto.encrypt(''));
server.connection({ port: port});

server.route(routes);

server.register(
    [
        Inert,
        Vision,
        {
            'register': HapiSwagger,
            optionsSwager
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
