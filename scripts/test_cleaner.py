from PIL import Image
from collections import deque

def clean_image(input_path, output_path):
    im = Image.open(input_path).convert('RGBA')
    w, h = im.size
    pixels = im.load()

    # Find background pixels by flood fill from all 4 borders
    # Background can be black (r,g,b <= 25) OR white/gray (min(r,g,b) >= 180 and diff <= 20)
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

    while queue:
        cx, cy = queue.popleft()
        for nx, ny in [(cx+1, cy), (cx-1, cy), (cx, cy+1), (cx, cy-1)]:
            if 0 <= nx < w and 0 <= ny < h and not visited[ny][nx]:
                r, g, b, a = pixels[nx, ny]
                if a == 0:
                    visited[ny][nx] = True
                    queue.append((nx, ny))
                    continue
                
                # Check if dark/black background
                is_black = (r <= 30 and g <= 30 and b <= 30)
                
                # Check if white/light gray studio background or soft floor shadow
                diff = max(r, g, b) - min(r, g, b)
                min_c = min(r, g, b)
                is_white_gray = (min_c >= 130 and diff <= 22)
                
                if is_black or is_white_gray:
                    visited[ny][nx] = True
                    queue.append((nx, ny))

    # Create new image
    out = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    out_pixels = out.load()
    for y in range(h):
        for x in range(w):
            if not visited[y][x]:
                out_pixels[x, y] = pixels[x, y]
    
    # Crop to non-empty bounding box
    bbox = out.getbbox()
    if bbox:
        out = out.crop(bbox)
    
    out.save(output_path, 'PNG')
    print(f"Processed {input_path} -> {output_path}, new size: {out.size}")
    return out

# Test on 3 images
clean_image('vest-website/public/Precision Signal Conditioning Sensor Array.png', 'vest-website/scripts/test_clean_sensor.png')
clean_image('vest-website/public/Industrial Vision Quality Control Showcase.png', 'vest-website/scripts/test_clean_vision.png')
clean_image('vest-website/public/NI CompactRIO Industrial Controller Modules.png', 'vest-website/scripts/test_clean_crio.png')
