const e = require('express');
const express = require('express');

const Posts = require('../models/Posts');
const v = require('./validators');

const router = express.Router();

/**
 * Create new post.
 * 
 * @name POST /api/posts
 */
router.post(
    '/',
    [
    //   v.ensureUserLoggedIn,
    ],
    async (req, res) => {
    try {
    //   const user_id = res.session.user_id;
        const user_id = 1;
        const text = req.body.text;
        const tags = req.body.tags;
        const is_item = false;
        let added = await Posts.addOne(user_id, text, tags, is_item);

        if (added) {
            let post = {}
            post["user_id"] = user_id;
            post["text"] = text;
            post["tags"] = tags;
            post["is_item"] = is_item;
            post["timestamp"] = Date.now();
            res.status(201).json({post: post, message: "Succesfully added post!" }).end();
        }
    } catch (error) {
        res.status(400).json({ error: "Failed to add post" }).end();
    }
  });

/**
 * Get all posts
 * 
 * @name GET /api/posts
 */
router.get(
    '/',
    [
    ],
    async (req, res) => {
    try {
        let posts = await Posts.findAll();
        console.log(posts)
        res.status(201).json({posts}).end();
    } catch (error) {
        res.status(400).json({ error: "Failed to get posts" }).end();
    }
  });


/**
 * Get all posts by user
 * 
 * @name GET /api/posts
 */
router.get(
    '/user/:id',
    [],
    async (req, res) => {
    try {
        let posts = await Posts.findByUser(req.params.id);
        res.status(201).json({posts}).end();
    } catch (error) {
        res.status(400).json({ error: "Failed to get posts" }).end();
    }
});

/**
 * Get all posts by topic
 * 
 * @name GET /api/posts
 */
router.get(
    '/districts/:topic',
    [],
    async (req, res) => {
    try {
        let posts = await Posts.findAll();
        posts = posts.filter(
            post => {
                let tags = post.tags.toLowerCase().split(',')
                return tags.includes(req.params.topic.toLowerCase());
            }
        )
        res.status(201).json({posts}).end();
    } catch (error) {
        res.status(400).json({ error: "Failed to get posts" }).end();
    }
});


module.exports = router;
