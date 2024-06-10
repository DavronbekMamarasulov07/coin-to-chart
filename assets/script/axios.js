const instance = axios.create({ 
    baseURL: "https://api.coincap.io/v2/assets",
    timeout: 10000, //malumot 10 sekund ichida kelmasa back and dan "error" beradi 
    headers:{
        "Content-Type" : "application/json"
    }
})
export default instance

