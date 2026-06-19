import { useEffect, useState } from 'react'
import DayRating from '../components/day_log/DayRating'
import type { DayRatingValue } from '../components/day_log/DayRating'
import RecentRating from '../components/day_log/RecentRating'
import { DAY_LOG_STORAGE_KEY, getDayKey, readStoredValue, writeStoredValue } from '../lib/daytrackerStorage'

export type DayLogEntry = {
	id: string
	dayKey: string
	rating: DayRatingValue
	note: string
	displayDateTime: string
	timestamp: string
}

export default function DayLog() {
	const [entries, setEntries] = useState<DayLogEntry[]>(() => readStoredValue<DayLogEntry[]>(DAY_LOG_STORAGE_KEY, []))

	useEffect(() => {
		writeStoredValue(DAY_LOG_STORAGE_KEY, entries)
	}, [entries])

	const handleSaveEntry = (rating: DayRatingValue, note: string) => {
		const now = new Date()
		const timestamp = now.toISOString()
		const nextEntry: DayLogEntry = {
			id: `${now.getTime()}`,
			dayKey: getDayKey(now),
			rating,
			note,
			displayDateTime: now.toLocaleString([], {
				year: 'numeric',
				month: 'short',
				day: 'numeric',
				hour: '2-digit',
				minute: '2-digit',
			}),
			timestamp,
		}

		setEntries((previous) => [nextEntry, ...previous].slice(0, 3))
	}

	return (
		<section id="day-log" className="grid w-full place-items-center py-2">
			<div className="grid w-full gap-6 lg:grid-cols-2 lg:items-start">
				<DayRating onSaveEntry={handleSaveEntry} />
				<RecentRating entries={entries} />
			</div>
		</section>
	)
}
