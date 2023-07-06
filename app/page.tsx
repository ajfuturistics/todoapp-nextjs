import Header from "@/components/Header/Header";
import TodoList from "@/components/TodoList/TodoList";

const Home = () => {
  return (
    <main className="relative flex flex-col justify-center items-center my-4 p-2">
      <div className="w-full max-w-xl">
        <Header />
        <TodoList />
      </div>
    </main>
  );
};

export default Home;
