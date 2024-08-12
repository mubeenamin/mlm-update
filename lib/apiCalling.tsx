export async function getUser() {
  try {
    let res = await fetch("http://localhost:3000/api/routers/user/me");
    if (!res.ok) {
      // res.ok returns false if the HTTP status is not 200-299
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    let data = await res.json();
    return data;
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
