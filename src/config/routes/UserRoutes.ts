import { Router } from 'express'
import UserController from '../../controllers/UserController'

const router = Router()

//router.get('/user/all', UserController.getList)

//router.get('/user/:id', UserController.get)

router.post('/user', UserController.create)

router.delete('/user/:id', UserController.delete)

router.patch('/user/:id', UserController.edit)

export default router
