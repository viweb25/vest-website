from PIL import Image

im = Image.open('vest-website/public/how-it-works/step-6.png').convert('RGBA')
w, h = im.size
pixels = im.load()

# Let's inspect the bottom-left corner of step-6.png
print("step-6 size:", w, h)
# Clear shadow at x < 450, y > 740
for y in range(740, h):
    for x in range(0, 480):
        p = pixels[x, y]
        if p[3] > 0:
            r, g, b = p[:3]
            # Shadow is gray (diff <= 15)
            diff = max(r, g, b) - min(r, g, b)
            if diff <= 18:
                pixels[x, y] = (0, 0, 0, 0)

im.save('vest-website/public/how-it-works/step-6.png')
print("step-6.png shadow cleaned successfully!")
