const { Client } = require('ssh2');

const conn = new Client();

conn.on('ready', () => {
  console.log('SSH Connection :: ready');
  const cmd = `
    CURRENT_NODEJS=$(readlink -f /home/u743928828/domains/trustedmedshop.com/hbuilds/current)/nodejs
    CSS_FILE=$(ls "$CURRENT_NODEJS/.next/static/css/" | head -n 1)
    echo "=== 1. CSS Test (https://trustedmedshop.com/_next/static/css/$CSS_FILE) ==="
    curl -s -I -k "https://trustedmedshop.com/_next/static/css/$CSS_FILE" | head -n 12

    echo "=== 2. Contact Page HTML Test ==="
    curl -s -I -k "https://trustedmedshop.com/contact" | head -n 12
  `;
  
  conn.exec(cmd, (err, stream) => {
    if (err) throw err;
    stream.on('data', (d) => process.stdout.write(d.toString()));
    stream.on('close', () => conn.end());
  });
}).connect({
  host: '147.79.64.19',
  port: 65002,
  username: 'u743928828',
  password: '8446617717@Sam',
  readyTimeout: 30000
});
