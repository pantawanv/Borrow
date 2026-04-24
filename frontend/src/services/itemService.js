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
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
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

  // Create pickup day relation
  async createPickupDay(data) {
    try {
      const response = await fetch(
        "http://localhost:8080/api/itemPickupDays",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create pickup day");
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating pickup day:", error);
      throw error;
    }
  },

  // Create pickup time relation
  async createPickupTime(data) {
    try {
      const response = await fetch(
        "http://localhost:8080/api/itemPickupTimes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create pickup time");
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating pickup time:", error);
      throw error;
    }
  },

  // Update item
  async update(id, item) {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
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
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete item with id ${id}`);
      }

      return true;
    } catch (error) {
      console.error("Error deleting item:", error);
      throw error;
    }
  },

  // Get pickup days for one item
  async getPickupDays(itemId) {
    try {
      const response = await fetch(`${BASE_URL}/${itemId}/pickupDays`);

      if (!response.ok) {
        throw new Error("Failed to fetch pickup days");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching pickup days:", error);
      throw error;
    }
  },

  // Get pickup times for one item
  async getPickupTimes(itemId) {
    try {
      const response = await fetch(`${BASE_URL}/${itemId}/pickupTimes`);

      if (!response.ok) {
        throw new Error("Failed to fetch pickup times");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching pickup times:", error);
      throw error;
    }
  },

  // Delete pickup day and time 
 async deletePickupDays(itemId) {
  const response = await fetch(
    `${BASE_URL}/${itemId}/pickupDays`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete pickup days");
  }
},

async deletePickupTimes(itemId) {
  const response = await fetch(
    `${BASE_URL}/${itemId}/pickupTimes`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete pickup times");
  }
},
  
};