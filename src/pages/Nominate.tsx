import { useState } from 'react'
import { Link } from 'react-router-dom'
import { TRADES, type Trade } from '../data'
import { addNominee, type StoredReview } from '../store'
import { Page, Photos, StarPicker, YesNo } from '../components/ui'

export default function Nominate() {
  const [name, setName] = useState('')
  const [trade, setTrade] = useState<Trade>('Tree')
  const [phone, setPhone] = useState('')
  const [job, setJob] = useState('')
  const [stars, setStars] = useState(0)
  const [finished, setFinished] = useState<boolean | null>(null)
  const [onTime, setOnTime] = useState<boolean | null>(null)
  const [nearQuote, setNearQuote] = useState<boolean | null>(null)
  const [text, setText] = useState('')
  const [photos, setPhotos] = useState(0)
  const [done, setDone] = useState<StoredReview | null>(null)

  if (done) {
    return (
      <Page>
        <div className="mb-4 rounded-2xl bg-pine-soft p-5">
          <h1 className="mb-1 text-2xl font-bold text-pine">Thanks for nominating {name}.</h1>
          <p>We'll text them a link to claim their page. Your review stays hidden until they confirm the job, or goes live on its own after 7 days.</p>
        </div>
        <div className="grid gap-2">
          <Link to={`/c/${done.contractorId}`} className="btn-primary">See their page</Link>
          <Link to="/" className="btn-ghost">Back to search</Link>
        </div>
      </Page>
    )
  }

  const ready = name.trim() && phone.trim() && job.trim() && stars > 0 && finished !== null && onTime !== null && nearQuote !== null

  return (
    <Page back="/" title="Nominate a contractor">
      <p className="-mt-2 mb-5 text-muted">Know someone great who isn't listed? Tell us who they are and how the job went.</p>
      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault()
          if (!ready) return
          window.scrollTo(0, 0)
          setDone(addNominee({ name: name.trim(), trade, phone: phone.trim() }, {
            author: 'You', date: 'Just now', stars, job: job.trim(), text: text.trim(),
            finished: finished!, onTime: onTime!, nearQuote: nearQuote!,
          }, photos))
        }}
      >
        <div>
          <label className="label" htmlFor="nm">Contractor or business name</label>
          <input id="nm" className="input" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label className="label" htmlFor="tr">Trade</label>
          <select id="tr" className="input" value={trade} onChange={(e) => setTrade(e.target.value as Trade)}>
            {TRADES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="ph">Their phone number</label>
          <input id="ph" className="input" inputMode="tel" placeholder="417-555-0100" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <hr className="border-sand" />
        <h2 className="text-xl font-bold">Your review</h2>
        <div>
          <label className="label" htmlFor="job">What did they do for you?</label>
          <input id="job" className="input" value={job} onChange={(e) => setJob(e.target.value)} />
        </div>
        <div>
          <p className="label">Your rating</p>
          <StarPicker value={stars} onChange={setStars} />
        </div>
        <YesNo label="Did they finish the job?" value={finished} onChange={setFinished} />
        <YesNo label="Did they finish on time?" value={onTime} onChange={setOnTime} />
        <YesNo label="Did the final price come in near the quote?" value={nearQuote} onChange={setNearQuote} />
        <div>
          <label className="label" htmlFor="text">Tell your neighbors more (optional)</label>
          <textarea id="text" className="input" rows={3} value={text} onChange={(e) => setText(e.target.value)} />
        </div>
        <Photos onCount={setPhotos} />
        <button className="btn-primary w-full text-lg disabled:opacity-40" disabled={!ready}>Nominate and submit review</button>
      </form>
    </Page>
  )
}
