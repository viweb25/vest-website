from PIL import Image
import os
from collections import Counter

images = [
    'Precision Signal Conditioning Sensor Array.png',
    'NI PXIe-1085 Modular Instrument Chassis.png',
    'Professional Benchtop Test Instrument Suite.png',
    'NI Lab Equipment and LabVIEW Test Setup.png',
    'Precision NI Laboratory Instrument Stack.png',
    'NI CompactRIO Industrial Controller Modules.png',
    'NI CompactDAQ Modular System Stack.png',
    'Industrial Vision Quality Control Showcase.png',
    'LabVIEW Vision Inspection Workstation.png',
    'AI Machine Vision Inspection Station.png',
    'LabVIEW Machine Vision Inspection System (1).png',
    'LabVIEW Machine Vision Inspection System.png',
    'Legacy to Modern LabVIEW Code Migration (1).png',
    'Smart Refactoring vs. Rewrite.png',
    'Silver Laptop Showing LabVIEW Block Diagram.png',
    'Legacy to Modern LabVIEW Code Migration.png',
    'Automated Test System and LabVIEW Workstation.png',
    'Industrial Automation Control Station.png',
]

for name in images:
    path = os.path.join('vest-website/public', name)
    if not os.path.exists(path):
        print(f"{name}: NOT FOUND")
        continue
    im = Image.open(path).convert('RGBA')
    w, h = im.size
    
    # check border pixels
    borders = []
    for x in range(w):
        borders.append(im.getpixel((x, 0)))
        borders.append(im.getpixel((x, h-1)))
    for y in range(h):
        borders.append(im.getpixel((0, y)))
        borders.append(im.getpixel((w-1, y)))
    
    # Check alpha
    alphas = [p[3] for p in borders]
    c_alpha = Counter(alphas)
    # Most common colors
    c_color = Counter(borders)
    top_c = c_color.most_common(2)
    print(f"{name:<45} | Size: {w}x{h} | Alpha 0: {c_alpha.get(0, 0)}/{len(alphas)} | Common: {top_c}")
