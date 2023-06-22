import { Request } from 'express';

export interface RequestWithUserRole extends Request {
  user?: number;
  email?: string;
}
