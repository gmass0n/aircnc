// IMPORTS
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Login from './pages/Login';
import List from './pages/List';
import Book from './pages/Book';

// createSwitchNavigator: MOSTRA APENAS UMA TELA POR VEZ, SEM FUNÇÕES PARA VOLTAR ETC

// DEFINE AS ROTAS DA APLICAÇÃO
const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        List,
        Book
    })
);

// EXPORT
export default Routes;