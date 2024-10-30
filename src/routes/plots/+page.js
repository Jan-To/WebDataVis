import { base } from '$app/paths';

export async function load ({ fetch }) {
  const responseJSON = await fetch(base + "/flights_part.json")
  const data = await responseJSON.json()

  return { flights: data }
}