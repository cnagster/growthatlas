import { db } from './firebase'
import {
  collection, doc, getDocs, getDoc, setDoc, writeBatch,
  query, where, orderBy, Timestamp,
} from 'firebase/firestore'

// ---- Types ----
export interface DailyRecord {
  date: string // YYYY-MM-DD
  shopifyNetSales: number
  shopifyOrders: number
  metaSpend: number
  googleSpend: number
  redditSpend: number
}

export interface MetadataDoc {
  lastUpdated: string
  dataRange: { from: string; to: string }
  totalDays: number
}

// ---- Collections ----
const DAILY_COL = 'dailyData'
const META_DOC = 'metadata/config'

// ---- Write ----

/** Write daily records in batches of 500 (Firestore limit). Returns count written. */
export async function writeDailyRecords(records: DailyRecord[]): Promise<number> {
  let written = 0
  for (let i = 0; i < records.length; i += 500) {
    const batch = writeBatch(db)
    const chunk = records.slice(i, i + 500)
    for (const rec of chunk) {
      const ref = doc(db, DAILY_COL, rec.date)
      batch.set(ref, rec)
    }
    await batch.commit()
    written += chunk.length
  }
  return written
}

/** Update the metadata document */
export async function writeMetadata(meta: MetadataDoc): Promise<void> {
  await setDoc(doc(db, 'metadata', 'config'), meta)
}

// ---- Read ----

/** Read all daily records for a given month (YYYY-MM) */
export async function readDailyByMonth(month: string): Promise<DailyRecord[]> {
  const [year, mo] = month.split('-')
  const startDate = `${year}-${mo}-01`
  const endDay = new Date(parseInt(year), parseInt(mo), 0).getDate()
  const endDate = `${year}-${mo}-${String(endDay).padStart(2, '0')}`

  const q = query(
    collection(db, DAILY_COL),
    where('date', '>=', startDate),
    where('date', '<=', endDate),
    orderBy('date'),
  )
  const snap = await getDocs(q)
  return snap.docs.map(d => d.data() as DailyRecord)
}

/** Read all daily records in a date range */
export async function readDailyRange(from: string, to: string): Promise<DailyRecord[]> {
  const q = query(
    collection(db, DAILY_COL),
    where('date', '>=', from),
    where('date', '<=', to),
    orderBy('date'),
  )
  const snap = await getDocs(q)
  return snap.docs.map(d => d.data() as DailyRecord)
}

/** Read metadata */
export async function readMetadata(): Promise<MetadataDoc | null> {
  const snap = await getDoc(doc(db, 'metadata', 'config'))
  return snap.exists() ? (snap.data() as MetadataDoc) : null
}

/** Count total documents in dailyData */
export async function countDailyRecords(): Promise<number> {
  const snap = await getDocs(collection(db, DAILY_COL))
  return snap.size
}
