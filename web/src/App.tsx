import { ContextProvider } from "./data/context";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";
import { SocketContextProvider } from "./data/socket";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <SocketContextProvider>
          <div className="App">
            <Router>
              <Routes />
            </Router>
          </div>
        </SocketContextProvider>
      </ContextProvider>
    </QueryClientProvider>
  );
}

export default App;
