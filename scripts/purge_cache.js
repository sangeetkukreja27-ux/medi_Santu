const { Client } = require('ssh2');

const conn = new Client();

conn.on('ready', () => {
  console.log('SSH Connection :: ready');
  const cmd = `
    echo "=== 1. Test Products API ==="
    curl -s -k "https://trustedmedshop.com/api/products" | grep -o '"success":true' || echo "Products API failed"

    echo "=== 2. Test Inquiries API ==="
    curl -s -k "https://trustedmedshop.com/api/admin/inquiries" | grep -o '"success":true' || echo "Inquiries API failed"

    echo "=== 3. Test Homepage CMS API ==="
    curl -s -k "https://trustedmedshop.com/api/homepage" | grep -o '"success":true' || echo "Homepage API failed"

    echo "=== 4. Test Adding Product via Admin API ==="
    ADD_RES=$(curl -s -k -X POST "https://trustedmedshop.com/api/admin/products" \
      -H "Content-Type: application/json" \
      -d '{"name":"Test Med 50mg","substance":"Test Substance","category":"Anti Parasite","price":25,"brand":"Test Pharma","composition":"Test 50mg","packaging":"10 Tablets","shelfLife":"24 Months","description":"Testing admin product pipeline","inStock":true}')
    echo "$ADD_RES"

    echo "=== 5. Test Deleting Test Product via Admin API ==="
    DEL_RES=$(curl -s -k -X DELETE "https://trustedmedshop.com/api/admin/products?id=test-med-50mg")
    echo "$DEL_RES"
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
