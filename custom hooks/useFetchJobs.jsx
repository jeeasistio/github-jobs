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
    case 'CHECK_NEXT_PAGE':
      return {
        ...state, hasNextPage: action.payload.hasNextPage
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
    dispatch({ type: 'MAKE_REQUEST' });
    axios
      .get('https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json', {
        params: {
          markdown: false,
          page,
          ...params
        }
      })
      .then(res => {
        dispatch({ type: 'GET_DATA', payload: { fetchedJobs: res.data } })
      })
      .catch(err => {
        dispatch({ type: 'ERROR', payload: { error: err } })
      })
      
    axios
      .get('https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json', {
        params: {
          markdown: false,
          page: page + 1,
          ...params
        }
      })
      .then(res => {
        dispatch({ type: 'CHECK_NEXT_PAGE', payload: { hasNextPage: res.data.length !== 0 } })
      })
      .catch(err => {
        dispatch({ type: 'ERROR', payload: { error: err } })
      })
  }, [params, page])
  
  return state;
}

export default useFetchJobs;