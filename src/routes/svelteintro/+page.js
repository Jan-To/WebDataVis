import Papa from 'papaparse'

export const load = async ({ fetch }) => {
  const responseJSON = await fetch('/flights_part.json')
  const data = await responseJSON.json()

  return { flights: data }
}