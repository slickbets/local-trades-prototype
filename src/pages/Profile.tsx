import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { findContractor, isClaimed, liveReviews, pendingReviews, contractorStats } from '../store'
import { CheckedBadge, PhotoTile, Stars, TrustStatsBig } from '../components/ui'
import { ContactSheet } from '../components/ContactSheet'

const SOURCE = {
  verified: { label: 'Verified job', cls: 'bg-pine-soft text-pine' },
  invited: { label: 'Invited by contractor', cls: 'bg-sand text-muted' },
}

export default function Profile() {
  const { id = '' } = useParams()
  const [open, setOpen] = useState(false)
  const c = findContractor(id)
  if (!c) return <p className="p-4">Contractor not found. <Link className="underline" to="/">Back to search</Link></p>

  const reviews = liveReviews(c)
  const pending = pendingReviews(c)
  const s = contractorStats(c)

  return (
    <div className="pb-28">
      <div className="px-4 pb-5 pt-4" style={{ background: `linear-gradient(160deg, hsl(${c.hue} 55% 88%), hsl(${(c.hue + 30) % 360} 45% 80%))` }}>
        <Link to="/" className="mb-3 inline-block text-sm font-semibold text-pine">← Back to search</Link>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted">{c.trade} · Springfield, MO</p>
        <h1 className="mb-2 text-3xl font-bold leading-tight">{c.name}</h1>
        <div className="mb-3 flex items-center gap-2">
          <Stars value={s.rating} size={20} />
          <span className="text-lg font-bold">{s.rating ? s.rating.toFixed(1) : '–'}</span>
          <span className="text-muted">({s.count} review{s.count === 1 ? '' : 's'})</span>
        </div>
        {c.checked && <CheckedBadge />}
        {isClaimed(c.id) && <p className="mt-2 text-sm font-semibold text-pine">✓ Page claimed by the owner</p>}
      </div>

      <div className="space-y-6 px-4 pt-5">
        <p className="text-lg">{c.blurb}</p>
        <p className="-mt-3 text-sm text-muted">Serves {c.areas.join(', ')}.</p>

        {c.photos.length > 0 && (
          <section>
            <h2 className="mb-2 text-xl font-bold">Photos</h2>
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4">
              {c.photos.map((p, i) => <PhotoTile key={p} hue={c.hue + i * 14} caption={p} className="h-32 w-44" />)}
            </div>
          </section>
        )}

        <section className="card">
          <h2 className="mb-3 text-xl font-bold">How the jobs went</h2>
          <TrustStatsBig s={s} />
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold">Reviews from neighbors</h2>
          <div className="space-y-3">
            {pending.map((p) => (
              <div key={p.id} className="rounded-2xl border border-dashed border-clay bg-clay-soft p-4">
                <p className="font-semibold">Your review is waiting</p>
                <p className="text-sm text-muted">Only you can see this. It goes live when {c.name} confirms the job, or automatically on {new Date(p.createdAt + 7 * 864e5).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}.</p>
                <Link to={`/confirm/${p.id}`} className="mt-2 inline-block text-sm font-semibold text-pine underline">See what the contractor sees</Link>
              </div>
            ))}
            {reviews.length === 0 && <p className="card text-muted">No reviews live yet. Be the first neighbor to share how it went.</p>}
            {reviews.map((r) => (
              <article key={r.id} className="card">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <Stars value={r.stars} />
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${SOURCE[r.source].cls}`}>{SOURCE[r.source].label}</span>
                  {r.disputed && <span className="rounded-full bg-clay-soft px-2.5 py-0.5 text-xs font-semibold text-clay">Contractor disagrees</span>}
                </div>
                <p className="text-sm text-muted">{r.author} · {r.date} · {r.job}</p>
                <p className="mt-2">{r.text}</p>
                <p className="mt-2 text-xs text-muted">
                  {r.finished ? '✓' : '✗'} Finished · {r.onTime ? '✓' : '✗'} On time · {r.nearQuote ? '✓' : '✗'} Near quote
                </p>
                {r.reply && (
                  <div className="mt-3 rounded-xl border-l-4 border-pine bg-pine-soft p-3">
                    <p className="text-sm font-bold text-pine">Reply from {r.reply.from}</p>
                    <p className="mt-1 text-sm">{r.reply.text}</p>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        <div className="grid gap-2">
          <Link to={`/c/${c.id}/review`} className="btn-ghost">Leave a review for {c.owner}</Link>
          <Link to={`/claim/${c.id}`} className="py-2 text-center text-sm text-muted underline">Is this your business? Claim this page</Link>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 mx-auto max-w-xl border-t border-sand bg-cream/95 p-3 backdrop-blur">
        <button className="btn-primary w-full text-lg" onClick={() => setOpen(true)}>Contact {c.owner}</button>
      </div>
      {open && <ContactSheet c={c} onClose={() => setOpen(false)} />}
    </div>
  )
}
