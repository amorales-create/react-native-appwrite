import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { AuthScreen } from './AuthScreen'; // Ajusta la ruta si es necesario
import { loginSuccess } from '../store/authSlice';
import { toggleTheme } from '../../../shared/theme/themeSlice';

// 1. Mock de los hooks de Redux
const mockDispatch = jest.fn();
jest.mock('../../../shared/store/hooks', () => ({
  useAppDispatch: () => mockDispatch,
  // Simulamos que el estado inicial del tema es 'light'
  useAppSelector: jest.fn((selector) => selector({ theme: { mode: 'light' } })), 
}));

// 2. Mock de las acciones de Redux
jest.mock('../store/authSlice', () => ({
  loginSuccess: jest.fn(),
}));
jest.mock('../../../shared/theme/themeSlice', () => ({
  toggleTheme: jest.fn(),
}));

// 3. Mock de i18next (Traducciones)
const mockChangeLanguage = jest.fn();
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    // Hacemos que la función 't' devuelva la misma llave (ej. 'auth.title') para buscarla fácil
    t: (key: string) => key, 
    i18n: {
      language: 'es', // Empezamos en español
      changeLanguage: mockChangeLanguage,
    },
  }),
}));

// 4. Mock de los componentes hijos (para aislar este test)
// Al LoginForm no le hacemos nada, solo evitamos que intente renderizar sus propios inputs
jest.mock('../components/LoginForm', () => ({ LoginForm: () => null }));
jest.mock('../components/GoogleButton', () => ({ GoogleButton: () => null }));

// Para el GuestButton, creamos un botón falso para poder hacerle clic
jest.mock('../components/GuestButton', () => ({
  GuestButton: ({ onPress }: any) => {
    const { TouchableOpacity, Text } = require('react-native');
    return (
      <TouchableOpacity onPress={onPress} testID="mock-guest-button">
        <Text>Guest</Text>
      </TouchableOpacity>
    );
  },
}));

describe('<AuthScreen />', () => {
  // Limpiamos la memoria de los mocks antes de cada test para que no choquen
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('se renderiza correctamente y muestra los textos principales', () => {
    render(<AuthScreen />);
    
    // Validamos que los textos (las llaves de traducción) estén en pantalla
    expect(screen.getByText('auth.title')).toBeTruthy();
    expect(screen.getByText('auth.subtitle')).toBeTruthy();
    expect(screen.getByText('auth.loginButton')).toBeTruthy();
  });

  it('cambia el idioma al presionar el botón de idioma', () => {
    render(<AuthScreen />);
    
    // Busca el botón que dice "ES" (porque el mock empieza en 'es' y tu código lo pone en mayúsculas)
    const langButton = screen.getByText('ES');
    fireEvent.press(langButton);

    // Verificamos que se haya llamado la función con 'en'
    expect(mockChangeLanguage).toHaveBeenCalledWith('en');
  });

  it('despacha la acción toggleTheme al presionar el botón del tema', () => {
    render(<AuthScreen />);
    
    // Busca el icono del sol (porque el mock de Redux dice que estamos en 'light')
    const themeButton = screen.getByText('☀️');
    fireEvent.press(themeButton);

    // Verificamos que se haya disparado la acción hacia Redux
    expect(mockDispatch).toHaveBeenCalled();
    expect(toggleTheme).toHaveBeenCalled();
  });

  it('despacha la acción de login como invitado al presionar el GuestButton', () => {
    render(<AuthScreen />);
    
    // Buscamos el botón falso que creamos en el mock (paso 4)
    const guestButton = screen.getByTestId('mock-guest-button');
    fireEvent.press(guestButton);

    // Verificamos que Redux haya recibido los datos correctos
    expect(mockDispatch).toHaveBeenCalled();
    expect(loginSuccess).toHaveBeenCalledWith({
      id: 'guest',
      name: 'Guest User',
      type: 'guest',
    });
  });
});