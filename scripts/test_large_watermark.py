from PIL import Image, ImageDraw, ImageFont
import os

# Test canvas: 1500 x 920 (increased size, spacious, luxury feel)
W, H = 1500, 920
im = Image.new('RGB', (W, H), (250, 250, 250))
draw = ImageDraw.Draw(im)

# Ascending road curve spanning comfortably across the canvas:
# Start: (180, 780) -> End: (1320, 200)
# Nodes:
nodes = [
    (300, 730),  # Node 1
    (500, 650),  # Node 2
    (710, 560),  # Node 3
    (920, 480),  # Node 4
    (1110, 390), # Node 5
    (1280, 290), # Node 6
]

road_pts = [(160, 770)] + nodes + [(1360, 210)]

# Draw orange active road
for i in range(len(road_pts) - 1):
    draw.line([road_pts[i], road_pts[i+1]], fill=(255, 106, 0), width=7)

# Increased Card Size:
# Width: 290px, Height: 190px (spacious, fits full title and description comfortably!)
# Alternating: Top (1, 3, 5), Bottom (2, 4, 6)
card_w, card_h = 290, 190

cards = [
    {'step': 1, 'x': 155,  'y': 480, 'node': nodes[0], 'pos': 'top',    'title': 'System Specification'},
    {'step': 2, 'x': 355,  'y': 710, 'node': nodes[1], 'pos': 'bottom', 'title': 'Pattern Selection'},
    {'step': 3, 'x': 565,  'y': 310, 'node': nodes[2], 'pos': 'top',    'title': 'HAL & Core Engines'},
    {'step': 4, 'x': 775,  'y': 540, 'node': nodes[3], 'pos': 'bottom', 'title': 'UI & Subpanel Design'},
    {'step': 5, 'x': 965,  'y': 140, 'node': nodes[4], 'pos': 'top',    'title': 'Stress & Leak Profiling'},
    {'step': 6, 'x': 1135, 'y': 350, 'node': nodes[5], 'pos': 'bottom', 'title': 'Commissioning & Handover'},
]

for c in cards:
    nx, ny = c['node']
    cx, cy, cw, ch = c['x'], c['y'], card_w, card_h
    col = (255, 106, 0)
    
    # Dashed vertical line
    if c['pos'] == 'top':
        card_bottom = cy + ch
        draw.line([(nx, card_bottom), (nx, ny)], fill=col, width=2)
    else:
        card_top = cy
        draw.line([(nx, ny), (nx, card_top)], fill=col, width=2)

    # Card body: Pure white with soft shadow outline
    draw.rounded_rectangle([cx, cy, cx + cw, cy + ch], radius=22, fill=(255, 255, 255), outline=(228, 232, 238), width=2)
    
    # Watermark simulation in background (right-bottom corner of card)
    wm_x1 = cx + cw - 110
    wm_y1 = cy + ch - 110
    draw.rounded_rectangle([wm_x1, wm_y1, cx + cw - 10, cy + ch - 10], radius=16, fill=(245, 248, 252), outline=(238, 242, 248), width=1)
    
    # Header: Step number (01) in large bold orange
    draw.text((cx + 22, cy + 18), f"0{c['step']}", fill=(255, 106, 0))
    
    # Title
    draw.text((cx + 22, cy + 62), c['title'], fill=(13, 43, 76))
    
    # Description lines (simulated)
    draw.line([(cx + 22, cy + 105), (cx + cw - 40, cy + 105)], fill=(150, 160, 175), width=2)
    draw.line([(cx + 22, cy + 125), (cx + cw - 60, cy + 125)], fill=(150, 160, 175), width=2)
    draw.line([(cx + 22, cy + 145), (cx + cw - 90, cy + 145)], fill=(170, 180, 195), width=2)

# Milestone nodes on road
for nx, ny in nodes:
    draw.ellipse([nx-22, ny-22, nx+22, ny+22], fill=(255, 106, 0), outline=(255, 138, 61), width=3)
    draw.ellipse([nx-28, ny-28, nx+28, ny+28], outline=(255, 106, 0), width=2)

out_path = 'C:/Users/DELL/.gemini/antigravity/brain/91d533ab-c9df-4d21-b7b4-9f8f7b93e0fb/roadmap_large_watermark_test.png'
im.save(out_path)
print("Saved large watermark test to", out_path)
