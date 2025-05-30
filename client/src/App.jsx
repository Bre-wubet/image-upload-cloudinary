import React from 'react';
import UploadForm from './components/UploadForm';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-blue-700 mb-6">Image Upload with Cloudinary</h1>
        <UploadForm />
      </div>
    </div>
  );
}

export default App;