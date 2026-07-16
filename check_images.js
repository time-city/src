const fs = require('fs');
const path = require('path');

const code = fs.readFileSync('/Users/admin/src/main.js', 'utf8');
const match = code.match(/const imageConfig = (\{[\s\S]*?\});\s*const logos/);
if (match) {
    let configStr = match[1];
    // evaluate the object
    const imageConfig = eval('(' + configStr + ')');
    let total = 0;
    let missing = 0;
    for (const key in imageConfig) {
        const folder = imageConfig[key].folder;
        for (let i = 0; i < imageConfig[key].images.length; i++) {
            let img = imageConfig[key].images[i];
            let imgPath = img.startsWith('asset/') ? img : folder + img;
            let fullPath = path.join('/Users/admin/src', imgPath);
            total++;
            if (!fs.existsSync(fullPath)) {
                console.log('Missing:', fullPath);
                missing++;
            }
        }
    }
    console.log(`Total: ${total}, Missing: ${missing}`);
} else {
    console.log("Could not parse imageConfig");
}
