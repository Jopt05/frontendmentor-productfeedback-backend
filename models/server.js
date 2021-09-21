const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.feedbacksRoutePath = '/api/feedback'
        this.commentsRoutePath = '/api/comment'
        this.responsesRoutePath = '/api/response'
        this.connectDb();
        this.middlewares();
        this.routes();
    }

    async connectDb() {
        await dbConnection();
    }

    middlewares() {
        this.app.use( express.json() );
        this.app.use( cors() );
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.use(this.feedbacksRoutePath, require('../routes/feedback'));
        this.app.use(this.commentsRoutePath, require('../routes/comment'));
        this.app.use(this.responsesRoutePath, require('../routes/reponse'));
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Server corriendo en ${ process.env.PORT }`);
        })
    }

}

module.exports = Server;