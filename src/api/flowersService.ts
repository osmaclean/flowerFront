import axios, { AxiosError } from 'axios'

export interface Flower {
  id: string
  name: string
  description: string
  phrase: string
  img_path: string
  used: number
  date_used: Date | null
}

export class flowersService {
  static async getFlowers(): Promise<Flower[]> {
    try {
      const response = await axios.get('https://flowerback-efu9.onrender.com/')
      return response.data.data
    } catch (error: unknown) {
      if (error instanceof AxiosError) console.error(error.message)
      return []
    }
  }

  static async updateFlower(id: string) {
    const data = {
      used: 1,
    }
    try {
      const response = await axios.put(
        `https://flowerback-efu9.onrender.com/update/${id}`,
        data,
      )
      return response.data.data
    } catch (error: unknown) {
      if (error instanceof AxiosError) console.error(error.message)
      return {}
    }
  }
}
