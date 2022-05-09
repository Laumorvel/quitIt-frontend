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
  groupList: Group[];
  friends: User[];
  achievementList: Achievement[];
  penalties: Penalty[];
  startDate: Date;
  cigarettesBeforePerDay: number;
  moneyPerDay: number;
  smokingDays: number;
  cigarettesSmoked: number;
  moneySaved: number;
  username: string;
  file: FileDB;
  lastDateSmoking: Date;
  message: boolean;
  imageUrl: string;
}

export interface GroupMember{
  id: number,
  user: User,
  cargo: string,
  group: Group;
}

export interface Group {
  id: number;
  name: string;
}

export interface Incidence {
  id: number;
  subject: string;
  text: null;
  user: User;
  state: string;
}

export interface FileDB {
  id: string;
  name: string;
  data: number;
  type: string;
}

export interface Achievement {
  id: number;
  name: string;
  text: string;
  img: string;
  objective: number;
  type: string;
}

export interface Penalty {
  id: number;
  name: string;
  text: string;
  img: string;
  objective: number;
  type: string;
}

export interface MeetUP {
  id: number;
  title: string;
  description: string;
  date: Date;
  place: string;
}
export interface Incidence {
  id: number;
  subject: string;
  text: null;
  user: User;
  comment: Commentario;
  state: string;
}

export interface ScheduledMessage {
  id: number;
  text: string;
  sent: boolean;
}

export interface urlImg{
  url: string,
  secure_url: string;
}
