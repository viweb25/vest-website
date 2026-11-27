from PIL import Image
from collections import deque

im = Image.open('C:/Users/DELL/.gemini/antigravity/brain/91d533ab-c9df-4d21-b7b4-9f8f7b93e0fb/industrial_qr_scanning_clamp_machine_1794918354551.jpg').convert('RGB')
w, h = im.size
pixels = im.load()

# Let's see: pure white background at top and sides has r >= 248, g >= 248, b >= 248
visited = [[False]*w for _ in range(h)]
queue = deque()

# Flood fill from top, left, right borders for pure white
for x in range(w):
    queue.append((x, 0))
    visited[0][x] = True
for y in range(h):
    queue.append((0, y))
    visited[y][0] = True
    queue.append((w-1, y))
    visited[y][w-1] = True

while queue:
    cx, cy = queue.popleft()
    for nx, ny in [(cx+1, cy), (cx-1, cy), (cx, cy+1), (cx, cy-1)]:
        if 0 <= nx < w and 0 <= ny < h and not visited[ny][nx]:
            r, g, b = pixels[nx, ny]
            diff = max(r, g, b) - min(r, g, b)
            # Only flood fill the white studio background
            if min(r, g, b) >= 242 and diff <= 6:
                visited[ny][nx] = True
                queue.append((nx, ny))

# Now look at the bottom floor shadow:
# The machine base has a crisp dark edge / bevel at the bottom (y ~ 900 to 930)
# Below that bevel is the soft floor shadow
# Let's flood fill from bottom border (y=h-1) for shadow pixels (r,g,b >= 160, diff <= 12)
# but DO NOT cross any dark edge or hardware
for x in range(w):
    if not visited[h-1][x]:
        visited[h-1][x] = True
        queue.append((x, h-1))

while queue:
    cx, cy = queue.popleft()
    for nx, ny in [(cx+1, cy), (cx-1, cy), (cx, cy+1), (cx, cy-1)]:
        if 0 <= nx < w and 0 <= ny < h and not visited[ny][nx]:
            r, g, b = pixels[nx, ny]
            diff = max(r, g, b) - min(r, g, b)
            # The shadow is light gray/white on the floor
            if ny >= 850 and min(r, g, b) >= 170 and diff <= 12:
                visited[ny][nx] = True
                queue.append((nx, ny))

out = Image.new('RGBA', (w, h), (0, 0, 0, 0))
out_pix = out.load()
for y in range(h):
    for x in range(w):
        if not visited[y][x]:
            out_pix[x, y] = pixels[x, y] + (255,)

# Defringe boundary
for y in range(1, h-1):
    for x in range(1, w-1):
        if out_pix[x, y][3] > 0:
            if visited[y-1][x] or visited[y+1][x] or visited[y][x-1] or visited[y][x+1]:
                r, g, b, a = out_pix[x, y]
                if min(r, g, b) >= 235 and (max(r, g, b) - min(r, g, b)) <= 8:
                    out_pix[x, y] = (0, 0, 0, 0)

bbox = out.getbbox()
if bbox:
    out = out.crop(bbox)

out.save('vest-website/scripts/clamp_perfect.png')
print("Clamp perfect saved, size:", out.size)
