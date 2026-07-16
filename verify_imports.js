const fs = require('fs');
const path = require('path');

const code = fs.readFileSync('/Users/admin/src/main.js', 'utf8');
const match = code.match(/const imageConfig = (\{[\s\S]*?\});\s*const logos/);

let missingAssets = [];
let totalImages = 0;

if (match) {
    let configStr = match[1];
    const imageConfig = eval('(' + configStr + ')');
    for (const key in imageConfig) {
        const folder = imageConfig[key].folder;
        for (let i = 0; i < imageConfig[key].images.length; i++) {
            let img = imageConfig[key].images[i];
            let imgPath = img.startsWith('asset/') ? img : folder + img;
            let fullPath = path.join('/Users/admin/src', imgPath);
            totalImages++;
            if (!fs.existsSync(fullPath)) {
                missingAssets.push(imgPath);
            }
        }
    }
}

const matchLogos = code.match(/const logos = (\[[\s\S]*?\]);/);
if (matchLogos) {
    const logos = eval('(' + matchLogos[1] + ')');
    logos.forEach(logo => {
        let fullPath = path.join('/Users/admin/src', logo);
        totalImages++;
        if (!fs.existsSync(fullPath)) {
            missingAssets.push(logo);
        }
    });
}

const sectionsDir = '/Users/admin/src/sections';
const files = fs.readdirSync(sectionsDir);
let totalVideos = 0;
files.forEach(file => {
    if (file.endsWith('.html')) {
        const html = fs.readFileSync(path.join(sectionsDir, file), 'utf8');
        const videoMatches = html.match(/src=["'](asset\/video\/[^"']+)["']/g);
        if (videoMatches) {
            videoMatches.forEach(m => {
                const src = decodeURIComponent(m.match(/src=["']([^"']+)["']/)[1]);
                let fullPath = path.join('/Users/admin/src', src);
                totalVideos++;
                if (!fs.existsSync(fullPath)) {
                    missingAssets.push(src);
                }
            });
        }
        
        // Also check standalone images in HTML
        const imgMatches = html.match(/src=["'](asset\/image\/[^"']+)["']/g);
        if (imgMatches) {
            imgMatches.forEach(m => {
                const src = decodeURIComponent(m.match(/src=["']([^"']+)["']/)[1]);
                let fullPath = path.join('/Users/admin/src', src);
                totalImages++;
                if (!fs.existsSync(fullPath)) {
                    missingAssets.push(src);
                }
            });
        }
    }
});

console.log(`Verified ${totalImages} image imports and ${totalVideos} video imports.`);
if (missingAssets.length > 0) {
    console.error(`ERROR: Found ${missingAssets.length} missing assets:`);
    missingAssets.forEach(a => console.error(' - ' + a));
} else {
    console.log("SUCCESS: All imported assets exist on disk!");
}
