from PIL import Image

for name in ['test_clean_crio.png', 'test_clean_sensor.png', 'test_clean_vision.png']:
    im = Image.open('vest-website/scripts/' + name)
    corners = [im.getpixel((0,0)), im.getpixel((im.width-1, 0)), im.getpixel((0, im.height-1)), im.getpixel((im.width-1, im.height-1))]
    print(name, "Corners:", corners)
