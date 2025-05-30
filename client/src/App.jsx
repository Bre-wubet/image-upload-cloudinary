import React from 'react';
import UploadForm from './components/UploadForm';
import ImageGallery from './components/ImageGallery';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-blue-700 mb-6">Image Upload with Cloudinary</h1>
        <UploadForm />
        <ImageGallery />
      </div>
    </div>
  );
}

export default App;