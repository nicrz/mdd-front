import { User } from '../../../interfaces/user.interface';
import { Article } from './article.interface';

export interface Comment {
    id: number;
    content: string;
    article_id: Article;
    user_id: User;
    created_at: Date;
  }