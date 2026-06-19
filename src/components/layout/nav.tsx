const sections = [
	{ label: 'Day Log', href: '#day-log' },
	{ label: 'Tasks', href: '#tasks' },
	{ label: 'Calendar', href: '#calendar' },
	{ label: 'Statistics', href: '#statistics' },
]

export default function Nav() {
	return (
		<header className="w-full px-5 py-1 flex justify-center">
			<div className="flex flex-wrap items-center justify-center gap-7">
				<img className="block h-40 w-40 object-contain" src="/logoCropped.png" alt="DayTracker logo" />

				<nav aria-label="Primary navigation">
					<ul className="m-0 flex flex-wrap items-center justify-center gap-3 p-0 list-none">
						{sections.map((section) => (
							<li key={section.label}>
								<a
									className="inline-flex items-center justify-center rounded-full px-4 py-2 font-semibold text-slate-800 no-underline transition-colors hover:bg-black/10 focus-visible:bg-black/10 focus-visible:outline-none"
									href={section.href}
								>
									{section.label}
								</a>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</header>
	)
}
