import express from 'express'
import Post from '../models/Post.js'
import Comment from '../models/Comment.js'

let router = express.Router()

router.param('aNew', (req, res, next, value) => {
  Post.findById(value)
    .then(aNew => {
      if (! aNew ) {
        throw new Error(`Couldn't find new ${value}`)
      }
      req.aNew = aNew
      next()
    })
    .catch(next)
})

// Express routes
router.get('/news', (req, res, next) => {
  Post.find()
    .then(news => res.json(news))
    .catch(next)
})

router.post('/news', (req, res, next) => {
  const aNew = new Post(req.body)

  aNew.save()
    .then(someNew => res.status(201).json(someNew.id))
    .catch(next)
})

router.get('/news/:aNew', (req, res, next) => {
  req.aNew.populate('comments').execPopulate()
    .then(completedNew => res.json(completedNew))
    .catch(next)
})

router.put('/news/:aNew/upvote', (req, res, next) => {
  const aNew = req.aNew
  aNew.upvote()
  aNew.save()
    .then(savedNew => res.json(savedNew))
    .catch(next)
})

router.post('/news/:aNew/comments', (req, res, next) => {
  const someNew = req.aNew
  const comment = new Comment(req.body)
  comment.post = someNew

  comment.save()
    .then(savedComment => {
      someNew.comments.push(savedComment) //Shouldn't this be automated?

      return someNew.save()
    })
    .then(noticiaGuardada => res.json(noticiaGuardada))
    .catch(next)
})

export default router
