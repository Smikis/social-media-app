import { uploadImage } from "../utils/uploadImage";

const API_URL = 'http://192.168.0.153:3000/posts';

export const addNewPost = async (user: any, post: any) => {
    const imageURI = post.imageURI;

    const url = await uploadImage(imageURI);

    try {
      const response = await fetch(`${API_URL}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          imageURL: url,
          description: post.description,
        }),
      })

      return response.status;

    } catch (e:any) {
      console.log(e);
    }
}