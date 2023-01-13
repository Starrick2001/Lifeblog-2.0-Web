import { Dialog, Transition } from "@headlessui/react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { Fragment, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/rootReducer";
import { setUserData } from "../../redux/slices/userDataSlice";
import { GetUserDataFromAccessToken, UpdateUserData } from "../../services/user.service";

export function EditProfileDialog() {
	const [isOpen, setIsOpen] = useState(false);
	const userData = useSelector((state: RootState) => state.userData.userData);
	const familyNameRef = useRef<HTMLInputElement>(null);
	const givenNameRef = useRef<HTMLInputElement>(null);
	const dispatch = useDispatch();

	const saveHandler = async () => {
		if (userData) {
			UpdateUserData(
				userData?.id,
				familyNameRef.current?.value as string,
				givenNameRef.current?.value as string,
				userData?.picture
			).then(async () => {
				dispatch(setUserData(await GetUserDataFromAccessToken()));
			});
		}
		setIsOpen(false);
	};

	return (
		<>
			<button
				type="button"
				className="mt-4 py-2 px-4 flex justify-center items-center  bg-lime-600 hover:bg-lime-700 focus:ring-lime-500 focus:ring-offset-lime-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full"
				onClick={() => setIsOpen(true)}
			>
				<PencilSquareIcon className="w-4 h-4 mr-4" />
				Edit profile
			</button>

			<Transition appear show={isOpen} as={Fragment}>
				<Dialog
					as="div"
					className="relative z-10"
					onClose={() => setIsOpen(false)}
				>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
									<Dialog.Title
										as="h3"
										className="text-lg font-medium leading-6 text-gray-900 inline-flex items-center space-x-4"
									>
										<Link to="/" className="relative block">
											<img
												alt="profile"
												src={userData?.picture}
												className="mx-auto object-cover rounded-full h-16 w-16 "
											/>
										</Link>
										<h1 className="text-gray-600">{userData?.name}</h1>
									</Dialog.Title>
									<div className="shadow-md">
										<div className="space-y-6 bg-white border-t-2 border-indigo-400 rounded-lg">
											<div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
												<span className="max-w-sm mx-auto md:w-1/3">
													Personal info
												</span>
												<div className="max-w-sm mx-auto space-y-5 md:w-2/3">
													<div>
														<div className=" relative ">
															<input
																type="text"
																id="user-info-family-name"
																className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
																placeholder="Family Name"
																ref={familyNameRef}
																defaultValue={userData?.familyName}
															/>
															<input
																type="text"
																id="user-info-given-name"
																className="mt-4 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
																placeholder="Given Name"
																ref={givenNameRef}
																defaultValue={userData?.givenName}
															/>
														</div>
													</div>
												</div>
											</div>
											<hr />
											<div className="items-center w-full p-8 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
												<span className="max-w-sm mx-auto md:w-4/12">
													Change avatar
												</span>
												<div className="text-right w-full">
													<button
														type="button"
														className="py-2 px-4  bg-pink-600 hover:bg-pink-700 focus:ring-pink-500 focus:ring-offset-pink-200 text-white w-full md:w-3/4 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
													>
														Upload picture
													</button>
												</div>
											</div>
											<hr />
											<div className="w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
												<button
													className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
													onClick={saveHandler}
												>
													Save
												</button>
											</div>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}
