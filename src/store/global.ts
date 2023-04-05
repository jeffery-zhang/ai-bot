import { makeAutoObservable } from 'mobx'
import type { ConversationDataType, MessageDataType } from '@/types'

export class GlobalStore {
  constructor() {
    makeAutoObservable(this)
  }

  private _currConv: ConversationDataType['id'] = ''
  private _responding: boolean = false
  
  get currConv() {
    return this._currConv
  }
  set currConv(id: ConversationDataType['id']) {
    this._currConv = id
  }

  get responding() {
    return this._responding
  }
  set responding(responding: boolean) {
    this._responding = responding
  }
}
