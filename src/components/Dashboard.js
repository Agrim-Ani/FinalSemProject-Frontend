import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css'; // Ensure the CSS file path is correct
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

function Dashboard() {
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileId, setSelectedFileId] = useState('');
    const [fileText, setFileText] = useState('');
    const [uploadMessage, setUploadMessage] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const token = localStorage.getItem('token');

    // Redirect if not logged in
    
    const fetchFiles = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/files/list', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setFiles(response.data);
        } catch (error) {
            console.error('Failed to fetch files:', error);
        }
    }, [token]);

    useEffect(() => {
            fetchFiles();
        }, [fetchFiles, token]);
    // if (!token) {
    //         return <Navigate to="/" replace />;
    //     }
    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
        setUploadMessage('');
    };

    const handleFileUpload = async () => {
        if (!selectedFile) {
            setUploadMessage('Please select a file first!');
            return;
        }
        const formData = new FormData();
        formData.append('file', selectedFile);
        try {
            await axios.post('http://localhost:4000/api/files/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            setUploadMessage('File uploaded successfully');
            fetchFiles(); // Re-fetch files to update the list
            setSelectedFile(null);
            document.getElementById('fileInput').value = ''; // Reset file input
        } catch (error) {
            console.error('Failed to upload file:', error);
            setUploadMessage('Failed to upload file: ' + error.message);
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleFetchText = async () => {
        if (!selectedFileId) {
            setUploadMessage('Please select a file to generate text!');
            return;
        }
        try {
            const response = await axios.get(`http://localhost:4000/api/files/${selectedFileId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setFileText(response.data.content); // Assuming the server response contains a property 'content'
        } catch (error) {
            console.error('Failed to fetch text:', error);
            setUploadMessage('Failed to fetch text: ' + error.message);
        }
    };

    return (
        <div className="dashboard-container">
        <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
            
            <ul className="file-list">
                {files.map(file => (
                    <li key={file._id} className="file-item">
                        <input
                            type="radio"
                            value={file._id}
                            onChange={() => setSelectedFileId(file._id)}
                            checked={selectedFileId === file._id}
                        />
                        {file.filename}
                    </li>
                ))}
                <li className="file-item">
                <input type="file" id="fileInput" className="file-input" onChange={handleFileSelect} />
                <button className="file-upload-btn" onClick={handleFileUpload}>Upload File</button>
                {uploadMessage && <div className="upload-message">{uploadMessage}</div>}
            </li>
            </ul>
            
        </div>
            <div className={`sidebar-header ${isSidebarOpen ? '' : 'open'}`}>
                <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
                    {isSidebarOpen ? <IoIosArrowBack /> : <IoIosArrowForward />}
                </button>
            </div>
        <div className='upload-showText'>
        <button className="text-button" onClick={handleFetchText}>Generate Text</button>
        <div className="text-section">
            <div className="file-content">{fileText || 'Select a file to see text here.'}</div>
        </div>
        </div>
    </div>
    );
}

export default Dashboard;
