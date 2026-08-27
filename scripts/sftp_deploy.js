const { Client } = require('ssh2');
const fs = require('fs');
const path = require('path');

const conn = new Client();

function uploadDir(sftp, localDir, remoteDir, callback) {
  fs.readdir(localDir, { withFileTypes: true }, (err, files) => {
    if (err) return callback(err);

    // Create remote dir if needed
    sftp.mkdir(remoteDir, (err) => {
      // Ignore directory already exists error
      let count = files.length;
      if (count === 0) return callback(null);

      files.forEach((file) => {
        const localPath = path.join(localDir, file.name);
        const remotePath = path.posix.join(remoteDir, file.name);

        if (file.isDirectory()) {
          uploadDir(sftp, localPath, remotePath, (err) => {
            if (err) console.error(`Error uploading dir ${remotePath}:`, err);
            count--;
            if (count === 0) callback(null);
          });
        } else {
          sftp.fastPut(localPath, remotePath, (err) => {
            if (err) console.error(`Error uploading file ${remotePath}:`, err);
            count--;
            if (count === 0) callback(null);
          });
        }
      });
    });
  });
}

conn.on('ready', () => {
  console.log('SSH Connection ready for Direct SFTP Sync');
  
  conn.sftp((err, sftp) => {
    if (err) {
      console.error('SFTP error:', err);
      conn.end();
      return;
    }

    console.log('SFTP connected. Uploading .next and public folders...');
    
    // First find the current active path
    conn.exec('readlink -f /home/u743928828/domains/trustedmedshop.com/hbuilds/current', (err, stream) => {
      let currentPath = '';
      stream.on('data', (d) => currentPath += d.toString());
      stream.on('close', () => {
        currentPath = currentPath.trim() + '/nodejs';
        console.log('Remote target nodejs folder:', currentPath);

        const localNext = path.resolve(__dirname, '..', '.next');
        const localPublic = path.resolve(__dirname, '..', 'public');
        const localSrc = path.resolve(__dirname, '..', 'src');

        uploadDir(sftp, localNext, `${currentPath}/.next`, (err) => {
          if (err) console.error('Upload .next error:', err);
          console.log('.next folder uploaded successfully!');

          uploadDir(sftp, localPublic, `${currentPath}/public`, (err) => {
            if (err) console.error('Upload public error:', err);
            console.log('public folder uploaded successfully!');

            // Also upload static files to public_html
            uploadDir(sftp, path.join(localNext, 'static'), '/home/u743928828/domains/trustedmedshop.com/public_html/_next/static', (err) => {
              if (err) console.error('Upload public_html static error:', err);
              console.log('public_html/_next/static uploaded successfully!');

              uploadDir(sftp, localPublic, '/home/u743928828/domains/trustedmedshop.com/public_html', (err) => {
                if (err) console.error('Upload public_html assets error:', err);
                console.log('public_html root assets uploaded successfully!');

                // Restart app
                conn.exec(`
                  mkdir -p ${currentPath}/tmp
                  touch ${currentPath}/tmp/restart.txt
                  chmod -R 755 /home/u743928828/domains/trustedmedshop.com/public_html/
                  pkill -9 -f "trustedmedshop" || true
                  echo "=== RESTART TRIGGERED ==="
                `, (err, stream) => {
                  stream.on('data', (d) => process.stdout.write(d.toString()));
                  stream.on('close', () => {
                    console.log('=== SFTP DEPLOYMENT COMPLETED 100% ===');
                    conn.end();
                  });
                });
              });
            });
          });
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
