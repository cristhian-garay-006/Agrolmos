import json
import re
import os

with open('input.txt', 'r', encoding='utf-8') as f:
    lines = f.readlines()

merged_slides = {}
merged_slides[0] = [] # For the title slide
for i in range(1, 29):
    merged_slides[i] = []

current_slide_num = 0

for line in lines:
    line = line.strip()
    if not line:
        continue
    
    match = re.match(r'^DIAPOSITIVA\s+(\d+)', line)
    if match:
        current_slide_num = int(match.group(1))
    else:
        if current_slide_num == 0:
            merged_slides[0].append(line)
        else:
            # We don't want the second section title to just appear as text
            if line.startswith("AUTOMATIZACION Y CONTROL"):
                continue
            merged_slides[current_slide_num].append(line)

media_map = {}
contenido_dir = 'contenido'
if os.path.exists(contenido_dir):
    for filename in os.listdir(contenido_dir):
        # Allow variations like Diapositiva, Diapostiva, Diapotiva
        match = re.search(r'Diapo.*?(\d+)', filename, re.IGNORECASE)
        if match:
            slide_num = int(match.group(1))
            
            title = ""
            if '-' in filename:
                parts = filename.split('-', 1)
                if len(parts) > 1:
                    title_part = parts[1]
                    title_part = title_part.rsplit('.', 1)[0]
                    title_part = title_part.strip().strip('.').strip()
                    if title_part not in ['1', '2', '']:
                        title = title_part

            if slide_num not in media_map:
                media_map[slide_num] = []
            media_map[slide_num].append({
                "filename": filename,
                "title": title
            })

slides = []
if len(merged_slides[0]) > 0:
    slides.append({
        "part": 1,
        "title": "TITLE",
        "content": merged_slides[0]
    })

for i in range(1, 29):
    if len(merged_slides[i]) > 0 or i in media_map:
        slide_obj = {
            "part": 1,
            "title": f"DIAPOSITIVA {i}",
            "content": merged_slides[i]
        }
        if i in media_map:
            slide_obj["media"] = media_map[i]
        slides.append(slide_obj)

with open('slides.js', 'w', encoding='utf-8') as f:
    f.write("const slideData = " + json.dumps(slides, indent=4, ensure_ascii=False) + ";\n")
