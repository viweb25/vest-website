from PIL import Image

im = Image.open('vest-website/public/Automotive CAN Protocol Interface.png').convert('RGBA')
w, h = im.size
pixels = im.load()

# The module is dark black/gray. At the very bottom-left under the fins (x < 150, y > 730), there is a gray shadow
for y in range(730, h):
    for x in range(0, 160):
        p = pixels[x, y]
        if p[3] > 0:
            r, g, b = p[:3]
            diff = max(r, g, b) - min(r, g, b)
            # if gray shadow
            if min(r, g, b) >= 90 and diff <= 15:
                pixels[x, y] = (0, 0, 0, 0)

im.save('vest-website/public/Automotive CAN Protocol Interface.png')
print("CAN module shadow cleaned!")
