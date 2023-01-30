const Header = ({ name }) => {
  return <h1>{name}</h1>;
};

const Content = ({ parts }) => {
  const total = parts.reduce((acc, val) => acc + val.exercises, 0);

  return (
    <div>
      {parts.map((part) => (
        <Part data={part} />
      ))}
      <p>total of {total} exercises</p>
    </div>
  );
};

const Part = ({ data }) => {
  return (
    <p key={data.id}>
      {data.name} {data.exercises}
    </p>
  );
};

const Course = (props) => {
  const courses = props.courses;

  return (
    <div>
      {courses.map((course) => {
        return (
          <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
          </div>
        );
      })}
    </div>
  );
};

export default Course;
