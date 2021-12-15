const uri = "https://customerrest.herokuapp.com/api/";

//get request
export async function fetchAll(endpoint) {
  try {
    const response = await fetch(uri + endpoint);
    return await response.json();
  } catch (err) {
    return console.error(err);
  }
}

//delete request
export async function deleteObject(url) {
  try {
    const response = await fetch(url, { method: "DELETE" });
    return response.ok ? true : false;
  } catch (err) {
    return console.error(err);
  }
}

//post request
export async function addObject(endpoint, object) {
  console.log(endpoint);
  console.log(object);
  try {
    const response = await fetch(uri + endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(object),
    });
    console.log(response);
    return response.ok ? true : false;
  } catch (err) {
    return console.error(err);
  }
}

//put request
export async function updateObject(url, object) {
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(object),
    });
    return response.ok ? true : false;
  } catch (err) {
    return console.error(err);
  }
}
