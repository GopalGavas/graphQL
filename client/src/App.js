import "./App.css";
import { gql, useQuery } from "@apollo/client";

const query = gql`
  query getTodosWithUser {
    getTodos {
      id
      title
      completed
      user {
        id
        name
        email
      }
    }
  }
`;

function App() {
  const { data, loading, error } = useQuery(query);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;

  return (
    <div className="App">
      {data.getTodos.map((todo) => (
        <div key={todo.id}>
          <h3>{todo.title}</h3>
          <p>User: {todo.user.name}</p>
          <p>Completed: {todo.completed ? "Yes" : "No"}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
