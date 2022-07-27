 export const constructAPIUrl = (resource: String) => {
    let id = '346uq6ixqf';
    return `https://${id}.execute-api.ap-southeast-2.amazonaws.com/dev/${resource}`;
  };

  export const isAuthenticated = () => {
    if (typeof window !== "undefined") {
      let status = localStorage.getItem('status');
      return ('authenticated' === status);
    }
    return false;
  }