import axiosClient from "./axiosClient";

const fetchUsersData = page => {
    return axiosClient.get(`/api/users?page=${page}`);
};

const createNewUser = (name, job) => {
    return axiosClient.post("/api/users", { name, job });
};

const updateUser = (name, job) => {
    return axiosClient.put("/api/users/2", { name, job });
};

const deleteUser = id => {
    return axiosClient.delete(`/api/users/${id}`);
};
export { fetchUsersData, createNewUser, updateUser, deleteUser };
