const fs = require('fs');
const path = require('path');

const code = fs.readFileSync('/Users/admin/src/main.js', 'utf8');
const match = code.match(/const imageConfig = (\{[\s\S]*?\});\s*const logos/);

let imagePaths = new Set();

if (match) {
    let configStr = match[1];
    const imageConfig = eval('(' + configStr + ')');
    for (const key in imageConfig) {
        const folder = imageConfig[key].folder;
        for (let i = 0; i < imageConfig[key].images.length; i++) {
            let img = imageConfig[key].images[i];
            let imgPath = img.startsWith('asset/') ? img : folder + img;
            imagePaths.add(path.join('/Users/admin/src', imgPath));
        }
    }
}

// Check logos
const matchLogos = code.match(/const logos = (\[[\s\S]*?\]);/);
if (matchLogos) {
    const logos = eval('(' + matchLogos[1] + ')');
    logos.forEach(logo => imagePaths.add(path.join('/Users/admin/src', logo)));
}

let totalImageSize = 0;
let existingImages = [];
imagePaths.forEach(p => {
    if (fs.existsSync(p)) {
        const stat = fs.statSync(p);
        totalImageSize += stat.size;
        existingImages.push(p);
    }
});

console.log(`Total used images: ${existingImages.length}`);
console.log(`Total image size: ${(totalImageSize / (1024 * 1024)).toFixed(2)} MB`);

// Check videos in sections
const sectionsDir = '/Users/admin/src/sections';
const files = fs.readdirSync(sectionsDir);
let videoPaths = new Set();
files.forEach(file => {
    if (file.endsWith('.html')) {
        const html = fs.readFileSync(path.join(sectionsDir, file), 'utf8');
        const videoMatches = html.match(/src=["'](asset\/video\/[^"']+)["']/g);
        if (videoMatches) {
            videoMatches.forEach(m => {
                const src = m.match(/src=["']([^"']+)["']/)[1];
                videoPaths.add(path.join('/Users/admin/src', decodeURIComponent(src)));
            });
        }
    }
});

let totalVideoSize = 0;
videoPaths.forEach(p => {
    if (fs.existsSync(p)) {
        const stat = fs.statSync(p);
        totalVideoSize += stat.size;
    } else {
        console.log(`Missing video: ${p}`);
    }
});

console.log(`Total used videos: ${videoPaths.size}`);
console.log(`Total video size: ${(totalVideoSize / (1024 * 1024)).toFixed(2)} MB`);
