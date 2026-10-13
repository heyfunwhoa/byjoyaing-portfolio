"""Generate public QR assets offline. Requires reportlab and Pillow; no site dependency.
Run from the repository root. QR holds only the canonical public HTTPS URL.
"""
import argparse
from pathlib import Path
from reportlab.graphics.barcode.qrencoder import QRCode, QRErrorCorrectLevel
from PIL import Image, ImageDraw, ImageFont

parser = argparse.ArgumentParser()
parser.add_argument("--variant", choices=["personal", "truffle"], default="personal")
args = parser.parse_args()
sales = args.variant == "truffle"
route = "/connect/truffle" if sales else "/connect"
url = f"https://www.byjoyaing.com{route}"
qr = QRCode(None, QRErrorCorrectLevel.M)
qr.addData(url)
qr.make()
n = qr.getModuleCount()
quiet = 4
scale = 20
size = (n + 2 * quiet) * scale
img = Image.new("RGB", (size, size), "white")
draw = ImageDraw.Draw(img)
rects = []
for row in range(n):
    for col in range(n):
        if qr.isDark(row, col):
            x, y = (col + quiet) * scale, (row + quiet) * scale
            draw.rectangle((x, y, x + scale - 1, y + scale - 1), fill="black")
            rects.append(f'<rect x="{col+quiet}" y="{row+quiet}" width="1" height="1"/>')
out = Path(f"public{route}")
out.mkdir(parents=True, exist_ok=True)
img.save(out / "qr.png")
(out / "qr.svg").write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {n+8} {n+8}" shape-rendering="crispEdges"><title>QR code for {url}</title><rect width="100%" height="100%" fill="white"/><g fill="black">{"".join(rects)}</g></svg>\n')
card = Image.new("RGB", (1080, 1600), "#F3EFE6")
d = ImageDraw.Draw(card)
fontpath = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
for text, y, fontsize in [("Truffle Security" if sales else "joy.", 115, 60 if sales else 78), ("Kristen Aing", 235, 50), ("Let’s connect", 340, 40), (f"byjoyaing.com{route}", 1320, 32 if sales else 40), ("Scan, then choose LinkedIn.", 1400, 30)]:
    font = ImageFont.truetype(fontpath, fontsize)
    d.text((540, y), text, font=font, fill="#1B211D", anchor="mt")
card.paste(img, ((1080-size)//2, 460))
card.save(out / "conference-card.png")
print(f"Generated {n}x{n} modules, four-module quiet zone; payload: {url}")
