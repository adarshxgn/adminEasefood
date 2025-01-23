import { BASE_URL } from "./baseUrl"
import { commonApi } from "./commonApi"

//register API
export const signUpApi = async (payload) => {
    return await commonApi("POST", `${BASE_URL}/api/signup/`, payload, "")
    
}

//signin Api
export const signInApi = async (sellerLogin) => {
    return await commonApi("POST", `${BASE_URL}/api/signin/`, sellerLogin, "")
    
}

//API For Add Category
export const addFoodCategoryApi = async (addCategory,reqHeader) => {
  return await commonApi("POST", `${BASE_URL}/api/foodcat/`, addCategory, reqHeader)
  
}
//API For View Category
export const getFoodCategoryApi = async (getCategory,reqHeader) => {
  return await commonApi("GET", `${BASE_URL}/api/foodcat/`, getCategory, reqHeader)
  
}
//API For Add Food
export const addFoodListApi = async (addDish,reqHeader) => {
  return await commonApi("POST", `${BASE_URL}/api/food/`, addDish, reqHeader)
  
}
//API For View Food 
export const getFoodListApi = async (getDish,reqHeader) => {
  return await commonApi("GET", `${BASE_URL}/api/food/`, getDish, reqHeader)
  
}






export const refreshAccessToken = async (refreshToken) => {
    const payload = { refresh_token: refreshToken };
  
    try {
      const response = await commonApi("POST", `${BASE_URL}/api/token/refresh`, payload);
      return response; // Return the response to be used in ProtectedRoute
    } catch (error) {
      return error; // Return the error if any
    }
  };

