const image_hosting_url =
  "https://api.imgbb.com/1/upload?key=e06652b0d23b3f21d37ff54bc9f4ff7c";

export const UploadImageToImageBB = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(image_hosting_url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Image upload failed with status ${response.status}`);
    }

    const responseData = await response.json();
    const profileImage = responseData?.data?.display_url;

    return profileImage;
  } catch (error) {
    console.error("Error occurred during image upload:", error);
    throw new Error("Image upload failed");
  }
};
