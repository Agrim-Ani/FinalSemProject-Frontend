import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css'; // Ensure the CSS file path is correct
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
// const BASE_PATH = 'https://finalsemproject-backend.onrender.com';
const BASE_PATH = 'http://localhost:4000';

function Dashboard() {
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileId, setSelectedFileId] = useState('');
    const [previewText, setPreviewText] = useState('');
    const [fullSummary, setFullSummary] = useState('');
    const [keyPoints, setKeyPoints] = useState([]);
    const [uploadMessage, setUploadMessage] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [model, setModel] = useState("llama3-70b-8192");
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
            const response = await axios.get(BASE_PATH.concat(`/api/files/${selectedFileId}?model=${model}`), {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const { preview_text, full_summary, key_points } = JSON.parse(response.data.content);
            setPreviewText(preview_text);
            setFullSummary(full_summary);
            setKeyPoints(key_points);
        } catch (error) {
            console.error('Failed to fetch text:', error);
            setUploadMessage('Failed to fetch text: ' + error.message);
        }
    };

    useEffect(()=>{
console.log(model);
    },[model])

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
                            <label htmlFor={`${file._id}`}>{file.filename}</label><br></br>
                        </li>
                    ))}
                </ul>
                <div className="file-test">
                    <input type="file" id="fileInput" className="file-input" onChange={handleFileSelect} />
                    <button className="file-upload-btn" onClick={handleFileUpload}>Upload File</button>
                    <select className="text-button" onChange={(e)=>{setModel(e.target.value)}}>
                        <option>llama3-70b-8192</option>
                        <option>llama3-8b-8192</option>
                        <option>mixtral-8x7b-32768</option>
                        <option>gemma-7b-it</option>
                    </select>
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
                    {previewText && (
                        <div className="file-content">
                            <h3>Preview Text</h3>
                            <ul>
                            <li>
                                <p>{previewText}....</p>
                            </li>
                            </ul>
                        </div>
                    )}
                    {fullSummary && (
                        <div className="file-content">
                            <h3>Full Summary</h3>
                            <ul>
                            <li>
                            <p>{fullSummary}</p>
                            </li>
                            </ul>
                            
                        </div>
                    )}
                    {keyPoints.length > 0 && (
                        <div className="file-content">
                            <h3>Key Points</h3>
                            <ul>
                                {keyPoints.map((point, index) => (
                                    <li key={index}>{point}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
