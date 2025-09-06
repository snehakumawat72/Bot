import React, { useEffect, useState } from 'react';

function History({ email }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/get-history/${email}`)
      .then(res => res.json())
      .then(data => setHistory(data))
      .catch(err => console.error(err));
  }, [email]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📜 Your Interview History</h2>
      {history.length === 0 ? (
        <p>No history found.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ marginTop: '1rem' }}>
          <thead>
            <tr>
              <th>Interview Type</th>
              <th>Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr key={index}>
                <td>{item.interviewType}</td>
                <td>{new Date(item.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default History;
