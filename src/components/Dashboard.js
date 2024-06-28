import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css'; // Ensure the CSS file path is correct
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { styleText } from 'util';
import { MdMargin } from 'react-icons/md';
// const BASE_PATH = 'https://finalsemproject-backend.onrender.com';
const BASE_PATH = 'http://localhost:4000';

function Dashboard() {
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileId, setSelectedFileId] = useState('');
    const [fileText, setFileText] = useState('');
    const [uploadMessage, setUploadMessage] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const token = localStorage.getItem('token');

    const fetchFiles = useCallback(async () => {
        try {
            const response = await axios.get(BASE_PATH.concat('/api/files/list'), {
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
            await axios.post(BASE_PATH.concat('/api/files/upload'), formData, {
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
            const response = await axios.get(BASE_PATH.concat(`/api/files/${selectedFileId}`), {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setFileText(response.data.content); // Assuming the server response contains a property 'content'
            // console.log(response.data.content);
            console.log(JSON.parse(response.data.content));
        } catch (error) {
            console.error('Failed to fetch text:', error);
            setUploadMessage('Failed to fetch text: ' + error.message);
        }
    };

    return (
        <div className="dashboard-container">
            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`} >
                <ul className="file-list">
                    {files.map(file => (
                        <li key={file._id} className="file-item">
                            <input
                                type="radio"
                                value={file._id}
                                onChange={() => setSelectedFileId(file._id)}
                                checked={selectedFileId === file._id}
                                id={`${file._id}`}
                            />
                                    <label for={`${file._id}`}>{file.filename}</label><br></br>
                        </li>
                    ))}
                </ul>
                                    <div className="file-test">
                        <input type="file" id="fileInput" className="file-input" onChange={handleFileSelect} />
                        <button className="file-upload-btn" onClick={handleFileUpload}>Upload File</button>
                        <button className="text-button" onClick={handleFetchText}>Generate Text</button>
                        {uploadMessage && <div className="upload-message">{uploadMessage}</div>}
                    </div>
            </div>
            <div className={`sidebar-header ${isSidebarOpen ? '' : 'open'}`}>
                <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
                    {isSidebarOpen ? <IoIosArrowBack /> : <IoIosArrowForward />}
                </button>
            </div>
            <div className={`content ${isSidebarOpen ? 'shifted' : ''}`}>
                <button className="text-button" onClick={handleFetchText}>Generate Text</button>
                <div className="text-section">
                    <h2>Here is the summary</h2>
                    <div className="file-content">{fileText || 'Select a file to see text here.'}</div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
