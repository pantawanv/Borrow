const BASE_URL = "http://localhost:8080/api/users";

export const userService = {
    async create (userData) {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error("Failed to create user");
        }

        return await response.json();

    },

    async getByFirebaseUid(firebaseUid) {
        const response = await fetch(`${BASE_URL}/firebase/${firebaseUid}`);

        if (!response.ok) {
            throw new Error("Failed to fetch user by Firebase UID");
        }

        return await response.json();
    }
};