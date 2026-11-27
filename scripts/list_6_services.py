import re

with open('vest-website/data/servicesData.ts', encoding='utf-8') as f:
    text = f.read()

services = [
    'labview-application-development',
    'automated-test-systems',
    'hardware-instrument-integration',
    'industrial-automation',
    'ai-vision-inspection',
    'legacy-code-refactoring'
]

for s in services:
    print(f"\n==================== {s.upper()} ====================")
    pos = text.find(f'"{s}":')
    if pos != -1:
        next_pos = text.find('\n  "', pos + 10)
        sub = text[pos:next_pos if next_pos != -1 else len(text)]
        hiw_pos = sub.find('"howItWorks":')
        if hiw_pos != -1:
            steps_match = re.search(r'"steps":\s*\[(.*?)\]', sub[hiw_pos:], re.DOTALL)
            if steps_match:
                steps = re.findall(r'\{\s*"step":\s*(\d+).*?"title":\s*"([^"]+)".*?"image":\s*"([^"]+)"', steps_match.group(1), re.DOTALL)
                for num, title, img in steps:
                    print(f"  Step {num}: {title} --> {img}")
