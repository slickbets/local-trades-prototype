import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { Contractor, Stats } from '../data'

export function Stars({ value, size = 16 }: { value: number | null; size?: number }) {
  const v = Math.round(value ?? 0)
  return (
    <span className="inline-flex" aria-label={value ? `${value.toFixed(1)} out of 5 stars` : 'No rating yet'}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 20 20" className={i <= v ? 'fill-star' : 'fill-sand'}>
          <path d="M10 1.5l2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L1.4 7.8l6-.8z" />
        </svg>
      ))}
    </span>
  )
}

export function StarPicker({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div className="flex gap-1" role="radiogroup" aria-label="Stars">
      {[1, 2, 3, 4, 5].map((i) => (
        <button type="button" key={i} onClick={() => onChange(i)} aria-label={`${i} star${i > 1 ? 's' : ''}`} aria-checked={value === i} role="radio">
          <svg width={44} height={44} viewBox="0 0 20 20" className={i <= value ? 'fill-star' : 'fill-sand'}>
            <path d="M10 1.5l2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L1.4 7.8l6-.8z" />
          </svg>
        </button>
      ))}
    </div>
  )
}

export function YesNo({ label, value, onChange }: { label: string; value: boolean | null; onChange: (v: boolean) => void }) {
  return (
    <div>
      <p className="mb-2 font-semibold">{label}</p>
      <div className="grid grid-cols-2 gap-2">
        {[true, false].map((v) => (
          <button
            type="button"
            key={String(v)}
            onClick={() => onChange(v)}
            className={`rounded-xl border py-3 font-semibold ${value === v ? 'border-pine bg-pine text-white' : 'border-sand bg-white'}`}
          >
            {v ? 'Yes' : 'No'}
          </button>
        ))}
      </div>
    </div>
  )
}

export const STAT_LABELS: { key: 'finished' | 'onTime' | 'nearQuote'; label: string; short: string }[] = [
  { key: 'finished', label: 'Finished the job', short: 'Finished' },
  { key: 'onTime', label: 'Completed on time', short: 'On time' },
  { key: 'nearQuote', label: 'Came in near the quote', short: 'Near quote' },
]

export function TrustStatsCompact({ s }: { s: Stats }) {
  if (!s.count) return <p className="text-sm text-muted">No reviews live yet</p>
  return (
    <div className="grid grid-cols-3 gap-2">
      {STAT_LABELS.map((x) => (
        <div key={x.key} className="rounded-xl bg-pine-soft px-2 py-1.5 text-center">
          <div className="text-lg font-bold leading-tight text-pine">{s[x.key]}%</div>
          <div className="text-[11px] leading-tight text-pine-dark">{x.short}</div>
        </div>
      ))}
    </div>
  )
}

export function TrustStatsBig({ s }: { s: Stats }) {
  if (!s.count) return <p className="text-muted">No reviews live yet, so no numbers to show.</p>
  return (
    <div className="space-y-3">
      {STAT_LABELS.map((x) => (
        <div key={x.key}>
          <div className="mb-1 flex items-baseline justify-between">
            <span className="font-semibold">{x.label}</span>
            <span className="font-serif text-2xl font-bold text-pine">{s[x.key]}%</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-sand">
            <div className="h-full rounded-full bg-pine" style={{ width: `${s[x.key]}%` }} />
          </div>
        </div>
      ))}
      <p className="text-sm text-muted">Based on {s.count} review{s.count > 1 ? 's' : ''} from neighbors.</p>
    </div>
  )
}

// Illustrated placeholder photo: gradient + simple hills, no real images.
export function PhotoTile({ hue, caption, className = '' }: { hue: number; caption: string; className?: string }) {
  return (
    <div
      className={`relative flex shrink-0 items-end overflow-hidden rounded-xl ${className}`}
      style={{ background: `linear-gradient(160deg, hsl(${hue} 55% 78%), hsl(${(hue + 30) % 360} 45% 52%))` }}
    >
      <svg className="absolute inset-x-0 bottom-0 w-full opacity-30" viewBox="0 0 200 60" preserveAspectRatio="none">
        <path d="M0 40 Q40 10 80 35 T160 30 T200 38 V60 H0z" fill="#fff" />
        <circle cx="160" cy="14" r="9" fill="#fff" />
      </svg>
      <span className="relative m-2 rounded-md bg-black/45 px-2 py-0.5 text-xs text-white">{caption}</span>
      <span className="absolute right-2 top-2 rounded bg-white/70 px-1.5 text-[10px] font-semibold text-ink">sample photo</span>
    </div>
  )
}

export function CheckedBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-pine-soft px-3 py-1 text-sm font-semibold text-pine">
      <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M4 10.5l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" /></svg>
      Licensed &amp; insured, checked by us
    </span>
  )
}

export function ContractorCard({ c, s }: { c: Contractor; s: Stats }) {
  return (
    <Link to={`/c/${c.id}`} className="card block transition hover:border-pine/40">
      <div className="mb-2 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold leading-snug">{c.name}</h3>
          <p className="text-sm text-muted">{c.areas.slice(0, 3).join(', ')}</p>
        </div>
        <span className="rounded-full bg-sand px-2.5 py-0.5 text-xs font-semibold">{c.trade}</span>
      </div>
      <div className="mb-3 flex items-center gap-2">
        <Stars value={s.rating} />
        <span className="text-sm font-semibold">{s.rating ? s.rating.toFixed(1) : '–'}</span>
        <span className="text-sm text-muted">({s.count} review{s.count === 1 ? '' : 's'})</span>
        {c.nominated && <span className="rounded-full bg-clay-soft px-2 py-0.5 text-xs font-semibold text-clay">Nominated</span>}
      </div>
      <TrustStatsCompact s={s} />
    </Link>
  )
}

export function Page({ title, back, children }: { title?: string; back?: string; children: ReactNode }) {
  return (
    <div className="px-4 pb-8 pt-4">
      {back && (
        <Link to={back} className="mb-3 inline-block text-sm font-semibold text-pine">← Back</Link>
      )}
      {title && <h1 className="mb-4 text-3xl font-bold leading-tight">{title}</h1>}
      {children}
    </div>
  )
}

export function Photos({ onCount }: { onCount: (n: number) => void }) {
  const [urls, setUrls] = useState<string[]>([])
  return (
    <div>
      <label className="btn-ghost w-full cursor-pointer">
        Add photos (optional)
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            const u = Array.from(e.target.files ?? []).map((f) => URL.createObjectURL(f))
            setUrls(u)
            onCount(u.length)
          }}
        />
      </label>
      {urls.length > 0 && (
        <div className="mt-2 flex gap-2 overflow-x-auto">
          {urls.map((u) => <img key={u} src={u} alt="Your upload" className="h-16 w-16 rounded-lg object-cover" />)}
        </div>
      )}
      <p className="mt-1 text-xs text-muted">Photos stay on your device in this demo.</p>
    </div>
  )
}
