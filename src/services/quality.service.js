import httpService from "./http.service";
const qualityEndpoint = "quality/";

const qualityService = {
    fetchAll: async () => {
        const { data } = await httpService.get(qualityEndpoint);
        return data;
    },
    get: async (id) => {
        const { data } = await httpService.get(qualityEndpoint + id);
        return data;
    },
    update: async (id, content) => {
        const { data } = await httpService.put(qualityEndpoint + id, content);
        return data;
    },
    delete: async (id) => {
        const { data } = await httpService.delete(qualityEndpoint + id);
        return data;
    },
    create: async (content) => {
        const { data } = await httpService.post(qualityEndpoint, content);
        return data;
    }
};

export default qualityService;
