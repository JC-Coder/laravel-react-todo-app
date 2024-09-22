const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
          Welcome to the Todo App
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          A simple and efficient task management tool for PHP developers, built
          with Laravel.
        </p>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
          Organize your tasks, collaborate with your team, and boost your
          productivity.
        </p>
        <div className="mt-6">
          <a
            href="/signup"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
