import { Schema, model } from 'mongoose';
export interface IBalloon {
  _id: number;
  name: string;
  type: Type;
  description: string;
  position: BallonPosition;
  point: BallonPosition;
  color: Color;
  uid: string | undefined;
  created_at?: Date;
}

export enum Type {
  small = 'small',
  medium = 'medium',
  big = 'big',
  double = 'double',
}

export enum Color {
  red = 'red',
  blue = 'blue',
  black = 'black',
  white = 'white',
}

export interface BallonPosition {
  latitude: number;
  longitude: number;
  attitude: number;
}