import { useSelector } from "react-redux";
import { EditProfileDialog } from "../../components/EditProfileDialog/EditProfileDialog";
import { RootState } from "../../redux/rootReducer";

export function Profile() {
	const userData = useSelector((state: RootState) => state.userData.userData);

	return (
		<div className="container flex justify-center my-8 mx-auto">
			<div className="bg-white shadow-lg rounded-2xl w-80 dark:bg-gray-800">
				<img
					alt="profile"
					src="/landscape-cover.jpg"
					className="w-full mb-4 rounded-t-lg h-auto"
				/>
				<div className="flex flex-col items-center justify-center p-4 -mt-16">
					<button className="relative block">
						<img
							alt="profile"
							src={userData?.picture}
							className="mx-auto object-cover rounded-full h-16 w-16  border-2 border-white dark:border-gray-800"
						/>
					</button>
					<p className="mt-2 text-xl font-medium text-gray-800 dark:text-white">
						{userData?.name}
					</p>
					<EditProfileDialog />
					<div className="w-full p-2 mt-4 rounded-lg">
						<div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-200">
							<p className="flex flex-col">
								Articles
								<span className="font-bold text-black dark:text-white">34</span>
							</p>
							<p className="flex flex-col">
								Friends
								<span className="font-bold text-black dark:text-white">
									455
								</span>
							</p>
							<p className="flex flex-col">
								Rating
								<span className="font-bold text-black dark:text-white">
									9.3
								</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
