import httpService from "./http.service";
const usersEndpoint = "user/";

const usersService = {
    fetchAll: async () => {
        const { data } = await httpService.get(usersEndpoint);
        return data;
    },
    get: async (id) => {
        const { data } = await httpService.get(usersEndpoint + id);
        return data;
    },
    update: async (id, content) => {
        const { data } = await httpService.put(usersEndpoint + id, content);
        return data;
    },
    delete: async (id) => {
        const { data } = await httpService.delete(usersEndpoint + id);
        return data;
    },
    create: async (content) => {
        const { data } = await httpService.post(usersEndpoint, content);
        return data;
    }
};

export default usersService;
