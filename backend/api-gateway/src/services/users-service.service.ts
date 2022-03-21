//TODO: Create axios calls
import axios from 'axios';
import * as dotenv from 'dotenv';
import { IUser } from '../model/user';
import { log } from '../utils/logger';

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
    throw error;
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
    throw error;
  }
}

//TODO: send request to message queue
export async function deleteUser(uid: string) {
  try {
    await axios.delete(`${baseUrl}/${uid}`);
  } catch (error) {
    throw error;
  }
}


axios.interceptors.request.use((req) => {
  // `req` is the Axios request config, so you can modify
  // the `headers`.

  // console.log(req.headers!.authorization);

  return req;
});

// axios.interceptors.request.use(
//   config => {
//     config.headers!['Authorization'] = `Bearer 456`;
//         return config;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );

export async function loginUser(user) {
  const payload = { user };
  try {
    let res = await axios.post(`${baseUrl}/login`, payload);
    let data = res.data;
    // console.log(data);
    return data;
  } catch (error) {
    // console.log(error.response.data);
    // console.log(error.response.status);
    
    throw (error);
  }
}
export async function checkToken(authHeader: any) {
  const options = {
    headers: { authorization: authHeader },
  };
  try {
    let res = await axios.get(`${baseUrl}/check-token`, options);
    let data = res.data;
    console.log(data);
    return data;
  } catch (error) {
    // log.error(error.response.data);
    throw Error(error.response.data);
  }}

