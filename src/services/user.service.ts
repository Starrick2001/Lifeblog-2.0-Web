import axiosInstance from '../utils/axios';
import { API_URL, IUser } from '../utils/utils';
import axios from 'axios';

export async function getUserDataFromAccessToken(): Promise<IUser | undefined> {
  try {
    return (await axiosInstance.get<IUser>(`/auth`)).data;
  } catch (err) {
    console.error(err);
  }
}

export async function updateUserInfor(
  id: string,
  familyName: string,
  givenName: string,
) {
  try {
    await axiosInstance.patch(`${API_URL}/user/${id}`, {
      familyName,
      givenName,
    });
  } catch (err) {
    console.error(err);
  }
}

export async function updateUserAvatar(avatar: File, owner: string) {
  try {
    // Get presigned url
    const presignUrl = (
      await axiosInstance.get(
        `/object-storage/presigned-put-url/avatar?objectName=${avatar.name}`,
      )
    ).data;

    // put object to s3 storage
    await axios.put(presignUrl, avatar, {
      headers: {
        'Content-Type': avatar.type,
      },
    });

    // Send data to BE server
    await axiosInstance.post(`/user/avatar`, {
      key: avatar.name,
      owner,
    });
  } catch (err) {
    console.error(err);
  }
}
