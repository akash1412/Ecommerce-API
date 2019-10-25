const usersController = require('../controllers/userController')
const authController = require('./../controllers/authController')

const express = require('express');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);


router
    .route('/')
    .get(usersController.getUsers)
    .post(usersController.createUser);


router
    .route('/:id')
    .get(usersController.getUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)


module.exports = router;