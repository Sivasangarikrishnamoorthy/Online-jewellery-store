const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'out');
const subDir = path.join(outDir, 'Online-jewellery-store');

if (!fs.existsSync(subDir)) {
  fs.mkdirSync(subDir);
}

fs.readdirSync(outDir).forEach(file => {
  if (file !== 'Online-jewellery-store') {
    const oldPath = path.join(outDir, file);
    const newPath = path.join(subDir, file);
    fs.renameSync(oldPath, newPath);
  }
});

console.log('Moved out folder contents into out/Online-jewellery-store');
