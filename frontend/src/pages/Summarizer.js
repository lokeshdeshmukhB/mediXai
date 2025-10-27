import React, { useState, useEffect } from 'react';
import { summarizerAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Upload, CheckCircle, ArrowLeft } from 'lucide-react';

const Summarizer = () => {
  const { refreshUser } = useAuth();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [summary, setSummary] = useState(null);
  const [, setSavedPapers] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchSavedPapers();
  }, []);

  const fetchSavedPapers = async () => {
    try {
      const response = await summarizerAPI.getPapers();
      setSavedPapers(response.data.data);
    } catch (error) {
      console.error('Error fetching papers:', error);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    setUploadedFile(file);
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await summarizerAPI.uploadPaper(formData);
      setSummary(response.data.data);
      fetchSavedPapers();
      // Refresh user data to update dashboard stats
      await refreshUser();
    } catch (error) {
      console.error('Error uploading paper:', error);
      alert('Failed to upload and summarize paper. Please try again.');
      setUploadedFile(null);
    } finally {
      setUploading(false);
    }
  };

  // Removed unused functions - handleViewPaper and handleDownloadPaper

  const handleReset = () => {
    setUploadedFile(null);
    setSummary(null);
  };


  // Upload View
  if (!uploadedFile && !summary) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Research Paper Summarizer 📄</h1>
          <p className="text-gray-600 mt-2">Upload a research paper to get AI-powered summary</p>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm border-2 border-dashed border-gray-300 hover:border-teal-500 transition">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer block text-center">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-teal-600" />
            </div>
            <p className="text-lg font-medium text-gray-900 mb-2">Upload Research Paper</p>
            <p className="text-gray-600">Click to browse or drag and drop your PDF file here</p>
            <p className="text-sm text-gray-500 mt-2">Supports PDF files up to 10MB</p>
          </label>
        </div>

      </div>
    );
  }

  // Loading View
  if (uploading) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="w-20 h-20 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Analyzing Paper...</h2>
        <p className="text-gray-600">AI is reading and summarizing your research paper</p>
      </div>
    );
  }

  // Summary View
  if (summary) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <button
          onClick={handleReset}
          className="text-teal-600 hover:underline flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Upload another paper
        </button>

        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{summary.title}</h1>
              <p className="text-gray-600">Summary generated successfully</p>
            </div>
          </div>

          <div className="space-y-6">
            {summary.summary?.keyFindings && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Key Findings</h3>
                <p className="text-gray-700 leading-relaxed">{summary.summary.keyFindings}</p>
              </div>
            )}

            {summary.summary?.methodology && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Methodology</h3>
                <p className="text-gray-700 leading-relaxed">{summary.summary.methodology}</p>
              </div>
            )}

            {summary.summary?.conclusions && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Conclusions</h3>
                <p className="text-gray-700 leading-relaxed">{summary.summary.conclusions}</p>
              </div>
            )}

            {summary.summary?.fullSummary && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Full Summary</h3>
                <p className="text-gray-700 leading-relaxed">{summary.summary.fullSummary}</p>
              </div>
            )}

            <button 
              onClick={handleReset}
              className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-teal-700 hover:to-blue-700 transition"
            >
              Summarize Another Paper
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Summarizer;
