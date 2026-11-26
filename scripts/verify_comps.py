from PIL import Image

def test_composite(clean_png, bg_color, out_name):
    fg = Image.open(clean_png).convert('RGBA')
    # create card canvas
    w = 600
    h = 400
    # resize fg to fit within w-60, h-60
    fg.thumbnail((w-60, h-60), Image.Resampling.LANCZOS)
    
    bg = Image.new('RGBA', (w, h), bg_color)
    # paste fg centered
    x = (w - fg.width) // 2
    y = (h - fg.height) // 2
    bg.paste(fg, (x, y), fg)
    bg.save(out_name)
    print(f"Saved {out_name}")

test_composite('vest-website/scripts/test_clean_crio.png', (225, 101, 138, 255), 'vest-website/scripts/comp_crio.png')
test_composite('vest-website/scripts/test_clean_sensor.png', (176, 146, 227, 255), 'vest-website/scripts/comp_sensor.png')
test_composite('vest-website/scripts/test_clean_vision.png', (69, 206, 190, 255), 'vest-website/scripts/comp_vision.png')
