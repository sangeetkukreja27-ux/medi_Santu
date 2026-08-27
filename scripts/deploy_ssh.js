const { Client } = require('ssh2');

const conn = new Client();

conn.on('ready', () => {
  console.log('SSH Connection :: ready');
  const cmd = `
    echo "=== 1. Testing Product Details Page Response ==="
    curl -s -k "https://trustedmedshop.com/products/fenbendazole-150-mg?v=test_prod" | grep -o "Available Options" || echo "Available Options not found"
    curl -s -k "https://trustedmedshop.com/products/fenbendazole-150-mg?v=test_prod" | grep -o "You May Also Like" || echo "You May Also Like not found"
    curl -s -k "https://trustedmedshop.com/products/fenbendazole-150-mg?v=test_prod" | grep -o "Kachhela Medex Private Limited" || echo "Kachhela not found"
    echo "=== 2. Testing Product Detail Image URL ==="
    curl -s -I -k "https://trustedmedshop.com/images/products/fenbendazole-main.jpg" | head -n 5
  `;
  
  conn.exec(cmd, (err, stream) => {
    if (err) throw err;
    stream.on('close', () => {
      conn.end();
    }).on('data', (data) => {
      process.stdout.write(data.toString());
    }).stderr.on('data', (data) => {
      process.stderr.write(data.toString());
    });
  });
}).connect({
  host: '147.79.64.19',
  port: 65002,
  username: 'u743928828',
  password: '8446617717@Sam',
  readyTimeout: 30000
});
