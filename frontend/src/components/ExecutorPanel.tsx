import React, { useState } from 'react';

function ExecutorPanel() {
    const [isRunning, setIsRunning] = useState(false);
    const [actionsToRun, setActionsToRun] = useState<string[]>([
        'Open Chrome',
        'Click Start',
        'Take Screenshot',
    ]);

    const handleExecute = () => {
        if (actionsToRun.length === 0) {
            window.electronAPI.sendAction('execute-actions', []);
            return;
        }

        setIsRunning(true);
        window.electronAPI.sendAction('execute-actions', actionsToRun);
    };

    const handleStop = () => {
        setIsRunning(false);
        window.electronAPI.sendAction('stop-execution');
    };

    return (
        <div style={{ border: '1px solid #444', padding: 10, marginBottom: 10 }}>
            <h3>⚙️ Executor Panel</h3>
            <button onClick={handleExecute} disabled={isRunning}>
                ▶ Run
            </button>
            <button onClick={handleStop} disabled={!isRunning} style={{ marginLeft: 8 }}>
                ⏹ Stop
            </button>

            <ul>
                {actionsToRun.map((a, i) => (
                    <li key={i}>{a}</li>
                ))}
            </ul>
        </div>
    );
}

export default ExecutorPanel;
