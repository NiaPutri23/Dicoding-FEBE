// // core modules http untuk bangun web server
// // HTTP module memiliki byk member spt objek, properti atau method
// const http = require('http');
// // http.createServer() untuk membuat http server (instance dari http.server)
// // terima 1 parameter custom callback sbg request listener

// // /**
// //  * Logika untuk menangani dan menanggapi request dituliskan pada fungsi ini
// //  *
// //  * @param request: objek yang berisikan informasi terkait permintaan
// //  * @param response: objek yang digunakan untuk menanggapi permintaan
// //  */
// const requestListener = (request, response) => {

// };
// const server = http.createServer(requestListener);

// console.log('Halo, kita akan belajar membuat server');

// // bagian 1 ------------------------------------------------------
// const http = require('http');

// const requestListener = (request, response) => {
//     response.setHeader('Content-Type', 'text/html');

//     response.statusCode = 200;
//     response.end('<h1>Halo HTTP Server!</h1>');
// };

// const port = 5000;
// const host = 'localhost';

// server.listen(port, host, () => {
//     console.log(`Server berjalan pada http://${host}:${port}`)
// })

// // bagian 2 --------------------
// const http = require('http');

// const requestListener = (request, response) => {
//     response.setHeader('Content-Type', 'text/html');
//     response.statusCode = 200;

//     const { method } = request;
//     // atau
//     // const method = request.method;

//     if(method === 'GET') {
//         response.end('<h1>Hello!</h1>');
//     }

//     if (method === 'POST') {
//         let body = [];

//         request.on('data', (chunk) => {
//             body.push(chunk);
//         });

//         request.on('end', () => {
//             body = Buffer.concat(body).toString();
//             const { name } = JSON.parse(body);
//             response.end(`<h1>Hai, ${name}!</h1>`);
//         });
//         // response.end('<h1>Hai!</h1>');
//     }

//     if(method === 'PUT') {
//         response.end('<h1>Bonjour!</h1>');
//     }

//     if(method === 'DELETE') {
//         response.end('<h1>Salam!</h1>');
//     }
// };

// const server = http.createServer(requestListener);

// const port = 5000;
// const host = 'localhost';

// server.listen(port, host, () => {
//     console.log(`Server berjalan pada http://${host}:${port}`);
// });

// // bagian 3 --------------------------
// const http = require('http');

// const requestListener = (request, response) => {
//     response.setHeader('Content-Type', 'text/html');
//     response.statusCode = 200;

//     const { method, url } = request;

//     if (url === '/') {
//         if (method === 'GET') {
//             response.end('<h1>Ini adalah homepage</h1>');
//         }
//         else {
//             response.end(`Halaman tidak dapat diakses dengan ${method} request`)
//         }
//     }
//     else if (url === '/about') {
//         if (method === 'GET') {
//             response.end('<h1>Halo! Ini adalah halaman about</h1>')
//         }
//         else if (method === 'POST') {
//             let body = [];

//             request.on('data', (chunk) => {
//                 body.push(chunk);
//             })

//             request.on('end', () => {
//                 body = Buffer.concat(body).toString();
//                 const { name } = JSON.parse(body);
//                 response.end(`<h1>Halo, ${name}! Ini adalah halaman about</h1>`)
//             })
//         }
//         else {
//             response.end(`Halaman tidak dapat diakses dengan ${method} request`)
//         }
//     }
//     else {
//         response.end('<h1>Halaman tidak ditemukan!</h1>')
//     }
// }

// const server = http.createServer(requestListener);

// const port = 5000;
// const host = 'localhost';

// server.listen(port, host, () => {
//     console.log(`Server berjalan pada http://${host}:${port}`);
// });

// bagian 4 --------------------------
const http = require("http");

const requestListener = (request, response) => {
  // content-type untuk ngasih tau client, bagaimana client harus nampilin data
  // client (browser) bakal nampilin data yang dikirim respons utk dirender dalam bentuk HTML
  // response.setHeader('Content-Type', 'text/html');

  response.setHeader("Content-Type", "application/json");
  response.setHeader("Powered-By", "Node.js");

  const { method, url } = request;

  if (url === "/") {
    if (method === "GET") {
      response.statusCode = 200;
      response.end(
        JSON.stringify({
          message: "Ini adalah homepage",
        })
      );
    } else {
      response.statusCode = 400;
      response.end(
        JSON.stringify({
          message: `Halaman tidak dapat diakses menggunakan ${method} request`,
        })
      );
    }
  } else if (url === "/about") {
    if (method === "GET") {
      response.statusCode = 200;
      response.end(
        JSON.stringify({
          message: "Ini adalah halaman about",
        })
      );
    } else if (method === "POST") {
      let body = [];

      request.on("data", (chunk) => {
        body.push(chunk);
      });

      request.on("end", () => {
        body = Buffer.concat(body).toString();
        const { name } = JSON.parse(body);
        response.statusCode = 200;
        response.end(JSON.stringify({
            message: `Halo, ${name}! Ini adalah halaman about`,
        }));
      });
    } else {
      response.statusCode = 400;
      response.end(
        JSON.stringify({
          message: `Halaman tidak dapat diakses menggunakan ${method} request`,
        })
      );
    }
  } else {
    response.statusCode = 404;
    response.end(
      JSON.stringify({
        message: "Halaman tidak ditemukan!",
      })
    );
  }
};

const server = http.createServer(requestListener);

const port = 5000;
const host = "localhost";

server.listen(port, host, () => {
  console.log(`Server berjalan pada http://${host}:${port}`);
});
