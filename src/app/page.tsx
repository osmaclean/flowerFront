'use client'
import { Flower, getFlowers } from '@/api/fetch-all-flowers'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { parseISO, isAfter } from 'date-fns'

export default function Home() {
  const [flowers, setFlowers] = useState<Flower[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const response = await getFlowers()
      setFlowers(response)
    }

    fetchData()
  }, [])

  const now = parseISO(new Date().toISOString())
  const isMidnight = isAfter(now, parseISO('2024-04-01T00:00:00-03:00'))

  useEffect(() => {
    if (isMidnight) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % flowers.length)
    }
  }, [isMidnight, flowers])

  console.log(flowers[currentIndex].name)
  return (
    <>
      <section className="px-4 py-8 w-full flex flex-col justify-center gap-6 items-center">
        <h1 className="text-white w-full text-center text-sm font-medium">
          Você merece flores todos os dias minha rainha 💛
        </h1>
        <main className="bg-white rounded w-full p-4 flex flex-col justify-center items-start gap-4">
          <Image
            alt="Flower Image"
            aria-label="Flower Image"
            src={'/flower.png'}
            width={200}
            height={148}
            className="h-36 w-full rounded"
          ></Image>
          <div className="flex flex-col justify-center items-start gap-1">
            <h5 className="font-extrabold text-xs">Nome</h5>
            <p className="font-normal text-xs">Giesta</p>
          </div>
          <div className="flex flex-col justify-center items-start gap-1">
            <h5 className="font-extrabold text-xs">Descrição</h5>
            <p className="font-normal text-xs">
              Trata-se de um gênero específico na família fabaceae, mas essa
              denominação comum ás vezes é confundida também dentro de outros
              gêneros da família. São principalmente árvores arbustivas de
              pequeno porte, muitas vezes com folhas caudiciformes, muitas vezes
              espinhosas para impedir o pastoreio, e massas de pequenas flores
              amarelas muito bonitas semelhantes a ervilhas que às vezes são
              perfumadas.
            </p>
          </div>
          <div className="flex flex-col justify-center items-start gap-1">
            <h5 className="font-extrabold text-xs">Frase feita com amor</h5>
            <p className="font-normal text-xs">
              Não imagino a minha vida sem você!
            </p>
          </div>
        </main>
        <footer className="w-full bg-black bg-opacity-50 rounded p-2 text-white flex flex-col justify-center items-center gap-1 font-medium text-xs">
          <p>De: Maclean ⚡</p>
          <p>Para: A mulher da minha vida 👰💒</p>
        </footer>
      </section>
    </>
  )
}
