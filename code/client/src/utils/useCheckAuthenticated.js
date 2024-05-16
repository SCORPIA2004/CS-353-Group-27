const useCheckAuthenticated = () => {
    const isAuthenticated = localStorage.getItem('token') ? true : false;
    const isLoading = false;
    return [isAuthenticated, true];
}

export default useCheckAuthenticated;