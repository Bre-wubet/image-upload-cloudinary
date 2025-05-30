import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get('/api/images');
      setImages(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch images');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/images/${id}`);
      setImages(images.filter(image => image._id !== id));
    } catch (err) {
      setError('Failed to delete image');
    }
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-4">{error}</div>;
  if (images.length === 0) return <div className="text-center py-4">No images found</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 px-4">
  {images.map((image) => (
    <div
      key={image._id}
      className="relative group rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white"
    >
      <img
        src={image.url}
        alt="Uploaded"
        className="w-full h-56 object-cover"
      />
      <button
        onClick={() => handleDelete(image._id)}
        className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md"
        aria-label="Delete image"
      >
        x
      </button>
    </div>
  ))}
</div>
  );
}

export default ImageGallery;