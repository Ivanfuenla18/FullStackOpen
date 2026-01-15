const Course = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => (
        <div key={course.id}>
          {" "}
          <Header name={course.name} />
          <Content parts={course.parts} />
          <Total course={course} />
        </div>
      ))}
    </div>
  );
};

const Content = ({ parts }) => {
  return (
    <ul>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </ul>
  );
};

const Total = ({ course }) => {
  const valorInicial = 0;
  const exercises = course.parts.map((part) => part.exercises);

  const NumExercises = exercises.reduce(
    (acumulador, valorActual) => acumulador + valorActual,
    valorInicial
  );

  console.log(NumExercises);
  return <b>El numero de ejercicios total es de: {NumExercises} </b>;
};

const Part = ({ part }) => {
  return (
    <li>
      {" "}
      {part.name} {part.exercises}{" "}
    </li>
  );
};

const Header = ({ name }) => {
  return <h1> {name} </h1>;
};

export default Course;
