import React, { useReducer, useEffect } from 'react';
import axios from 'axios';

const initialState = {
  jobs: [],
  loading: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'MAKE_REQUEST':
      return {
        ...state, jobs: [], loading: true
      }
      break;
    case 'GET_DATA':
      return {
        ...state, jobs: action.payload.fetchedJobs, loading: false
      }
      break;
    case 'ERROR':
      return {
        ...state, jobs: [], loading: false, error: action.payload.error
      }
      break;
    default:
      return state;
      break;
  }
}

const useFetchJobs = (params, page) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    dispatch({ type: 'MAKE_REQUEST' });
    axios
      .get('https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json', {
        markdown: true,
        page,
        ...params
      })
      .then(res => {
        dispatch({ type: 'GET_DATA', payload: { fetchedJobs: res.data } })
      })
      .catch(err => {
        if (axios.isCancel(err)) return;
        dispatch({ type: 'ERROR', payload: { error: err } })
      })
      
      return () => {
        cancelToken.cancel;
      }
  }, [params, page])
  
  return state;
}

export default useFetchJobs;