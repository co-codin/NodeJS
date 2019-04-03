const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Story = mongoose.model('stories')
const User = mongoose.model('users')
const { ensureAuthenticated, ensureGuest } = require('../helpers/auth')

router.get('/', (req, res) => {
    Story.find({ status: 'public' })
         .populate('user')
         .sort({ date: 'desc' })
         .then(stories => {
             res.render('stories/index', {
                 stories
             })
         })
})

router.get('/show/:id', (req, res) => {
    Story.findOne({ _id: req.params.id })
         .populate('user')
         .populate('comments.commentUser')
         .then(story => {
             if (story.status == 'public') {
                 res.render('stories/show', {
                     story
                 })
             } else {
                 if (req.user) {
                     if (req.user.id == story.user._id) {
                         res.render('stories/show', {
                             story
                         })
                     } else {
                         res.redirect('/stories')
                     }
                 } else {
                     res.redirect('/stories')
                 }
             }
         })
})

router.get('/user/:userId', (req, res) => {
    Story.find({ user: req.params.userId, status: 'public' })
         .populate('user')
         .then(stories => {
             res.render('stories/index', {
                 stories
             })
         })
})

router.get('/my', (req, res) => {
    Story.find({ user: req.user.id })
         .populate('user')
         .then(stories => {
             res.render('stories/index', {
                 stories
             })
         })
})

router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('stories/add')
})

router.get('/edit/:id', ensureAuthenticated, (req, res) => {
    Story.findOne({ _id: req.params.id })
         .then(story => {
             if (story.user != req.user.id) {
                 res.redirect('/stories')
             } else {
                 res.render('stories/edit', {
                     story
                 })
             }
         })
})

router.put('/:id', (req, res) => {
    Story.findOne({ _id: req.params.id }).then(story => {
        let allowComments

        if (req.body.allowComments) {
            allowComments = true
        } else {
            allowComments = false
        }

        story.title = req.body.title
        story.body = req.body.body
        story.status = req.body.status
        story.allowComments = allowComments

        story.save().then(story => {
            res.redirect('/dashboard')
        })
    })
})

router.delete('/:id', (req, res) => {
    Story.remove({ _id: req.params.id })
         .then(() => {
             res.redirect('/dashboard')
         })
})

router.post('/', (req, res) => {
    let allowComments

    if (req.body.allowComments) {
        allowComments = true
    } else {
        allowComments = false
    }

    const newStory = {
        title: req.body.title,
        body: req.body.body,
        status: req.body.status,
        allowComments,
        user: req.user.id
    }

    new Story(newStory).save().then(story => {
        res.redirect(`/stories/show/${story.id}`)
    })
})

router.post('/comment/:id', (req, res) => {
    Story.findOne({
        _id: req.params.id
    }).then(story => {
        const newComment = {
            commentBody: req.body.commentBody,
            commentDate: req.body.commentDate,
            commentUser: req.user.id
        }

        story.comments.unshift(newComment)
        story.save().then(story => {
            res.redirect(`/stories/show/${story.id}`)
        })
    })
})

module.exports = router
