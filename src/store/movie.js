import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'
import { resolveComponent } from 'vue'

const _defaultMessage = 'Search for the movie title!!!'

export default {
  namespaced: true,
  state: () => ({
    movies: [],
    message: _defaultMessage,
    loading: false,
    theMovie: {}
  }),
  getters:{ },
  mutations: {
    updateState(state, payload){
      //['movies', 'message', 'loading']
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    resetMovies(state){
      state.movies = []
      state.message = _defaultMessage
      state.loading = false
    }
  },
  actions: {
    async searchMovies({state, commit }, payload){
      // const {title, type, number, year } = payload
      if (state.loading) return

      commit('updateState', {
        message:'',
        loading: true
      })

      try {
        const res = await _fetchMovie({
          ...payload,
          page: 1
        })
        // http://www.omdbapi.com/?i=tt3896198&apikey=f39cbae2
        // console.log(res)
        const { Search, totalResults } = res.data
        commit('updateState', {
          // movies: Search
          movies: _uniqBy(Search, 'imdbID')
        })
        console.log(totalResults) //310
        console.log(typeof totalResults)//string
  
        const total = parseInt(totalResults, 10)
        const pageLength = Math.ceil(total / 10)
  
        //추가 요청
        if(pageLength > 1){
          for(let page =2; page <= pageLength; page += 1){
            if(page > ( payload.number / 10)) break
            // const res = await axios.get(`https://www.omdbapi.com/?i=tt3896198&apikey=f39cbae2&s=${title}&type=${type}&y=${year}&page=${page}`)
            const res = await _fetchMovie({
              ...payload,
              page
            })
            const { Search } = res.data
            commit('updateState', {
              // movies: [...state.movies, ...Search]
              movies: [
                ...state.movies, 
                ..._uniqBy(Search, 'imdbID')]
            })
          }
        }
      } catch(message){
        commit('updateState', {
          movies: [],
          message
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    },
    async searchMovieWithId({state, commit}, payload) {
        if (state.loading) return
        commit('updateState', {
          theMovie: {},
          loading: true
        })
        try {
        const res = await _fetchMovie(payload)

         console.log(res,"ddldldl")

        commit('updateState', {
          theMovie: res.data
        })
      }catch(error){
        commit('updateState', {
          theMovie: {}
        })
        
      }finally {
        const ok = commit('updateState', {
          loading: false
        })
        console.log(ok, "okok")
      }
       
    }
  }

}

function _fetchMovie(payload){
  const { title, type, year, page, id} = payload
  const OMDB_API_KEY = 'f39cbae2'
  const url = id 
    ? `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`
    : `http://www.omdbapi.com/?apikey=f39cbae2&s=${title}&type=${type}&y=${year}&page=${page}`
    // : `https://www.omdbapi.com/?i=tt3896198&apikey=f39cbae2&s=${title}&type=${type}&y=${year}&page=${page}`
  // const url = `https://www.omdbapi.com/?i=tt3896198&apikey=f39cbae2`

  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(res => {
        if (res.data.Error){
          console.log(res, '이것은 무비.js')
          reject(res.data.Error)
        }
        resolve(res)
      })
      .catch(err => {
        reject(err.message)
      })
  })
}