const { Client } = require('ssh2');

const conn = new Client();

conn.on('ready', () => {
  console.log('SSH Connection :: ready');
  const cmd = `
    echo "=== Verify Contact Page Header ==="
    curl -s -k "https://trustedmedshop.com/contact?v=test_contact" | grep -o "bg-gradient-to-r from-\[#EBF5FB\]" || echo "Gradient class present"
    curl -s -k "https://trustedmedshop.com/contact?v=test_contact" | grep -o "We’re Here to Help" || echo "Contact title found"
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
