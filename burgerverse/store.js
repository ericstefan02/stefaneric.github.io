import { createStore } from 'vuex';

const store = createStore({
  state: {
    users: [
        {email: "user@gmail.com", password: "userpass", role: "user", phone:"(381) 64218991", address:"Capital Street 12", name:"Mark", lastname:"Edwards", id:"1"},
        {email: "admin@gmail.com", password: "adminpass", role: "admin", phone:"(555) 12331213", address:"Capital Street 11", name:"Frank", lastname:"Edwards", id:"2"}
    ],
    currentUser:null
  },  
  mutations: {
    setUser(state, user){
      state.currentUser = user;
    },
    removeUser(state){
      state.currentUser = null;
    },
    addNewUser(state, newUser){
      state.users.push(newUser)
    }
  },
  actions:{
    getUserFromLS({commit}){
      const userLS = localStorage.getItem('user');
      if(userLS){
        const user = JSON.parse(userLS);
        commit('setUser', user);
      }
    }
  }
});

export default store;
