const { Client } = require('ssh2');

const conn = new Client();

conn.on('ready', () => {
  console.log('SSH Connection :: ready');
  const cmd = `
    echo "=== 1. Test TrustSeals in Header ==="
    curl -s -k "https://trustedmedshop.com/" | grep -o "TrustSeal" || echo "TrustSeal not found"
    curl -s -k "https://trustedmedshop.com/" | grep -o "IndiaMART" || echo "IndiaMART not found"
    curl -s -k "https://trustedmedshop.com/" | grep -o "Payment" || echo "Payment not found"

    echo "=== 2. Test Hero Title ==="
    curl -s -k "https://trustedmedshop.com/" | grep -o "Import &amp; Export" || curl -s -k "https://trustedmedshop.com/" | grep -o "Import & Export" || echo "Hero Title not found"

    echo "=== 3. Test Categories ==="
    curl -s -k "https://trustedmedshop.com/" | grep -o "Anticancer" || echo "Anticancer not found"
  `;
  
  conn.exec(cmd, (err, stream) => {
    if (err) throw err;
    stream.on('close', () => conn.end());
    stream.on('data', (d) => process.stdout.write(d.toString()));
  });
}).connect({
  host: '147.79.64.19',
  port: 65002,
  username: 'u743928828',
  password: '8446617717@Sam',
  readyTimeout: 30000
});
