'use client'
import { Flower, flowersService } from '@/api/flowersService'
import { format } from 'date-fns'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'

export default function Home() {
  const [flowers, setFlowers] = useState<Flower>()
  const [flowerDrawn, setFlowerDrawn] = useState(true)

  const fetchData = useCallback(async () => {
    const response = await flowersService.getFlowers()

    const flowersUsed = response.filter((flower) => flower.used === 1)
    console.log(flowersUsed)

    flowersUsed.forEach((flower) => {
      const newFormatDate = format(`${flower.date_used}`, 'dd/MM/yyyy')
      const today = format(new Date(), 'dd/MM/yyyy')

      if (newFormatDate === today) {
        setFlowerDrawn(true)
        setFlowers(flower)
        return false
      } else {
        setFlowerDrawn(false)
      }
      console.log(newFormatDate === today)
    })
  }, [])

  const handleSortFlowers = useCallback(async () => {
    const response = await flowersService.getFlowers()
    const flowersFiltered = response.filter((flower) => flower.used === 0)

    if (flowersFiltered.length > 0) {
      const randomIndex = Math.floor(Math.random() * flowersFiltered.length)
      const randomFlower = flowersFiltered[randomIndex]
      await updateFlowerFunc(randomFlower.id)
      setFlowers(randomFlower)
      setFlowerDrawn(true)
    }
  }, [])

  const updateFlowerFunc = async (id: string) => {
    await flowersService.updateFlower(id)
  }

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    if (!flowerDrawn) {
      handleSortFlowers()
    }
  }, [flowerDrawn, handleSortFlowers])

  return (
    <>
      <section className="relative w-full flex flex-col justify-center gap-6 items-center">
        <img
          src={flowers?.img_path}
          alt="Flower Image"
          className="absolute min-h-[125vh] object-cover -z-10 opacity-50 inset-0"
        />
        <div className="px-4 py-6 sm-1:px-8 sm-2:px-12 sm-3:px-16 w-full flex flex-col justify-center gap-6 items-center">
          <h1 className="text-white w-full text-center text-sm font-medium">
            Você merece flores todos os dias minha rainha 💛
          </h1>
          <main className="bg-white rounded w-full p-4 flex flex-col justify-center items-start gap-4">
            <img
              alt="Flower Image"
              aria-label="Flower Image"
              src={flowers?.img_path}
              width={200}
              height={148}
              className="h-36 w-full rounded"
            />
            <div className="flex flex-col justify-center items-start gap-1">
              <h5 className="font-extrabold text-xs">Nome</h5>
              <p className="font-normal text-xs">{flowers?.name}</p>
            </div>
            <div className="flex flex-col justify-center items-start gap-1">
              <h5 className="font-extrabold text-xs">Descrição</h5>
              <p className="font-normal text-xs">{flowers?.description}</p>
            </div>
            <div className="flex flex-col justify-center items-start gap-1">
              <h5 className="font-extrabold text-xs">Frase feita com amor</h5>
              <p className="font-normal text-xs">{flowers?.phrase}</p>
            </div>
          </main>
          <footer className="w-full bg-black bg-opacity-50 rounded p-2 text-white flex flex-col justify-center items-center gap-1 font-medium text-xs">
            <p>De: Maclean ⚡</p>
            <p>Para: A mulher da minha vida 👰💒</p>
          </footer>
        </div>
      </section>
    </>
  )
}
