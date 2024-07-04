import Header from "./components/Header";
import AuthProvider from "./contexts/auth/AuthProvider";

function App() {
  return (
    <div>
      <AuthProvider>
        <Header />
      </AuthProvider>
    </div>
  );
}

export default App;
