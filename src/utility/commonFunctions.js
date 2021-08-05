//for common application function
export const isAuthenticated = () =>{
    const user = localStorage.getItem("user")
    return user;
}
