const Comment = require('../models/commentModel');
const Project = require('../models/projectModel');

// CREATE COMMENT //

const createComment = async (req, res) => {
    const { projectId } = req.params;

    try {
        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        const newComment = new Comment({
            text: req.body.text,
            user_id: req.body.user_id
        });

        await newComment.save();

        project.comments.push(newComment);
        await project.save();

        res.status(201).json(newComment);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// EDIT COMMENT //

const editComment = async (req, res) => {
    const { projectId, commentId } = req.params;

    try {
        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        const comment = await Comment.findByIdAndUpdate(
            commentId,
            {
                text: req.body.text,
            },
            {new: true}
        );

        if (!comment) {
            return res.status(404).json({error: 'Comment not found'})
        }

        res.status(200).json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// DELETE COMMENT //

const deleteComment = async (req, res) => {
    const { projectId, commentId } = req.params;

    try {
        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        const comment = await Comment.findByIdAndDelete(commentId);

        if (!comment) {
            return res.status(404).json({error: 'Comment not found'})
        }

        project.comments = project.comments.filter(
            (comment) => comment.toString() !== commentId
        );

        res.status(200).json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { createComment, editComment, deleteComment };