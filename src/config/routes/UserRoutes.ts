import { Router } from 'express'
import UserController from '../../controllers/UserController'

const router = Router()

router.get('/user', UserController.get)

router.post('/user', UserController.create)

router.delete('/user', UserController.delete)

router.patch('/user', UserController.edit)

router.get('/user/all', UserController.getList)

export default router
