const resolveFetch = response => {
  if (response.status === 204) {
    return Promise.resolve.bind(Promise)
  }
  
  const json = response.json()
  if (response.status >= 200 && response.status < 300) {
    return json
  }
  return json.then(Promise.reject.bind(Promise))
}

export default resolveFetch
