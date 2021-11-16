import httpService from "./http.service";
const professionEndpoint = "profession/";

const professionService = {
    fetchAll: async () => {
        const { data } = await httpService.get(professionEndpoint);
        return data;
    },
    get: async (id) => {
        const { data } = await httpService.get(professionEndpoint + id);
        return data;
    },
    update: async (id, content) => {
        const { data } = await httpService.put(
            professionEndpoint + id,
            content
        );
        return data;
    },
    delete: async (id) => {
        const { data } = await httpService.delete(professionEndpoint + id);
        return data;
    },
    create: async (content) => {
        const { data } = await httpService.post(professionEndpoint, content);
        return data;
    }
};

export default professionService;
