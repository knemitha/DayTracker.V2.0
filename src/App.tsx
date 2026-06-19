import Nav from './components/layout/nav'

function App() {
	return (
		<div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900">
			<Nav />

			<main className="mx-auto grid w-[min(960px,calc(100%-2rem))] gap-4 px-4 py-8">
				<section className="rounded-2xl bg-white/70 p-5 shadow-sm ring-1 ring-black/5 backdrop-blur" id="day-log">
					<h1>Day Log</h1>
					<p>Track what happened today.</p>
				</section>

				<section className="rounded-2xl bg-white/70 p-5 shadow-sm ring-1 ring-black/5 backdrop-blur" id="tasks">
					<h2>Tasks</h2>
					<p>Keep your tasks organized.</p>
				</section>

				<section className="rounded-2xl bg-white/70 p-5 shadow-sm ring-1 ring-black/5 backdrop-blur" id="calendar">
					<h2>Calendar</h2>
					<p>See your days at a glance.</p>
				</section>

				<section className="rounded-2xl bg-white/70 p-5 shadow-sm ring-1 ring-black/5 backdrop-blur" id="statistics">
					<h2>Statistics</h2>
					<p>Review your trends and progress.</p>
				</section>
			</main>
		</div>
	)
}

export default App
