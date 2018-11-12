const http = require("http");
var httpRequest = require("request");

const hostname = "127.0.0.1";
const port = 3000;

var qs = require("querystring"),
  twitterRequestTokenOptions = {
    oauth: {
      callback: "http://localhost:4200/twitter-callback",
      consumer_key: "VRr0E9A4TFcE4MmCHgXcI0mTl",
      consumer_secret: "Ety9mafs2RJCF0kmhNcRkgcluJ7CXZ3boVN7ajSaUJTKAM3TVZ"
    },
    url: "https://api.twitter.com/oauth/request_token"
  };

const server = http.createServer((req, response) => {
  const { headers, method, url } = req;
  let body = [];
  req
    .on("error", err => {
      console.error(err);
    })
    .on("data", chunk => {
      body.push(chunk);
    })
    .on("end", () => {
      body = Buffer.concat(body).toString();
      // BEGINNING OF NEW STUFF

      //     GIlazarettoUB_08
      //     sunnybunnydev@gmail.com

      response.on("error", err => {
        console.error(err);
      });

      response.statusCode = 200;
      response.setHeader("Content-Type", "application/json");
      // Note: the 2 lines above could be replaced with this next one:
      // response.writeHead(200, {'Content-Type': 'application/json'})
      // Website you wish to allow to connect
      response.setHeader(
        "Access-Control-Allow-Origin",
        "http://localhost:4200"
      );

      // Request methods you wish to allow
      response.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
      );

      // Request headers you wish to allow
      response.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
      );

      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      response.setHeader("Access-Control-Allow-Credentials", true);



      if (url.indexOf("requestTokenTwitter") > 0 && method === "POST") {
        console.log("test is here");

        //------------------------------------------------------------
        // var options = {
        //         url: 'https://api.twitter.com/oauth/request_token',
        //         headers: {
        //             'User-Agent': 'request'
        //         }
        //     };

        //     function callback(error, response, body) {
        //         if (!error && response.statusCode == 200) {
        //             var info = JSON.parse(body);
        //             console.log(info.stargazers_count + " Stars");
        //             console.log(info.forks_count + " Forks");
        //         }
        //     }

        //     httpRequest(options, callback);
        //-------------------------------------//

        httpRequest.post(twitterRequestTokenOptions, (e, r, body) => {
          var req_data = qs.parse(body);
          console.log("response data");
          console.log(req_data);
          response.write(JSON.stringify(req_data));
          response.end();
        });
      } else {
        response.end();
      }

      //     const responseBody = { headers, method, url, body };

      //     response.write(JSON.stringify(responseBody));
      //     response.end();
      // Note: the 2 lines above could be replaced with this next one:
      // response.end(JSON.stringify(responseBody))

      // END OF NEW STUFF
    });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
