import React from 'react';
import RecorderPanel from './components/RecorderPanel';
import ExecutorPanel from './components/ExecutorPanel';
import LogsView from './components/LogsView';

function App() {
    return (
        <div style={{ padding: 20 }}>
            <h1>VisionFlow MVP</h1>
            <RecorderPanel />
            <ExecutorPanel />
            <LogsView />
        </div>
    );
}

export default App;
