const API_URL = 'http://192.168.0.153:3000/posts/'

export const getPostsByUser = async (userId: string) => {
    try {
        const response = await fetch(`${API_URL}/get/${userId}`);
        const {posts} = await response.json();
        return posts;
    } catch (e:any) {
        console.log(e);
    }
};
