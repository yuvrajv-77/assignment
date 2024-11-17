
const Assignment = require('../models/assignmentModel');

// Upload Assignment Controller
const upload = async (req, res) => {
  try {
    const {userId, task, adminId } = req.body;
    const newAssignment = await Assignment.create({ 
        userId, 
        task, 
        admin: adminId 
    });
    res.status(201).json({ message: 'Assignment uploaded successfully', assignment: newAssignment });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload assignment', details: error.message });
  }
};

// View Assignments Controller
const viewAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({ admin: req.user.id })
    .populate('userId', 'name').sort({ timestamp: -1 }); 
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch assignments', details: error.message });
  }
};

// Controller to accept assignment
const acceptAssignment = async (req, res) => {
    try{
        const { id } = req.params;
        const adminId = req.user.id;
       
        const assignment = await Assignment.findOneAndUpdate(
            {_id:id, admin: adminId},
            {status: "accepted"},
            {new:true}
        );
        if (!assignment) {
            return res.status(404).json({ error: 'Assignment not found or unauthorized' });
          }
          res.status(200).json({ message: 'Assignment accepted', assignment });
    }catch(error) {
        res.status(500).json({ error: 'Failed to accept assignment', details: error.message });
      }
}

// controller to reject assignment
const rejectAssignment = async (req, res) => {
    try{
        const { id } = req.params;
        const adminId = req.user.id;
       
        const assignment = await Assignment.findOneAndUpdate(
            {_id:id, admin: adminId},
            {status: "rejected"},
            {new:true}
        );
        if (!assignment) {
            return res.status(404).json({ error: 'Assignment not found or unauthorized' });
          }
          res.status(200).json({ message: 'Assignment Rejected', assignment });
    }catch(error) {
        res.status(500).json({ error: 'Failed to accept assignment', details: error.message });
      }
}

module.exports = {rejectAssignment,upload,viewAssignments,acceptAssignment}