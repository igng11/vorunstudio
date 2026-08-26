from pathlib import Path

from PIL import Image, ImageChops, ImageOps


PUBLIC = Path(__file__).resolve().parent.parent / "public"


def extract_mark(source_name: str, dark_background: bool) -> Image.Image:
    source = Image.open(PUBLIC / source_name).convert("RGB")
    background = Image.new("RGB", source.size, (0, 0, 0) if dark_background else (255, 255, 255))
    difference = ImageChops.difference(source, background).convert("L")
    mask = difference.point(lambda value: 255 if value > 64 else 0)

    active_rows = [y for y in range(mask.height) if mask.crop((0, y, mask.width, y + 1)).getbbox()]
    groups = []
    for row in active_rows:
        if not groups or row > groups[-1][-1] + 1:
            groups.append([row])
        else:
            groups[-1].append(row)

    symbol_rows = groups[0]
    symbol_mask = mask.crop((0, symbol_rows[0], mask.width, symbol_rows[-1] + 1))
    symbol_box = symbol_mask.getbbox()
    left, top, right, bottom = symbol_box
    crop_box = (left, symbol_rows[0] + top, right, symbol_rows[0] + bottom)
    cropped = source.crop(crop_box).convert("RGBA")

    luminance = cropped.convert("RGB").convert("L")
    alpha = luminance if dark_background else ImageOps.invert(luminance)
    alpha = alpha.point(lambda value: 0 if value < 32 else min(255, round((value - 32) * 1.15)))
    color = (255, 255, 255, 255) if dark_background else (0, 0, 0, 255)
    mark = Image.new("RGBA", cropped.size, color)
    mark.putalpha(alpha)
    return mark


def place_square(mark: Image.Image, size: int, background=None) -> Image.Image:
    canvas = Image.new("RGBA", (size, size), background or (0, 0, 0, 0))
    limit = int(size * 0.78)
    ratio = min(limit / mark.width, limit / mark.height)
    resized = mark.resize((round(mark.width * ratio), round(mark.height * ratio)), Image.Resampling.LANCZOS)
    canvas.alpha_composite(resized, ((size - resized.width) // 2, (size - resized.height) // 2))
    return canvas


white_mark = extract_mark("logo-dark-big.jpeg", dark_background=True)
black_mark = extract_mark("logo-white-big.jpeg", dark_background=False)

place_square(white_mark, 512).save(PUBLIC / "brand-mark-dark.png", optimize=True)
place_square(black_mark, 512).save(PUBLIC / "brand-mark-light.png", optimize=True)

favicon = place_square(black_mark, 512, (255, 255, 255, 255)).convert("RGB")
favicon.save(PUBLIC / "favicon.png", optimize=True)
favicon.save(PUBLIC / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)])
