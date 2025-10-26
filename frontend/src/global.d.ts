export { };

declare global {
    interface Window {
        electronAPI: {
            sendAction: (action: string, payload?: any) => void;
            onLog: (callback: (message: string) => void) => void;
        };
    }
}
