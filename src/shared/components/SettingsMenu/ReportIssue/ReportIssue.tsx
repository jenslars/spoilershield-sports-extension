import React, { useState } from 'react';
import { tv } from 'tailwind-variants';
import IconButton from '../../IconButton';
import ArrowRightIcon from '../../../../assets/icons/svg/ArrowRightIcon.svg';
import AddPhotoIcon from '../../../../assets/icons/svg/AddPhotoIcon.svg';

// Define component variants using tailwind-variants
const formContainer = tv({
  base: "w-full space-y-6"
});

const inputGroup = tv({
  base: "space-y-4"
});

const inputField = tv({
  base: "w-full px-4 py-3 text-base font-normal bg-interactive duration-300 shadow-2xs rounded-lg text-text-primary placeholder-text-tertiary focus:shadow-2xl focus:duration-300 focus:outline-none border border-transparent focus:border-blue-500"
});

const textareaField = tv({
  base: "w-full px-4 py-3 text-base font-normal bg-interactive duration-300 shadow-2xs rounded-lg text-text-primary placeholder-text-tertiary focus:shadow-2xl focus:duration-300 focus:outline-none border border-transparent focus:border-blue-500 resize-none"
});

const fileUploadContainer = tv({
  base: "relative w-full h-32 border-2 border-dashed border-text-tertiary rounded-lg bg-interactive hover:bg-interactive-hover transition-all duration-300 cursor-pointer group"
});

const fileUploadContent = tv({
  base: "absolute inset-0 flex flex-col items-center justify-center space-y-2"
});

const fileUploadIcon = tv({
  base: "w-8 h-8 text-text-tertiary group-hover:text-text-secondary transition-colors duration-300"
});

const fileUploadText = tv({
  base: "text-sm text-text-tertiary group-hover:text-text-secondary transition-colors duration-300"
});

const submitButton = tv({
  base: "w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-all duration-300 shadow-2xs hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
});

const errorMessage = tv({
  base: "text-red-500 text-sm mt-2 flex items-center gap-2"
});

const ReportIssue = () => {
  const [formData, setFormData] = useState({
    issue: '',
    device: '',
    browser: '',
    website: '',
    file: null as File | null
  });
  const [fileName, setFileName] = useState('');
  const [fileError, setFileError] = useState('');

  // File validation constants
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = [
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf',
    'text/plain'
  ];
  const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.pdf', '.txt'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFileError(''); // Clear previous errors
    
    if (!file) {
      setFormData(prev => ({ ...prev, file: null }));
      setFileName('');
      return;
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      setFileError(`Invalid file type. Please upload: ${ALLOWED_EXTENSIONS.join(', ')}`);
      e.target.value = ''; // Clear the input
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setFileError(`File too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB`);
      e.target.value = ''; // Clear the input
      return;
    }

    // Validate file extension
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(fileExtension)) {
      setFileError(`Invalid file extension. Please upload: ${ALLOWED_EXTENSIONS.join(', ')}`);
      e.target.value = ''; // Clear the input
      return;
    }

    // File is valid
    setFormData(prev => ({
      ...prev,
      file
    }));
    setFileName(file.name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // TODO: Implement form submission logic
  };

  const isFormValid = formData.issue.trim() !== '';

  return (
    <div className="w-[90%] h-full bg-surface text-text-primary mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-medium text-text-primary mb-2">
          Describe the issue experienced
        </h2>
        <p className="text-text-tertiary font-light text-sm">
          Provide a detailed description of the issue you experienced together with the device, 
          browser and eventual website the issue was experienced on.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className={formContainer()}>
        <div className={inputGroup()}>
          {/* Issue Description */}
          <div>
            <label htmlFor="issue" className="block text-sm font-medium text-text-primary mb-2">
              Issue Description *
            </label>
            <textarea
              id="issue"
              name="issue"
              placeholder="Describe the issue you encountered..."
              value={formData.issue}
              onChange={handleInputChange}
              rows={4}
              required
              className={textareaField()}
            />
          </div>

          {/* Device */}
          <div>
            <label htmlFor="device" className="block text-sm font-medium text-text-primary mb-2">
              Device
            </label>
            <input
              id="device"
              name="device"
              type="text"
              placeholder="e.g., iPhone 14, Windows PC, MacBook Pro"
              value={formData.device}
              onChange={handleInputChange}
              className={inputField()}
            />
          </div>

          {/* Browser */}
          <div>
            <label htmlFor="browser" className="block text-sm font-medium text-text-primary mb-2">
              Browser
            </label>
            <input
              id="browser"
              name="browser"
              type="text"
              placeholder="e.g., Chrome 120, Firefox 121, Safari 17"
              value={formData.browser}
              onChange={handleInputChange}
              className={inputField()}
            />
          </div>

          {/* Website */}
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-text-primary mb-2">
              Website (if applicable)
            </label>
            <input
              id="website"
              name="website"
              type="text"
              placeholder="e.g., https://example.com"
              value={formData.website}
              onChange={handleInputChange}
              className={inputField()}
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Screenshot or Additional Files
            </label>
            <div className={fileUploadContainer()}>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.gif,.webp,.pdf,.txt"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className={fileUploadContent()}>
                <AddPhotoIcon className={fileUploadIcon()} fill="currentColor" />
                <p className={fileUploadText()}>
                  {fileName ? fileName : 'Click to upload or drag and drop'}
                </p>
                {fileName && !fileError && (
                  <p className="text-xs text-green-500">
                    File selected successfully
                  </p>
                )}
                <p className="text-xs text-text-tertiary text-center px-4">
                  Accepted formats: JPG, PNG, GIF, WebP, PDF, TXT (max 5MB)
                </p>
              </div>
            </div>
            {fileError && (
              <div className={errorMessage()}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {fileError}
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormValid}
          className={submitButton()}
        >
          <span>Submit Report</span>
          <ArrowRightIcon className="w-5 h-5" fill="currentColor" />
        </button>
      </form>
      
      {/* Bottom spacing for scroll */}
      <div className="h-6"></div>
    </div>
  );
  };
  
export default ReportIssue;