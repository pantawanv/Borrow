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
};