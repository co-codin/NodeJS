const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/signup', (req, res, next) => {
    res.render('accounts/signup', {
        errors: req.flash('errors')
    })
})

router.post('/signup', (req, res, next) => {
    let user = new User()

    user.profile.name = req.body.name
    user.password = req.body.password
    user.email = req.body.email

    User.findOne({ email: req.body.email }, (err, existingUser) => {
        if (existingUser) {
            req.flash('errors', 'Account with that email address already exists')
            return res.redirect('/signup')
        } else {
            user.save((err, user) => {
                if (err) return next(err)

                res.redirect('/')
            })
        }
    })
})


module.exports = router
