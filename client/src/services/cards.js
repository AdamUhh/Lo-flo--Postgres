import { makeRequest } from "./makeRequest";

export function getCards() {
  return makeRequest("/cards");
}

export function createCard({ title }) {
  return makeRequest("/cards", {
    method: "POST",
    data: { title },
  });
}

export function updateCard({ cardId, title }) {
  return makeRequest(`cards/${cardId}`, {
    method: "PUT",
    data: { title },
  });
}

export function deleteCard({ cardId }) {
  return makeRequest(`cards/${cardId}`, {
    method: "DELETE",
  });
}
