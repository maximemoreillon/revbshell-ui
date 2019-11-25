import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    clients: []
  },
  mutations: {
    request(state, client){

      let found_client = state.clients.find(element => element.username === client.username);
      if(!found_client){

        // initialize history array
        client.history = [];

        // add client to list
        state.clients.push(client)
      }
      else {

        found_client.last_seen = client.last_seen

      }

    },
    response(state, client){
      let found_client = state.clients.find(element => element.username === client.username);

      if(found_client) {
        found_client.history[found_client.history.length-1].response = client.response;
      }

    }
  },
  actions: {
  },
  modules: {
  }
})
