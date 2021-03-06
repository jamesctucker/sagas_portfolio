import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_PROJECTS', fetchProjects);
    yield takeEvery('ADD_PROJECT', addProject);
    yield takeEvery('GET_TAGS', getTags)
    yield takeEvery('DELETE_PROJECT', deleteProject);
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// this saga retrieves projects from the server
function* fetchProjects() {
    try {
        const projectResponse = yield axios.get(`/portfolio`);
        const nextAction = { type: 'SET_PROJECTS', payload: projectResponse.data };
        yield put(nextAction);
    } catch (error) {
        console.log('error in fetchProjects', error);
        alert('something went wrong');
    }
}

function* addProject(action) {
    try {
        yield axios.post('/text-fields', action.payload);
        const nextAction = { type: 'FETCH_PROJECTS' };
        yield put(nextAction);
    }
    catch (error) {
        yield console.log('error in addProject saga', error);
    }
}

function* getTags(action) {
    try {
        const response = yield axios.get('/');
        const nextAction = { type: 'SET_TAGS', payload: response.data };
        yield put(nextAction);
    } catch (error) {
        console.log('Error with gettings tags saga.');
    }
}

function* deleteProject(action) {
    try {
        yield axios.delete(`/delete/${action.payload.id}`);
        const nextAction = { type: 'FETCH_PROJECTS' };
        yield put(nextAction);
    } catch (error) {
        console.log(`Problem with deleting project saga: ${error}`);
    }
}

// Used to store projects returned from the server
const projects = (state = [], action) => {
    switch (action.type) {
        case 'SET_PROJECTS':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the project tags (e.g. 'React', 'jQuery', 'Angular', 'Node.js')
const tags = (state = [], action) => {
    switch (action.type) {
        case 'SET_TAGS':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        projects,
        tags,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>,
    document.getElementById('root'));
registerServiceWorker();
