const { Client } = require('ssh2');

const conn = new Client();

conn.on('ready', () => {
  console.log('SSH Connection :: ready');
  const cmd = `
    echo "=== Test Favicon Endpoints ==="
    curl -s -I -k "https://trustedmedshop.com/favicon.ico?v=brand" | head -n 8
    curl -s -I -k "https://trustedmedshop.com/logo-icon.png?v=brand" | head -n 8
    curl -s -I -k "https://trustedmedshop.com/icon.png?v=brand" | head -n 8
  `;
  
  conn.exec(cmd, (err, stream) => {
    if (err) throw err;
    stream.on('close', () => {
      conn.end();
    });
    stream.on('data', (d) => process.stdout.write(d.toString()));
  });
}).connect({
  host: '147.79.64.19',
  port: 65002,
  username: 'u743928828',
  password: '8446617717@Sam',
  readyTimeout: 30000
});
