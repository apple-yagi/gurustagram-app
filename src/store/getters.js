export default {
  currentUser(state) {
    return state.currentUser
  },

  reverseShops(state) {
    var Shops = []
    for (let Shop in state.postedShops) {
      Shops.push(state.postedShops[Shop])
    }
    return Shops.reverse();
  }
}