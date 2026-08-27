const { Client } = require('ssh2');

const conn = new Client();

conn.on('ready', () => {
  console.log('SSH Connection :: ready');
  const cmd = `
    export PATH=/opt/alt/alt-nodejs22/root/usr/bin:$PATH
    
    echo "=== 1. Pulling latest code in last-source ==="
    cd /home/u743928828/domains/trustedmedshop.com/hbuilds/last-source/
    git fetch origin main
    git checkout main
    git reset --hard origin/main
    git log -n 1 --oneline

    echo "=== 2. Installing dependencies and building ==="
    npm install
    export PATH=$(pwd)/node_modules/.bin:$PATH
    npm run build

    echo "=== 3. Copying new build into active current version ==="
    CURRENT_NODEJS=$(readlink -f /home/u743928828/domains/trustedmedshop.com/hbuilds/current)/nodejs
    echo "Target nodejs folder: $CURRENT_NODEJS"
    
    cp -rf .next "$CURRENT_NODEJS/"
    cp -rf public "$CURRENT_NODEJS/"
    cp -rf src "$CURRENT_NODEJS/"
    cp -f next.config.mjs "$CURRENT_NODEJS/"
    cp -f package.json "$CURRENT_NODEJS/"

    # Also copy static assets to public_html
    mkdir -p /home/u743928828/domains/trustedmedshop.com/public_html/_next/static
    cp -rf .next/static/* /home/u743928828/domains/trustedmedshop.com/public_html/_next/static/ 2>/dev/null || true
    cp -rf public/* /home/u743928828/domains/trustedmedshop.com/public_html/ 2>/dev/null || true

    echo "=== 4. Triggering LiteSpeed Node restart ==="
    mkdir -p /home/u743928828/domains/trustedmedshop.com/public_html/tmp
    touch /home/u743928828/domains/trustedmedshop.com/public_html/tmp/restart.txt
    mkdir -p "$CURRENT_NODEJS/tmp"
    touch "$CURRENT_NODEJS/tmp/restart.txt"
    pkill -f "trustedmedshop.com" || true

    echo "=== ALL DONE SUCCESSFULLY ==="
  `;
  
  conn.exec(cmd, (err, stream) => {
    if (err) {
      console.error('Exec error:', err);
      conn.end();
      return;
    }
    stream.on('close', (code, signal) => {
      console.log('Stream :: close :: code: ' + code);
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
