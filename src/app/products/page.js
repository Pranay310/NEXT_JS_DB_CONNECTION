const page = async () => {
  async function fetchApi() {
    let product = await fetch("http://localhost:3001/api/fetchProducts", {
      method: "GET",
    });
    product = await product.json();
    product = product.dbData;
    console.log(product);

    console.log(typeof product);

    return product;
  }
  const data = await fetchApi();

  return (
    <div>
      {data.map((pro) => (
        <>
          <h1>{pro.item}</h1>
          <h1>{pro.price}</h1>
        </>
      ))}
    </div>
  );
};

export default page;
