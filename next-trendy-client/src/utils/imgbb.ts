import axios from "axios";

export const uploadImage = async (file: File) => {
  console.log(file);
  const formData = new FormData();
  formData.append("image", file);
  formData.append("key", "f47b06ded9a9fd2f717d38bc82f919fc");
  //   formData.append("key", "3e9f838fb2f36cc4b02367785db37014");
  const imageResponse = await axios.post(
    "https://api.imgbb.com/1/upload",
    formData
  );
  return imageResponse.data.data.url;
};
