"""
Generate SVG gestures untuk Alphabet (A-Z) dan Numbers (0-9)
"""

import os

BASE_DIR = r'd:\gesture-landing\public\gestures'

def create_letter_svg(letter):
    """Create SVG untuk setiap huruf alphabet"""
    svg_templates = {
        'A': '''<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="95" fill="#E0E7FF" stroke="#2563EB" stroke-width="2"/>
  <g transform="translate(100, 100)">
    <rect x="-15" y="20" width="30" height="35" fill="#F4A76A" rx="8"/>
    <ellipse cx="0" cy="-2" rx="20" ry="24" fill="#F4A76A"/>
    <path d="M -18 -5 Q -24 -15 -22 -30" fill="none" stroke="#E89B5E" stroke-width="9" stroke-linecap="round"/>
    <circle cx="-22" cy="-32" r="5.5" fill="#E89B5E"/>
    <path d="M 8 -20 Q 10 -10 9 5" fill="none" stroke="#E89B5E" stroke-width="9" stroke-linecap="round"/>
    <circle cx="10" cy="7" r="5.5" fill="#E89B5E"/>
  </g>
</svg>''',
        'B': '''<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="95" fill="#E0E7FF" stroke="#2563EB" stroke-width="2"/>
  <g transform="translate(100, 100)">
    <rect x="-15" y="20" width="30" height="35" fill="#F4A76A" rx="8"/>
    <ellipse cx="0" cy="-5" rx="25" ry="30" fill="#F4A76A"/>
    <rect x="-18" y="-45" width="9" height="50" fill="#F4A76A" rx="4.5"/>
    <circle cx="-14.5" cy="-48" r="5.5" fill="#E89B5E"/>
    <rect x="-6" y="-45" width="9" height="50" fill="#F4A76A" rx="4.5"/>
    <circle cx="-1.5" cy="-48" r="5.5" fill="#E89B5E"/>
    <rect x="6" y="-40" width="9" height="45" fill="#F4A76A" rx="4.5"/>
    <circle cx="10.5" cy="-43" r="5.5" fill="#E89B5E"/>
    <rect x="18" y="-35" width="9" height="40" fill="#F4A76A" rx="4.5"/>
    <circle cx="22.5" cy="-38" r="5.5" fill="#E89B5E"/>
  </g>
</svg>''',
        'C': '''<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="95" fill="#E0E7FF" stroke="#2563EB" stroke-width="2"/>
  <g transform="translate(100, 100)">
    <rect x="-15" y="20" width="30" height="35" fill="#F4A76A" rx="8"/>
    <path d="M -5 -35 Q -25 -30 -25 0 Q -25 30 -5 35" fill="none" stroke="#F4A76A" stroke-width="20" stroke-linecap="round"/>
    <path d="M 15 -25 Q 18 -15 18 0 Q 18 15 15 25" fill="none" stroke="#E89B5E" stroke-width="12" stroke-linecap="round"/>
  </g>
</svg>''',
        'D': '''<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="95" fill="#E0E7FF" stroke="#2563EB" stroke-width="2"/>
  <g transform="translate(100, 100)">
    <rect x="-15" y="20" width="30" height="35" fill="#F4A76A" rx="8"/>
    <ellipse cx="0" cy="0" rx="20" ry="24" fill="#F4A76A"/>
    <path d="M -18 -28 Q -6 -30 -6 30" fill="none" stroke="#E89B5E" stroke-width="12" stroke-linecap="round"/>
    <rect x="-6" y="-45" width="10" height="50" fill="#F4A76A" rx="5"/>
    <circle cx="-1" cy="-48" r="6" fill="#E89B5E"/>
  </g>
</svg>''',
        'O': '''<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="95" fill="#E0E7FF" stroke="#2563EB" stroke-width="2"/>
  <g transform="translate(100, 100)">
    <rect x="-15" y="20" width="30" height="35" fill="#F4A76A" rx="8"/>
    <circle cx="0" cy="-5" r="22" fill="#F4A76A"/>
    <circle cx="0" cy="-5" r="14" fill="#E0E7FF" stroke="#2563EB" stroke-width="2" stroke-dasharray="5,3"/>
    <path d="M -18 -20 Q -28 -25 -28 -5 Q -28 15 -18 20" fill="none" stroke="#E89B5E" stroke-width="8" stroke-linecap="round"/>
    <path d="M 18 -20 Q 28 -25 28 -5 Q 28 15 18 20" fill="none" stroke="#E89B5E" stroke-width="8" stroke-linecap="round"/>
  </g>
</svg>''',
    }
    
    # Return template if exists, otherwise create generic
    if letter in svg_templates:
        return svg_templates[letter]
    else:
        # Generic template untuk letter lain
        return f'''<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="95" fill="#E0E7FF" stroke="#2563EB" stroke-width="2"/>
  <g transform="translate(100, 100)">
    <rect x="-15" y="20" width="30" height="35" fill="#F4A76A" rx="8"/>
    <ellipse cx="0" cy="-5" rx="25" ry="30" fill="#F4A76A"/>
    <text x="0" y="15" font-size="60" font-weight="bold" text-anchor="middle" fill="#E89B5E">{letter}</text>
  </g>
</svg>'''

def create_number_svg(num):
    """Create SVG untuk setiap angka (0-9)"""
    svg_templates = {
        '0': '''<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="95" fill="#E0E7FF" stroke="#2563EB" stroke-width="2"/>
  <g transform="translate(100, 100)">
    <rect x="-15" y="20" width="30" height="35" fill="#F4A76A" rx="8"/>
    <ellipse cx="0" cy="-5" rx="25" ry="30" fill="#F4A76A"/>
    <ellipse cx="0" cy="-5" rx="16" ry="18" fill="#E0E7FF"/>
    <text x="0" y="15" font-size="50" font-weight="bold" text-anchor="middle" fill="#E89B5E">0</text>
  </g>
</svg>''',
        '1': '''<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="95" fill="#E0E7FF" stroke="#2563EB" stroke-width="2"/>
  <g transform="translate(100, 100)">
    <rect x="-15" y="20" width="30" height="35" fill="#F4A76A" rx="8"/>
    <ellipse cx="0" cy="0" rx="20" ry="24" fill="#F4A76A"/>
    <rect x="-6" y="-50" width="10" height="55" fill="#F4A76A" rx="5"/>
    <circle cx="-1" cy="-53" r="6" fill="#E89B5E"/>
  </g>
</svg>''',
        '5': '''<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="95" fill="#E0E7FF" stroke="#2563EB" stroke-width="2"/>
  <g transform="translate(100, 100)">
    <rect x="-15" y="20" width="30" height="35" fill="#F4A76A" rx="8"/>
    <ellipse cx="0" cy="-5" rx="25" ry="30" fill="#F4A76A"/>
    <rect x="-18" y="-48" width="9" height="52" fill="#F4A76A" rx="4.5"/>
    <circle cx="-14.5" cy="-51" r="5.5" fill="#E89B5E"/>
    <path d="M -6 -35 Q -8 -15 -6 5" fill="none" stroke="#E89B5E" stroke-width="9" stroke-linecap="round"/>
    <path d="M 6 -30 Q 8 -12 6 8" fill="none" stroke="#E89B5E" stroke-width="9" stroke-linecap="round"/>
    <path d="M 18 -25 Q 20 -8 18 12" fill="none" stroke="#E89B5E" stroke-width="9" stroke-linecap="round"/>
  </g>
</svg>''',
    }
    
    if num in svg_templates:
        return svg_templates[num]
    else:
        return f'''<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="95" fill="#E0E7FF" stroke="#2563EB" stroke-width="2"/>
  <g transform="translate(100, 100)">
    <rect x="-15" y="20" width="30" height="35" fill="#F4A76A" rx="8"/>
    <ellipse cx="0" cy="-5" rx="25" ry="30" fill="#F4A76A"/>
    <text x="0" y="15" font-size="60" font-weight="bold" text-anchor="middle" fill="#E89B5E">{num}</text>
  </g>
</svg>'''

# Create alphabet SVGs
alphabet_dir = os.path.join(BASE_DIR, 'alphabet')
os.makedirs(alphabet_dir, exist_ok=True)

for letter in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ':
    filepath = os.path.join(alphabet_dir, f'{letter.lower()}.svg')
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(create_letter_svg(letter))
    print(f'✓ Created: alphabet/{letter.lower()}.svg')

# Create number SVGs
numbers_dir = os.path.join(BASE_DIR, 'numbers')
os.makedirs(numbers_dir, exist_ok=True)

for num in '0123456789':
    filepath = os.path.join(numbers_dir, f'{num}.svg')
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(create_number_svg(num))
    print(f'✓ Created: numbers/{num}.svg')

print(f'\n✅ Total: 26 alphabet + 10 numbers = 36 SVG files created!')
