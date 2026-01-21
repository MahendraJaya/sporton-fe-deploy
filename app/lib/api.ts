export async function fetchApi<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
        ...options,
        cache: options?.cache || "no-store" //no-store artinya data lebih cepat tidak caching,
    })

    if(!res.ok){
        let errorMessage = `Failed to fetch data from ${endpoint} > `;
        try {
            const errorData = await res.json();
            errorMessage += errorData.message || errorData.error || errorMessage;
        } catch (error) {
            console.log("🚀 ~ fetchApi ~ error:", error)
        }
        throw new Error(errorMessage);
    }

    return res.json();
}

export function getImageUrl(path: string){
    if(path.startsWith("http")){
        return path;
    }
    return `${process.env.NEXT_PUBLIC_API_ROOT}/${path}`
} 