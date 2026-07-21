const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

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

const matchLogos = code.match(/const logos = (\[[\s\S]*?\]);/);
if (matchLogos) {
    const logos = eval('(' + matchLogos[1] + ')');
    logos.forEach(logo => imagePaths.add(path.join('/Users/admin/src', logo)));
}

let existingImages = [];
imagePaths.forEach(p => {
    if (fs.existsSync(p)) {
        existingImages.push(p);
    }
});

console.log(`Found ${existingImages.length} existing images.`);
existingImages.forEach(img => {
    try {
        // Get dimensions
        const info = execSync(`sips -g pixelWidth -g pixelHeight "${img}"`).toString();
        const wMatch = info.match(/pixelWidth: (\d+)/);
        const hMatch = info.match(/pixelHeight: (\d+)/);
        if (wMatch && hMatch) {
            const w = parseInt(wMatch[1]);
            const h = parseInt(hMatch[1]);
            if (w > 1920 || h > 1920) {
                console.log(`Resizing ${img} (${w}x${h})`);
                execSync(`sips -Z 1920 -s formatOptions 80 "${img}"`);
            } else {
                // Just compress
                execSync(`sips -s formatOptions 80 "${img}"`);
            }
        }
    } catch (e) {
        console.error(`Error processing image ${img}:`, e.message);
    }
});
console.log("Image optimization complete.");

// Process Videos
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

let existingVideos = [];
videoPaths.forEach(p => {
    if (fs.existsSync(p)) {
        existingVideos.push(p);
    }
});

console.log(`Found ${existingVideos.length} existing videos.`);
existingVideos.forEach((vid, i) => {
    console.log(`Compressing video ${i+1}/${existingVideos.length}: ${vid}`);
    const tmpOut = vid + '.tmp.mp4';
    try {
        // Scale to max 1280px width, preserving aspect ratio (height divisible by 2), and enable faststart for web
        execSync(`/opt/homebrew/bin/ffmpeg -y -i "${vid}" -movflags +faststart -vf "scale='min(1280,iw)':-2" -c:v libx264 -preset fast -crf 28 -c:a aac -b:a 128k "${tmpOut}"`, { stdio: 'pipe' });
        execSync(`mv "${tmpOut}" "${vid}"`);
        console.log(`Done: ${vid}`);
    } catch (e) {
        console.error(`Error processing video ${vid}:`, e.message);
    }
});
console.log("Video optimization complete.");
