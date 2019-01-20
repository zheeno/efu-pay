const BaseUrl = "http://192.168.43.183/api/";

export function GetData(hash) {
  
    return new Promise((resolve, reject) => {
      fetch(BaseUrl + hash, {
        method: "GET"
      })
        .then(response => response.json())
        .then(responseJSON => {
          // return responseJSON.data;
          resolve(responseJSON);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  
  export function PostData(hash, data) {
  
    return new Promise((resolve, reject) => {
      fetch(BaseUrl + hash, {
        method: "POST",
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(responseJSON => {
          // return responseJSON.data;
          resolve(responseJSON);
        })
        .catch(error => {
          // console.log(error)
          reject(error);
        });
    });
  }
  