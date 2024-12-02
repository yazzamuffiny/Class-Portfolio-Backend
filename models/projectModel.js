const mongoose = require('mongoose')

const Schema = mongoose.Schema

const projectSchema = new Schema ({
    project_name: {
        type: String,
        require: true
    },
    project_img: {
        type: String,
        default: null
    },
    author_name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    github_repo: {
        type: String,
    },
   vercel_link: {
        type: String,
    },
    github_profile: {
        type: String,
    },

    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment',
        },
    ]


}, {timestamps: true});

module.exports = mongoose.model('Project', projectSchema)