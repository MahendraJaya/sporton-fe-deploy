import { fetchApi, getAuthHeaders } from "../lib/api";
import { Bank } from "../types";

export const getBanks = async (): Promise<Bank[]> => {
  const data = fetchApi<Bank[]>("/banks");
  return data;
};

export const createBank = async (data: FormData): Promise<Bank> => {
  return await fetchApi<Bank>("/banks", {
    method: "POST",
    headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify({
      bankName: data.get("bankName"),
      accountName: data.get("accountName"),
      accountNumber: data.get("accountNumber"),
    }),
  });
};

export const updateBank = async (id: string, data: FormData): Promise<Bank> => {
  return await fetchApi<Bank>(`/banks/${id}`, {
    method: "PUT",
    headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify({
      bankName: data.get("bankName"),
      accountName: data.get("accountName"),
      accountNumber: data.get("accountNumber"),
    }),
  });
};

export const deleteBank = async (id: string): Promise<void> => {
  await fetchApi<void>(`/banks/${id}`, {
    method: "DELETE",
    headers: { ...getAuthHeaders() },
  });
};
