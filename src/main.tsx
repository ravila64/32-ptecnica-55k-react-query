import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
//fix v.2.0
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//<React.StrictMode>  se utiliza Para  ENVOLVER
<QueryClientProvider client = {queryClient}>
  <App />
</QueryClientProvider>
//</React.StrictMode>
)
