async function main() {
  try {
    const res = await fetch("http://localhost:3000/api/products");
    const data = await res.json();
    console.log("Proxy response success:", data.success);
    console.log("Proxy products count:", data.products?.length);
    if (data.products && data.products.length > 0) {
      console.log("First product in proxy:", data.products[0].name);
    }
  } catch (e) {
    console.error("Failed to fetch from local proxy:", e.message);
  }
}
main();
