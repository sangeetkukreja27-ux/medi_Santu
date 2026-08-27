const { Client } = require('ssh2');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const archivePath = path.resolve(__dirname, '..', 'deploy.tar.gz');
if (fs.existsSync(archivePath)) {
  try { fs.unlinkSync(archivePath); } catch (e) {}
}

console.log('1. Creating compact local deploy archive (excluding cache and trace)...');
execSync('tar --exclude=".next/cache" --exclude=".next/trace" -czf deploy.tar.gz .next public src next.config.mjs package.json', { cwd: path.resolve(__dirname, '..') });
const stats = fs.statSync(archivePath);
console.log(`Deploy archive created: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);

const conn = new Client();

conn.on('ready', () => {
  console.log('SSH Connection :: ready');

  conn.sftp((err, sftp) => {
    if (err) throw err;
    console.log('Uploading deploy.tar.gz...');
    
    sftp.fastPut(archivePath, '/home/u743928828/domains/trustedmedshop.com/deploy.tar.gz', (err) => {
      if (err) throw err;
      console.log('deploy.tar.gz uploaded successfully!');

      const cmd = `
        CURRENT_NODEJS=$(readlink -f /home/u743928828/domains/trustedmedshop.com/hbuilds/current)/nodejs
        echo "Target nodejs: $CURRENT_NODEJS"

        # Extract to nodejs
        tar -xzf /home/u743928828/domains/trustedmedshop.com/deploy.tar.gz -C "$CURRENT_NODEJS"

        # Copy static to public_html
        mkdir -p /home/u743928828/domains/trustedmedshop.com/public_html/_next
        rm -rf /home/u743928828/domains/trustedmedshop.com/public_html/_next/static
        cp -rf "$CURRENT_NODEJS/.next/static" /home/u743928828/domains/trustedmedshop.com/public_html/_next/
        cp -rf "$CURRENT_NODEJS/public/"* /home/u743928828/domains/trustedmedshop.com/public_html/ 2>/dev/null || true

        # Clean permissions
        chmod -R 755 /home/u743928828/domains/trustedmedshop.com/public_html/
        chmod -R 755 "$CURRENT_NODEJS/.next"

        # Trigger restart
        mkdir -p "$CURRENT_NODEJS/tmp"
        touch "$CURRENT_NODEJS/tmp/restart.txt"
        pkill -9 -f "trustedmedshop" || true

        echo "=== DEPLOYMENT & RESTART COMPLETE ==="
      `;

      conn.exec(cmd, (err, stream) => {
        if (err) throw err;
        stream.on('data', (d) => process.stdout.write(d.toString()));
        stream.on('close', () => {
          console.log('All done successfully!');
          conn.end();
        });
      });
    });
  });
}).connect({
  host: '147.79.64.19',
  port: 65002,
  username: 'u743928828',
  password: '8446617717@Sam',
  readyTimeout: 30000
});
