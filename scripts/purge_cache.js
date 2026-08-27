const { Client } = require('ssh2');

const conn = new Client();

conn.on('ready', () => {
  console.log('SSH Connection :: ready');
  const cmd = `
    echo "=== Test 1: Query param bypass ==="
    curl -s -I -k "https://trustedmedshop.com/?v=fresh_now" | head -n 15
    curl -s -k "https://trustedmedshop.com/?v=fresh_now" | grep -o "Trusted Medicines Worldwide Exports" || echo "Not found"
    
    echo "=== Test 2: Product page ==="
    curl -s -I -k "https://trustedmedshop.com/products/fenbendazole-150-mg" | head -n 15
    curl -s -k "https://trustedmedshop.com/products/fenbendazole-150-mg" | grep -o "Available Options" || echo "Not found"
  `;
  
  conn.exec(cmd, (err, stream) => {
    if (err) throw err;
    stream.on('data', (d) => process.stdout.write(d.toString()));
    stream.on('close', () => {
      conn.end();
    });
  });
}).connect({
  host: '147.79.64.19',
  port: 65002,
  username: 'u743928828',
  password: '8446617717@Sam',
  readyTimeout: 30000
});
