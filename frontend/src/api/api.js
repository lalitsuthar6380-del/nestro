import { client } from "@/utils/helper";

export const fetchProducts = async ({
  category,
  room,
  stock,
  min_price,
  max_price,
  page,
} = {}) => {
  try {
    const params = new URLSearchParams();

    if (category != null) params.append("category", category);
    if (room != null) params.append("room", room);
    if (stock != null) params.append("stock", stock);

    if (min_price != null && max_price != null) {
      params.append("min_price", min_price);
      params.append("max_price", max_price);
    }

    if (page != null) params.append("page", page - 1);

    const response = await client.get(`product?${params.toString()}`);

    return response.data;
  } catch (error) {
    return {
      success: false,
      data: [],
      message:
        error?.response?.data?.message || "Internal Server Error",
    };
  }
};

export const fetchProductsById = async (id) => {
  try {
    const response = await client.get(`/product/${id}`);

    return response.data;
  } catch (error) {
    return {
      success: false,
      data: null,
      message:
        error?.response?.data?.message || "Internal Server Error",
    };
  }
};

export const fetchCategory = async () => {
  try {
    const response = await client.get("/category");

    console.log("Category Response:", response.data);

    return {
      success: response.data.success,
      data: response.data.data || [],
      message: response.data.message,
    };
  } catch (error) {
    console.log(
      "Fetch Category Error:",
      error.response?.data || error.message
    );

    return {
      success: false,
      data: [],
      message:
        error?.response?.data?.message || "Internal Server Error",
    };
  }
};

export const fetchCategoryById = async (id) => {
  try {
    const response = await client.get(`/category/${id}`);

    console.log("Response:", response.data);

    return {
      success: response.data.success,
      data: response.data.data ?? null,
      message: response.data.message,
    };
  } catch (error) {
    console.log(error.response?.data || error.message);

    return {
      success: false,
      data: null,
      message:
        error?.response?.data?.message || "Internal Server Error",
    };
  }
};

export const fetchRooms = async () => {
  try {
    const response = await client.get("/room-type");

    console.log("Category Response:", response.data);

    return {
      success: response.data.success,
      data: response.data.data || [],
      message: response.data.message,
    };
  } catch (error) {
    console.log(
      "Fetch Category Error:",
      error.response?.data || error.message
    );

    return {
      success: false,
      data: [],
      message:
        error?.response?.data?.message || "Internal Server Error",
    };
  }
};

export const fetchRoomById = async (id) => {
  try {
    const response = await client.get(`/room-type/${id}`);

    console.log("Response:", response.data);

    return {
      success: response.data.success,
      data: response.data.data ?? null,
      message: response.data.message,
    };
  } catch (error) {
    console.log(error.response?.data || error.message);

    return {
      success: false,
      data: null,
      message:
        error?.response?.data?.message || "Internal Server Error",
    };
  }
};

export const getMe = async () => {
  try {
    const response = await client.get("/user/get-me", {
      withCredentials: true,
    });

    console.log("Get Me Response:", response.data);

    return response.data;
  } catch (error) {
    console.log(
      "getMe Error:",
      error?.response?.data || error?.message
    );

    return {
      success: false,
      data: null,
      user: null,
      message:
        error?.response?.data?.message || "Internal Server Error",
    };
  }
};

export const fetchProductBySlug = async (slug) => {
  try {
    const response = await client.get(`/product/slug/${slug}`);

    return response.data;
  } catch (error) {
    return {
      success: false,
      data: null,
      message:
        error?.response?.data?.message || "Internal Server Error",
    };
  }
};