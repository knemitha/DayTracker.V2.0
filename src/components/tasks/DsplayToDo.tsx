import type { TaskItem, TaskList } from '../../pages/Tasks'

type DsplayToDoProps = {
	taskLists: TaskList[]
	onUpdateTask: (listId: string, taskId: string, updater: (task: TaskItem) => TaskItem) => void
}

function formatDateTime(value: string) {
	if (!value) {
		return ''
	}

	return new Date(value).toLocaleString([], {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	})
}

function formatDate(value: string) {
	if (!value) {
		return ''
	}

	return new Date(`${value}T00:00:00`).toLocaleDateString([], {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	})
}

function StarIcon({ filled }: { filled: boolean }) {
	return (
		<svg aria-hidden="true" viewBox="0 0 24 24" className={`h-4 w-4 ${filled ? 'fill-current' : 'fill-none'} stroke-current stroke-2`}>
			<path strokeLinecap="round" strokeLinejoin="round" d="M12 3.8l2.85 5.78 6.38.93-4.62 4.5 1.09 6.35L12 18.33l-5.7 3.03 1.09-6.35-4.62-4.5 6.38-.93L12 3.8z" />
		</svg>
	)
}

function BellIcon() {
	return (
		<svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2">
			<path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.5-1.5V11a6.5 6.5 0 10-13 0v4.5L4 17h5" />
			<path strokeLinecap="round" strokeLinejoin="round" d="M9.5 19a2.5 2.5 0 005 0" />
		</svg>
	)
}

function CalendarIcon() {
	return (
		<svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2">
			<rect x="3.5" y="5" width="17" height="15.5" rx="2" />
			<path strokeLinecap="round" strokeLinejoin="round" d="M7 3.5v3M17 3.5v3M3.5 9h17" />
		</svg>
	)
}

export default function DsplayToDo({ taskLists, onUpdateTask }: DsplayToDoProps) {
	return (
		<section className="rounded-2xl bg-white/80 p-6 shadow-sm ring-1 ring-black/5 backdrop-blur">
			<h2 className="m-0 text-2xl font-semibold text-slate-900">Task Lists</h2>
			<p className="mt-2 text-sm text-slate-600">Your saved lists with editable task details.</p>

			{taskLists.length === 0 ? (
				<p className="mt-5 rounded-xl bg-slate-100 px-3 py-4 text-sm text-slate-600">
					No lists yet. Create your first task list on the left.
				</p>
			) : (
				<div className="mt-5 grid gap-4">
					{taskLists.map((list) => (
						<article key={list.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
							<div className="flex flex-wrap items-start justify-between gap-3">
								<div>
									{list.title ? <h3 className="m-0 text-lg font-semibold text-slate-900">{list.title}</h3> : null}
									<p className="mt-1 mb-0 text-xs uppercase tracking-wide text-slate-500">{list.createdAt}</p>
								</div>
							</div>

							<ul className="mt-4 m-0 grid list-none gap-3 p-0">
								{list.tasks.map((task) => (
									<li key={task.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
										<div className="flex flex-wrap items-start gap-3">
											<label className="mt-1 inline-flex items-center gap-2 text-slate-700">
												<input
													type="checkbox"
													checked={task.completed}
													onChange={() =>
														onUpdateTask(list.id, task.id, (current) => ({
															...current,
															completed: !current.completed,
														}))
													}
													className="h-4 w-4 rounded border-slate-400 text-slate-900"
												/>
											</label>

											<div className="min-w-0 flex-1">
												<p className={`m-0 text-base font-medium text-slate-900 ${task.completed ? 'line-through decoration-2 decoration-slate-500' : ''}`}>
													{task.text}
												</p>
												<div className="mt-3 flex flex-wrap gap-2">
													<button
														type="button"
														className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition ${task.important ? 'border-amber-400 bg-amber-50 text-amber-700' : 'border-slate-300 bg-white text-slate-600'}`}
														onClick={() =>
															onUpdateTask(list.id, task.id, (current) => ({
																...current,
																important: !current.important,
															}))
														}
													>
														<StarIcon filled={task.important} />
														<span>{task.important ? 'Important' : 'Mark important'}</span>
													</button>

													<label className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-600">
														<CalendarIcon />
														<span>Due</span>
														<input
															type="date"
															className="bg-transparent text-slate-900 outline-none"
															value={task.dueDate}
															onChange={(event) =>
																onUpdateTask(list.id, task.id, (current) => ({
																	...current,
																	dueDate: event.target.value,
																}))
															}
														/>
													</label>

													<label className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-600">
														<BellIcon />
														<span>Reminder</span>
														<input
															type="datetime-local"
															className="bg-transparent text-slate-900 outline-none"
															value={task.reminder}
															onChange={(event) =>
																onUpdateTask(list.id, task.id, (current) => ({
																	...current,
																	reminder: event.target.value,
																}))
															}
														/>
													</label>
												</div>

												{task.dueDate ? <p className="mt-3 mb-0 text-xs text-slate-500">Due: {formatDate(task.dueDate)}</p> : null}
												{task.reminder ? <p className="mt-1 mb-0 text-xs text-slate-500">Reminder: {formatDateTime(task.reminder)}</p> : null}
											</div>
										</div>
									</li>
								))}
							</ul>
						</article>
					))}
				</div>
			)}
		</section>
	)
}
