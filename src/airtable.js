let url =
  "https://api.airtable.com/v0/app2ABgZAqnLS6tJy/Grid%20view?api_key=keyYrSTvsoPFBU1gR";

const fetchData = (async () => {
  const response = await fetch(url);
  if (response.ok) {
    const rawData = (await response.json()).records;
    let data = [];
    rawData.forEach((e) => {
      data.push(e.fields);
    });
    return await data;
  } else {
    throw new Error(response);
  }
})();

export { fetchData };
