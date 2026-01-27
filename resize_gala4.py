import os
from PIL import Image

source_dir = 'asset/image/Gala4'
target_size = (1200, 1200) # Max dimension

# Ensure directory exists
if not os.path.exists(source_dir):
    print(f"Directory {source_dir} not found.")
    exit(1)

files = sorted([f for f in os.listdir(source_dir) if f.lower().endswith(('.jpg', '.jpeg', '.png'))])

print(f"Found {len(files)} images.")

for i, filename in enumerate(files):
    try:
        filepath = os.path.join(source_dir, filename)
        with Image.open(filepath) as img:
            # Convert to RGB if necessary (e.g. for PNG alpha)
            if img.mode in ('RGBA', 'P'):
                img = img.convert('RGB')
            
            # Resize logic: keep aspect ratio, max dimension 1200
            img.thumbnail(target_size, Image.Resampling.LANCZOS)
            
            new_filename = f"image-{i+1}.jpg"
            new_filepath = os.path.join(source_dir, new_filename)
            
            # Save with optimization
            img.save(new_filepath, "JPEG", quality=85, optimize=True)
            print(f"Resized and saved {filename} to {new_filename}")
            
            # Remove original if name is different
            if filename != new_filename:
                os.remove(filepath)
                
    except Exception as e:
        print(f"Error processing {filename}: {e}")
