import { User } from '../../../interfaces/user.interface';

export interface Theme {
    id?: number;
    title: string;
    description: string;
    users: User[];
  }