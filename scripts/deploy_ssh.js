const { Client } = require('ssh2');

const conn = new Client();

conn.on('ready', () => {
  console.log('SSH Connection :: ready');
  const cmd = `
    echo "=== Latest 2 Hostinger build logs ==="
    ls -lt /home/u743928828/domains/trustedmedshop.com/hbuilds/logs/ | head -n 5
    LATEST_LOG=$(ls -t /home/u743928828/domains/trustedmedshop.com/hbuilds/logs/ | head -n 1)
    echo "=== Reading log for $LATEST_LOG ==="
    cat /home/u743928828/domains/trustedmedshop.com/hbuilds/logs/$LATEST_LOG/* || true
    echo "=== Checking current symlink ==="
    ls -la /home/u743928828/domains/trustedmedshop.com/hbuilds/current/
  `;
  
  conn.exec(cmd, (err, stream) => {
    if (err) {
      console.error('Exec error:', err);
      conn.end();
      return;
    }
    stream.on('close', (code, signal) => {
      conn.end();
    }).on('data', (data) => {
      process.stdout.write(data.toString());
    }).stderr.on('data', (data) => {
      process.stderr.write(data.toString());
    });
  });
}).on('error', (err) => {
  console.error('SSH Connection error:', err);
}).connect({
  host: '147.79.64.19',
  port: 65002,
  username: 'u743928828',
  password: '8446617717@Sam',
  readyTimeout: 30000
});
