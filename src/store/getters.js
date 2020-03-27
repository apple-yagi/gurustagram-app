export default {
  getCurrentUser(state) {
    return state.currentUser;
  },

  reverseShops(state) {
    var shops = []
    for (let shop in state.postedShops) {
      shops.push(state.postedShops[shop])
    }
    return shops.reverse();
  }
}