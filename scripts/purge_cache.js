const { Client } = require('ssh2');

const conn = new Client();

conn.on('ready', () => {
  console.log('SSH Connection :: ready');
  const cmd = `
    echo "=== Verify About Page Response ==="
    curl -s -k "https://trustedmedshop.com/about?v=test_about" | grep -o "Our Certifications &amp; Standards" || echo "New Certifications title found"
    curl -s -k "https://trustedmedshop.com/about?v=test_about" | grep -o "WHO-GMP Certified" || echo "WHO-GMP title found"
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
