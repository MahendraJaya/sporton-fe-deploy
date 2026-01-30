import { fetchApi, getAuthHeaders } from "../lib/api";
import { Category } from "../types";

export const getAllCategories = async (): Promise<Category[]> => {
  const res = await fetchApi<Category[]>("/categories");
  // console.log("🚀 ~ getAllCategories ~ res:", res);
  return res;
};

export const createCategory = async (data: FormData): Promise<Category> => {
  const res = await fetchApi<Category>("/categories", {
    method: "POST",
    body: data,
    headers: { ...getAuthHeaders() },
  });
  return res;
};

export const updateCategory = async (
  id: string,
  data: FormData,
): Promise<Category> => {
  const res = await fetchApi<Category>(`/categories/${id}`, {
    method: "PUT",
    body: data,
    headers: { ...getAuthHeaders() },
  });
  return res;
};

export const deleteCategory = async (id: string): Promise<void> => {
  await fetchApi<void>(`/categories/${id}`, {
    method: "DELETE",
    headers: { ...getAuthHeaders() },
  });
};
