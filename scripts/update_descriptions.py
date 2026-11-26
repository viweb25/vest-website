with open('vest-website/components/services/ServiceTemplate.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

replacements = [
    ('className="font-mono text-[var(--ink)] text-base sm:text-lg leading-relaxed max-w-xl mb-8 font-semibold"',
     'className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl mb-8 font-normal"'),
    ('className="font-mono text-[var(--ink)] text-sm sm:text-base leading-relaxed font-medium max-w-2xl mx-auto"',
     'className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto"'),
    ('className="font-mono text-[var(--ink)] text-xs sm:text-sm leading-relaxed font-normal text-center mb-5 font-normal"',
     'className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal text-center mb-5"'),
    ('className="font-mono text-[var(--ink)] text-sm sm:text-base leading-relaxed font-medium mb-8"',
     'className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal mb-8"'),
    ('className="font-mono text-[var(--ink)] text-sm sm:text-base leading-relaxed font-medium"',
     'className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal"'),
    ('className="font-mono text-[var(--ink)] text-sm sm:text-base leading-relaxed font-medium max-w-2xl font-normal"',
     'className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl"'),
    ('className="font-mono text-[var(--ink)] text-sm sm:text-base leading-relaxed font-medium max-w-2xl mx-auto font-normal"',
     'className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto"'),
    ('className="font-mono text-[var(--ink)] text-base sm:text-lg leading-relaxed font-medium font-normal"',
     'className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal"'),
    ('className="font-mono text-[var(--ink)] text-xs sm:text-sm leading-relaxed font-normal"',
     'className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal"'),
    ('className="pb-6 sm:pb-7 pr-8 sm:pr-12 font-mono text-[var(--ink)] text-sm sm:text-base leading-relaxed font-medium max-w-4xl"',
     'className="pb-6 sm:pb-7 pr-8 sm:pr-12 text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-4xl"')
]

count = 0
for r_from, r_to in replacements:
    if r_from in c:
        c = c.replace(r_from, r_to)
        count += 1

with open('vest-website/components/services/ServiceTemplate.tsx', 'w', encoding='utf-8') as f:
    f.write(c)

print(f'Successfully updated {count} pattern types in ServiceTemplate.tsx')
