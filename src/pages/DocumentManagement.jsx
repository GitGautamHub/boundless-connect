import React, { useState } from 'react';
import { FiUpload, FiFile, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

function DocumentManagement() {
  const [dragActive, setDragActive] = useState(false);

  const documents = [
    {
      id: 1,
      name: 'Commercial Invoice.pdf',
      status: 'Validated',
      date: '2024-03-20',
      type: 'Invoice',
    },
    {
      id: 2,
      name: 'Packing List.pdf',
      status: 'Missing Information',
      date: '2024-03-20',
      type: 'Packing List',
    },
    {
      id: 3,
      name: 'Certificate of Origin.pdf',
      status: 'Validated',
      date: '2024-03-19',
      type: 'Certificate',
    },
  ];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file upload
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Upload Section */}
      <div
        className={`card mb-8 ${
          dragActive ? 'border-primary-600 bg-primary-50' : ''
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="text-center py-12">
          <FiUpload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">
            Upload your compliance documents
          </h3>
          <p className="text-gray-600 mb-4">
            Drag and drop your files here, or click to select files
          </p>
          <button className="btn-primary">Select Files</button>
        </div>
      </div>

      {/* Documents List */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-6">Uploaded Documents</h2>
        <div className="space-y-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-center">
                <FiFile className="h-6 w-6 text-gray-400 mr-4" />
                <div>
                  <h3 className="font-medium">{doc.name}</h3>
                  <p className="text-sm text-gray-600">
                    {doc.type} • Uploaded on {doc.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                {doc.status === 'Validated' ? (
                  <span className="flex items-center text-green-600">
                    <FiCheckCircle className="mr-2" />
                    {doc.status}
                  </span>
                ) : (
                  <span className="flex items-center text-orange-600">
                    <FiAlertCircle className="mr-2" />
                    {doc.status}
                  </span>
                )}
                <button className="ml-4 text-primary-600 hover:text-primary-700">
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DocumentManagement;