# Tela-Login-Web

## 📋 Descrição

Sistema de autenticação e avaliações desenvolvido com React, TypeScript e Tailwind CSS. O projeto inclui funcionalidades de login, registro, autenticação com Google e um sistema de avaliações com filtros e busca.

## ✨ Funcionalidades

- 🔐 **Autenticação**: Login com email/senha e Google
- 📝 **Registro**: Cadastro de novos usuários
- ⭐ **Sistema de Avaliações**: Visualização e filtros de avaliações
- 📱 **Responsivo**: Design adaptável para mobile, tablet e desktop
- 🔍 **Busca e Filtros**: Pesquisa por nome/descrição e ordenação por data/rating
- 🎨 **UI Moderna**: Interface limpa e intuitiva com Tailwind CSS

## 🛠️ Tecnologias Utilizadas

- [React](https://react.dev/) - Biblioteca JavaScript para interfaces
- [TypeScript](https://www.typescriptlang.org/) - Superset JavaScript tipado
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitário
- [Vite](https://vitejs.dev/) - Build tool e dev server
- [Firebase](https://firebase.google.com/) - Backend como serviço
- [React Router](https://reactrouter.com/) - Roteamento da aplicação
- [React Hot Toast](https://react-hot-toast.com/) - Notificações toast

## 📦 Pré-requisitos

- Node.js (versão 16 ou superior)
- npm, yarn ou pnpm
- Conta no Firebase (para autenticação e banco de dados)

## 🚀 Instalação

1. **Clone o repositório**

   ```bash
   git clone https://github.com/seu-usuario/tela-login-web.git
   cd tela-login-web
   ```

2. **Instale as dependências**

   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   ```

3. **Configure as variáveis de ambiente**

   Crie um arquivo `.env` na raiz do projeto:

   ```env
   VITE_FIREBASE_API_KEY=sua_api_key
   VITE_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=seu_projeto_id
   VITE_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
   VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

4. **Configure o Firebase**

   - Acesse o [Console do Firebase](https://console.firebase.google.com/)
   - Crie um novo projeto ou use um existente
   - Ative a autenticação com Email/Senha e Google
   - Crie um banco Firestore
   - Copie as configurações para o arquivo `.env`

## 🏃‍♂️ Como Executar

### Desenvolvimento

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

A aplicação estará disponível em `http://localhost:5173`

## 📱 Telas da Aplicação

### Login

- Autenticação com email/senha
- Login com Google
- Navegação para registro

### Registro

- Cadastro de novos usuários
- Validação de formulários

### Avaliações

- Lista de avaliações
- Filtros por data e rating
- Busca por nome/descrição
- Logout

## 🏗️ Estrutura do Projeto

```
src/
├── assets/          # Imagens e SVGs
├── components/      # Componentes reutilizáveis
│   ├── EvaluationFilter/
│   ├── SearchFilter/
│   └── StarRating/
├── hooks/           # Custom hooks
│   ├── useAuth.ts
│   └── useEvaluation.ts
├── screens/         # Telas da aplicação
│   ├── Login/
│   ├── Register/
│   └── Evaluation/
├── App.tsx          # Componente principal
├── firebase.ts      # Configuração do Firebase
└── main.tsx         # Ponto de entrada
```

## 🔧 Configuração do Firebase

1. **Autenticação**

   - Ative "Email/Password" no Firebase Console
   - Configure o provedor Google OAuth

2. **Firestore Database**

   - Crie uma coleção `evaluations`
   - Configure as regras de segurança

3. **Regras do Firestore (exemplo)**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /evaluations/{document} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```

## 📱 Responsividade

O projeto é totalmente responsivo com breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎨 Design System

### Cores Principais

- Verde: `#1E9E6A` (botões primários)
- Verde claro: `#F3FFF2` (background)
- Cinza escuro: `#1A202C` (textos)
- Cinza claro: `#F7FAFC` (inputs)

### Componentes

- Botões com hover e active states
- Inputs com validação visual
- Cards com sombras
- Sistema de notificações toast

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Se você encontrar algum problema ou tiver dúvidas, abra uma issue no repositório.

---

**Desenvolvido por Eduardo Andrade**
