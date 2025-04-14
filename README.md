This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### 1. Clone o repositório

```bash
git clone https://github.com/ricardowesleyco/task-manager-frontend
cd gerenciador-de-tasks
```

### 2. Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis (ajuste conforme necessário):

**.env.local**

```env.local

NEXTAUTH_SECRET=SECRET

```

### 3. Configure o Docker

Certifique-se de que o Docker está instalado corretamente no seu sistema.

### 4. Suba os containers com Docker Compose

Execute o comando abaixo para iniciar os containers do frontend, backend e banco de dados:

```bash
docker-compose up --build
```

### 5. Acesse o projeto

- Frontend estará disponível em: **http://localhost:3000**
