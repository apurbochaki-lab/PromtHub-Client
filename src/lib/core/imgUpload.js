export const imageUpload = async (image) => {
    const formData = new FormData();
    formData.append("image", image)

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API}`, {
        method: "POST",
        body: formData
    });

    const imgData = await res.json();
    return imgData.data;
}