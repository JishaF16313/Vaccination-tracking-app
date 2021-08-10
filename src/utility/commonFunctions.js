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