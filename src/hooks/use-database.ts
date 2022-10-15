import React, { useDebugValue, useEffect, useState } from "react"

const useDatabase = <S>(
  key: string,
  initialState?: S | (() => S),
): [S, React.Dispatch<React.SetStateAction<S>>] => {
  throw "TODO"
  //   const [state, setState] = useState<S>(initialState as S)
  //   useDebugValue(state)

  //   useEffect(() => {
  //     const item = localStorage.getItem(key)
  //     if (item) setState(parse(item))
  //   }, [key])

  //   useEffect(() => {
  //     if (state !== initialState) {
  //       localStorage.setItem(key, JSON.stringify(state))
  //     }
  //   }, [initialState, key, state])

  //   return [state, setState]
  // }

  // const parse = (value: string) => {
  //   try {
  //     return JSON.parse(value)
  //   } catch {
  //     return value
  //   }
}

export default useDatabase
