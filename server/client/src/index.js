import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from "react-router-dom";
import store from './store';
import {Provider} from 'react-redux'
import Tempp from './Tempp';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>  
 <BrowserRouter>
   <ChakraProvider>
    <Provider store={store}>
  <Tempp />
    </Provider>
   </ChakraProvider>
 </BrowserRouter>
  </>
);

