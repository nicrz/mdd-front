import { User } from '../../../interfaces/user.interface';
import { Theme } from '../../themes/interfaces/theme.interface';

export interface Article {
    id: number;
    title: string;
    content: string;
	created_at: Date;
	updated_at?: Date;
    author_id: User;
    theme_id: Theme;
  }