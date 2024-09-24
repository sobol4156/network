
import { defineStore } from 'pinia'

type User = {
  name: string,
  id: number,
  email:string
}

export const useStore = defineStore('store', {
  state: () => ({
    isAuthorization: false,
    user: {}
  }),
  actions: {
    changeAuthorization(value: boolean) {
      this.isAuthorization = value
    },
    changeUser(value: object) {
      this.user = value
    }
  }
})
