
import { defineStore } from 'pinia'

type User = {
  name: string,
  id: number,
  
}

export const useStore = defineStore('store', {
  state: () => ({
    isAuthorization: false,
    user: {},
    currentRoom: null as null | number,
    users: [],
    currentChatUser: {},
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
    },
    changeUsers(value: []) {
      this.users = value
    },
    changeCurrentChatUser(value: object) {
      this.currentChatUser = value
    }
  }
})
