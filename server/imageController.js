const image = require('../models/imageModel');
const cloudinary = require('../cloudinary');
const fs = require('fs');

const uploadImage = async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const result = await cloudinary.uploader.upload(file.path);
        const newImage = new image({
            url: result.secure_url,
            publicId: result.public_id,
        });

        await newImage.save();
        fs.unlinkSync(file.path); // Remove the file from the server

        res.status(201).json(newImage);
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getAllImages = async (req, res) => {
    try {
        const images = await image.find();
        res.status(200).json(images);
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteImage = async (req, res) => {
    try {
        const { id } = req.params;
        const imageToDelete = await image.findById(id);
        if (!imageToDelete) {
            return res.status(404).json({ message: 'Image not found' });
        }

        await cloudinary.uploader.destroy(imageToDelete.publicId);
        await imageToDelete.remove();

        res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error) {
        console.error('Error deleting image:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    uploadImage,
    getAllImages,
    deleteImage
};