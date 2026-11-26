import os
from PIL import Image
from collections import deque

target_images = [
    'Precision Signal Conditioning Sensor Array.png',
    'NI PXIe-1085 Modular Instrument Chassis.png',
    'Professional Benchtop Test Instrument Suite.png',
    'NI Lab Equipment and LabVIEW Test Setup.png',
    'Precision NI Laboratory Instrument Stack.png',
    'NI CompactRIO Industrial Controller Modules.png',
    'Industrial Automation Test Cell Dashboard.png',
    'Industrial Vision Quality Control Showcase.png',
    'LabVIEW Vision Inspection Workstation.png',
    'AI Machine Vision Inspection Station.png',
    'LabVIEW Machine Vision Inspection System (1).png',
    'LabVIEW Machine Vision Inspection System.png',
    'Legacy to Modern LabVIEW Code Migration (1).png',
    'Smart Refactoring vs. Rewrite.png',
    'Legacy to Modern LabVIEW Code Migration.png',
    'Automated Test System and LabVIEW Workstation.png',
    'Automotive Ethernet and CAN Diagnostic Workstation.png'
]

pub = 'vest-website/public'

for fname in target_images:
    src_path = os.path.join(pub, fname)
    if not os.path.exists(src_path):
        print(f"Skipping (not found): {fname}")
        continue
    
    im = Image.open(src_path).convert('RGB')
    w, h = im.size
    pixels = im.load()

    # BFS from all 4 borders
    visited = [[False]*w for _ in range(h)]
    queue = deque()

    for x in range(w):
        queue.append((x, 0))
        queue.append((x, h - 1))
        visited[0][x] = True
        visited[h - 1][x] = True

    for y in range(h):
        queue.append((0, y))
        queue.append((w - 1, y))
        visited[y][0] = True
        visited[y][w - 1] = True

    # Flood fill all background & soft floor shadows
    while queue:
        cx, cy = queue.popleft()
        for nx, ny in [(cx+1, cy), (cx-1, cy), (cx, cy+1), (cx, cy-1)]:
            if 0 <= nx < w and 0 <= ny < h and not visited[ny][nx]:
                nr, ng, nb = pixels[nx, ny]
                diff = max(nr, ng, nb) - min(nr, ng, nb)
                min_c = min(nr, ng, nb)
                if min_c >= 120 and diff <= 18:
                    visited[ny][nx] = True
                    queue.append((nx, ny))

    # Defringe 2 passes on boundary pixels
    for _ in range(2):
        to_visit = []
        for y in range(1, h-1):
            for x in range(1, w-1):
                if not visited[y][x]:
                    if visited[y-1][x] or visited[y+1][x] or visited[y][x-1] or visited[y][x+1]:
                        r, g, b = pixels[x, y]
                        diff = max(r, g, b) - min(r, g, b)
                        min_c = min(r, g, b)
                        if min_c >= 160 and diff <= 22:
                            to_visit.append((x, y))
        for x, y in to_visit:
            visited[y][x] = True

    out = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    out_pixels = out.load()
    for y in range(h):
        for x in range(w):
            if not visited[y][x]:
                r, g, b = pixels[x, y]
                out_pixels[x, y] = (r, g, b, 255)

    bbox = out.getbbox()
    if bbox:
        cropped = out.crop(bbox)
    else:
        cropped = out
    
    cropped.save(src_path, 'PNG')
    print(f"Cleaned: {fname} -> {cropped.size}")

print("All targeted images cleaned successfully!")
