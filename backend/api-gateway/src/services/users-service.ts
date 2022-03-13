//TODO: Create axios calls 
import axios from 'axios';
import * as dotenv from 'dotenv';
import { IUser } from '../model/user';
dotenv.config({ path: './environment.env' });

const baseUrl: string | undefined = process.env.USER_SERVICE;

export async function updateUser(uid: string, updatedUser: IUser) {
    let payload = { user: updatedUser}
  let res = await axios.put(`${baseUrl}/${uid}`, payload);
  let data = res.data;
  // console.log(data);
  return data;
}

export async function createUser(user: IUser) {
  let payload = { user: user };
  let res = await axios.post(`${baseUrl}/register`, payload);
  let data = res.data;
  // console.log(data);
  return data;
}

//TODO: send request to message queue
export async function deleteUser(uid: string) {
  await axios.delete(`${baseUrl}/${uid}`);
}

export async function loginUser() {
  let res = await axios.get(`${baseUrl}/login`);
  let data = res.data;
  console.log(data);
  
  return data;
}
