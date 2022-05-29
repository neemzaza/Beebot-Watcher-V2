function keepAlive() {
  require('http').createServer((req, res) => {
    res.write("Hello world!");
    res.end();
  }).listen(8080)
}
export default keepAlive;