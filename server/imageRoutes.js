const express = require('express');
const multer = require('multer');
const { uploadImage, getAllImages, deleteImage } = require('./imageController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Directory to temporarily store uploaded files

// Route to upload an image
router.post('/upload', upload.single('image'), uploadImage);
router.get('/images', getAllImages);
router.delete('/images/:id', deleteImage);

module.exports = router;
// This code sets up the routes for image upload, retrieval, and deletion using Express.js and Multer for file handling.