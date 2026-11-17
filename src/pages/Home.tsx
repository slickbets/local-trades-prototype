import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AREAS, TRADES } from '../data'
import { allContractors, contractorStats } from '../store'
import { ContractorCard } from '../components/ui'

export default function Home() {
  const [trade, setTrade] = useState<string>('All')
  const [area, setArea] = useState<string>('All')

  const rows = allContractors()
    .filter((c) => trade === 'All' || c.trade === trade)
    .filter((c) => area === 'All' || c.areas.includes(area) || c.areas.includes('Springfield'))
    .map((c) => ({ c, s: contractorStats(c) }))
    .sort((a, b) => (b.s.rating ?? 0) - (a.s.rating ?? 0) || b.s.count - a.s.count)

  return (
    <div className="px-4 pb-8 pt-5">
      <h1 className="text-3xl font-bold leading-tight">Hire the contractor your neighbors already trust.</h1>
      <p className="mb-5 mt-2 text-muted">Reviews from real jobs in Springfield, MO, including good folks who don't show up on Google.</p>

      <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
        {['All', ...TRADES].map((t) => (
          <button
            key={t}
            onClick={() => setTrade(t)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold ${trade === t ? 'border-pine bg-pine text-white' : 'border-sand bg-white'}`}
          >
            {t === 'All' ? 'All trades' : t}
          </button>
        ))}
      </div>

      <label className="label" htmlFor="area">Area</label>
      <select id="area" className="input mb-5" value={area} onChange={(e) => setArea(e.target.value)}>
        <option value="All">All of Springfield, MO</option>
        {AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
      </select>

      <p className="mb-3 text-sm text-muted">{rows.length} contractor{rows.length === 1 ? '' : 's'}, best rated first</p>
      <div className="space-y-3">
        {rows.map(({ c, s }) => <ContractorCard key={c.id} c={c} s={s} />)}
        {rows.length === 0 && <p className="card text-muted">Nobody listed for that combo yet. Know someone good? Nominate them below.</p>}
      </div>

      <div className="mt-6 rounded-2xl bg-clay-soft p-4">
        <p className="font-serif text-lg font-bold">Know a great contractor who's not here?</p>
        <p className="mb-3 text-sm text-muted">Add them with a quick review. We'll invite them to claim their page.</p>
        <Link to="/nominate" className="btn-primary">Nominate a contractor</Link>
      </div>
    </div>
  )
}
