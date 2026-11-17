import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { findContractor, findStoredReview, setReviewStatus } from '../store'
import { Page } from '../components/ui'

// Contractor-side screen. "sample" shows a made-up request; a real id shows the review you just left.
export default function Confirm() {
  const { reviewId = 'sample' } = useParams()
  const stored = findStoredReview(reviewId)
  const [answer, setAnswer] = useState<'yes' | 'no' | null>(null)

  const contractor = stored ? findContractor(stored.contractorId) : undefined
  const who = contractor?.owner ?? 'Dale'
  const job = stored?.job ?? 'a large oak removal'
  const customer = stored ? 'a neighbor' : 'Karen M.'
  const date = stored ? new Date(stored.createdAt - 3 * 864e5).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Oct 28'

  return (
    <Page>
      <p className="mb-1 text-xs font-bold uppercase tracking-wide text-clay">Contractor view</p>
      <h1 className="mb-4 text-2xl font-bold">Hi {who}, quick question.</h1>

      {answer === null && (
        <>
          <div className="card mb-4">
            <p className="text-xl font-serif leading-snug">
              Did you do <b>{job}</b> for <b>{customer}</b> around <b>{date}</b>?
            </p>
          </div>
          <div className="mb-4 flex items-start gap-3 rounded-2xl bg-sand p-4">
            <svg width="22" height="22" viewBox="0 0 20 20" className="mt-0.5 shrink-0 fill-muted"><path d="M6 8V6a4 4 0 118 0v2h1a1 1 0 011 1v8a1 1 0 01-1 1H5a1 1 0 01-1-1V9a1 1 0 011-1h1zm2 0h4V6a2 2 0 10-4 0v2z" /></svg>
            <p className="text-sm"><b>A review is waiting, and it's hidden from you.</b> Answering only tells us the job happened. You can reply publicly once the review is live.</p>
          </div>
          <div className="grid gap-2">
            <button className="btn-primary text-lg" onClick={() => { if (stored) setReviewStatus(stored.id, 'live'); setAnswer('yes') }}>Yes, that was me</button>
            <button className="btn-ghost" onClick={() => { if (stored) setReviewStatus(stored.id, 'held'); setAnswer('no') }}>I don't recognize this</button>
          </div>
        </>
      )}

      {answer === 'yes' && (
        <div className="rounded-2xl bg-pine-soft p-5">
          <h2 className="mb-1 text-xl font-bold text-pine">Thanks, that's confirmed.</h2>
          <p>The review is now live with a "Verified job" tag. You'll be able to reply to it.</p>
          {contractor && <Link to={`/c/${contractor.id}`} className="btn-primary mt-4">See it on the profile</Link>}
        </div>
      )}
      {answer === 'no' && (
        <div className="rounded-2xl bg-clay-soft p-5">
          <h2 className="mb-1 text-xl font-bold text-clay">Thanks, we'll take a look.</h2>
          <p>We won't post the review while we check it out. Nothing changes on your page.</p>
        </div>
      )}
      {answer && <button className="mt-4 text-sm text-muted underline" onClick={() => setAnswer(null)}>Start over</button>}
    </Page>
  )
}
