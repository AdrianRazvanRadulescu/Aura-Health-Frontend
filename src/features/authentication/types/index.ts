// Tipul pentru datele trimise la login
export interface LoginCredentials {
  email: string;
  password?: string;
}

// NOU: Tipul pentru datele trimise la register
export interface RegisterCredentials {
    name: string;
    email: string;
    password?: string;
    password_confirmation?: string;
}

// Tipul pentru utilizatorul primit de la API
export interface User {
  id: number;
  name: string;
  email: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

// Tipul pentru răspunsul complet de la API
export interface AuthResponse {
  user: User;
  token: string; // Sau orice altceva returnează API-ul tău
}