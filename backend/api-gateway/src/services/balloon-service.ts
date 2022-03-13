//TODO: Create axios calls
import axios from 'axios';
import * as dotenv from 'dotenv';
import { IBalloon } from '../model/balloon';
dotenv.config({ path: './environment.env' });

const baseUrl: string | undefined = process.env.BALL_SERVICE;

export async function getBalloons(uid: string) {
  let res = await axios.get(`${baseUrl}/${uid}`);
  let data = res.data;
  // console.log(data);
  return data;
}

export async function createBalloon(uid: string, balloon: IBalloon) {
  let payload = { balloon: balloon };
  let res = await axios.post(`${baseUrl}/${uid}`, payload);
  let data = res.data;
  // console.log(data);
  return data;
}

//TODO: send request to message queue
export async function deleteBalloon(bid: string) {
  await axios.delete(`${baseUrl}/${bid}`);
}
export async function updateBalloon(bid: string, balloon: IBalloon) {
  let payload = { balloon: balloon };
  let res = await axios.put(`${baseUrl}/${bid}`, payload);
  let data = res.data;
  // console.log(data);
  return data;
}
export async function getBalloonById(bid: any) {
  let res = await axios.get(`${baseUrl}/one/${bid}`);
  let data = res.data;
  console.log(data);
  
  return data;
}
