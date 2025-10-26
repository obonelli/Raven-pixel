import React, { useEffect, useState } from 'react';

function LogsView() {
    const [logs, setLogs] = useState<string[]>([]);

    useEffect(() => {
        window.electronAPI.onLog((message: string) => {
            setLogs((prev) => [...prev, message]);
        });
    }, []);

    return (
        <div style={{ border: '1px solid #444', padding: 10 }}>
            <h3>🧾 Logs</h3>
            <div
                style={{
                    background: '#111',
                    color: '#0f0',
                    padding: 10,
                    fontFamily: 'monospace',
                    height: 200,
                    overflowY: 'auto',
                }}
            >
                {logs.map((l, i) => (
                    <div key={i}>{l}</div>
                ))}
            </div>
        </div>
    );
}

export default LogsView;
