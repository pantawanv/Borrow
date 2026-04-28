const BASE_URL = "http://localhost:8080/api/images";

export const imageService = {
  async create(image) {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(image)
    });

    if (!response.ok) {
      throw new Error("Failed to save image");
    }

    return await response.json();
  }
};