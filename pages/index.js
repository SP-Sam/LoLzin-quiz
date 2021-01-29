import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import db from '../db.json'
import Logo from '../src/components/Logo'
import Widget from '../src/components/Widget'
import Footer from '../src/components/Footer'
import QuizBackground from '../src/components/QuizBackground'
import GitHubCorner from '../src/components/GitHubCorner'
import Input from '../src/components/Input'
import Button from '../src/components/Button'
import QuizContainer from '../src/components/QuizContainer'

export default function Home() {
  const router = useRouter()
  const [name, setName] = React.useState('')
  console.log('Retorno do use state', name, setName)

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>Quiz de LoLzin</title>
      </Head>

      <QuizContainer>
        <Logo src={db.logo}/>

        <Widget>
          <Widget.Header>
            <h1>League of Legends</h1>
          </Widget.Header>

          <Widget.Content>
            <p>
              Teste o quão profudamente você conhece o League of Legends
              com esse super quiz.
            </p>

            <form onSubmit={function (infosDoEvento) {
              infosDoEvento.preventDefault()
              router.push(`/quiz?name=${name}`)
              console.log('Fazendo uma submissão por meio do react')
            }}>
              <Input
                name="nomeDoUsuario"
                onChange={(infosDoEvento) => setName(infosDoEvento.target.value)}
                placeholder="Qual é seu nome?"
                value={name}
              />

              <Button type="submit" disabled={name.length === 0}>
                {`Vamos jogar ${name}`}
              </Button>
            </form>
          </Widget.Content>
        </Widget>
          
        <Widget>
          <Widget.Header>
            <h1>Outros quizes</h1>
          </Widget.Header>
          
          <Widget.Content>
            <p>Lorem ipsum dolor sit amet...</p>
          </Widget.Content>
        </Widget>

        <Footer/>
      </QuizContainer>

      <GitHubCorner projectUrl='https://github.com/SP-Sam/LoLzin-quiz'/>
    </QuizBackground>
  )
}
