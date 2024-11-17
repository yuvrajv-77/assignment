const express = require('express');
const { register, login, getAdmins } = require('../controllers/userController');
const { upload } = require('../controllers/assignmentController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/admins', getAdmins);
router.post('/upload', upload);

module.exports = router;
