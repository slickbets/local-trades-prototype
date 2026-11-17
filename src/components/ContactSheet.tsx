import { useState } from 'react'
import type { Contractor } from '../data'

export function ContactSheet({ c, onClose }: { c: Contractor; onClose: () => void }) {
  const [msg, setMsg] = useState(false)
  const [sent, setSent] = useState(false)
  const tel = c.phone.replace(/-/g, '')
  return (
    <div className="fixed inset-0 z-30 flex items-end justify-center bg-black/40" onClick={onClose}>
      <div className="w-full max-w-xl rounded-t-3xl bg-cream p-5 pb-8" onClick={(e) => e.stopPropagation()}>
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-sand" />
        <h2 className="text-xl font-bold">Contact {c.owner} at {c.name}</h2>
        <p className="mb-4 text-sm text-muted">{c.phone} (sample number)</p>
        {sent ? (
          <p className="rounded-xl bg-pine-soft p-4 font-semibold text-pine">Message sent. This is a demo, so nothing actually went anywhere.</p>
        ) : msg ? (
          <div className="space-y-3">
            <textarea className="input" rows={3} placeholder={`Hi ${c.owner}, I'd like a quote for…`} />
            <button className="btn-primary w-full" onClick={() => setSent(true)}>Send message</button>
          </div>
        ) : (
          <div className="grid gap-2">
            <a href={`tel:${tel}`} className="btn-primary">Call</a>
            <a href={`sms:${tel}`} className="btn-ghost">Text</a>
            <button className="btn-ghost" onClick={() => setMsg(true)}>Message through Local Trades</button>
          </div>
        )}
        <button className="mt-3 w-full py-2 text-sm font-semibold text-muted" onClick={onClose}>Close</button>
      </div>
    </div>
  )
}
