export default class Call {

    constructor(url){
        this.url = url;
    }

    get(successCallback, errorCallback) {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', this.url, true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            successCallback(response);
          } else {
            errorCallback(xhr.status);
          }
        }
      };
      xhr.send();
    }
  
    post(data, successCallback, errorCallback) {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', this.url, true);
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            successCallback(response);
          } else {
            errorCallback(xhr.status);
          }
        }
      };
      xhr.send(JSON.stringify(data));
    }
  }