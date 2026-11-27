from PIL import Image

im = Image.open('vest-website/scripts/clamp_perfect.png').convert('RGBA')
w, h = im.size
pixels = im.load()

# Let's inspect rows from h-1 down to h-100
for y in range(h-40, h):
    # check pixels in this row that have alpha > 0
    row_pixels = [pixels[x, y] for x in range(w) if pixels[x, y][3] > 0]
    if row_pixels:
        avg_r = sum(p[0] for p in row_pixels) / len(row_pixels)
        avg_g = sum(p[1] for p in row_pixels) / len(row_pixels)
        avg_b = sum(p[2] for p in row_pixels) / len(row_pixels)
        print(f"y={y}: count={len(row_pixels)}, avg=({avg_r:.1f}, {avg_g:.1f}, {avg_b:.1f})")
