// All names, reviews, and phone numbers below are made up for this demo.

export const TRADES = ['Tree', 'HVAC', 'Plumbing', 'Remodeling', 'Lawn', 'Windows'] as const
export type Trade = (typeof TRADES)[number]

export const AREAS = ['Rountree', 'Phelps Grove', 'Galloway', 'Sequiota', 'Brentwood', 'Walnut Grove'] as const

export type Review = {
  id: string
  author: string
  date: string
  stars: number
  finished: boolean
  onTime: boolean
  nearQuote: boolean
  source: 'verified' | 'invited'
  job: string
  text: string
  disputed?: boolean
  reply?: { from: string; date: string; text: string }
}

export type Contractor = {
  id: string
  name: string
  trade: Trade
  owner: string
  phone: string
  areas: string[]
  blurb: string
  checked: boolean // "Licensed & insured, checked by us"
  hue: number // gradient color for placeholder photos
  photos: string[]
  reviews: Review[]
  nominated?: boolean
}

let n = 0
const r = (
  author: string,
  date: string,
  stars: number,
  [finished, onTime, nearQuote]: [boolean, boolean, boolean],
  source: Review['source'],
  job: string,
  text: string,
  extra: Partial<Review> = {},
): Review => ({ id: `r${++n}`, author, date, stars, finished, onTime, nearQuote, source, job, text, ...extra })

const Y = true
const N = false

export const CONTRACTORS: Contractor[] = [
  {
    id: 'ozark-limb-stump',
    name: 'Ozark Limb & Stump',
    trade: 'Tree',
    owner: 'Dale',
    phone: '417-555-0142',
    areas: ['Rountree', 'Phelps Grove', 'Galloway', 'Sequiota'],
    blurb: 'Family-run crew. Removals, trimming, and stump grinding. Dale quotes in person and texts before each visit.',
    checked: true,
    hue: 28,
    photos: ['Oak removal, Rountree', 'Crew truck', 'Stump ground and raked', 'Storm cleanup'],
    reviews: [
      r('Karen M.', 'Oct 2026', 5, [Y, Y, Y], 'verified', 'Large oak removal', 'Took down a huge oak leaning toward our garage. Two guys and a ground crew, and the yard was raked when they left. Price matched the quote to the dollar.'),
      r('Tom R.', 'Sep 2026', 2, [Y, N, N], 'verified', 'Maple trim and stump', 'Said Tuesday, showed up the next Monday. The final bill was higher than the quote. The work itself was good.', {
        disputed: true,
        reply: {
          from: 'Dale, Ozark Limb & Stump',
          date: 'Sep 2026',
          text: 'We were rained out three days and a crew member was sick. I should have called you sooner, and that is on me. The extra $300 was the stump grinding you asked for on the day. I have the text and I am glad to go over it with you.',
        },
      }),
      r('Pam W.', 'Aug 2026', 5, [Y, Y, Y], 'invited', 'Storm limb cleanup', 'Called the morning after the storm and they came that afternoon. Hauled everything off.'),
      r('Greg and Lisa H.', 'Jun 2026', 4, [Y, Y, Y], 'verified', 'Crepe myrtle pruning', 'Careful around our flower beds. Would have liked a heads up on arrival time, but they were on time anyway.'),
      r('Marcus D.', 'Mar 2026', 5, [Y, Y, N], 'verified', 'Two pine removals', 'A little over the quote because one pine had a second trunk, but Dale told us before he started.'),
    ],
  },
  {
    id: 'two-oaks-tree-care',
    name: 'Two Oaks Tree Care',
    trade: 'Tree',
    owner: 'Shelby',
    phone: '417-555-0178',
    areas: ['Galloway', 'Brentwood', 'Walnut Grove'],
    blurb: 'Certified arborist. Best for pruning and keeping a sick tree alive before you pay to take it down.',
    checked: true,
    hue: 140,
    photos: ['Pruned dogwood', 'Arborist at work', 'Cabling an old elm'],
    reviews: [
      r('Janet S.', 'Oct 2026', 5, [Y, Y, Y], 'verified', 'Elm assessment and cabling', 'Told us the elm could be saved instead of removed. Saved us a few thousand dollars.'),
      r('Bill T.', 'Aug 2026', 4, [Y, N, Y], 'verified', 'Oak trimming', 'Great work, ran two weeks behind. They called to say so.'),
      r('Ana P.', 'Jul 2026', 5, [Y, Y, Y], 'invited', 'Dogwood pruning', 'Shelby explained every cut. Our dogwood has never looked better.'),
    ],
  },
  {
    id: 'brightwater-heating-air',
    name: 'Brightwater Heating & Air',
    trade: 'HVAC',
    owner: 'Curtis',
    phone: '417-555-0119',
    areas: ['Rountree', 'Sequiota', 'Brentwood', 'Walnut Grove'],
    blurb: 'Furnace and AC repair and replacement. Flat repair quotes, no pressure to replace.',
    checked: true,
    hue: 205,
    photos: ['New heat pump', 'Service van', 'Clean install, attic'],
    reviews: [
      r('Rhonda K.', 'Nov 2026', 5, [Y, Y, Y], 'verified', 'Furnace repair', 'Our furnace quit on a 19 degree night. Curtis was here in two hours and it was a $140 part, not a new furnace.'),
      r('Steve L.', 'Aug 2026', 5, [Y, Y, Y], 'verified', 'AC replacement', 'Three quotes, they were in the middle and the only ones who explained the sizing.'),
      r('Dee F.', 'Jun 2026', 4, [Y, Y, N], 'invited', 'Duct sealing', 'Quote went up $200 when they found a second leak. Fair, but I would have liked a call first.'),
      r('Mike O.', 'Feb 2026', 5, [Y, Y, Y], 'verified', 'Thermostat and tune-up', 'Quick, tidy, and no upsell.'),
    ],
  },
  {
    id: 'sequiota-comfort-co',
    name: 'Sequiota Comfort Co.',
    trade: 'HVAC',
    owner: 'Marlene',
    phone: '417-555-0163',
    areas: ['Sequiota', 'Phelps Grove', 'Galloway'],
    blurb: 'Two-person shop. Older homes, window units, and mini-splits.',
    checked: false,
    hue: 190,
    photos: ['Mini-split install', 'Basement unit'],
    reviews: [
      r('Walt J.', 'Oct 2026', 5, [Y, Y, Y], 'verified', 'Mini-split install', 'Added cooling to our sunroom. Neat lines, clean job, came in under quote.'),
      r('Cheryl B.', 'Jul 2026', 3, [N, Y, Y], 'verified', 'Old boiler check', 'Showed up on time and gave an honest quote, but could not source a part, so the job is not done yet.'),
    ],
  },
  {
    id: 'rays-rooter-plumbing',
    name: "Ray's Rooter & Plumbing",
    trade: 'Plumbing',
    owner: 'Ray',
    phone: '417-555-0127',
    areas: ['Rountree', 'Phelps Grove', 'Brentwood'],
    blurb: 'Drain clearing, water heaters, and the small repairs other shops skip. Evenings and Saturdays.',
    checked: true,
    hue: 215,
    photos: ['Water heater swap', 'Camera on a drain line'],
    reviews: [
      r('Linda C.', 'Nov 2026', 5, [Y, Y, Y], 'verified', 'Kitchen drain clog', 'Came Saturday morning, cleared the line, and showed me the camera footage. $165 flat.'),
      r('Doug and Pat N.', 'Sep 2026', 5, [Y, Y, Y], 'verified', 'Water heater replacement', 'Old one out and new one in before lunch. Hauled the old one away.'),
      r('Terri V.', 'Jun 2026', 4, [Y, Y, Y], 'invited', 'Leaky shutoff valve', 'Quick fix. Charged for an hour and was here for 40 minutes.'),
      r('Sam G.', 'Apr 2026', 5, [Y, Y, N], 'verified', 'Bathroom faucet', 'Quote was $210, final was $245 because the shutoff was seized. He explained and I was fine with it.'),
    ],
  },
  {
    id: 'galloway-pipe-drain',
    name: 'Galloway Pipe & Drain',
    trade: 'Plumbing',
    owner: 'Josh',
    phone: '417-555-0191',
    areas: ['Galloway', 'Sequiota', 'Walnut Grove'],
    blurb: 'Sewer lines and repiping. Bigger jobs, written quotes.',
    checked: true,
    hue: 235,
    photos: ['Sewer line dig', 'Copper repipe'],
    reviews: [
      r('Frank A.', 'Sep 2026', 4, [Y, N, Y], 'verified', 'Sewer line replacement', 'Took 4 days instead of 2 because of a rock shelf. They were upfront about it and the price held.'),
      r('Gail M.', 'May 2026', 5, [Y, Y, Y], 'verified', 'Repipe, 1950s house', 'Messy job, and they covered everything in plastic. Patched drywall too.'),
      r('Owen R.', 'Jan 2026', 3, [Y, Y, N], 'verified', 'Hose bib replacement', 'Good work, but the quote did not include the permit fee. Wish he had told me up front.'),
    ],
  },
  {
    id: 'pruitt-kitchen-bath',
    name: 'Pruitt Kitchen & Bath',
    trade: 'Remodeling',
    owner: 'Heather',
    phone: '417-555-0105',
    areas: ['Rountree', 'Phelps Grove', 'Sequiota', 'Brentwood'],
    blurb: 'Kitchens and bathrooms only. Heather does a walk-through every Friday while the job is running.',
    checked: true,
    hue: 20,
    photos: ['Kitchen, after', 'Tile work', 'Bathroom, before and after'],
    reviews: [
      r('Beth and Carl D.', 'Oct 2026', 5, [Y, Y, Y], 'verified', 'Kitchen remodel', 'Finished the week she said. Every Friday she walked us through what was done and what was next.'),
      r('Nina W.', 'Aug 2026', 5, [Y, N, Y], 'verified', 'Hall bathroom', 'Ran a week long because the tile was backordered. She told us the day she found out.'),
      r('Todd E.', 'May 2026', 4, [Y, Y, N], 'invited', 'Bathroom floor', 'We added heated floors halfway through, so of course the price went up. Quality is great.'),
    ],
  },
  {
    id: 'walnut-street-remodel-works',
    name: 'Walnut Street Remodel Works',
    trade: 'Remodeling',
    owner: 'Aaron',
    phone: '417-555-0136',
    areas: ['Walnut Grove', 'Galloway', 'Brentwood'],
    blurb: 'Decks, basements, and additions. A small crew that stays on your job until it is done.',
    checked: false,
    hue: 35,
    photos: ['Deck build', 'Finished basement'],
    reviews: [
      r('Kim L.', 'Sep 2026', 5, [Y, Y, Y], 'verified', 'Backyard deck', 'Same two guys every day. The deck is solid, and they left the yard clean.'),
      r('Randy P.', 'Jun 2026', 3, [Y, N, N], 'verified', 'Basement finishing', 'Nice finished product, but it took six weeks instead of four and ran about 10 percent over.'),
      r('Mia S.', 'Mar 2026', 4, [Y, Y, Y], 'invited', 'Porch rebuild', 'Good communication. A few small punch-list items took a while to get done.'),
    ],
  },
  {
    id: 'green-thumb-gary',
    name: 'Green Thumb Gary Lawn Care',
    trade: 'Lawn',
    owner: 'Gary',
    phone: '417-555-0152',
    areas: ['Rountree', 'Phelps Grove', 'Galloway'],
    blurb: 'Weekly mowing, fall cleanup, and leaf haul-off. Month-to-month, no contracts.',
    checked: false,
    hue: 110,
    photos: ['Fresh stripes', 'Fall cleanup'],
    reviews: [
      r('Helen T.', 'Nov 2026', 5, [Y, Y, Y], 'verified', 'Fall leaf cleanup', 'Our lot has four big maples and Gary hauled it all away in one day.'),
      r('Chuck B.', 'Jul 2026', 5, [Y, Y, Y], 'verified', 'Weekly mowing', 'Has not missed a week since April. Texts when it rains.'),
      r('Sue A.', 'May 2026', 4, [Y, Y, Y], 'invited', 'Spring mulch', 'Great job, but the mulch color is a little redder than I expected.'),
    ],
  },
  {
    id: 'brentwood-mow-mulch',
    name: 'Brentwood Mow & Mulch',
    trade: 'Lawn',
    owner: 'Tasha',
    phone: '417-555-0184',
    areas: ['Brentwood', 'Walnut Grove', 'Sequiota'],
    blurb: 'Mowing, edging, and flower bed work. Tasha sends before and after photos.',
    checked: false,
    hue: 95,
    photos: ['New flower bed', 'Edging'],
    reviews: [
      r('Ron K.', 'Oct 2026', 5, [Y, Y, Y], 'verified', 'Flower bed cleanup', 'Pulled out years of overgrowth and replanted. Price was what she quoted.'),
      r('Deb N.', 'Aug 2026', 3, [Y, N, Y], 'verified', 'Weekly mowing', 'Good mowing, but she skipped two weeks in July without telling us.'),
    ],
  },
  {
    id: 'clearview-window-pros',
    name: 'ClearView Window Pros',
    trade: 'Windows',
    owner: 'Victor',
    phone: '417-555-0168',
    areas: ['Rountree', 'Phelps Grove', 'Galloway', 'Brentwood'],
    blurb: 'Window replacement for older homes. Measures twice, installs in a day.',
    checked: true,
    hue: 200,
    photos: ['New double-hung windows', 'Before and after, front room'],
    reviews: [
      r('Alice H.', 'Oct 2026', 5, [Y, Y, Y], 'verified', '9 windows replaced', 'Installed all nine in one day. No drafts, and the trim was neatly finished.'),
      r('Brent F.', 'Jul 2026', 5, [Y, Y, Y], 'verified', 'Bay window', 'Victor spotted rotted framing and fixed it for a fair price, with approval first.'),
      r('Carol G.', 'Apr 2026', 4, [Y, N, Y], 'invited', '4 windows', 'Windows came in late from the supplier. He told us the day he found out.'),
    ],
  },
  {
    id: 'old-town-windows-glass',
    name: 'Old Town Windows & Glass',
    trade: 'Windows',
    owner: 'Paul',
    phone: '417-555-0114',
    areas: ['Phelps Grove', 'Rountree', 'Walnut Grove'],
    blurb: 'Repairs first. Broken seals, rotted sashes, storm windows, and glass replacement.',
    checked: true,
    hue: 175,
    photos: ['Sash repair', 'Storm windows'],
    reviews: [
      r('Nora P.', 'Sep 2026', 5, [Y, Y, Y], 'verified', 'Sash repair', 'Paul fixed our 1920s windows instead of selling us new ones. Half the price of a replacement.'),
      r('Leo W.', 'Jun 2026', 4, [Y, Y, N], 'verified', 'Broken seal, 3 panes', 'Came in $80 over because of a custom size. Told me before ordering.'),
    ],
  },
]

export type Stats = { finished: number | null; onTime: number | null; nearQuote: number | null; rating: number | null; count: number }

const pct = (rs: Review[], f: (x: Review) => boolean) => (rs.length ? Math.round((rs.filter(f).length / rs.length) * 100) : null)

export function statsFor(rs: Review[]): Stats {
  return {
    finished: pct(rs, (x) => x.finished),
    onTime: pct(rs, (x) => x.onTime),
    nearQuote: pct(rs, (x) => x.nearQuote),
    rating: rs.length ? rs.reduce((s, x) => s + x.stars, 0) / rs.length : null,
    count: rs.length,
  }
}
