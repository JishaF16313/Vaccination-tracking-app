//for common application function
export const isAuthenticated = () =>{
    const user = localStorage.getItem("user")
    return user;
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
