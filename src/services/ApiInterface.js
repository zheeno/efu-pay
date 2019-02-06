export const BaseUrl = "http://192.168.1.3/api/";

export const barcodeTypes = [
  "QR_CODE",
  "DATA_MATRIX",
  "UPC_A",
  "UPC_E",
  "EAN_8",
  "EAN_13",
  "RSS_14",
  "CODE_39",
  "CODE_93",
  "CODE_128",
  "ITF",
  "RSS_EXPANDED",
  "QR_CODE",
  "DATA_MATRIX",
  "PDF_417"
];

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
