import axios from "axios";
import { LoginUser } from "../interfaces/loginuser";

export const api = import.meta.env.MODE == "development" ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL_PROD

export const Api = axios.create({
    baseURL: api
})


export const loginReq = (formData: LoginUser) => Api.post("/users/login", formData);
export const registerReq = (formData) => Api.post("/users/", formData);
export const editAvatar = (formData) => Api.patch("/users/avatar", formData);
export const editUser = (formData) => Api.patch("/users/profile", formData);
export const deleteUser = (userId) => Api.delete(`/users/${userId}`);
export const changePass = (formData) => Api.patch("/users/password", formData);
export const getUser = (userId) => Api.get(`/users/profile/${userId}`);
export const createPalce = (userId, formData) => Api.post(`/places/${userId}`, formData);
export const getPlaces = () => Api.get("/places/");
export const getPlacesById = () => Api.get(`/places`);
export const deletePlace = (placeId) => Api.delete(`/places/delete/${placeId}`);
export const getPlace = (placeId) => Api.get(`/places/${placeId}`);
export const editPlace = (placeId, formData) => Api.put(`/places/edit/${placeId}`, formData);
export const sendStars = (star, placeId) => Api.post(`/places/review/${star}/${placeId}`);
export const getComments = (placeId) => Api.get(`/comments/${placeId}`);
export const createComment = (formData, placeId) => Api.post(`/comments/${placeId}`, formData);
export const toggleLikeComment = (formData, commentId) => Api.post(`/comments/toggle/${commentId}`, formData)

export const getTags = () => Api.get(`/posts/tags`);
export const getAllPlaces = (page: number, limit: number, order: string) => Api.get(`/posts/all?page=${page}&limit=${limit}&order=${order}`)
export const getAllPlacesByUser = (page: number, limit: number, userId: string) => Api.get(`/places/user/${userId}?page=${page}&limit=${limit}`)

export const checkTemp = (temp) => Api.get(`/users/check/${temp}`)
export const checkCode = (formData) => Api.post(`/users/check/code`, formData)
export const resend = (formData) => Api.post(`/users/resend`, formData)
export const redefine = (formData, userId) => Api.patch(`/users/redefine/${userId}`, formData)
export const resendEmail = (userId) => Api.post(`/users/resendEmail/${userId}`)