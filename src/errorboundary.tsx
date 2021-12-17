import React from 'react';

class ErrorBoundary extends React.Component {
    state = { hasError: false };
    static getDerivedStateFromError(error:string) {
        return { hasError: true };
    }
    render() {
        if (this.state.hasError) {
            return (
            <div>
                <h1>Oops, we done goofed up</h1>
                <button type="button" onClick={() => this.setState({ hasError: false })}>
                Try again?
                </button>
            </div>
            );
        }
        return this.props.children;
    }  
}

export default ErrorBoundary; 