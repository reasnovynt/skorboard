export default function Header() {
    return (
		<div className="fixed top-0 z-10 w-full p-8 ">
			<div className="container flex items-center justify-between mx-auto">
				<div className="flex gap-2">
					<h1 className="font-bold">Skorboard App</h1>
					<span>v1.0.1</span>
				</div>
				<div className="text-xs">
					<span>
						Created by{" "}
						<a
							href="https://linkedin.com/in/reasnovynt"
							className="font-bold underline hover:opacity-80"
						>
							Reas Vyn
						</a>
					</span>
				</div>
			</div>
		</div>
	);
}
