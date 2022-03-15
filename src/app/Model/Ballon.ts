export class Ballon {
  constructor(
    public name: string, //unique
    public type: Type,
    public description: string,
    public color: Color,
    public position: BallonPosition,
    // public id?: string,
    public point: BallonPosition,
    public _id?: string,
  ) {}
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

export interface BallonPosition{
    latitude: number,
    longitude: number,
    attitude: number
}