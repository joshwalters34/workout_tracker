const express = require("express");
const path = require('path');
const router = require("express").Router();


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
  });
  router.get('/stats', (req, res) => {
    res.sendFile(path.join(__dirname, 'stats.html'))
  });
  router.get('/exercise', (req, res) => {
    res.sendFile(path.join(__dirname, 'exercise.html'))
  });

  module.exports = router;