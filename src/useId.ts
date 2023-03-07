import { useMemo } from "react";

let last: number

export const useId = () => useMemo(() => {
  const time = Date.now()
  last ??= time
  last = time > last ? time : last + 1;
  return last.toString(36)
}, [])