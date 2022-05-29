"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function keepAlive() {
    require('http').createServer((req, res) => {
        res.write("Hello world!");
        res.end();
    }).listen(8080);
}
exports.default = keepAlive;
