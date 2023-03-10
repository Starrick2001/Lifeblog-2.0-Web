import { Dialog, Transition } from '@headlessui/react';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../redux/rootReducer';
import { setUserData } from '../../redux/slices/userDataSlice';
import {
  getUserDataFromAccessToken,
  updateUserAvatar,
  updateUserInfor,
} from '../../services/user.service';

export function EditProfileDialog() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const userData = useSelector((state: RootState) => state.userData.userData);
  const familyNameRef = useRef<HTMLInputElement>(null);
  const givenNameRef = useRef<HTMLInputElement>(null);

  // avatar
  const inputAvatarRef = useRef<HTMLInputElement>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<File>();
  const [avatarPreview, setAvatarPreview] = useState<string>();

  const saveDataHandler = async () => {
    if (userData) {
      try {
        await updateUserInfor(
          userData?.id,
          familyNameRef.current?.value as string,
          givenNameRef.current?.value as string,
        );
        
        if (selectedAvatar) {
          await updateUserAvatar(selectedAvatar, userData.id);
        }
        dispatch(setUserData(await getUserDataFromAccessToken()));
      } catch (err) {
        console.error(err);
      }
    }
    setIsOpen(false);
  };

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedAvatar) {
      setAvatarPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedAvatar);
    setAvatarPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedAvatar]);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedAvatar(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedAvatar(e.target.files[0]);
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
                        referrerPolicy="no-referrer"
                      />
                    </Link>
                    <span className="text-gray-600">{userData?.name}</span>
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
                      <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                        <span className="max-w-sm mx-auto md:w-4/12">
                          Change avatar
                        </span>
                        <div className="text-center w-full">
                          <label htmlFor="avatar-upload">
                            <button
                              type="button"
                              className="py-2 px-4  bg-pink-600 hover:bg-pink-700 focus:ring-pink-500 focus:ring-offset-pink-200 text-white w-full md:w-3/4 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                              onClick={() => {
                                inputAvatarRef.current?.click();
                              }}
                            >
                              Upload picture
                            </button>
                            <input
                              ref={inputAvatarRef}
                              type="file"
                              alt="image"
                              id="avatar-upload"
                              onChange={(e) => onSelectFile(e)}
                              hidden
                            />
                          </label>
                        </div>
                      </div>
                      {selectedAvatar && (
                        <img
                          src={avatarPreview}
                          alt="avatar preview"
                          className="mx-auto object-cover rounded-full h-40 w-40"
                        />
                      )}
                      <hr />
                      <div className="w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
                        <button
                          className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                          onClick={saveDataHandler}
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
