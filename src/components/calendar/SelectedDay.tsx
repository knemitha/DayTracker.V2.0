import type { DayLogEntry } from '../../pages/DayLog'
import type { TaskList } from '../../pages/Tasks'

type SelectedDayProps = {
	selectedDayKey: string
	ratingEntry?: DayLogEntry
	taskLists: TaskList[]
}

function formatSelectedDate(dayKey: string) {
	const [year, month, day] = dayKey.split('-').map((part) => Number(part))
	const date = new Date(year, month - 1, day)

	return date.toLocaleDateString([], {
		weekday: 'long',
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	})
}

export default function SelectedDay({ selectedDayKey, ratingEntry, taskLists }: SelectedDayProps) {
	const tasksCreatedOnDay = taskLists.filter((taskList) => taskList.createdDayKey === selectedDayKey)

	return (
		<section className="rounded-2xl bg-white/80 p-6 shadow-sm ring-1 ring-black/5 backdrop-blur">
			<h2 className="m-0 text-2xl font-semibold text-slate-900">Selected Day</h2>
			<p className="mt-2 text-sm text-slate-600">{formatSelectedDate(selectedDayKey)}</p>

			<div className="mt-5 grid gap-4">
				<div className="rounded-xl border border-slate-200 bg-white p-4">
					<p className="m-0 text-xs font-semibold uppercase tracking-wide text-slate-500">Day rating</p>
					<p className="mt-2 mb-0 text-base font-medium text-slate-900">{ratingEntry ? ratingEntry.rating : 'No rating saved for this day.'}</p>
					{ratingEntry?.note ? <p className="mt-3 mb-0 text-sm text-slate-700">{ratingEntry.note}</p> : null}
					{ratingEntry ? <p className="mt-3 mb-0 text-xs text-slate-500">Saved: {ratingEntry.displayDateTime}</p> : null}
				</div>

				<div className="rounded-xl border border-slate-200 bg-white p-4">
					<p className="m-0 text-xs font-semibold uppercase tracking-wide text-slate-500">Tasks created that day</p>
					{tasksCreatedOnDay.length === 0 ? (
						<p className="mt-2 mb-0 text-sm text-slate-600">No task lists were created on this day.</p>
					) : (
						<div className="mt-3 grid gap-3">
							{tasksCreatedOnDay.map((taskList) => (
								<div key={taskList.id} className="rounded-lg bg-slate-50 p-3">
									{taskList.title ? <p className="m-0 text-sm font-semibold text-slate-900">{taskList.title}</p> : <p className="m-0 text-sm font-semibold text-slate-900">Untitled list</p>}
									<ul className="mt-2 m-0 list-disc space-y-1 pl-5 text-sm text-slate-700">
										{taskList.tasks.map((task) => (
											<li key={task.id}>{task.text}</li>
										))}
									</ul>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</section>
	)
}
