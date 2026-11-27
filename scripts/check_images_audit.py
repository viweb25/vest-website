from PIL import Image
import os

images_to_check = [
    # automated-test-systems
    "public/Industrial QR Scanning Clamp Machine.png",
    "public/Precision Power Stimulus Fixture.png",
    "public/Automated IO Stimulus Matrix.png",
    "public/Automotive CAN Protocol Interface.png",
    "public/High Speed Digitizer Test Module.png",
    "public/Automated Laser Marking Station.png",

    # labview-application-development
    "public/how-it-works/step-1.png",
    "public/how-it-works/step-2.png",
    "public/how-it-works/step-3.png",
    "public/how-it-works/step-4.png",
    "public/how-it-works/step-5.png",
    "public/how-it-works/step-6.png",

    # industrial-automation
    "public/Industrial Automation Control Station.png",
    "public/NI CompactRIO Industrial Controller Modules.png",

    # hardware-instrument-integration
    "public/Precision Signal Conditioning Sensor Array.png",
    "public/NI PXIe-1085 Modular Instrument Chassis.png",
    "public/Professional Benchtop Test Instrument Suite.png",
    "public/NI CompactDAQ Modular System Stack.png",
    "public/NI Lab Equipment and LabVIEW Test Setup.png",
    "public/Precision NI Laboratory Instrument Stack.png",

    # ai-vision-inspection
    "public/Industrial Vision Quality Control Showcase.png",
    "public/LabVIEW Vision Inspection Workstation.png",
    "public/AI Machine Vision Inspection Station.png",
    "public/LabVIEW Machine Vision Inspection System (1).png",
    "public/LabVIEW Machine Vision Inspection System.png",
    "public/Futuristic Robotic Gripper Holding Glowing Processor Cube.png",

    # legacy-code-refactoring
    "public/Legacy to Modern LabVIEW Code Migration (1).png",
    "public/Smart Refactoring vs. Rewrite.png",
    "public/Silver Laptop Showing LabVIEW Block Diagram.png",
    "public/Legacy to Modern LabVIEW Code Migration.png",
    "public/Electronics Lab Workstation with LabVIEW Monitor.png",
    "public/Automated Test System and LabVIEW Workstation.png",
]

base_dir = "vest-website"
print(f"{'Image Path':<55} | {'Mode':<5} | {'Size':<10} | {'Transparent?':<12} | {'Corners Alpha'}")
print("-" * 100)

for rel in images_to_check:
    full = os.path.join(base_dir, rel)
    if not os.path.exists(full):
        print(f"{rel:<55} | NOT FOUND")
        continue
    img = Image.open(full)
    has_alpha = img.mode in ('RGBA', 'LA') or ('transparency' in img.info)
    corners_alpha = "N/A"
    if has_alpha:
        img_rgba = img.convert('RGBA')
        w, h = img_rgba.size
        # check 4 corners
        corners = [
            img_rgba.getpixel((0, 0))[3],
            img_rgba.getpixel((w-1, 0))[3],
            img_rgba.getpixel((0, h-1))[3],
            img_rgba.getpixel((w-1, h-1))[3],
            img_rgba.getpixel((w//2, h-1))[3], # bottom center floor
        ]
        corners_alpha = str(corners)
        is_transparent = corners[0] == 0 and corners[1] == 0
    else:
        is_transparent = False
    
    print(f"{rel:<55} | {img.mode:<5} | {f'{img.width}x{img.height}':<10} | {str(is_transparent):<12} | {corners_alpha}")
