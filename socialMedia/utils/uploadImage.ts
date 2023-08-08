import storage from '@react-native-firebase/storage';

const generateImageID = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

export const uploadImage = async (uri: string) => {
    const imageID = generateImageID();

    const reference = storage().ref(imageID);

    await reference.putFile(uri);

    return await storage().ref(imageID).getDownloadURL();
}