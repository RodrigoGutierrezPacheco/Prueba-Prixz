const API_BASE_URL = process.env.NEXT_PUBLIC_BOOKS_API_BASE_URL;

export const getBooks = async ({ title, author }) => {
  try {
    let url = `${API_BASE_URL}`;

    if (title) {
      url += `?title=${encodeURIComponent(title)}`;
    } else if (author) {
      url += `?author=${encodeURIComponent(author)}&sort=new`;
    }

    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const getBookById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/works/${id}.json`);
    if (!response.ok) {
      throw new Error("Error al obtener el libro");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching specific book:", error);
    throw error;
  }
};