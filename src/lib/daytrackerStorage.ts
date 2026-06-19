export const DAY_LOG_STORAGE_KEY = 'daytracker.day-log.entries'
export const TASK_LIST_STORAGE_KEY = 'daytracker.task-lists'

export function getDayKey(date: Date) {
	const year = date.getFullYear()
	const month = `${date.getMonth() + 1}`.padStart(2, '0')
	const day = `${date.getDate()}`.padStart(2, '0')

	return `${year}-${month}-${day}`
}

export function readStoredValue<T>(storageKey: string, fallback: T): T {
	if (typeof window === 'undefined') {
		return fallback
	}

	const rawValue = window.localStorage.getItem(storageKey)

	if (!rawValue) {
		return fallback
	}

	try {
		return JSON.parse(rawValue) as T
	} catch {
		return fallback
	}
}

export function writeStoredValue<T>(storageKey: string, value: T) {
	if (typeof window === 'undefined') {
		return
	}

	window.localStorage.setItem(storageKey, JSON.stringify(value))
}