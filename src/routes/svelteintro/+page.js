import { base } from '$app/paths';

export const load = async ({ fetch }) => {
  const responseJSON = await fetch(base + "/flights_part.json")
  const data = await responseJSON.json()

  return { flights: data }
}