import { useEffect, useState } from 'react'
import CreateToDo from '../components/tasks/CreateToDo'
import DsplayToDo from '../components/tasks/DsplayToDo'
import { TASK_LIST_STORAGE_KEY, getDayKey, readStoredValue, writeStoredValue } from '../lib/daytrackerStorage'

export type TaskItem = {
	id: string
	text: string
	completed: boolean
	important: boolean
	dueDate: string
	reminder: string
}

export type TaskList = {
	id: string
	title: string
	createdAt: string
	createdDayKey: string
	createdAtIso: string
	tasks: TaskItem[]
}

export type CreateTaskListInput = {
	title: string
	tasks: Array<{
		text: string
		important: boolean
		dueDate: string
		reminder: string
	}>
}

export default function Tasks() {
	const [taskLists, setTaskLists] = useState<TaskList[]>(() => readStoredValue<TaskList[]>(TASK_LIST_STORAGE_KEY, []))

	useEffect(() => {
		writeStoredValue(TASK_LIST_STORAGE_KEY, taskLists)
	}, [taskLists])

	const createTaskList = (input: CreateTaskListInput) => {
		const createdAt = new Date()
		const createdAtIso = createdAt.toISOString()

		const nextList: TaskList = {
			id: `${createdAt.getTime()}-${Math.random().toString(36).slice(2, 8)}`,
			title: input.title.trim(),
			createdDayKey: getDayKey(createdAt),
			createdAtIso,
			createdAt: createdAt.toLocaleString([], {
				year: 'numeric',
				month: 'short',
				day: 'numeric',
				hour: '2-digit',
				minute: '2-digit',
			}),
			tasks: input.tasks.map((task, index) => ({
				id: `${createdAt.getTime()}-${index}`,
				text: task.text,
				completed: false,
				important: task.important,
				dueDate: task.dueDate,
				reminder: task.reminder,
			})),
		}

		setTaskLists((previous) => [nextList, ...previous])
	}

	const updateTask = (listId: string, taskId: string, updater: (task: TaskItem) => TaskItem) => {
		setTaskLists((previous) =>
			previous.map((list) => {
				if (list.id !== listId) {
					return list
				}

				return {
					...list,
					tasks: list.tasks.map((task) => (task.id === taskId ? updater(task) : task)),
				}
			}),
		)
	}

	return (
		<section className="grid w-full place-items-center py-2">
			<div className="grid w-full gap-6">
				<CreateToDo onCreateList={createTaskList} />
				<DsplayToDo taskLists={taskLists} onUpdateTask={updateTask} />
			</div>
		</section>
	)
}
