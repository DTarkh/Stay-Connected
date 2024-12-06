export async function fetchQuestion(id: string) {
    const res = await fetch(`https://nunu29.pythonanywhere.com/questions/${id}/`);
  
    if (res.status === 404) {
      return null;
    }
  
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
  
    const data = await res.json();
    return data;
  }
  