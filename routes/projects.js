const express = require('express')

const router = express.Router();

// Multer JS Initialization
const multer = require('multer')
const path = require("path")

// Multer Storage
const  storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, uniqueSuffix + ext);
    },
});

const upload = multer({storage});

// Import Controllers
const {
    getProjects,
    getProject,
    createProject,
    deleteProject,
    updateProject
} = require('../controllers/projectController');

// Get all Projects
router.get('/', getProjects);

// Get a single workout
router.get('/:id', getProject); 

// Upload Image
router.post('/', upload.single('project_image'), createProject);

// Create Project
router.post('/', createProject);

// Delete Project
router.delete('/:id', deleteProject);

// Update Project
router.patch('/:id', updateProject);


module.exports = router;