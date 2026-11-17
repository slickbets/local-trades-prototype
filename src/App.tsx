import { useEffect } from 'react'
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { CONTRACTORS } from './data'
import { resetDemo } from './store'
import Home from './pages/Home'
import Profile from './pages/Profile'
import LeaveReview from './pages/LeaveReview'
import Confirm from './pages/Confirm'
import Claim from './pages/Claim'
import Nominate from './pages/Nominate'

const first = CONTRACTORS[0].id

export default function App() {
  const { pathname } = useLocation()
  const nav = useNavigate()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="mx-auto min-h-screen max-w-xl bg-cream shadow-sm">
      <div className="bg-clay px-4 py-1.5 text-center text-xs font-semibold text-white">
        Sample data: every name, review, and phone number here is made up.
      </div>
      <header className="flex items-center justify-between border-b border-sand px-4 py-3">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-serif text-2xl font-bold text-pine">Local Trades</span>
          <span className="rounded-full bg-sand px-2 py-0.5 text-[11px] font-semibold text-muted">working name</span>
        </Link>
        <Link to="/nominate" className="text-sm font-semibold text-pine">Nominate</Link>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/c/:id" element={<Profile />} />
          <Route path="/c/:id/review" element={<LeaveReview />} />
          <Route path="/nominate" element={<Nominate />} />
          <Route path="/confirm/:reviewId" element={<Confirm />} />
          <Route path="/claim/:id" element={<Claim />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <footer className="border-t border-sand bg-sand/50 px-4 py-6 text-sm">
        <p className="mb-1 font-semibold">Free for homeowners. No ads. No paid placement.</p>
        <p className="mb-4 text-muted">A clickable prototype. Nothing here is real, and nothing leaves your browser.</p>
        <p className="mb-2 font-semibold">Demo menu (jump to any screen)</p>
        <ul className="grid grid-cols-1 gap-1.5 text-pine">
          <li><Link className="underline" to="/">1. Home and search</Link></li>
          <li><Link className="underline" to={`/c/${first}`}>2. Contractor profile</Link></li>
          <li><Link className="underline" to={`/c/${first}/review`}>3. Leave a review</Link></li>
          <li><Link className="underline" to="/confirm/sample">4a. Contractor side: job confirmation</Link></li>
          <li><Link className="underline" to={`/claim/${first}`}>4b. Contractor side: claim your page</Link></li>
          <li><Link className="underline" to="/nominate">5. Nominate a contractor</Link></li>
        </ul>
        <button
          className="mt-4 text-xs text-muted underline"
          onClick={() => {
            resetDemo()
            nav('/')
            window.location.reload()
          }}
        >
          Reset demo (clears reviews and nominations saved in this browser)
        </button>
      </footer>
    </div>
  )
}
