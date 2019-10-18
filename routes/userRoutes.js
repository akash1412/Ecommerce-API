const usersController = require('../controllers/userController')

const express = require('express');

const router = express.Router();



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