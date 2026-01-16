export default function Home() {
	return (
		<div className="flex h-screen w-full items-center justify-center bg-zinc-300">
			<div className="flex h-100 w-200 flex-col items-center justify-center rounded-xl border border-zinc-400 bg-white p-4 shadow-lg">
				<h1 className="text-2xl font-bold">Batatas</h1>
				<p className="text-xs text-zinc-500">
					Algumas batatas são doces e outras não
				</p>
			</div>
		</div>
	);
}
