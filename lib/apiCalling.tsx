export async function getUser() {
  try {
    let res = await fetch("/api/routers/user/me", { mode: "no-cors" });
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
