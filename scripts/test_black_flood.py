from PIL import Image
from collections import deque

im = Image.open('vest-website/public/Precision Signal Conditioning Sensor Array.png').convert('RGBA')
w, h = im.size
pixels = im.load()

# flood fill from borders for dark/black border pixels
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
            # if black/dark border or transparent
            if (r <= 20 and g <= 20 and b <= 20) or a == 0:
                visited[ny][nx] = True
                queue.append((nx, ny))

# count how many pixels visited
count_visited = sum(sum(row) for row in visited)
print(f"Total pixels: {w*h}, Visited background pixels: {count_visited} ({count_visited/(w*h)*100:.1f}%)")

# Let's see what remains
non_bg = []
for y in range(h):
    for x in range(w):
        if not visited[y][x]:
            non_bg.append((x, y))

if non_bg:
    min_x = min(p[0] for p in non_bg)
    max_x = max(p[0] for p in non_bg)
    min_y = min(p[1] for p in non_bg)
    max_y = max(p[1] for p in non_bg)
    print(f"Object bounding box: ({min_x}, {min_y}) to ({max_x}, {max_y}) (size: {max_x-min_x+1}x{max_y-min_y+1})")
