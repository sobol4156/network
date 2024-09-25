
import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  state: () => ({
    isAuthorization: false,
    user: {},
    currentRoom: null as null | number,
  }),
  actions: {
    changeAuthorization(value: boolean) {
      this.isAuthorization = value
    },
    changeUser(value: object) {
      this.user = value
    },
    changeCurrentRoom(value: number) {
      this.currentRoom = value
    }
  }
})
