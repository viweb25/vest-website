import re

with open('vest-website/data/servicesData.ts', encoding='utf-8') as f:
    text = f.read()

# Find all keys in SERVICES_DATA
service_blocks = re.findall(r'\"([a-z0-9\-]+)\":\s*\{\s*\"slug\":\s*\"([^\"]+)\"', text)
print(f"Total services in SERVICES_DATA: {len(service_blocks)}")
for key, slug in service_blocks:
    print(f"Service Key: {key} (slug: {slug})")

# Let's inspect each one's howItWorks
for key, slug in service_blocks:
    print("=" * 60)
    print(f"SERVICE: {key} ({slug})")
    # find service block
    pos = text.find(f'"{key}":')
    if pos != -1:
        # find howItWorks
        hiw_pos = text.find('"howItWorks":', pos)
        # next service or end
        next_pos = text.find('\n  "', pos + 10)
        if next_pos == -1:
            next_pos = len(text)
        
        if hiw_pos != -1 and hiw_pos < next_pos:
            hiw_block = text[hiw_pos:next_pos]
            steps_match = re.search(r'"steps":\s*\[(.*?)\]', hiw_block, re.DOTALL)
            if steps_match:
                step_entries = re.findall(r'\{\s*"step":\s*(\d+).*?"title":\s*"([^"]+)".*?"image":\s*"([^"]+)"', steps_match.group(1), re.DOTALL)
                for s, t, img in step_entries:
                    print(f"  Step {s}: {t} -> {img}")
                if not step_entries:
                    # check without image
                    step_entries_no_img = re.findall(r'\{\s*"step":\s*(\d+).*?"title":\s*"([^"]+)"', steps_match.group(1), re.DOTALL)
                    for s, t in step_entries_no_img:
                        print(f"  Step {s}: {t} -> (NO IMAGE PROPERTY)")
            else:
                print("  No steps match")
        else:
            print("  howItWorks not found in this service")
