export const RequestPost = async (url: string, method: string, body: FormData = null) => {
  const token = localStorage.getItem('apiKey');
  try {
    const response = await fetch(url, {
      body: body,
      method: method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'accept': 'application/json',
      }
    })
    if (response.status === 401) {
      window.location.href = '/';
    }
    if (response.status === 422) {
      const data = await response.json();
      return data;
    }
    if (response.status === 500) {
      alert('Ups tenemos un error');
      return
    }
    const data = await response.json();
    return data;
  } catch (error) {
    //console.log("🚀 ~ file: validationRequest.ts:16 ~ RequestPost ~ error:", error)
    alert('Ups tenemos un error');
  }
}

export const RequestGet = async (url: string, method: string, body: FormData = null) => {
  const token = localStorage.getItem('apiKey');
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'accept': 'application/json',
      }
    });
    if (response.status === 401) {
      window.location.href = '/';
    }
    const data = await response.json();
    return data;
  } catch (error) {
    //console.log("🚀 ~ file: validationRequest.ts:36 ~ RequestGet ~ error:", error)
    alert('Ups tenemos un error');
  }
}

export const RequestPut = async (url: string, method: string, params: URLSearchParams) => {
  const token = localStorage.getItem('apiKey');
  try {
    const response = await fetch(url, {
      method: method,
      body: params,
      headers: {
        'Authorization': `Bearer ${token}`,
        'accept': 'application/json',
      }
    });
    if (response.status === 401) {
      window.location.href = '/';
    }
    const data = await response.json();
    return data;
  } catch (error) {
    //console.log("🚀 ~ file: validationRequest.ts:56 ~ RequestPut ~ error:", error)
    alert('Ups tenemos un error');
  }
}

export const RequestDelete = async (url: string, method: string) => {
  const token = localStorage.getItem('apiKey');
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'accept': 'application/json',
      }
    });
    if (response.status === 401) {
      window.location.href = '/';
    }
    const data = await response.json();
    return data;
  } catch (error) {
    //console.log("🚀 ~ file: validationRequest.ts:76 ~ RequestDelete ~ error:", error)
    alert('Ups tenemos un error');
  }
}
