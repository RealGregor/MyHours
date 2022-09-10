var express = require("express");
var path = require("path");
var cors = require("cors");
// const nocache = require("nocache");
var proxy = require('express-http-proxy');

var app = express();

app.use(cors());

// , {
//   proxyReqOptDecorator(proxyReqOpts) {
//     proxyReqOpts.headers['Origin'] = 'http://localhost';
//     return proxyReqOpts;
//   }
// }

app.use('/ah', proxy('https://login.allhours.com'));
app.use('/ah-api', proxy('https://api4.allhours.com'));
// app.options('*', cors())
// app.use(nocache());

const port = process.env.PORT || 3000;

// app.disable("x-powered-by");
// app.use((req, res, next) => {
//   res.header("X-Frame-Options", "DENY");
//   res.setHeader("X-XSS-Protection", "1; mode=blovk");
//   res.setHeader("x-Content-Type-Options", "nosniff");
//   next();
// });


app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "dist", "myhours.web.angular")));

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "dist", "myhours.web.angular", "index.html")
  );
});


app.listen(port, () => {
  console.log("On port: " + port);
});

module.exports = app;
