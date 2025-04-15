
type LoginResponse = {
    success: boolean;
    token?: string;
    error?: string;
  };
  
  export const fakeLoginApi = async (data: { npk: string; password: string }): Promise<LoginResponse> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (data.npk === '123456' && data.password === 'password') {
          resolve({ 
            success: true,
            token: 'fake-jwt-token'
          });
        } else {
          reject({ 
            success: false,
            error: 'NPK/Kata Sandi tidak sesuai' 
          });
        }
      }, 1000);
    });
  };