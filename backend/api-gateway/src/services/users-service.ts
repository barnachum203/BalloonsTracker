//TODO: Create axios calls
import axios from 'axios';
import * as dotenv from 'dotenv';
import { IUser } from '../model/user';
dotenv.config({ path: './environment.env' });

const baseUrl: string | undefined = process.env.USER_SERVICE;

export async function updateUser(uid: string, updatedUser: IUser) {
  try {
    let payload = { user: updatedUser };
    let res = await axios.put(`${baseUrl}/${uid}`, payload);
    let data = res.data;
    // console.log(data);
    return data;
  } catch (error) {
    throw Error(error.response.data);
  }
}

export async function createUser(user: IUser) {
  try {
    let payload = { user: user };
    let res = await axios.post(`${baseUrl}/register`, payload);
    let data = res.data;
    // console.log(data);
    return data;
  } catch (error) {
    throw Error(error.response.data);
  }
}

//TODO: send request to message queue
export async function deleteUser(uid: string) {
  try {
    await axios.delete(`${baseUrl}/${uid}`);
  } catch (error) {
    throw Error(error.response.data);
  }
}

export async function loginUser(email: string, password: string) {
  const payload = { email: email, password: password };
  try {
    let res = await axios.post(`${baseUrl}/login`, payload);
    let data = res.data;
    // console.log(data);
    return data;
  } catch (error) {
    // console.log(error.response.data);
    throw Error(error.response.data);
  }
}
