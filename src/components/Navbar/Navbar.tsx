import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/rootReducer";
import { setAuthToken } from "../../redux/slices/authTokenSlice";
import { setUserData } from "../../redux/slices/userDataSlice";
import { classNames } from "../../utils/utils";
import { LoginGoogleButton } from "../LoginGoogleButton/LoginGoogleButton";

export function Navbar() {
	const dispatch = useDispatch();
	const { userData } = useSelector((state: RootState) => state.userData);

	const signoutHandler = () => {
		dispatch(setAuthToken(undefined));
		dispatch(setUserData(undefined));
	};

	return (
		<header className="items-center h-16 bg-white shadow-lg dark:bg-gray-700 rounded-2xl m-4">
			<div className="relative flex flex-col justify-center h-full px-4 mx-auto flex-center">
				<div className="relative flex items-center w-full pl-1 lg:max-w-68 sm:pr-2 sm:ml-0">
					<div className="container relative left-0 flex w-3/4 h-full">
						<div className="relative flex items-center w-full h-full lg:w-8 mx-4 group">
							<Link className="flex-shrink-0" to="/">
								<img className="w-8 h-8" src="logo192.png" alt="Workflow" />
							</Link>
						</div>
						<div className="relative flex items-center w-full h-full lg:w-64 group">
							<div className="absolute z-50 flex items-center justify-center block w-auto h-10 p-3 pr-2 text-sm text-gray-500 uppercase cursor-pointer sm:hidden">
								<svg
									fill="none"
									className="relative w-5 h-5"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
								</svg>
							</div>
							<svg
								className="absolute left-0 z-20 hidden w-4 h-4 ml-4 text-gray-500 pointer-events-none fill-current group-hover:text-gray-400 sm:block"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
							>
								<path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
							</svg>
							<input
								type="text"
								className="block w-full py-1.5 pl-10 pr-4 leading-normal rounded-2xl focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 ring-opacity-90 bg-gray-100 dark:bg-gray-800 text-gray-400 aa-input"
								placeholder="Search"
							/>
							<div className="absolute right-0 hidden h-auto px-2 py-1 mr-2 text-xs text-gray-400 border border-gray-300 rounded-2xl md:block">
								+
							</div>
						</div>
					</div>
					<div className="relative flex items-center justify-end w-1/4 p-1 ml-5 mr-4 sm:mr-0 sm:right-auto">
						{userData ? (
							<Menu as="div" className="relative inline-block text-left">
								<div>
									<Menu.Button>
										<img
											alt="profil"
											src={userData.picture}
											className="mx-auto object-cover rounded-full h-10 w-10 "
											referrerPolicy="no-referrer"
										/>
									</Menu.Button>
								</div>

								<Transition
									as={Fragment}
									enter="transition ease-out duration-100"
									enterFrom="transform opacity-0 scale-95"
									enterTo="transform opacity-100 scale-100"
									leave="transition ease-in duration-75"
									leaveFrom="transform opacity-100 scale-100"
									leaveTo="transform opacity-0 scale-95"
								>
									<Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
										<div className="py-1">
											<Menu.Item>
												{({ active }) => (
													<Link
														to="/profile"
														className={classNames(
															active
																? "bg-gray-100 text-gray-900"
																: "text-gray-700",
															"block px-4 py-2 text-sm w-full text-left"
														)}
													>
														Profile
													</Link>
												)}
											</Menu.Item>
											<Menu.Item>
												{({ active }) => (
													<button
														onClick={signoutHandler}
														type="submit"
														className={classNames(
															active
																? "bg-gray-100 text-gray-900"
																: "text-gray-700",
															"block w-full px-4 py-2 text-left text-sm"
														)}
													>
														Sign out
													</button>
												)}
											</Menu.Item>
										</div>
									</Menu.Items>
								</Transition>
							</Menu>
						) : (
							<LoginGoogleButton />
						)}
					</div>
				</div>
			</div>
		</header>
	);
}
