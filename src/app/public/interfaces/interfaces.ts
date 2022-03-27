export interface Message {
  id: number;
  fecha: string;
  fromUser: string;
  subject: string;
  text: string;
}

export interface Commentario {
  id: number;
  text: string;
  user: User;
  date: Date;
}

export interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  password: string;
  rol: string;
  daysInARowWithoutSmoking: number;
  cigarettesAvoided: number;
  totalTimeWithoutSmoking: number;
  startDate: Date;
  cigarettesBeforePerDay: number;
  moneyPerDay: number;
  smokingDays: number;
  cigarettesSmoked: number;
  moneySaved: number;
  username: string;
  timeWithoutSmoking: number;
  moneySmoker: number;
  file: FileDB;
}

export interface Incidence {
  id: number;
  subject: string;
  text: null;
  user: User;
  state: string;
}

export interface FileDB {
  name: string;
  data: number;
  type: string;
}
