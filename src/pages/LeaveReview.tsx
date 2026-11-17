import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { addReview, findContractor, type StoredReview } from '../store'
import { Page, Photos, StarPicker, YesNo } from '../components/ui'

export default function LeaveReview() {
  const { id = '' } = useParams()
  const c = findContractor(id)
  const [stars, setStars] = useState(0)
  const [job, setJob] = useState('')
  const [finished, setFinished] = useState<boolean | null>(null)
  const [onTime, setOnTime] = useState<boolean | null>(null)
  const [nearQuote, setNearQuote] = useState<boolean | null>(null)
  const [text, setText] = useState('')
  const [photos, setPhotos] = useState(0)
  const [done, setDone] = useState<StoredReview | null>(null)

  if (!c) return <Page back="/"><p>Contractor not found.</p></Page>

  if (done) {
    return (
      <Page>
        <div className="mb-4 rounded-2xl bg-pine-soft p-5">
          <h1 className="mb-1 text-2xl font-bold text-pine">Thanks, your review is in.</h1>
          <p>It isn't public yet. Here's what happens next.</p>
        </div>
        <ol className="mb-5 space-y-3">
          <li className="card"><b>1. {c.name} gets a quick question.</b><br />"Did you do this job for you, around this date?" They answer Yes or "I don't recognize this." They don't see your review or your stars.</li>
          <li className="card"><b>2. If they say yes, your review goes live.</b><br />It's tagged "Verified job."</li>
          <li className="card"><b>3. If they don't answer, it goes live on its own after 7 days.</b><br />Contractors can't sit on a review to keep it hidden.</li>
        </ol>
        <div className="grid gap-2">
          <Link to={`/confirm/${done.id}`} className="btn-primary">Demo: see what the contractor sees</Link>
          <Link to={`/c/${c.id}`} className="btn-ghost">Back to {c.name}</Link>
        </div>
      </Page>
    )
  }

  const ready = stars > 0 && finished !== null && onTime !== null && nearQuote !== null && job.trim().length > 0

  return (
    <Page back={`/c/${c.id}`} title={`How did it go with ${c.name}?`}>
      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault()
          if (!ready) return
          window.scrollTo(0, 0)
          setDone(addReview(c.id, {
            author: 'You', date: 'Just now', stars, job: job.trim(), text: text.trim(),
            finished: finished!, onTime: onTime!, nearQuote: nearQuote!,
          }, photos))
        }}
      >
        <div>
          <label className="label" htmlFor="job">What did they do for you?</label>
          <input id="job" className="input" placeholder="e.g. Removed an oak tree" value={job} onChange={(e) => setJob(e.target.value)} />
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
          <textarea id="text" className="input" rows={4} value={text} onChange={(e) => setText(e.target.value)} placeholder="What went well? What would you want a neighbor to know?" />
        </div>
        <Photos onCount={setPhotos} />
        <button className="btn-primary w-full text-lg disabled:opacity-40" disabled={!ready}>Submit review</button>
        {!ready && <p className="-mt-3 text-center text-sm text-muted">Add the job, stars, and all three yes/no answers to submit.</p>}
      </form>
    </Page>
  )
}
