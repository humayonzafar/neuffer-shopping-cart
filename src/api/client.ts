const BASE_URL = "https://fakestoreapi.com";

const client = {
   get: async <T>(endpoint: string): Promise<T> => {
      const response = await fetch(`${BASE_URL}${endpoint}`);
      if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
   },

   post: async <T, B>(endpoint: string, body: B): Promise<T> => {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(body),
      });
      if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
   },
};

export default client;