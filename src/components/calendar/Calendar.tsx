import type { DayLogEntry } from '../../pages/DayLog'

type CalendarProps = {
	month: Date
	selectedDayKey: string
	entries: DayLogEntry[]
	onSelectDay: (dayKey: string) => void
}

const weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function getDayKey(date: Date) {
	const year = date.getFullYear()
	const month = `${date.getMonth() + 1}`.padStart(2, '0')
	const day = `${date.getDate()}`.padStart(2, '0')

	return `${year}-${month}-${day}`
}

function startOfCalendarGrid(month: Date) {
	const firstDay = new Date(month.getFullYear(), month.getMonth(), 1)
	const offset = firstDay.getDay()
	const gridStart = new Date(firstDay)
	gridStart.setDate(firstDay.getDate() - offset)
	return gridStart
}

function getMonthLabel(month: Date) {
	return month.toLocaleDateString([], {
		month: 'long',
		year: 'numeric',
	})
}

export default function Calendar({ month, selectedDayKey, entries, onSelectDay }: CalendarProps) {
	const todayKey = getDayKey(new Date())
	const gridStart = startOfCalendarGrid(month)
	const days = Array.from({ length: 42 }, (_, index) => {
		const date = new Date(gridStart)
		date.setDate(gridStart.getDate() + index)
		return date
	})

	return (
		<section className="rounded-2xl bg-white/80 p-6 shadow-sm ring-1 ring-black/5 backdrop-blur">
			<div className="flex items-center justify-between gap-3">
				<div>
					<h1 className="m-0 text-3xl font-semibold text-slate-900">Calendar</h1>
					<p className="mt-2 text-sm text-slate-600">{getMonthLabel(month)}</p>
				</div>
			</div>

			<div className="mt-5 grid grid-cols-7 gap-2 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
				{weekdayLabels.map((label) => (
					<div key={label}>{label}</div>
				))}
			</div>

			<div className="mt-3 grid grid-cols-7 gap-2">
				{days.map((date) => {
					const dayKey = getDayKey(date)
					const entry = entries.find((currentEntry) => currentEntry.dayKey === dayKey)
					const isCurrentMonth = date.getMonth() === month.getMonth()
					const isToday = dayKey === todayKey
					const isSelected = dayKey === selectedDayKey

					return (
						<button
							key={dayKey}
							type="button"
							onClick={() => onSelectDay(dayKey)}
							className={`min-h-24 rounded-2xl border p-2 text-left transition ${
								isSelected
									? 'border-slate-900 bg-slate-900 text-white shadow-md'
									: isToday
										? 'border-emerald-400 bg-emerald-50 text-slate-900'
										: isCurrentMonth
											? 'border-slate-200 bg-white text-slate-900 hover:border-slate-400'
											: 'border-slate-100 bg-slate-50 text-slate-400'
							}`}
						>
							<div className="flex items-start justify-between gap-2">
								<span className="text-sm font-semibold">{date.getDate()}</span>
								{isToday ? <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">Today</span> : null}
							</div>
							{entry ? (
								<div className="mt-3 rounded-xl bg-black/5 px-2 py-1 text-xs font-medium text-current">
									{entry.rating}
								</div>
							) : null}
						</button>
					)
				})}
			</div>
		</section>
	)
}
