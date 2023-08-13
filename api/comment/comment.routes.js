import express from 'express'
import { log } from '../../middlewares/logger.middleware.js'
import { getComments, getCommentById, addComment, updateComment, removeComment } from './comment.controller.js'

const router = express.Router()

// We can add a middleware for the entire router:
// router.use(requireAuth)

router.get('/', log, getComments)
router.get('/:id', getCommentById)
router.post('/',  addComment)
router.put('/:id',  updateComment)
router.delete('/:id',  removeComment)
// router.delete('/:id',  requireAdmin, removeComment)

export const commentRoutes = router
