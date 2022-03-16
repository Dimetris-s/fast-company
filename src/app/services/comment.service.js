import httpService from "./http.service";

const commentEndpoint = "comment/";

const commentService = {
    get: async (pageId) => {
        const { data } = await httpService.get(commentEndpoint, {
            params: {
                orderBy: '"pageId"',
                equalTo: `"${pageId}"`
            }
        });
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.put(
            commentEndpoint + payload._id,
            payload
        );
        return data;
    },
    delete: async (id) => {
        const { data } = await httpService.delete(commentEndpoint + id);
        return data;
    }
};

export default commentService;
