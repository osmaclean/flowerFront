import axios, { AxiosError } from 'axios'

export interface Flower {
  id: string
  name: string
  description: string
  phrase: string
  img_path: string
}

export const getFlowers = async (): Promise<Flower[]> => {
  try {
    const response = await axios.get('https://flowerback-8z1u.onrender.com')
    return response.data
  } catch (error: unknown) {
    if (error instanceof AxiosError) console.error(error.message)
    return []
  }
}
