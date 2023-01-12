import { useRouteError } from "react-router-dom";
import { Navbar } from "../components/Navbar/Navbar";

export function ErrorPage() {
	const error: any = useRouteError();

	return (
		<div id="error-page">
			<Navbar />
			<div className="relative h-screen overflow-hidden bg-indigo-900">
				{/* <img src="/images/landscape/8.svg" className="absolute object-cover w-full h-full"/> */}
				<div className="absolute inset-0 bg-black opacity-25"></div>
				<div className="container relative z-10 flex items-center px-6 py-32 mx-auto md:px-12 xl:py-40">
					<div className="relative z-10 flex flex-col items-center w-full font-mono">
						<h1 className="mt-4 text-5xl font-extrabold leading-tight text-center text-white">
							Sorry, an unexpected error has occurred.
						</h1>
						<p className="font-extrabold text-white text-8xl my-44 animate-bounce">
							{error.statusText || error.message}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
