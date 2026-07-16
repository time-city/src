const fs = require('fs');
const path = require('path');

const reversedFiles = [
    'teambuilding-4.html',
    'gala-1.html',
    'gala-3.html',
    'gala-6.html',
    'activation-2.html',
    'yearend-1.html',
    'yearend-3.html',
    'teambuilding-1.html',
    'teambuilding-3.html'
];

const normalFiles = [
    'gala-7.html',
    'yearend-5.html',
    'gala-2.html',
    'gala-4.html',
    'activation-1.html',
    'client-meeting-1.html',
    'yearend-2.html',
    'yearend-4.html',
    'teambuilding-2.html'
];

const dir = '/Users/admin/src/sections';

reversedFiles.forEach(file => {
    let p = path.join(dir, file);
    if (fs.existsSync(p)) {
        let content = fs.readFileSync(p, 'utf8');
        content = content.replace(/class="event-collage(\s+event-collage--reverse)?"/, 'class="event-collage event-collage--reverse"');
        fs.writeFileSync(p, content);
    }
});

normalFiles.forEach(file => {
    let p = path.join(dir, file);
    if (fs.existsSync(p)) {
        let content = fs.readFileSync(p, 'utf8');
        content = content.replace(/class="event-collage(\s+event-collage--reverse)?"/, 'class="event-collage"');
        fs.writeFileSync(p, content);
    }
});
console.log("Done");
