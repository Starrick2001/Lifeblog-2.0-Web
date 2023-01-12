import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar/Navbar";

export function Root() {
	return (
		<>
			<Navbar />
			<div id="detail">
        <Outlet />
      </div>
		</>
	);
}
