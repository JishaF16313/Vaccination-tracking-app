//for common application function
export const isAuthenticated = () =>{
    const user = localStorage.getItem("user")
    return  JSON.parse(user);
}

export const removeObjectFromArray = (arr, attr, value) => {
    var i = arr.length;
    while(i--){
       if( arr[i] && arr[i].hasOwnProperty(attr) && arr[i][attr] === value ){ 
           arr.splice(i,1);
       }
    }
    return arr;
}

export const parseJwt = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

export const dateNow = () => {
    let now = new Date();
    let year = now.getFullYear();
    let month = ("0" + (now.getMonth() + 1)).slice(-2);
    let date = ("0" + now.getDate()).slice(-2);
    now = `${date}-${month}-${year}`;
    return now;
}

export const getHeaders = (token) => {
    const headers = {
       'Content-Type': 'application/json',
       'X-Token-ID': token
    }
    return headers;
 }

export const triggerDownloadFromData = (blob, filename) =>{
    const url = window.URL.createObjectURL(
        new Blob([blob]),
      );
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        filename,
      );
  
      // Append to html link element page
      document.body.appendChild(link);
  
      // Start download
      link.click();
  
      // Clean up and remove the link
      link.parentNode.removeChild(link);
    }



 