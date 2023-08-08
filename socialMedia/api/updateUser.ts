const API_URL = 'http://192.168.0.153:3000/user/'

import { saveUser } from "../auth/useAuth";

export const updateUser = async ({username, email, imgURL, id}: {username: string; email: string; imgURL: string; id: string;}) => {
    try {
        const response = await fetch(`${API_URL}${id}/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                email: email,
                imgURL: imgURL
            })
        })

        if (response.status === 200) {
            const data = await response.json();
            saveUser(data);
        }

        return response.status;
    } catch (e:any) {
        console.log(e);
    }
}