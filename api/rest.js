const baseUrl = 'https://emojlo.phpizza.com/api/';
let authToken;

export function setToken(token) {
  authToken = token;
}

export async function signIn({ email, password }) {
  const response = await fetch(`${baseUrl}tokens`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf8',
    },
    body: JSON.stringify({
      email,
      password,
      name: 'emojlo-expo',
    }),
  });
  return await response.json();
}

export async function signOut() {
  const tokenId = authToken.split('|')[0];
  const response = await fetch(`${baseUrl}tokens/${tokenId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
  });
  return await response.json();
}

export async function getPosts() {
  const response = await fetch(`${baseUrl}posts`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
  });
  return await response.json();
}

export async function getPost(id) {
  const response = await fetch(`${baseUrl}posts/${id}`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
  });
  return await response.json();
}

export async function storePost(body) {
  const response = await fetch(`${baseUrl}posts`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json; charset=utf8',
    },
    body: JSON.stringify({ body }),
  });
  return await response.json();
}

export async function getUsers() {
  const response = await fetch(`${baseUrl}users`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
  });
  return await response.json();
}

export async function getUser(username) {
  const response = await fetch(`${baseUrl}users/${encodeURI(username)}`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
  });
  return await response.json();
}

export async function getUserPosts(username) {
  const response = await fetch(`${baseUrl}users/${encodeURI(username)}/posts`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
  });
  return await response.json();
}
