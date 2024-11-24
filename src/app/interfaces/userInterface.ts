export interface IUser {
  recordId: string;
  firstName: string;
  lastName: string;
  nickname: string;
  image: File;
  phone: string;
  birthDay: Date;
}

export interface IUserInfo {
  firstName: string;
  lastName: string;
  nickname: string;
  email: string;
  image: string;
  phone: string;
  profile: string;
  enable: boolean;
  birthDay: Date;
}
