import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { claim, findContractor, liveReviews } from '../store'
import { Page } from '../components/ui'

export default function Claim() {
  const { id = '' } = useParams()
  const c = findContractor(id)
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  if (!c) return <Page back="/"><p>Contractor not found.</p></Page>

  const vouches = liveReviews(c).filter((r) => r.stars >= 4 && !r.id.startsWith('mine-')).slice(0, 3)

  return (
    <Page>
      <p className="mb-1 text-xs font-bold uppercase tracking-wide text-clay">Contractor view · step {step} of 3</p>

      {step === 1 && (
        <>
          <h1 className="mb-2 text-3xl font-bold leading-tight">{vouches.length === 1 ? '1 neighbor' : `${vouches.length} neighbors`} already vouched for you.</h1>
          <p className="mb-4 text-muted">Here's what they said about {c.name}. Claim your page to reply, add photos, and show up in search.</p>
          <div className="mb-5 space-y-2">
            {vouches.map((v) => (
              <div key={v.id} className="card">
                <p className="text-sm font-semibold">{v.author} · {v.job}</p>
                <p className="line-clamp-2 text-sm text-muted">"{v.text}"</p>
              </div>
            ))}
          </div>
          <button className="btn-primary w-full text-lg" onClick={() => setStep(2)}>Claim my page</button>
          <p className="mt-2 text-center text-sm text-muted">Takes about 2 minutes. Free.</p>
        </>
      )}

      {step === 2 && (
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); claim(c.id); setStep(3) }}>
          <h1 className="text-3xl font-bold leading-tight">Confirm it's you.</h1>
          <p className="text-muted">Check your name and phone number. Homeowners will see these.</p>
          <div>
            <label className="label" htmlFor="n">Your name</label>
            <input id="n" className="input" required value={name} onChange={(e) => setName(e.target.value)} placeholder={c.owner} />
          </div>
          <div>
            <label className="label" htmlFor="p">Phone</label>
            <input id="p" className="input" required inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={c.phone} />
          </div>
          <button className="btn-primary w-full text-lg">Confirm and go live</button>
          <p className="text-center text-xs text-muted">Demo only: we don't check anything.</p>
        </form>
      )}

      {step === 3 && (
        <div className="rounded-2xl bg-pine-soft p-5">
          <h1 className="mb-1 text-3xl font-bold text-pine">You're live.</h1>
          <p>{name || c.owner}, your page for {c.name} is up. Reviews can now be answered, and your number is on the page.</p>
          <Link to={`/c/${c.id}`} className="btn-primary mt-4">See my page</Link>
        </div>
      )}
    </Page>
  )
}
