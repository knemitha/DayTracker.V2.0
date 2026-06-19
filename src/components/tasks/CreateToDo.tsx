import { useState } from 'react'
import type { CreateTaskListInput } from '../../pages/Tasks'

type CreateToDoProps = {
	onCreateList: (input: CreateTaskListInput) => void
}

function IconButton({
	active,
	label,
	onClick,
	children,
}: {
	active: boolean
	label: string
	onClick: () => void
	children: React.ReactNode
}) {
	return (
		<button
			type="button"
			aria-pressed={active}
			className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition ${
				active
					? 'border-slate-900 bg-slate-900 text-white'
					: 'border-slate-300 bg-white text-slate-700 hover:border-slate-500'
			}`}
			onClick={onClick}
		>
			{children}
			<span>{label}</span>
		</button>
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

function StarIcon({ filled }: { filled: boolean }) {
	return (
		<svg aria-hidden="true" viewBox="0 0 24 24" className={`h-4 w-4 ${filled ? 'fill-current' : 'fill-none'} stroke-current stroke-2`}>
			<path strokeLinecap="round" strokeLinejoin="round" d="M12 3.8l2.85 5.78 6.38.93-4.62 4.5 1.09 6.35L12 18.33l-5.7 3.03 1.09-6.35-4.62-4.5 6.38-.93L12 3.8z" />
		</svg>
	)
}

type TaskDraft = {
	id: string
	text: string
	important: boolean
	dueDate: string
	reminder: string
}

export default function CreateToDo({ onCreateList }: CreateToDoProps) {
	const [title, setTitle] = useState('')
	const [draftTasks, setDraftTasks] = useState<TaskDraft[]>([])
	const [taskText, setTaskText] = useState('')
	const [important, setImportant] = useState(false)
	const [showDueDate, setShowDueDate] = useState(false)
	const [showReminder, setShowReminder] = useState(false)
	const [dueDate, setDueDate] = useState('')
	const [reminder, setReminder] = useState('')

	const addDraftTask = () => {
		if (!taskText.trim()) {
			return
		}

		setDraftTasks((current) => [
			...current,
			{
				id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
				text: taskText.trim(),
				important,
				dueDate: showDueDate ? dueDate : '',
				reminder: showReminder ? reminder : '',
			},
		])

		setTaskText('')
		setImportant(false)
		setShowDueDate(false)
		setShowReminder(false)
		setDueDate('')
		setReminder('')
	}

	const removeDraftTask = (taskId: string) => {
		setDraftTasks((current) => current.filter((task) => task.id !== taskId))
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		if (draftTasks.length === 0) {
			return
		}

		onCreateList({
			title,
			tasks: draftTasks.map((task) => ({
				text: task.text,
				important: task.important,
				dueDate: task.dueDate,
				reminder: task.reminder,
			})),
		})

		setTitle('')
		setDraftTasks([])
	}

	return (
		<section className="rounded-2xl bg-white/80 p-6 shadow-sm ring-1 ring-black/5 backdrop-blur">
			<h2 className="m-0 text-2xl font-semibold text-slate-900">Create Task List</h2>
			<p className="mt-2 text-sm text-slate-600">Title is optional. Add one or more tasks before saving the list.</p>

			<form className="mt-5 grid gap-4" onSubmit={handleSubmit}>
				<div>
					<label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="task-title">
						Title
					</label>
					<input
						id="task-title"
						className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none transition focus:border-slate-500"
						placeholder="Optional list title"
						value={title}
						onChange={(event) => setTitle(event.target.value)}
					/>
				</div>

				<div>
					<label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="task-text">
						Task
					</label>
					<input
						id="task-text"
						className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none transition focus:border-slate-500"
						placeholder="Enter a task to add to the list"
						value={taskText}
						onChange={(event) => setTaskText(event.target.value)}
					/>
				</div>

				<div className="flex flex-wrap gap-2">
					<IconButton active={showReminder} label="Reminder" onClick={() => setShowReminder((value) => !value)}>
						<BellIcon />
					</IconButton>
					<IconButton active={showDueDate} label="Due date" onClick={() => setShowDueDate((value) => !value)}>
						<CalendarIcon />
					</IconButton>
					<IconButton active={important} label="Important" onClick={() => setImportant((value) => !value)}>
						<StarIcon filled={important} />
					</IconButton>
				</div>

				{showDueDate ? (
					<div>
						<label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="due-date">
							Due date
						</label>
						<input
							id="due-date"
							type="date"
							className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none transition focus:border-slate-500"
							value={dueDate}
							onChange={(event) => setDueDate(event.target.value)}
						/>
					</div>
				) : null}

				{showReminder ? (
					<div>
						<label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="reminder">
							Reminder
						</label>
						<input
							id="reminder"
							type="datetime-local"
							className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none transition focus:border-slate-500"
							value={reminder}
							onChange={(event) => setReminder(event.target.value)}
						/>
					</div>
				) : null}

				<div className="flex flex-wrap gap-2">
					<button
						type="button"
						className="inline-flex w-fit items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
						onClick={addDraftTask}
					>
						Add Task
					</button>
					<button
						type="submit"
						className="inline-flex w-fit items-center justify-center rounded-full bg-emerald-700 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600"
					>
						Save List
					</button>
				</div>

				{draftTasks.length > 0 ? (
					<div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
						<p className="mb-3 text-sm font-medium text-slate-700">Tasks in this list</p>
						<ul className="m-0 grid list-none gap-2 p-0">
							{draftTasks.map((task, index) => (
								<li key={task.id} className="flex items-center justify-between gap-3 rounded-lg bg-white px-3 py-2 text-sm text-slate-700 shadow-sm">
									<span className="min-w-0 flex-1 truncate">
										{index + 1}. {task.text}
									</span>
									<button
										type="button"
										className="text-xs font-semibold text-slate-500 transition hover:text-slate-900"
										onClick={() => removeDraftTask(task.id)}
									>
										Remove
									</button>
								</li>
							))}
						</ul>
					</div>
				) : null}
			</form>
		</section>
	)
}
