import axiosClient from "./axiosClient";

const fetchUsersData = async page => {
    return await axiosClient.get(`/api/users?page=${page}`);
};

const createNewUser = async (name, job) => {
    return await axiosClient.post("/api/users", { name, job });
};

const updateUser = async (name, job) => {
    return await axiosClient.put("/api/users/2", { name, job });
};

const deleteUser = async id => {
    return await axiosClient.delete(`/api/users/${id}`);
};

const loginUser = async (email, password) => {
    return await axiosClient.post("/api/login", { email, password });
};

export { fetchUsersData, createNewUser, updateUser, deleteUser, loginUser };
