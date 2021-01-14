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
        const user_id = req.session.user_id;
        const username = req.session.username;
        const text = req.body.text;
        const tags = req.body.tags;
        const is_item = false;
        let added = await Posts.addOne(user_id, username, text, tags, is_item);

        if (added) {
            let post = {}
            post["user_id"] = user_id;
            post["text"] = text;
            post["username"] = username;
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
        res.status(201).json({posts}).end();
    } catch (error) {
        res.status(400).json({ error: "Failed to get posts" }).end();
    }
  });


/**
 * Get all posts by user_id
 * 
 * @name GET /api/posts/user_id/:id
 */
router.get(
    '/user_id/:id',
    [],
    async (req, res) => {
    try {
        let posts = await Posts.findByID(req.params.id);
        res.status(201).json({posts}).end();
    } catch (error) {
        res.status(400).json({ error: "Failed to get posts" }).end();
    }
});

/**
 * Get all posts by username
 * 
 * @name GET /api/posts/username/:username
 */
router.get(
    '/username/:username',
    [],
    async (req, res) => {
    try {
        let posts = await Posts.findByUser(req.params.username);
        res.status(201).json({posts}).end();
    } catch (error) {
        res.status(400).json({ error: "Failed to get posts" }).end();
    }
});

/**
 * Get all posts by topic
 * 
 * @name GET /api/posts/topic/:topic
 */
router.get(
    '/topic/:topic',
    [],
    async (req, res) => {
    try {
        let posts = await Posts.findAll();
        posts = posts.filter(
            post => {
               return post.tags.toLowerCase().includes(req.params.topic.toLowerCase());
            }
        )
        res.status(201).json({posts}).end();
    } catch (error) {
        res.status(400).json({ error: "Failed to get posts" }).end();
    }
});




module.exports = router;
