import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image) return alert('Please select an image first');

    const formData = new FormData();
    formData.append('image', image);
    setLoading(true);

    try {
      const res = await axios.post('/api/upload', formData);
      alert('Upload successful!');
      // Trigger a page reload to refresh the image gallery
      window.location.reload();
    } catch (err) {
      alert('Upload failed!');
    } finally {
      setLoading(false);
      setImage(null);
      setPreview(null);
    }
  };

  return (
    <form onSubmit={handleUpload} className="space-y-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring focus:border-blue-500"
      />

      {preview && (
        <div className="w-full h-64 overflow-hidden rounded-lg shadow">
          <img src={preview} alt="Preview" className="object-cover w-full h-full" />
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        disabled={loading}
      >
        {loading ? 'Uploading...' : 'Upload Image'}
      </button>
    </form>
  );
};

export default UploadForm;