from PIL import Image
from collections import deque

# Load original JPG
src = 'C:/Users/DELL/.gemini/antigravity/brain/91d533ab-c9df-4d21-b7b4-9f8f7b93e0fb/high_speed_digitizer_test_module_1794918481545.jpg'
im = Image.open(src).convert('RGB')
w, h = im.size
pixels = im.load()

# Background in original JPG:
# Pure studio background is white (r > 240, g > 240, b > 240)
# Floor shadow at the bottom is light gray (r > 215, g > 215, b > 215)
# BUT the faceplate has dark screws (x ~ 270, y ~ 290) and gold SMA connectors!
# Let's flood fill ONLY pixels that are connected to the border AND have (r >= 235, g >= 235, b >= 235 and diff <= 10)
# And for the floor shadow at the very bottom (y > 800), we can trace the black ejector handle!

visited = [[False]*w for _ in range(h)]
queue = deque()

# Start from borders
for x in range(w):
    queue.append((x, 0))
    visited[0][x] = True
for y in range(h):
    queue.append((0, y))
    queue.append((w-1, y))
    visited[y][0] = True
    visited[y][w-1] = True

while queue:
    cx, cy = queue.popleft()
    for nx, ny in [(cx+1, cy), (cx-1, cy), (cx, cy+1), (cx, cy-1)]:
        if 0 <= nx < w and 0 <= ny < h and not visited[ny][nx]:
            r, g, b = pixels[nx, ny]
            diff = max(r, g, b) - min(r, g, b)
            # Background is very high brightness and low saturation
            if min(r, g, b) >= 236 and diff <= 8:
                visited[ny][nx] = True
                queue.append((nx, ny))

# Now let's handle the bottom floor shadow (under the black handle)
# Anything below y=850 that is connected to the bottom border and r,g,b > 180 and diff <= 15
for x in range(w):
    if not visited[h-1][x]:
        visited[h-1][x] = True
        queue.append((x, h-1))

while queue:
    cx, cy = queue.popleft()
    for nx, ny in [(cx+1, cy), (cx-1, cy), (cx, cy+1), (cx, cy-1)]:
        if 0 <= nx < w and 820 <= ny < h and not visited[ny][nx]:
            r, g, b = pixels[nx, ny]
            diff = max(r, g, b) - min(r, g, b)
            if min(r, g, b) >= 190 and diff <= 15:
                visited[ny][nx] = True
                queue.append((nx, ny))

out = Image.new('RGBA', (w, h), (0, 0, 0, 0))
out_pix = out.load()
for y in range(h):
    for x in range(w):
        if not visited[y][x]:
            out_pix[x, y] = pixels[x, y] + (255,)

# Defringe boundary (1 px)
for y in range(1, h-1):
    for x in range(1, w-1):
        if out_pix[x, y][3] > 0:
            # check neighbor
            if visited[y-1][x] or visited[y+1][x] or visited[y][x-1] or visited[y][x+1]:
                r, g, b, a = out_pix[x, y]
                if min(r, g, b) >= 230 and (max(r, g, b) - min(r, g, b)) <= 10:
                    out_pix[x, y] = (0, 0, 0, 0)

bbox = out.getbbox()
if bbox:
    out = out.crop(bbox)

out.save('vest-website/scripts/digitizer_fixed.png')
print("Digitizer fixed successfully, size:", out.size)
