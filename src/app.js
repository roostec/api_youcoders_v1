const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');
const passport = require('passport');
const { resolve } = require('path')
const fs = require('fs')
class App {
    constructor() {
        this.app = express();
        this.middleware();
        this.setPassport()
        this.setRoute();
    }
    middleware() {
        this.app.use(cors());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use(express.static(resolve(__dirname + 'uploads')));
        this.app.use(cookieSession({ name: 'google-auth-session', maxAge: 24 * 60 * 60 * 1000, keys: ['key1', 'key2'] }));
    }
    setPassport() {
        this.app.use(passport.initialize());
        this.app.use(passport.session());
    }
    setRoute() {
        const routeDirectory = resolve(__dirname, 'routes')
        try {
            const files = fs.readdirSync(routeDirectory, { encoding: 'utf8' });
            files.forEach(file => {
                this.app.use("/", require(`${routeDirectory}/${file}`))
            })
        } catch (error) {
            console.log(error)
        }
    }

}
module.exports = new App()