export const getToken = async () => {
  const response = await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "emilys",
      password: "emilyspass",
      expiresInMins: 30, // optional, defaults to 60
    }),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
};
