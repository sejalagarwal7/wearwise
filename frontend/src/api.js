const BASE_URL = import.meta.env.VITE_API_URL;

const getHeaders = () => {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

const handleResponse = async (res) => {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || "An error occurred");
  }
  return data;
};

export const api = {
  // Auth
  register: async (name, email, password) => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ name, email, password }),
    });
    return handleResponse(res);
  },

  login: async (email, password) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(res);
  },

  // Dashboard
  getStats: async () => {
    const res = await fetch(`${BASE_URL}/dashboard/stats`, {
      method: "GET",
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  // Wardrobe
  getWardrobe: async () => {
    const res = await fetch(`${BASE_URL}/wardrobe`, {
      method: "GET",
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  addWardrobeItem: async (itemData) => {
    const res = await fetch(`${BASE_URL}/wardrobe`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(itemData),
    });
    return handleResponse(res);
  },

  updateWardrobeItem: async (id, itemData) => {
    const res = await fetch(`${BASE_URL}/wardrobe/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(itemData),
    });
    return handleResponse(res);
  },

  deleteWardrobeItem: async (id) => {
    const res = await fetch(`${BASE_URL}/wardrobe/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  // Outfits
  getOutfits: async () => {
    const res = await fetch(`${BASE_URL}/outfits`, {
      method: "GET",
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  saveOutfit: async (name, items) => {
    const res = await fetch(`${BASE_URL}/outfits`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ name, items }),
    });
    return handleResponse(res);
  },

  deleteOutfit: async (id) => {
    const res = await fetch(`${BASE_URL}/outfits/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  // Profile
  getProfile: async () => {
    const res = await fetch(`${BASE_URL}/profile`, {
      method: "GET",
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  updateProfile: async (profileData) => {
    const res = await fetch(`${BASE_URL}/profile`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(profileData),
    });
    return handleResponse(res);
  },
};
