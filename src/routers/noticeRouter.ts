import { Router } from 'express';
import { noticeController } from '../controller';
import { asyncHandler } from '../utils';

export const noticeRouter = Router();

noticeRouter.post('/', asyncHandler(noticeController.create));
noticeRouter.get('/:id', asyncHandler(noticeController.findById));
noticeRouter.get('/', noticeController.findAll);
noticeRouter.patch('/:id', asyncHandler(noticeController.update));
noticeRouter.delete('/:id', asyncHandler(noticeController.delete));
//커서 페이지네이션
// noticeRouter.get('/', noticeController.findAllCursor);
