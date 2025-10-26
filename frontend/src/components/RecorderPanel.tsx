import React, { useState } from 'react';

function RecorderPanel() {
    const [isRecording, setIsRecording] = useState(false);
    const [actions, setActions] = useState<string[]>([]);

    const handleToggleRecord = () => {
        if (!isRecording) {
            setActions([]);
            window.electronAPI.sendAction('start-record');
        } else {
            window.electronAPI.sendAction('stop-record');
        }
        setIsRecording(!isRecording);
    };

    const handleAddAction = () => {
        const newAction = `Action ${actions.length + 1}`;
        setActions([...actions, newAction]);
    };

    return (
        <div style={{ border: '1px solid #444', padding: 10, marginBottom: 10 }}>
            <h3>🎥 Recorder Panel</h3>
            <button onClick={handleToggleRecord}>
                {isRecording ? '⏹ Stop Recording' : '▶ Start Recording'}
            </button>
            <button onClick={handleAddAction} style={{ marginLeft: 8 }}>
                ➕ Add Dummy Action
            </button>

            <ul>
                {actions.map((a, i) => (
                    <li key={i}>{a}</li>
                ))}
            </ul>
        </div>
    );
}

export default RecorderPanel;
