const useCheckAuthenticated = () => {
    const isAuthenticated = localStorage.getItem('token') ? true : false;
    return [isAuthenticated, true];
}

export default useCheckAuthenticated;