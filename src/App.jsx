
import './App.css';
import Content from './component/Content';
import { CartProvider } from './component/CartContext';

function App() {

  return (
    <CartProvider>
      <div className="b-body">
       <Content />
      </div>
    </CartProvider>
  )
}

export default App
