# Meu Projeto

O DevCusto é um sistema intuitivo para a criação e gerenciamento de projetos com controle financeiro. Nele, você pode criar projetos e adicionar serviços conforme necessário, garantindo que o custo total não ultrapasse o orçamento definido para o projeto principal.

Com o DevCusto, você mantém controle total sobre os investimentos, organizando seus serviços de forma eficiente e evitando gastos excessivos.

## Tecnologias usadas

- ![JavaScript](https://img.shields.io/badge/JavaScript-yellow?style=flat&logo=javascript&logoColor=white) 
- ![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
- ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white) 
- ![HTML](https://img.shields.io/badge/HTML-E34F26?style=flat&logo=html5&logoColor=white)
- ![Axios Badge](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white)
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)

O **DevCusto** utiliza o Firebase Database para armazenar e gerenciar os projetos de forma segura e eficiente.

**Funcionalidades principais:**

-  **Autenticação obrigatória:** Para criar e gerenciar projetos, o usuário precisa estar logado.
-  **CRUD de Projetos:** O sistema permite criar, editar e excluir projetos diretamente no banco de dados.
-  **Armazenamento em tempo real:** As alterações nos projetos são refletidas instantaneamente.

_Com essa abordagem, garantimos um gerenciamento de projetos organizado e acessível apenas para usuários autenticados._

## Configurando Firebase Authentication no DevCusto

1.   **Criar e Configurar um Projeto no Firebase**

-   Acesse o Firebase Console.
-   Clique em Adicionar Projeto e siga as instruções para criá-lo.
-   No painel do Firebase, vá até Build → Authentication.
-   Clique na aba Sign-in method.
-   Habilite a opção E-mail/Senha e clique em Salvar.

2.   **Instalar o Firebase no Projeto**

-   npm install firebase

3.   **Configurar o Firebase no Projeto**

-   Vá até Configurações do Projeto → Configuração → Credenciais.
-   Copie o JSON de configuração do Firebase e adicione no seu código:

```javascript
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "VITE_FIREBASE_API_KEY",
  authDomain: "VITE_FIREBASE.firebaseapp.com",
  projectId: "VITE_FIREBASE_PROJETO",
  storageBucket: "VITE_FIREBASE.appspot.com",
  messagingSenderId: "VITE_FIREBASE_ID",
  appId: "VITE_FIREBASE_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
````

## Configurando Firebase Database no DevCusto

1.   **Criar e Ativar o Firestore no Firebase Console**

-   Acesse o Firebase Console.
-   Selecione seu projeto DevCusto ou crie um novo.
-   No menu esquerdo, clique em Firestore Database (em "Build").
-   Clique em Criar Banco de Dados.
-   Escolha o modo "Modo de Produção" (ou "Modo de Teste" se for para testes).
-   Selecione um local para o banco de dados (pode ser us-central1 ou outro próximo de sua região).
-   Clique em Criar e aguarde a configuração ser concluída.

2.   **Instalar o Firebase no Projeto**

-   npm install firebase (se não estiver instalado)

3.   **Configurar o Firebase no Projeto (seguir o mesmo passo do item 3 acima)**

-   Vá até Configurações do Projeto → Configuração → Credenciais.
-   Copie o JSON de configuração do Firebase e adicione no seu código:


**Demonstração do projeto**

![Image](https://github.com/user-attachments/assets/c8f001cf-fa60-411a-a0ec-939cf9acf187)

![Image](https://github.com/user-attachments/assets/934ac637-64e8-44e6-b192-9fd79ccb5003)

![Image](https://github.com/user-attachments/assets/9578eced-977d-41a2-a183-ec8ae012d399)

![Image](https://github.com/user-attachments/assets/f5e3b480-e855-4f31-9fdd-1589556c473a)

_Obs: Na página de contato, os dados não estão sendo enviados para o banco de dados, e sim para o console como demonstração apenas._

## Como rodar o projeto

1. Clone este repositório:
   ```bash
    git clone https://github.com/leandroalves-dev/devcusto.git

2. Instale as dependências:
   ```bash
   npm install

3. Rode o projeto
    ```bash
    npm run dev
