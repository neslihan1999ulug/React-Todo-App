import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState(() => {
    // Sayfa ilk açıldığında localStorage'dan oku
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  // todos: Tüm yapılacak işleri tutan dizi
  // setTodos: todos dizisini güncellemek için kullanılan fonksiyon
  // useState: React'in state yönetimi için kullanılan hook'u

  // newtodo: Yeni eklenen yapılacak işin geçici olarak tutulduğu değişken
  // setNewTodo: newtodo değişkenini güncellemek için kullanılan fonksiyon
  // useState(""): newtodo başlangıçta boş bir string olarak ayarlanır.]);
  const [newtodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all");
// filter: Hangi türdeki işleri göstereceğimizi belirten değişken (all, active, completed)

  // todos dizisi her değiştiğinde localStorage'a kaydediyorum.Bu işlemi useEffect ile yapıyorum.
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault(); // burada enter'a basıldığında form içindeki input gönderilir ve sayfa yenilenir fakat ben yenilenmesini engelliyorum. 
    if (newtodo.trim() === "") return; // boş todo eklenmesini engelliyorum.Nasıl mı? trim() metodu ile boşlukları temizliyorum ve eğer boşsa return ile fonksiyondan çıkıyorum. Yani fonksiyonu return ile bitiriyorum. 
    setTodos([...todos, { text: newtodo, completed: false }]); // yeni todo ekliyorum.
    setNewTodo(""); // İşim bitti. inputtaki veriyi aldım.   Şimdi input alanında kalan eski içeriği temizliyorum. Yani NewTodo'yu boş olarak güncelliyorum.(set ediyorum)
  }


  const deleteTodo = (todoToDelete) => {
    // Silinmeyecek olanları filtrele
    const todosAfterDelete = todos.filter((todo) => todo !== todoToDelete);
    setTodos(todosAfterDelete);
  };
  // completed olanları siliyorum.
  const clearCompleted = () => {
    const activeTodos = todos.filter(todo => !todo.completed);
    setTodos(activeTodos);
  };
  return (
    <>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form
            onSubmit={addTodo}>
            <input className="new-todo" placeholder="What needs to be done?" value={newtodo} onChange={(e) => setNewTodo(e.target.value)} autoFocus />
          </form>
        </header>

        <section className="main">
          <input className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all">
            Mark all as complete
          </label>

          <ul className="todo-list">
            {/* Burada todo'ları listeleyeceğim. Bunu yaparken map metodunu kullanıyorum. */
              todos.filter(todo => {
                if (filter === "all") return true;
                if (filter === "active") return !todo.completed;
                if (filter === "completed") return todo.completed;
              }).map((todo, index) => (
                <li key={index} className={todo.completed ? "completed" : ""}>
                  <div className="view">
                    <input className="toggle" type="checkbox" checked={todo.completed} onChange={() => {
                      const newTodos = [...todos];
                      newTodos[index].completed = !newTodos[index].completed;
                      setTodos(newTodos);
                    }} />
                    <label>{todo.text}</label>
                    <button className="destroy" onClick={() => deleteTodo(todo)}></button>
                  </div>
                </li>
              ))}
          </ul>
        </section>

        <footer className="footer">
          <span className="todo-count">
            <strong>{todos.filter((t) => !t.completed).length}</strong>
            items left
          </span>

          <ul className="filters">
            <li>
              <button
                className={filter === "all" ? "selected" : ""}
                onClick={() => setFilter("all")}
              >
                All
              </button>
            </li>
            <li>
              <button
                className={filter === "active" ? "selected" : ""}
                onClick={() => setFilter("active")}
              >Active
              </button>
            </li>
            <li>
              <button
                className={filter === "completed" ? "selected" : ""}
                onClick={() => setFilter("completed")}
              >Completed
              </button>
            </li>
          </ul>

          <button className="clear-completed"
            onClick={clearCompleted}>
            Clear completed
          </button>
        </footer>
      </section>

      <footer className="info">
        <p>Click to edit a todo</p>
        <p>Created by <a href="https://d12n.me/">Dmitry Sharabin</a></p>
        <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
      </footer>
    </>
  )
}

export default App
