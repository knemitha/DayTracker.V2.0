import { useMemo, useState } from 'react'
import CalendarGrid from '../components/calendar/Calendar'
import SelectedDay from '../components/calendar/SelectedDay'
import type { DayLogEntry } from './DayLog'
import type { TaskList } from './Tasks'
import { DAY_LOG_STORAGE_KEY, TASK_LIST_STORAGE_KEY, getDayKey, readStoredValue } from '../lib/daytrackerStorage'

export default function Calendar() {
	const [selectedDayKey, setSelectedDayKey] = useState(() => getDayKey(new Date()))
	const [month] = useState(() => new Date())
	const dayEntries = useMemo(() => readStoredValue<DayLogEntry[]>(DAY_LOG_STORAGE_KEY, []), [])
	const taskLists = useMemo(() => readStoredValue<TaskList[]>(TASK_LIST_STORAGE_KEY, []), [])
	const ratingEntry = dayEntries.find((entry) => entry.dayKey === selectedDayKey)

	return (
		<section className="grid w-full place-items-center py-2">
			<div className="grid w-full gap-6 lg:grid-cols-2 lg:items-start">
				<CalendarGrid month={month} selectedDayKey={selectedDayKey} entries={dayEntries} onSelectDay={setSelectedDayKey} />
				<SelectedDay selectedDayKey={selectedDayKey} ratingEntry={ratingEntry} taskLists={taskLists} />
			</div>
		</section>
	)
}
