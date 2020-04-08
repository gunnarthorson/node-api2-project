const express = require('express');
const router = express.Router();
const Posts = require('../data/db');


router.get('/', (req, res) => {
    Posts.find(req.query)
    .then(post => {
        res.status(200).json(post)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({  error: "The posts information could not be retrieved."})
    })
})

router.post('/', (req, res) => {
    const postInfo = req.body;  
    if(postInfo.title && postInfo.contents) {
        Posts.insert(postInfo)
        .then((post) => {
            res.status(201).json(post)
        })
        .catch(err => {
            res.status(500).json({err: "There was an error while saving the post to the database"})
        })
    } else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
})

router.delete("/:id", (req, res) => {
    Posts.findById(req.params.id)
      .then((post) => {
        if (post) {
            Posts.remove(req.params.id)
            .then(() => res.status(200).json(post))
            .catch((err) => {
              console.log(err);
              res.status(500).json({ error: "The post could not be removed" });
            });
        } else {
          res.status(404).json({
            message: "post not found",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          message: "Error processing request",
        });
      });
  });

  router.put("/:id", (req, res) => {
    !req.params.id
      ? res.status(404).json({ errorMessage: "ID not found" })
      : req.body.title && req.body.contents
      ? Posts.update(req.params.id, req.body)
          .then(res.status(200).json(req.body))
          .catch((err) => {
            console.log(err);
            res.status(500).json({ message: "Error processing request" });
          })
      : res
          .status(400)
          .json({
            errorMessage: "Please provide title and contents for the post.",
          });
  });


module.exports = router;