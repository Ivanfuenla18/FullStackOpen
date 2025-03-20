/* El componente Header recive course por parametro y lo imprime dentro de un h1*/

const Header = ({ course }) => {
  return (<>

    <h1>{course}</h1>

  </>);


}

/* El componente Parts recive una parte y la escribe dentro de un p */

const Parts = ({ part }) => {

  return (
    <p>{part.name} {part.exercises}</p>
  )


}

/* El componente Content recive un conjunto de parts y este las separa y envia al componente Part*/

const Content = ({ parts }) => {

  return (
    <>

      <Parts part={parts[0]} />
      <Parts part={parts[1]} />
      <Parts part={parts[2]} />

    </>

  )

}

/* El componente total recive el total de ejercicios sumandolos */

const Total = ({ total }) => {

  return (<>

    <p>Number of exercises {total[0].exercises+total[1].exercises+total[2].exercises}</p>

  </>

  )

}

 
  const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }



  return (
    
    /* Estructura de proyecto como se indica en los ejercicios */
    <div>
    {  }
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={course.parts} />
    </div>
)
}

export default App