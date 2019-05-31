export interface User {
  email: String
  password: String
}
export interface Token {
  token: String
}

export interface Position {
  id: number;
  name: String;
  user: String;
  _id: String;
}

export interface Category{
  id: number;
  name: string;
  description: string;
  positions: string;
  imageSrc?: string;
}

export interface Order{
  id?: number
  firstName?: string
  lastName?: string
  capital?: number
  _id?: string
 }

