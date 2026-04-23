const BASE_URL = "http://localhost:8080/api/items";

export const itemService = {
    
    // Get all items
    async getAll() {
        try {
            const response = await fetch(BASE_URL);

            if (!response.ok) {
                throw new Error("Failed to fetch items");
            }

            return await response.json();

        } catch (error) {
            console.error("Error fetching all items:", error);
            throw error;
        }
    },

    // Get one item by id
    async getById(id) {
        try {
            const response = await fetch(`${BASE_URL}/${id}`);

            if (!response.ok) {
                throw new Error(`Failed to fetch item with id ${id}`);
            }

            return await response.json();

        } catch (error) {
            console.error("Error fetching item:", error);
            throw error;
        }
    },

    // Create new item
    async create(item) {
        try {
            const response = await fetch(BASE_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(item)
            });

            if (!response.ok) {
                throw new Error("Failed to create item");
            }

            return await response.json();

        } catch (error) {
            console.error("Error creating item:", error);
            throw error;
        }
    },

    // Update item
    async update(id, item) {
        try {
            const response = await fetch(`${BASE_URL}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(item)
            });

            if (!response.ok) {
                throw new Error(`Failed to update item with id ${id}`);
            }

            return await response.json();

        } catch (error) {
            console.error("Error updating item:", error);
            throw error;
        }
    },

    // Delete item
    async delete(id) {
        try {
            const response = await fetch(`${BASE_URL}/${id}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error(`Failed to delete item with id ${id}`);
            }

            return true;

        } catch (error) {
            console.error("Error deleting item:", error);
            throw error;
        }
    }
};