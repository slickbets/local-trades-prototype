// Demo "backend": everything lives in this browser's localStorage.
import { CONTRACTORS, statsFor, type Contractor, type Review, type Trade } from './data'

const KEY = 'local-trades-prototype-v1'

export type StoredReview = Review & {
  contractorId: string
  status: 'pending' | 'live' | 'held'
  createdAt: number
  photos: number
}

type State = { reviews: StoredReview[]; nominees: Contractor[]; claimed: string[] }

const load = (): State => {
  try {
    return { reviews: [], nominees: [], claimed: [], ...JSON.parse(localStorage.getItem(KEY) ?? '{}') }
  } catch {
    return { reviews: [], nominees: [], claimed: [] }
  }
}
const save = (s: State) => localStorage.setItem(KEY, JSON.stringify(s))

export const allContractors = (): Contractor[] => [...load().nominees, ...CONTRACTORS]
export const findContractor = (id: string) => allContractors().find((c) => c.id === id)
export const isClaimed = (id: string) => load().claimed.includes(id)

export const liveReviews = (c: Contractor): Review[] => [
  ...load().reviews.filter((x) => x.contractorId === c.id && x.status === 'live'),
  ...c.reviews,
]
export const pendingReviews = (c: Contractor) => load().reviews.filter((x) => x.contractorId === c.id && x.status === 'pending')
export const findStoredReview = (id: string) => load().reviews.find((x) => x.id === id)
export const contractorStats = (c: Contractor) => statsFor(liveReviews(c))

export function addReview(contractorId: string, r: Omit<Review, 'id' | 'source'>, photos: number): StoredReview {
  const s = load()
  const rev: StoredReview = { ...r, id: `mine-${Date.now()}`, source: 'verified', contractorId, status: 'pending', createdAt: Date.now(), photos }
  s.reviews.unshift(rev)
  save(s)
  return rev
}

export function setReviewStatus(id: string, status: StoredReview['status']) {
  const s = load()
  s.reviews = s.reviews.map((x) => (x.id === id ? { ...x, status } : x))
  save(s)
}

export function addNominee(n: { name: string; trade: Trade; phone: string }, review: Omit<Review, 'id' | 'source'>, photos: number) {
  const s = load()
  const id = `nominee-${Date.now()}`
  s.nominees.unshift({
    id, name: n.name, trade: n.trade, owner: n.name, phone: n.phone,
    areas: ['Springfield'], blurb: 'Nominated by a neighbor. Not claimed yet.', checked: false,
    hue: 330, photos: [], reviews: [], nominated: true,
  })
  save(s)
  return addReview(id, review, photos)
}

export function claim(id: string) {
  const s = load()
  if (!s.claimed.includes(id)) s.claimed.push(id)
  save(s)
}

export const resetDemo = () => localStorage.removeItem(KEY)
