from PIL import Image
from collections import deque

im = Image.open('vest-website/scripts/digitizer_fixed.png')
w, h = im.size
pixels = im.load()

# Let's inspect what is in the bottom right corner
# The shadow is light gray: min_c >= 170, diff <= 12
visited = [[False]*w for _ in range(h)]
queue = deque()

# Flood fill from right border and bottom border
for y in range(h):
    queue.append((w-1, y))
    visited[y][w-1] = True
for x in range(w):
    queue.append((x, h-1))
    visited[h-1][x] = True

while queue:
    cx, cy = queue.popleft()
    for nx, ny in [(cx+1, cy), (cx-1, cy), (cx, cy+1), (cx, cy-1)]:
        if 0 <= nx < w and 0 <= ny < h and not visited[ny][nx]:
            p = pixels[nx, ny]
            if p[3] == 0:
                visited[ny][nx] = True
                queue.append((nx, ny))
            else:
                r, g, b = p[:3]
                diff = max(r, g, b) - min(r, g, b)
                # If it's the gray floor shadow
                if min(r, g, b) >= 150 and diff <= 15:
                    visited[ny][nx] = True
                    queue.append((nx, ny))

out = Image.new('RGBA', (w, h), (0, 0, 0, 0))
out_pix = out.load()
for y in range(h):
    for x in range(w):
        if not visited[y][x]:
            out_pix[x, y] = pixels[x, y]

bbox = out.getbbox()
if bbox:
    out = out.crop(bbox)

out.save('vest-website/scripts/digitizer_no_shadow.png')
print("Digitizer no shadow saved, size:", out.size)
