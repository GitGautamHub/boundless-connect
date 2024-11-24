import React, { useState } from 'react';
import { FiUpload, FiFile, FiCheckCircle, FiAlertCircle, FiX } from 'react-icons/fi';

function DocumentManagement() {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'Commercial Invoice.pdf',
      status: 'Validated',
      date: '2024-03-20',
      type: 'Invoice',
      file: null,
    },
    {
      id: 2,
      name: 'Packing List.pdf',
      status: 'Missing Information',
      date: '2024-03-20',
      type: 'Packing List',
      file: null,
    },
    {
      id: 3,
      name: 'Certificate of Origin.pdf',
      status: 'Validated',
      date: '2024-03-19',
      type: 'Certificate',
      file: null,
    },
  ]);

  const [dragActive, setDragActive] = useState(false);
  const [previewDoc, setPreviewDoc] = useState(null);
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  const handleFileUpload = (files) => {
    const newDocuments = Array.from(files).map((file, index) => ({
      id: documents.length + index + 1,
      name: file.name,
      status: 'Pending Validation',
      date: new Date().toISOString().split('T')[0],
      type: 'Unknown',
      file: URL.createObjectURL(file),
    }));
    setDocuments((prev) => [...prev, ...newDocuments]);
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files.length) {
      handleFileUpload(files);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFileUpload(files);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const previewDocument = (doc) => {
    setPreviewDoc(doc);
  };

  const toggleMoreInfo = () => {
    setShowMoreInfo(!showMoreInfo);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Upload Section */}
      <div
        className={`card border-2 rounded-lg p-6 ${
          dragActive ? 'border-primary-600 bg-primary-50' : 'border-gray-200'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="text-center">
          <FiUpload className="mx-auto h-16 w-16 text-primary-500 mb-4" />
          <h3 className="text-2xl font-bold mb-2">Upload Documents</h3>
          <p className="text-gray-600 mb-4">Drag and drop files here or click to upload.</p>
          <input
            type="file"
            id="fileInput"
            multiple
            onChange={handleFileInputChange}
            className="hidden"
          />
          <label
            htmlFor="fileInput"
            className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 cursor-pointer"
          >
            Select Files
          </label>
        </div>
      </div>

      {/* Documents List */}
      <div className="card mt-8">
        <h2 className="text-2xl font-bold mb-6">Uploaded Documents</h2>
        <div className="space-y-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <div className="flex items-center">
                <FiFile className="h-8 w-8 text-primary-500 mr-4" />
                <div>
                  <h3 className="font-bold">{doc.name}</h3>
                  <p className="text-sm text-gray-600">{doc.type} • {doc.date}</p>
                </div>
              </div>
              <div className="flex items-center">
                {doc.status === 'Validated' ? (
                  <span className="flex items-center text-green-600 font-medium">
                    <FiCheckCircle className="mr-2" />
                    {doc.status}
                  </span>
                ) : (
                  <span className="flex items-center text-orange-600 font-medium">
                    <FiAlertCircle className="mr-2" />
                    {doc.status}
                  </span>
                )}
                <button
                  className="ml-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
                  onClick={() => previewDocument(doc)}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* More Info Section */}
      {showMoreInfo && (
        <div className="card mt-8">
          <h3 className="text-xl font-bold mb-4">Required Documents</h3>
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            <li><strong>Commercial Invoice</strong>: Details about the goods and their value.</li>
            <li><strong>Packing List</strong>: Information on packaging dimensions and weights.</li>
            <li><strong>Certificate of Origin</strong>: Certifies the manufacturing origin of goods.</li>
          </ul>
        </div>
      )}

      <div className="mt-6 text-center">
        <button
          onClick={toggleMoreInfo}
          className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700"
        >
          {showMoreInfo ? 'Read Less' : 'Read More'}
        </button>
      </div>

      {/* Document Preview Modal */}
      {previewDoc && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setPreviewDoc(null)}
        >
          <div
            className="bg-white rounded-lg max-w-2xl w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setPreviewDoc(null)}
            >
              <FiX className="h-6 w-6" />
            </button>
            <h2 className="text-2xl font-bold mb-4">{previewDoc.name}</h2>
            <p className="text-gray-600 mb-4">
              <strong>Status:</strong> {previewDoc.status}
            </p>
            {previewDoc.file ? (
              <iframe
                src={previewDoc.file}
                className="w-full h-80 border rounded-lg"
                title="Document Preview"
              />
            ) : (
              <p className="text-gray-500">No preview available.</p>
            )}
            <button
              className="mt-4 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 w-full"
              onClick={() => setPreviewDoc(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DocumentManagement;
