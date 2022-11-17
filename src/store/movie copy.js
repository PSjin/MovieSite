export default {
  //module!
  namespaced: true,
  //data!
  state: () => ({
    movies: []
  }),
  
  // state: function(){
  //   return {
  //     movies: []
  //   }
  // },
  //computed!
  getters:{
    movieIds(state){
      return state.movies.map(m=>m.imdbID)
    }
  },
  //methods!
  //변이 이곳에서만 수정가능함
  mutations: {
    resetMovies(state){
      state.movies = []
    }
  },
  actions: {
    searchMovies(){

    }
  }

}