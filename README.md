# ZenZac

A calm, offline toolkit for children with ADHD, autism, or both — and the grown-ups beside them. No accounts, no adverts, no tracking, no network calls.

Open `index.html` in a browser. Everything works from a double-click; a local server is optional.

## What is in it

| Section | What it does |
| --- | --- |
| **Home** | Greeting, mood check-in, "start here today" suggestions from the child's plan, house rules, today's numbers. |
| **Set-up** | Seven short questions: name, age band, mode (ADHD / autism / both / not sure), what is hard, what helps, sensory notes, house rules, colours. Every answer can be changed later. |
| **Calm** | Guided breathing (three patterns), six ambient sounds, grounding exercises. |
| **Now & Next** | Two-slot routine with timer, task queue, stickers, and the house rules kept in view. |
| **Focus** | Choice wheel with themed sets (foods, sports, colours, animals, computer, silly), Wac-A-Zac with gold/mover/grump targets and a best-rounds board, focus timer. |
| **Journal** | Private feelings check-ins, behaviour notes, weekly chart. |
| **Play** | Knock-knock jokes with a knock-at-the-door sound, and the fart machine. |
| **Compendium** | 89 practical entries in 15 categories — including nutrition, health, activities and behaviour tracking — searchable and filterable, plus links into the matching app tool. |
| **Learn** | Thirteen longer guides for grown-ups, plus official guidance and charity links (NHS, NICE, NAS, ADHD Foundation, IPSEA, Contact). |
| **Parent support** | The long version: 45 entries across 13 topics, searchable, with scripts, a GP appointment guide, medication questions and a direct email contact. |
| **Settings** | Name, sound, spoken cues, calm motion, bigger text, six soft palettes, plan summary, export and delete. |

## The plan

The set-up wizard builds a local profile and a **house rules** set. The profile is a starting point, not a label: it changes what Home puts first and which shortcuts appear. Rules are short agreements shown on Home and Now & Next, and they can be toggled, rewritten or added to at any time.

Six palettes are included — three light (Meadow, Blossom, Sea glass) and three low-glare dark (Dusk, Twilight, Forest). No pure white, no external fonts, no CDN icons.

## Files

```
index.html            shell, SVG icon sprite, inline palette bootstrap
assets/theme.css      design system, palettes, layout (rail → bottom tabs)
assets/data.js        moods, sounds, jokes, guides, spinner sets, official sources, setup questions, rule defaults
assets/compendium.js  89 entries across 15 categories
assets/support.js     45 long-form parent support entries across 13 topics
assets/app.js         state, storage, audio, router and every view
assets/logo.svg       favicon
legacy/               the original 15 standalone pages, archived not deleted
Fart/                 fart-machine audio
*.mp3                 ambient audio
```

## Run it

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>. Serving over HTTP is recommended if audio does not play from a `file://` URL in your browser.

## Privacy

Everything lives in `localStorage` under the key `zenzac.v1` on that device. Export a JSON copy from Settings before clearing browser data. There are no accounts, no analytics, no cookies and no requests to any third party.

## Boundaries

ZenZac is a support tool, not a medical device and not a diagnosis. If you are worried about a child, speak to a GP, health visitor or school SENCO.
