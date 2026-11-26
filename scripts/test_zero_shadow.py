from PIL import Image
from collections import deque

im = Image.open('vest-website/scripts/clamp_perfect.png').convert('RGBA')
w, h = im.size
pixels = im.load()

visited = [[False]*w for _ in range(h)]
queue = deque()

# Flood from bottom and sides where y > h * 0.6
for x in range(w):
    queue.append((x, h-1))
    visited[h-1][x] = True

for y in range(int(h * 0.6), h):
    queue.append((0, y))
    visited[y][0] = True
    queue.append((w-1, y))
    visited[y][w-1] = True

while queue:
    cx, cy = queue.popleft()
    for nx, ny in [(cx+1, cy), (cx-1, cy), (cx, cy+1), (cx, cy-1)]:
        if 0 <= nx < w and int(h * 0.6) <= ny < h and not visited[ny][nx]:
            p = pixels[nx, ny]
            if p[3] == 0:
                visited[ny][nx] = True
                queue.append((nx, ny))
            else:
                r, g, b = p[:3]
                diff = max(r, g, b) - min(r, g, b)
                # Floor shadow threshold: neutral gray/white
                if min(r, g, b) >= 145 and diff <= 16:
                    visited[ny][nx] = True
                    queue.append((nx, ny))

out = Image.new('RGBA', (w, h), (0, 0, 0, 0))
out_pix = out.load()
for y in range(h):
    for x in range(w):
        if not visited[y][x]:
            out_pix[x, y] = pixels[x, y]

# Defringe 2 passes on bottom boundary
for _ in range(2):
    to_clear = []
    for y in range(int(h * 0.6), h-1):
        for x in range(1, w-1):
            if out_pix[x, y][3] > 0:
                if out_pix[x+1, y][3] == 0 or out_pix[x-1, y][3] == 0 or out_pix[x, y+1][3] == 0 or out_pix[x, y-1][3] == 0:
                    r, g, b, a = out_pix[x, y]
                    if min(r, g, b) >= 165 and (max(r, g, b) - min(r, g, b)) <= 20:
                        to_clear.append((x, y))
    for x, y in to_clear:
        out_pix[x, y] = (0, 0, 0, 0)

bbox = out.getbbox()
if bbox:
    out = out.crop(bbox)

out.save('vest-website/scripts/clamp_zero_shadow.png')

# Composite onto #E1658A
fg = out.copy()
fg.thumbnail((500, 420), Image.Resampling.LANCZOS)
card = Image.new('RGBA', (600, 500), (225, 101, 138, 255))
x = (600 - fg.width) // 2
y = (500 - fg.height) // 2
card.paste(fg, (x, y), fg)
card.save('C:/Users/DELL/.gemini/antigravity/brain/91d533ab-c9df-4d21-b7b4-9f8f7b93e0fb/card_clamp_zero_shadow.png')
print("Zero shadow test saved, new size:", out.size)
