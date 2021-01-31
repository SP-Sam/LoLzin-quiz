import React from 'react'
import Head from 'next/head'
import { motion }  from 'framer-motion'
import { useRouter } from 'next/router'

import db from '../db.json'
import QuizBackground from '../src/components/QuizBackground'
import QuizContainer from '../src/components/QuizContainer'
import Logo from '../src/components/Logo'
import Widget from '../src/components/Widget'
import Input from '../src/components/Input'
import Button from '../src/components/Button'
import Link from '../src/components/Link';
import GitHubCorner from '../src/components/GitHubCorner'
import Footer from '../src/components/Footer'

export default function Home() {
  const router = useRouter()
  const [name, setName] = React.useState('')

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>{db.title}</title>
      </Head>

      <QuizContainer>
        <Logo src={db.logo}/>

        <Widget
          as={motion.section}
          transition={{ duration: 0.3 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0,  y: '100%' }
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>

          <Widget.Content>
            <p>{db.description}</p>

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
          
        <Widget
          as={motion.section}
          transition={{ duration: 0.3 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' }
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Content>
            <h1>Quizes da galera</h1>
            <ul>
              {db.external.map((linkExterno) => {
                const [projectName, githubUser] = linkExterno
                  .replace(/\//g, '')
                  .replace('https:', '')
                  .replace('.vercel.app', '')
                  .split('.');

                return (
                  <li key={linkExterno}>
                    <Widget.Topic
                      as={Link}
                      href={`/quiz/${projectName}___${githubUser}`}
                    >
                      {`${githubUser}/${projectName}`}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>
            
          </Widget.Content>
        </Widget>

        <Footer
          as={motion.footer}
          transition={{ duration: 0.3 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' }
          }}
          initial="hidden"
          animate="show"
        />
      </QuizContainer>

      <GitHubCorner projectUrl='https://github.com/SP-Sam/LoLzin-quiz' />

    </QuizBackground>
  )
}
