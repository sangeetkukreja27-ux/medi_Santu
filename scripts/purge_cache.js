const { Client } = require('ssh2');

const conn = new Client();

conn.on('ready', () => {
  console.log('SSH Connection :: ready');
  const cmd = `
    echo "=== Test rel-1 (Ivermectin 12mg) ==="
    curl -s -k "https://trustedmedshop.com/products/rel-1" | grep -o "Ivermectin 12mg" || echo "rel-1 not found"
    echo "=== Test rel-2 (Albendazole 400mg) ==="
    curl -s -k "https://trustedmedshop.com/products/rel-2" | grep -o "Albendazole 400mg" || echo "rel-2 not found"
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
