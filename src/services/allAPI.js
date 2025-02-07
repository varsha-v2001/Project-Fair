import serverURL from "./serverURL";
import commonAPI from "./commomAPI";


// registerAPI called by Auth Component when user clicked on register button
export const registerAPI=async (reqBody)=>{
    return await commonAPI("POST",`${serverURL}/register`,reqBody)
}

// loginAPI called by Auth Component when user clicked on login button
export const loginAPI=async (reqBody)=>{
    return await commonAPI("POST",`${serverURL}/login`,reqBody)
}

// addProjectAPI called by add Component when user clicked on ADD project button
export const addProjectAPI=async (reqBody,reqHeader)=>{
    return await commonAPI("POST",`${serverURL}/add-project`,reqBody,reqHeader)
}

// getHomeProjectAPI called by home Component when page loaded in browser
export const getHomeProjectAPI=async ()=>{
    return await commonAPI("GET",`${serverURL}/home-project`,{})
}

// getAllProjectAPI called by project Component when page loaded in browser
export const getAllProjectAPI=async (searchKey,reqHeader)=>{
    return await commonAPI("GET",`${serverURL}/all-project?search=${searchKey}`,{},reqHeader)
}

// getUserProjectAPI called by view Component when page loaded in browser
export const getUserProjectAPI=async (reqHeader)=>{
    return await commonAPI("GET",`${serverURL}/user-project`,{},reqHeader)
}

// updateProjectAPI called by edit Component when edit button is clicked (/projects/6799e72f3f0c2f552868cb43/edit)
export const updateProjectAPI=async (id,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${serverURL}/projects/${id}/edit`,reqBody,reqHeader)
}

// userProjectRemoveAPI called by view Component when delete button is clicked (/projects/6799e72f3f0c2f552868cb43/remove)
export const userProjectRemoveAPI=async (id,reqHeader)=>{
    return await commonAPI("DELETE",`${serverURL}/projects/${id}/remove`,{},reqHeader)
}

// updateUserAPI called by profile Component when update button is clicked (/edit-user)
export const updateUserAPI=async (reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${serverURL}/edit-user`,reqBody,reqHeader)
}

