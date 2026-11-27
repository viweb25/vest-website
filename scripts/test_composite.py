from PIL import Image

im = Image.open('vest-website/public/Industrial QR Scanning Clamp Machine.png').convert('RGBA')
print("Clamp size:", im.size)
# Compare with Precision Signal Conditioning Sensor Array.png
im2 = Image.open('vest-website/public/Precision Signal Conditioning Sensor Array.png').convert('RGBA')
print("Sensor array size:", im2.size)

# Create a test background with the card color (e.g. #E1658A or #B092E3)
bg = Image.new('RGBA', (im2.width, im2.height), (225, 101, 138, 255))
bg.paste(im2, (0, 0), im2)
bg.save('vest-website/scripts/test_sensor_composite.png')
print("Saved test_sensor_composite.png")
