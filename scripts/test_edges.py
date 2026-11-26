from PIL import Image, ImageFilter

im = Image.open('C:/Users/DELL/.gemini/antigravity/brain/91d533ab-c9df-4d21-b7b4-9f8f7b93e0fb/industrial_qr_scanning_clamp_machine_1794918354551.jpg')
edges = im.filter(ImageFilter.FIND_EDGES)
edges.save('vest-website/scripts/clamp_edges.png')
print("Edges saved")
