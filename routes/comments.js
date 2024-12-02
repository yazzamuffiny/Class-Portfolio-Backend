const express = require('express');
const router = express.Router();

const {
    createComment,
    editComment,
    deleteComment,
} = require('../controllers/commentController');

router.post(`/projects/:projectId/comments`, createComment);

router.patch(`/projects/:projectId/comments/:commentId`, editComment);

router.delete(`/projects/:projectId/comments/:commentId`, deleteComment);

module.exports = router;