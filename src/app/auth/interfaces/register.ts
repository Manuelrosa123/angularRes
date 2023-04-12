export interface User {
  name: string;
  email: string;
  password: string;
  lat: number,
  lng: number,
  avatar: string;
  me?:boolean;
}
