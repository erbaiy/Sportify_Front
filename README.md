# Système d'Inscription aux Événements Sportifs - Documentation Frontend

## Table des Matières
- [Aperçu](#aperçu)
- [Stack Technologique](#stack-technologique)
- [Structure du Projet](#structure-du-projet)
- [Instructions d'Installation](#instructions-dinstallation)
- [Fonctionnalités Principales](#fonctionnalités-principales)
- [Architecture des Composants](#architecture-des-composants)
- [Gestion d'État](#gestion-détat)
- [Authentification & Autorisation](#authentification--autorisation)
- [Routage](#routage)
- [Intégration API](#intégration-api)
- [Gestion des Erreurs](#gestion-des-erreurs)
- [Intégration Docker](#intégration-docker)

## Aperçu
Cette application frontend est conçue pour la gestion des inscriptions aux événements sportifs, permettant aux organisateurs de créer et gérer des événements, ainsi que de traiter les inscriptions des participants.

## Stack Technologique
- React.js
- Redux/Context API pour la gestion d'état
- React Router pour la navigation
- Axios pour les requêtes API
- Docker pour la conteneurisation

## Structure du Projet
```
src/
├── assets/           # Ressources statiques comme les images, polices
├── components/
│   ├── ui/          # Composants UI réutilisables
│   │   ├── alert.js
│   │   ├── button.js
│   │   └── radio-group.jsx
│   └── Auth/        # Composants liés à l'authentification
├── config/
│   └── axios.js     # Configuration et instances Axios
├── context/
│   └── context.jsx  # Définitions du contexte global
├── hooks/
│   └── sendData.jsx # Hooks personnalisés pour les opérations de données
├── layouts/
│   └── layout.jsx   # Composants et modèles de mise en page
├── lib/
│   ├── utils.js
│   └── middleware/
│       └── AuthMiddleware.jsx
├── pages/
│   ├── Auth/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── PopUpSuccess.jsx
│   └── Dashboard.jsx
├── tests/           # Fichiers de test
├── utils/           # Fonctions utilitaires et helpers
├── App.css
├── App.jsx
├── index.css
└── Router.jsx       # Configuration du routage de l'application
```

## Instructions d'Installation
1. Cloner le dépôt :
```bash
git clone https://github.com/erbaiy/Sportify_front
cd Sportify_front
```

2. Installer les dépendances :
```bash
npm install
```

3. Créer le fichier `.env` :
```env
REACT_APP_API_URL=http://localhost:3000
```

4. Démarrer le serveur de développement :
```bash
npm run dev
```

## Fonctionnalités Principales
- Gestion des événements (opérations CRUD)
- Inscription des participants
- Génération et impression de la liste des inscriptions
- Authentification et autorisation
- Routes protégées

## Architecture des Composants

### Composants Communs
- `Button` : Composant bouton réutilisable avec différentes variantes
- `Input` : Composant de formulaire avec validation
- `Modal` : Composant de dialogue popup pour les formulaires et confirmations

### Composants d'Événements
- `Events` : Affiche la liste de tous les événements
- `EventForm` : Formulaire de création d'événement

### Composants des Participants
- `Participants` : Affiche les participants inscrits
- `EventRegistrationForm` : Gère l'inscription des participants

## Gestion d'État

### Implémentation du Context API

```javascript
// src/context/AuthContext.jsx
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isAuthenticated: Boolean(localStorage.getItem('isAuthenticated')),
    });

    return (
        <AuthContext.Provider value={{authState, setAuthState}}>
            {children}
        </AuthContext.Provider>
    );
};
```

## Authentification & Autorisation

### Routes Protégées
```javascript
// src/midleware/AuthMidleware.jsx
import { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/context";

const AuthMiddleware = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { authState } = useContext(AuthContext);

    useEffect(() => {
        if (!authState.isAuthenticated) {
            console.log("L'utilisateur n'est pas authentifié");
            
            navigate("/login", { state: { from: location.pathname } });
        }
    }, [authState.isAuthenticated, navigate, location]);

    return authState.isAuthenticated ? children : null;
};

export default AuthMiddleware;
```

## Routage

```javascript
// src/Router.jsx
import { Routes, Route } from "react-router-dom";
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Home from './pages/Dashboard/Home';
import AuthMiddleware from "./middleware/AuthMiddleware";
import Layout from "./layouts/layout";
import EventForm from "./pages/Dashboard/event/EventForm";
import Events from './pages/Dashboard/event/Event';
import EventRegistrationForm from "./pages/Dashboard/registration/registration";
import Participants from "./pages/Dashboard/registration/participants";

const AppRouter = () => {
    return (
        <Routes>
            {/* Routes Publiques */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Routes Protégées */}
            <Route
                path="/"
                element={
                    <AuthMiddleware>
                        <Layout />
                    </AuthMiddleware>
                }
            >
                {/* Routes Imbriquées dans Layout */}
                <Route index element={<Home />} />
                <Route path="/event" element={<Events/>} />
                <Route path="/create-event" element={<EventForm/>}/>
                <Route path="/registration/:id" element={<EventRegistrationForm/>}/>
                <Route path="/participants" element={<Participants/>}/>
            </Route>
        </Routes>
    );
};

export default AppRouter;
```

## Intégration API

```javascript
// src/config/axios.jsx
import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_HOST,
})

// Ajouter un intercepteur de requête pour ajouter le token aux headers
axiosInstance.interceptors.request.use(
    (config) => {
        config.withCredentials = true
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default axiosInstance
```

## Gestion des Erreurs

```javascript
// Utiliser try et catch dans la fonction
const handleSubmit = async (e) => {
    e.preventDefault();
    
    toast.dismiss();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    
    const { isValid, errors } = loginValidation(email, password);
    
    if (!isValid) {
      return setErrors(errors);
    }
    
    setErrors({});
    setIsLoading(true);

    try {
      const response = await sendData("/auth/login", { email, password });
      if (response.status === 201) {
        setSuccess(true);
        clearForm();
        toast.success('Connexion réussie ! Redirection...');
        localStorage.setItem('token', response.data.access_token)
        setAuthState({ isAuthenticated: true });
        localStorage.setItem("isAuthenticated", true);
        setTimeout(() => {
          navigate("/");
        }, 2000); // Redirection après 2 secondes
      } else {
        throw new Error('Échec de la connexion');
      }
    } catch (error) {
      console.error("Échec de la connexion:", error);
      toast.error(error.response?.data?.message || 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
};
```

## Intégration Docker

```dockerfile
# Dockerfile
FROM node:16-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Intégration Docker Compose
```yaml
# dockerfile
FROM node:20-alpine
WORKDIR /app

# Copier les fichiers package pour l'installation des dépendances
COPY package*.json ./

RUN npm install

# Copier le reste du code de l'application
COPY . .

EXPOSE 5173

# Permettre l'accès au frontend depuis l'hôte
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
```

## Bonnes Pratiques
1. Utiliser des composants fonctionnels avec des hooks
2. Implémenter une gestion appropriée des erreurs
3. Utiliser des variables d'environnement pour la configuration
4. Implémenter des états de chargement