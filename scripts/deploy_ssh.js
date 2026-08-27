const { Client } = require('ssh2');

const conn = new Client();

conn.on('ready', () => {
  console.log('SSH Connection :: ready');
  const cmd = `
    export PATH=/opt/alt/alt-nodejs22/root/usr/bin:$PATH
    export NEXT_CPU_NUM=1

    echo "=== 1. Pulling latest code in last-source ==="
    cd /home/u743928828/domains/trustedmedshop.com/hbuilds/last-source/
    git fetch origin main
    git reset --hard origin/main
    git log -n 1 --oneline

    echo "=== 2. Building Next.js Webpack ==="
    NEXT_CPU_NUM=1 npm run build

    echo "=== 3. Syncing build files ==="
    CURRENT_NODEJS=$(readlink -f /home/u743928828/domains/trustedmedshop.com/hbuilds/current)/nodejs
    echo "Target nodejs folder: $CURRENT_NODEJS"

    # Copy to nodejs
    cp -rf .next "$CURRENT_NODEJS/"
    cp -rf public/* "$CURRENT_NODEJS/public/" 2>/dev/null || true
    cp -rf src "$CURRENT_NODEJS/"
    cp -f next.config.mjs "$CURRENT_NODEJS/"
    cp -f package.json "$CURRENT_NODEJS/"

    # Copy static to public_html
    mkdir -p /home/u743928828/domains/trustedmedshop.com/public_html/_next
    rm -rf /home/u743928828/domains/trustedmedshop.com/public_html/_next/static
    cp -rf .next/static /home/u743928828/domains/trustedmedshop.com/public_html/_next/
    cp -rf public/* /home/u743928828/domains/trustedmedshop.com/public_html/ 2>/dev/null || true

    # Create aliases for old chunks that might be requested by cached clients
    CURRENT_CSS=$(ls /home/u743928828/domains/trustedmedshop.com/public_html/_next/static/css/ | head -n 1)
    CURRENT_LAYOUT=$(ls /home/u743928828/domains/trustedmedshop.com/public_html/_next/static/chunks/app/ | grep layout | head -n 1)
    CURRENT_PAGE=$(ls /home/u743928828/domains/trustedmedshop.com/public_html/_next/static/chunks/app/ | grep page | head -n 1)

    echo "Current CSS: $CURRENT_CSS"
    echo "Current Layout: $CURRENT_LAYOUT"
    echo "Current Page: $CURRENT_PAGE"

    if [ -n "$CURRENT_CSS" ]; then
      cp "/home/u743928828/domains/trustedmedshop.com/public_html/_next/static/css/$CURRENT_CSS" "/home/u743928828/domains/trustedmedshop.com/public_html/_next/static/css/755cbcdc15ebed6f.css"
      cp "/home/u743928828/domains/trustedmedshop.com/public_html/_next/static/css/$CURRENT_CSS" "$CURRENT_NODEJS/.next/static/css/755cbcdc15ebed6f.css" 2>/dev/null || true
    fi

    if [ -n "$CURRENT_LAYOUT" ]; then
      cp "/home/u743928828/domains/trustedmedshop.com/public_html/_next/static/chunks/app/$CURRENT_LAYOUT" "/home/u743928828/domains/trustedmedshop.com/public_html/_next/static/chunks/app/layout-cbf0f850e79d4625.js"
      cp "/home/u743928828/domains/trustedmedshop.com/public_html/_next/static/chunks/app/$CURRENT_LAYOUT" "$CURRENT_NODEJS/.next/static/chunks/app/layout-cbf0f850e79d4625.js" 2>/dev/null || true
    fi

    if [ -n "$CURRENT_PAGE" ]; then
      cp "/home/u743928828/domains/trustedmedshop.com/public_html/_next/static/chunks/app/$CURRENT_PAGE" "/home/u743928828/domains/trustedmedshop.com/public_html/_next/static/chunks/app/page-c88b34443ba7aba0.js"
      cp "/home/u743928828/domains/trustedmedshop.com/public_html/_next/static/chunks/app/$CURRENT_PAGE" "$CURRENT_NODEJS/.next/static/chunks/app/page-c88b34443ba7aba0.js" 2>/dev/null || true
    fi

    chmod -R 755 /home/u743928828/domains/trustedmedshop.com/public_html/
    chmod -R 755 "$CURRENT_NODEJS/.next"

    echo "=== 4. Write aggressive no-cache .htaccess ==="
    cat << 'EOF' > /home/u743928828/domains/trustedmedshop.com/public_html/.htaccess
PassengerAppRoot /home/u743928828/domains/trustedmedshop.com/hbuilds/current/nodejs
PassengerAppType node
PassengerNodejs /opt/alt/alt-nodejs22/root/bin/node
PassengerStartupFile server.js
PassengerBaseURI /
PassengerRestartDir /home/u743928828/domains/trustedmedshop.com/hbuilds/current/nodejs/tmp
SetEnv NODE_OPTIONS "--require /home/u743928828/domains/trustedmedshop.com/hbuilds/config/preload-timestamp.js"
SetEnv LSNODE_CONSOLE_LOG console.log
SetEnv TOKIO_WORKER_THREADS 2

<IfModule LiteSpeed>
  CacheLookup off
  CacheEngine off
</IfModule>

<IfModule mod_headers.c>
  Header always set Cache-Control "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0"
  Header always set CDN-Cache-Control "no-store"
  Header always set Surrogate-Control "no-store"
  Header always set Pragma "no-cache"
  Header always set Expires "0"
</IfModule>
EOF

    mkdir -p "$CURRENT_NODEJS/tmp"
    touch "$CURRENT_NODEJS/tmp/restart.txt"
    pkill -9 -f "trustedmedshop" || true

    echo "=== 5. Verification tests ==="
    curl -s -I -k "https://trustedmedshop.com/_next/static/chunks/app/layout-cbf0f850e79d4625.js" | head -n 5
    curl -s -I -k "https://trustedmedshop.com/_next/static/chunks/app/page-c88b34443ba7aba0.js" | head -n 5
    curl -s -I -k "https://trustedmedshop.com/_next/static/css/755cbcdc15ebed6f.css" | head -n 5
    curl -s -I -k "https://trustedmedshop.com/images/hero-generated.jpg" | head -n 5
    echo "=== SUCCESSFUL FINISH ==="
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
