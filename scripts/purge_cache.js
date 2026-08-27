const { Client } = require('ssh2');

const conn = new Client();

conn.on('ready', () => {
  console.log('SSH Connection :: ready');
  const cmd = `
    echo "=== 1. Writing Rock-Solid Production .htaccess ==="
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
</IfModule>

RewriteEngine On

# Allow direct static file serving for _next/static, images, fonts, icons
RewriteCond %{REQUEST_FILENAME} -f
RewriteRule ^ - [L]

RewriteCond %{REQUEST_URI} ^/_next/static/ [OR]
RewriteCond %{REQUEST_URI} ^/images/ [OR]
RewriteCond %{REQUEST_URI} ^/favicon.ico [OR]
RewriteCond %{REQUEST_URI} ^/logo-icon.png [OR]
RewriteCond %{REQUEST_URI} ^/icon.png
RewriteRule ^ - [L]

<IfModule mod_headers.c>
  # Cache static assets safely
  <FilesMatch "\.(css|js|woff2|woff|ttf|png|jpg|jpeg|gif|svg|ico|webp)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
</IfModule>
EOF

    echo "=== 2. Ensuring all static directories are present in public_html ==="
    CURRENT_NODEJS=$(readlink -f /home/u743928828/domains/trustedmedshop.com/hbuilds/current)/nodejs
    mkdir -p /home/u743928828/domains/trustedmedshop.com/public_html/_next
    rm -rf /home/u743928828/domains/trustedmedshop.com/public_html/_next/static
    cp -rf "$CURRENT_NODEJS/.next/static" /home/u743928828/domains/trustedmedshop.com/public_html/_next/
    cp -rf "$CURRENT_NODEJS/public/"* /home/u743928828/domains/trustedmedshop.com/public_html/ 2>/dev/null || true

    chmod -R 755 /home/u743928828/domains/trustedmedshop.com/public_html/
    chmod -R 755 "$CURRENT_NODEJS/.next"

    echo "=== 3. Restart Node Application ==="
    mkdir -p "$CURRENT_NODEJS/tmp"
    touch "$CURRENT_NODEJS/tmp/restart.txt"
    pkill -9 -f "trustedmedshop" || true

    echo "=== 4. Test CSS Static URL Delivery ==="
    CSS_FILE=$(ls "$CURRENT_NODEJS/.next/static/css/" | head -n 1)
    echo "Testing CSS URL: /_next/static/css/$CSS_FILE"
    curl -s -I -k "https://trustedmedshop.com/_next/static/css/$CSS_FILE" | head -n 10
    
    echo "=== 5. Test Contact Page Load ==="
    curl -s -I -k "https://trustedmedshop.com/contact" | head -n 10
  `;
  
  conn.exec(cmd, (err, stream) => {
    if (err) throw err;
    stream.on('data', (d) => process.stdout.write(d.toString()));
    stream.on('close', () => {
      console.log('Production setup and test completed!');
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
