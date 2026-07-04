async function main() {
  const res = await fetch("http://localhost:3000/api/products");
  const data = await res.json();
  data.products.forEach(p => {
    console.log(`Product: ${p.name}`);
    console.log(`  Image: ${p.image}`);
  });
}
main();
