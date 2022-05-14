const baseUrl = 'http://emojlo.test/api/';

// TODO: get API token instead of HTTP cookie session
export async function signIn({ email, password }) {
  const response = await fetch(baseUrl + 'login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const json = await response.json();
  return json;
}

export async function getPosts() {
  const response = await fetch(baseUrl + 'posts');
  return await response.json();
}

export async function getPost({ id}) {
  const response = await fetch(baseUrl + 'posts/' + id);
  return await response.json();
}

export async function getUsers() {
  const response = await fetch(baseUrl + 'users');
  return await response.json();
}

export async function getUser({ username }) {
  const response = await fetch(baseUrl + 'users/' + encodeURI(username));
  return await response.json();
}
