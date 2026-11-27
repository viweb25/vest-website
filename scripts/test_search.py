with open('vest-website/app/services/labview-engineering/page.tsx', encoding='utf-8') as f:
    text = f.read()

import re
matches = re.findall(r'<section[^>]*id=["\']([^"\']+)["\']', text)
print('Section IDs in labview-engineering:', matches)
matches2 = re.findall(r'// \d+\.\s*([^\n]+)', text)
print('Comments:', matches2)
