import { ReactNode, createContext } from 'react'
import { GlobalStore } from './global'

class RootStore {
  global: GlobalStore
  constructor() {
    this.global = new GlobalStore()
  }
}

const useStore = () => new RootStore()

export const StoreContext = createContext<RootStore>(useStore())

export const StoreProvider = (
  { children }: { children: ReactNode }
) => <StoreContext.Provider value={useStore()}>
  {children}
</StoreContext.Provider>
