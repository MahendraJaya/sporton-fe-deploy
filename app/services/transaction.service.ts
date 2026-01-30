import { fetchApi, getAuthHeaders } from "../lib/api";
import { Transaction } from "../types";

export const transactionCheckout = async (
  form: FormData,
): Promise<Transaction> => {
  return await fetchApi<Transaction>("/transactions/checkout", {
    method: "POST",
    body: form,
  });
};

export const getTransactionById = async (id: string): Promise<Transaction> => {
    const a = await fetchApi<Transaction>(`/transactions/${id}`);
    console.log(a)
  return a;
};

export const getTransactions = async():Promise<Transaction[]> =>{
  return await fetchApi<Transaction[]>("/transactions", {
    headers : { ...getAuthHeaders() },
  });
}

export const updateTransaction = async (
  id: string,
  data: FormData,
): Promise<Transaction> => {
  return await fetchApi<Transaction>(`/transactions/${id}`, {
    method: "PUT",
    headers: {
      ...getAuthHeaders(),
    },
    body: data,
  });
};