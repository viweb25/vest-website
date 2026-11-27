from PIL import Image

fg = Image.open('vest-website/scripts/clamp_perfect.png').convert('RGBA')
w, h = 600, 500
fg_thumb = fg.copy()
fg_thumb.thumbnail((500, 420), Image.Resampling.LANCZOS)

card = Image.new('RGBA', (w, h), (225, 101, 138, 255))
x = (w - fg_thumb.width) // 2
y = (h - fg_thumb.height) // 2
card.paste(fg_thumb, (x, y), fg_thumb)
card.save('C:/Users/DELL/.gemini/antigravity/brain/91d533ab-c9df-4d21-b7b4-9f8f7b93e0fb/card_clamp_check.png')
print("Saved card_clamp_check.png")
