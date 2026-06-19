import Nav from './components/layout/nav'
import DayLog from './pages/DayLog'
import Calendar from './pages/Calendar'
import Tasks from './pages/Tasks'
import Statistics from './pages/Statistics'
import { useEffect, useState } from 'react'

type PagePath = '/' | '/tasks' | '/calendar' | '/statistics'

function getPagePath(pathname: string): PagePath {
	if (pathname === '/tasks' || pathname === '/calendar' || pathname === '/statistics') {
		return pathname
	}

	return '/'
}

function App() {
	const [path, setPath] = useState<PagePath>(() => getPagePath(window.location.pathname))

	useEffect(() => {
		const handlePopState = () => setPath(getPagePath(window.location.pathname))

		window.addEventListener('popstate', handlePopState)
		return () => window.removeEventListener('popstate', handlePopState)
	}, [])

	return (
		<div className="min-h-screen bg-linear-to-b from-slate-50 to-slate-100 text-slate-900">
			<Nav />

			<main className="mx-auto grid w-[min(960px,calc(100%-2rem))] gap-4 px-4 py-8">
				{path === '/' ? <DayLog /> : null}
				{path === '/tasks' ? <Tasks /> : null}
				{path === '/calendar' ? <Calendar /> : null}
				{path === '/statistics' ? <Statistics /> : null}
			</main>
		</div>
	)
}

export default App
