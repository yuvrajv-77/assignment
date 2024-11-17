const express = require('express');
const { viewAssignments, acceptAssignment, rejectAssignment } = require('../controllers/assignmentController');
const { authenticate } = require('../middleware/protected');
const router = express.Router();

router.get('/assignments',authenticate, viewAssignments);
router.post('/assignment/:id/accept',authenticate, acceptAssignment);
router.post('/assignment/:id/reject',authenticate, rejectAssignment);

module.exports = router;
