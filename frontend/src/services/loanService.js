const BASE_URL = "http://localhost:8080/api/loans";

export const loanService = {

    async create(loan) {
        try {
            const response = await fetch(BASE_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loan)
            });

            if (!response.ok) {
                throw new Error("Failed to create loan");
            }
            return await response.json();

        } catch (error) {
            console.error("Error creating loan:", error);
            throw error;
        } 
    },

    async getAll() {
        try {
            const response = await fetch(BASE_URL);

            if (!response.ok) {
                throw new Error("Failed to fetch loans");
            }

            return await response.json();
        } catch (error) {
            console.error("Error fetching loans:", error);
            throw error;
        }
    },

    async update(id, loan) {
        try {
            const response = await fetch(`${BASE_URL}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loan)
            });

            if (!response.ok) {
                throw new Error("Failed to update loan");
            }

            return await response.json();

        } catch (error) {
            console.error("Error updating loan:", error);
            throw error;
        }
    },
};