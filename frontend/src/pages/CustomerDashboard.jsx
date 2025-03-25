import React, { useState, useEffect, useCallback } from 'react';
import RFQForm from './RFQForm.jsx';

const CustomerDashboard = () => {
  const [showRFQForm, setShowRFQForm] = useState(false);
  const [rfqHistory, setRFQHistory] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    try {
      const savedHistory = JSON.parse(localStorage.getItem('rfqHistory')) || [];
      setRFQHistory(savedHistory);
    } catch (err) {
      setError('Failed to load RFQ history');
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('rfqHistory', JSON.stringify(rfqHistory));
    } catch (err) {
      setError('Failed to save RFQ history');
    }
  }, [rfqHistory]);

  const handleRFQClick = useCallback(() => setShowRFQForm(true), []);
  const handleRFQSubmit = useCallback((formData) => {
    const timestampedData = {
      ...formData,
      submittedAt: new Date().toISOString(),
      id: Date.now(),
      status: 'Pending' // Added status field
    };
    setRFQHistory(prev => [...prev, timestampedData]);
    setShowRFQForm(false);
  }, []);
  const handleRFQClose = useCallback(() => setShowRFQForm(false), []);

  const toggleHistory = useCallback(() => setShowHistory(prev => !prev), []);

  const filteredHistory = rfqHistory.filter(rfq =>
    Object.values(rfq).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const exportToCSV = () => {
    const headers = ['ID,Submitted At,Status,Details\n'];
    const rows = rfqHistory.map(rfq => 
      `${rfq.id},${rfq.submittedAt},${rfq.status},"${JSON.stringify(rfq).replace(/"/g, '""')}"\n`
    );
    const csvContent = headers.concat(rows).join('');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `rfq_history_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="dashboard-wrapper">
      <style>
        {`
          .dashboard-wrapper {
            min-height: 100vh;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            padding: 40px 20px;
            font-family: 'Arial', sans-serif;
          }

          .dashboard-container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            box-shadow: 0 4px 6px rgba(77, 1, 1, 0.1);
            overflow: hidden;
          }

          .header {
            background:rgb(20, 43, 101);
            padding: 20px 30px;
            color: white;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .dashboard-title { font-size: 1.8rem; margin: 0; font-weight: 600; }
          .user-info { font-size: 0.9rem; opacity: 0.9; }

          .nav-bar {
            background:rgb(9, 88, 167);
            padding: 15px 30px;
            display: flex;
            gap: 20px;
            border-bottom: 1px solid #ecf0f1;
          }

          .nav-bar a {
            color: #ecf0f1;
            text-decoration: none;
            padding: 8px 16px;
            border-radius: 6px;
            transition: all 0.3s ease;
            font-weight: 500;
          }

          .nav-bar a:hover, .nav-bar a.active { background: #3498db; color: white; }

          .main-content {
            padding: 30px;
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 30px;
          }

          .rfq-section { background: #fff; border-radius: 12px; padding: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); }
          .section-title { margin: 0 0 15px 0; font-size: 1.2rem; color: #2c3e50; font-weight: 600; }

          .rfq-button, .history-button, .export-button {
            padding: 12px;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
            transition: background 0.3s ease;
            margin: 5px 0;
          }

          .rfq-button { background: #3498db; color: white; width: 100%; }
          .rfq-button:hover { background: #2980b9; }

          .close-button { background: #e74c3c; color: white; width: 100%; padding: 10px; border: none; border-radius: 8px; margin-bottom: 15px; cursor: pointer; }
          .close-button:hover { background: #c0392b; }

          .history-button { background:rgb(30, 174, 59); color: white; width: 100%; }
          .history-button:hover { background: #27ae60; }

          .export-button { background: #8e44ad; color: white; width: 100%; }
          .export-button:hover { background: #7d3c98; }

          .search-bar {
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-size: 1rem;
          }

          .history-list {
            max-height: 300px;
            overflow-y: auto;
            margin-top: 15px;
          }

          .history-item {
            padding: 10px;
            border-bottom: 1px solid #eee;
            font-size: 0.9rem;
            color: #7f8c8d;
          }

          .history-item:last-child { border-bottom: none; }
          .status-pending { color: #e67e22; }
          .sidebar { display: flex; flex-direction: column; gap: 20px; }

          .notifications, .profile-summary {
            background: #fff;
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          }

          .notifications { border-left: 4px solid #e67e22; }
          .profile-summary { border-left: 4px solid #2ecc71; }

          @media (max-width: 768px) { .main-content { grid-template-columns: 1fr; } }
        `}
      </style>

      <div className="dashboard-container">
        <header className="header">
          <h1 className="dashboard-title text-white">Customer Dashboard</h1>
          <div className="user-info">Welcome, Customer | Last Login: {new Date().toLocaleDateString()}</div>
        </header>

        <nav className="nav-bar">
          <a href="#" className="active">Dashboard</a>
          <a href="#">Profile</a>
          <a href="#">RFQ History</a>
          <a href="#">Settings</a>
        </nav>

        <main className="main-content">
          <div className="rfq-section">
            <h2 className="section-title">Request for Quotation</h2>
            {!showRFQForm ? (
              <>
                <button className="rfq-button" onClick={handleRFQClick}>
                  Create New RFQ
                </button>
                <button className="history-button" onClick={toggleHistory}>
                  {showHistory ? 'Hide History' : 'View RFQ History'}
                </button>
                {rfqHistory.length > 0 && (
                  <button className="export-button" onClick={exportToCSV}>
                    Export History to CSV
                  </button>
                )}
                {showHistory && (
                  <>
                    <input
                      type="text"
                      className="search-bar"
                      placeholder="Search RFQ history..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="history-list">
                      {filteredHistory.length > 0 ? (
                        filteredHistory.map(rfq => (
                          <div key={rfq.id} className="history-item">
                            <p>ID: {rfq.id}</p>
                            <p>Date: {new Date(rfq.submittedAt).toLocaleString()}</p>
                            <p>Status: <span className="status-pending">{rfq.status}</span></p>
                          </div>
                        ))
                      ) : (
                        <p>No matching RFQs found</p>
                      )}
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <button className="close-button" onClick={handleRFQClose}>
                  Close Form
                </button>
                <RFQForm onSubmit={handleRFQSubmit} />
              </>
            )}
          </div>

          <div className="sidebar">
            <div className="notifications">
              <h3 className="section-title">Notifications</h3>
              <p>{rfqHistory.length} pending RFQs</p>
              <p>System updates available</p>
            </div>

            <div className="profile-summary">
              <h3 className="section-title">Profile Summary</h3>
              <p>Status: Active</p>
              <p>Account Type: Premium</p>
              <p>Member Since: {new Date().getFullYear()}</p>
              <p>Total RFQs: {rfqHistory.length}</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CustomerDashboard;