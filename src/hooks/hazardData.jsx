const data = {
  current: null,
}

export default function useHazardData() {
  // return setter function and data
  const setData = (newData) => {
    data.current = newData
  }

  return [data.current, setData]
}
