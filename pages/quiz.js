import React from 'react'
import db from '../db.json';

import Widget from '../src/components/Widget';
import Logo from '../src/components/Logo';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import AlternativesForm from '../src/components/AlternativesForm';
import Button from '../src/components/Button';

function ResultWidget({ results }) {
    return (
        <Widget>
            <Widget.Header>
                Resultado da questões:
            </Widget.Header>
  
            <Widget.Content>
                <p>
                    Acertos:
                    {' '}
                    {results.filter((x) => x).length}
                </p>
                <ul>
                    {results.map((result, index) => (
                        <li key={`result__${result}`}>
                            Questão {index + 1} =
                            {result === true ? ' Acertou' : ' Errou'}  
                        </li> 
                    ))} 
                </ul> 
            </Widget.Content>
        </Widget>
    );
}

function LoadingWidget() {
    return (
        <Widget>
            <Widget.Header>
                Carregando...
            </Widget.Header>
  
            <Widget.Content>
                [Desafio do Loading]
            </Widget.Content>
        </Widget>
    );
}

function QuestionWidget({ 
    question, 
    totalQuestions,
    questionIndex,
    onSubmit,
    addResult,
}) {
    const [selectedAlternative, setSelectedAlternative] = React.useState(undefined)
    const [isQuestionSubmited, setIsQuestionSubmited] = React.useState()
    const questionId = `question__${questionIndex}`
    const isCorrect = selectedAlternative === question.answer
    const hasAlternativeSelected = selectedAlternative !== undefined

    return (
        <Widget>
            <Widget.Header>
                {/* <BackLinkArrow href="/" /> */}
                <h3>
                    Pergunta {questionIndex + 1} de {`${totalQuestions}`}
                </h3>
            </Widget.Header>
            <img
                alt="Descrição"
                style={{
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover',
                }}
                src={question.image}
            />
            <Widget.Content>
                <h2>
                    {question.title}
                </h2>
                <p>
                    {question.description}
                </p>

                <AlternativesForm
                    onSubmit={(infosDoEvento) => {
                        infosDoEvento.preventDefault()
                        setIsQuestionSubmited(true)
                        setTimeout(() => {
                            addResult(isCorrect)
                            onSubmit()
                            setIsQuestionSubmited(false)
                            setSelectedAlternative(undefined)
                        }, 3 * 1000);
                        
                    }}
                >
                    {question.alternatives.map((alternative, alternativeIndex) => {
                        console.log('Alou')
                        const alternativeId = `alternative__${alternativeIndex}`
                        const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR'
                        const isSelected = selectedAlternative === alternativeIndex
                        return (
                            <Widget.Topic
                                as='label'
                                key={alternativeId}
                                htmlFor={alternativeId}
                                data-selected={isSelected}
                                data-status={isQuestionSubmited && alternativeStatus}
                            >
                                <input
                                    style={{ display: 'none' }}
                                    id={alternativeId}
                                    name={questionId}
                                    onChange={() => setSelectedAlternative(alternativeIndex)}
                                    type='radio'
                                />
                                {alternative}
                            </Widget.Topic>
                        )
                    })}

                    {/*<pre>
                        {JSON.stringify(question, null, 4)}
                    </pre>*/}

                    <Button type="submit" disabled={!hasAlternativeSelected}>
                        Confirmar
                    </Button>

                    {isQuestionSubmited && isCorrect && <p>Resposta certa!</p>}
                    {isQuestionSubmited && !isCorrect && <p>Resposta errada!</p>}
                </AlternativesForm>
            </Widget.Content>
        </Widget>
    )
}

const screenStates = {
    QUIZ: 'QUIZ',
    LOADING: 'LOADING',
    RESULT: 'RESULT'
}

export default function QuizPage() {
    const [screenState, setScreenState] = React.useState(screenStates.LOADING)
    const [results, setResults] = React.useState([])
    const totalQuestions = db.questions.length
    const [curretQuestion, setCurretQuestion] = React.useState(0)
    const questionIndex = curretQuestion
    const question = db.questions[questionIndex]

    function addResult(result) {
        setResults([
            ...results,
            result
        ])
    }

    // [React chama de: Efeitos || Effects]
    // atualizado === willUpdate
    // morre === willUnmount
    React.useEffect(() => {
        setTimeout(() => {
            setScreenState(screenStates.QUIZ)
        }, 1 * 1000)
        // nasce === didMount
    }, [])
    
    function handleSubmitQuiz() {
        const nextQuestion = questionIndex + 1

        if (nextQuestion < totalQuestions) {
            setCurretQuestion(questionIndex + 1)
        } else {
            setScreenState(screenStates.RESULT)
        }
    }

    return (
        <QuizBackground backgroundImage={db.bg}>
            <QuizContainer>
                <Logo src={db.logo}/>
            
                {screenState === screenStates.QUIZ && (
                    <QuestionWidget
                        question={question}
                        questionIndex={questionIndex}
                        totalQuestions={totalQuestions}
                        onSubmit={handleSubmitQuiz}
                        addResult={addResult}
                    />
                )}

                {screenState === screenStates.LOADING && <LoadingWidget />}

                {screenState === screenStates.RESULT && <ResultWidget results={results}/>}
            </QuizContainer>
        </QuizBackground>
    )
}
