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
    axios.all([
        axios.get('https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json', {
          params: {
            markdown: false,
            page,
            ...params
          }
        }),
        axios.get('https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json', {
          params: {
            markdown: false,
            page: page + 1,
            ...params
          }
        })
      ])
      .then(axios.spread((res, nextRes, nextnextRes) => {
        dispatch({ type: 'GET_DATA', payload: { fetchedJobs: res.data } });
        dispatch({ type: 'CHECK_NEXT_PAGE', payload: { hasNextPage: nextRes.data.length !== 0 } });
      }))
      .catch(err => {
        dispatch({ type: 'ERROR', payload: { error: err[0] } })
      })
  }, [params, page])

  return state;
}

export default useFetchJobs;