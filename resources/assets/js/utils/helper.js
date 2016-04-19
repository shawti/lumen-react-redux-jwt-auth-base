import React from 'react';
import ReactDOM from 'react-dom';

export function formatUrl(path) {
    const adjustedPath = path[0] !== '/' ? '/' + path : path;

    // Prepend `/api` to relative URL, to proxy to API server.
    return '/api' + adjustedPath;
}


export function checkHttpStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
    }
}

export function parseJSON(response) {
    return response.json()
}
