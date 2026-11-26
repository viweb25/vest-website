import os
from PIL import Image

pub = 'vest-website/public'
pngs = [f for f in os.listdir(pub) if f.endswith('.png')]

transparent_cutouts = []
full_rectangles = []

for f in pngs:
    path = os.path.join(pub, f)
    try:
        im = Image.open(path)
        if im.mode != 'RGBA':
            full_rectangles.append((f, im.size, 'No Alpha'))
            continue
        
        # Check corners for transparency
        tl = im.getpixel((0, 0))[3]
        tr = im.getpixel((im.width-1, 0))[3]
        bl = im.getpixel((0, im.height-1))[3]
        br = im.getpixel((im.width-1, im.height-1))[3]
        
        if tl == 0 and tr == 0 and bl == 0 and br == 0:
            transparent_cutouts.append((f, im.size))
        else:
            full_rectangles.append((f, im.size, 'Corners Opaque'))
    except Exception as e:
        pass

print("=== TRANSPARENT CUTOUTS ===")
for f, sz in transparent_cutouts:
    print(f"  {f} - {sz}")

print("\n=== FULL RECTANGLES / SOLID ===")
for f, sz, reason in full_rectangles:
    print(f"  {f} - {sz} ({reason})")
