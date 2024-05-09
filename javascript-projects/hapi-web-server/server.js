const Hapi = require('@hapi/hapi');
const routes = require('./routes')

// dasar kode dalam bikin HTTP server pada Hapi 
const init = async () => {
    // bikin HTTP server
    const server = Hapi.server({
        // objek ServerOption yang nampung konfigurasi server spt properi port dan host 
        port: 5000,
        host: 'localhost',
    });

    // bikin routing untuk tiap method dan url
    server.route(routes);
    
    // proses async untuk jalanin server 
    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
}

init();