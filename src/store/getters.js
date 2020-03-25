export default {
  reverseShops(state) {
    var Shops = []
    for (let Shop in state.postedShops) {
      Shops.push(state.postedShops[Shop])
    }
    return Shops.reverse();
  },

  getCurrentUser(state) {
    return state.currentUser;
  }
}