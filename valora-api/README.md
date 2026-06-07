# 🏦 Valora API

API REST completa para o sistema de gestão de benefícios Valora, construída com **Node.js 20 + TypeScript**, **Knex.js** (query builder) e **SQLite** por padrão (compatível com PostgreSQL e MySQL).

---

## 📦 Stack

| Tecnologia | Uso |
|---|---|
| Node.js 20 + TypeScript | Runtime e linguagem |
| Express 4 | Framework HTTP |
| Knex.js | Query builder (SQLite / PostgreSQL / MySQL) |
| Zod | Validação de schemas |
| tsx / tsup | Dev watch e build de produção |
| Helmet + CORS | Segurança HTTP |
| Morgan | Logs de requisição |

---

## 🗂️ Estrutura do Projeto

```
src/
├── controllers/         # Recebe req/res, chama services
│   ├── base.controller.ts
│   └── index.ts
├── services/            # Regras de negócio
│   └── index.ts
├── repositories/        # Acesso ao banco (Knex)
│   ├── base.repository.ts
│   └── index.ts
├── routes/              # Definição de rotas REST
│   └── index.ts
├── validators/          # Schemas Zod de validação
│   └── index.ts
├── middlewares/         # Error handler, paginação
│   ├── errorMiddleware.ts
│   └── pagination.ts
├── types/               # Tipos e erros customizados
│   └── index.ts
├── db/
│   ├── connection.ts    # Configuração do Knex
│   ├── migrate.ts       # Criação de tabelas
│   └── seed.ts          # Dados de exemplo
├── app.ts               # Configuração do Express
└── server.ts            # Ponto de entrada
```

---

## ⚙️ Instalação

### Pré-requisitos

- Node.js 20+
- npm 9+

### 1. Clone e instale as dependências

```bash
git clone https://github.com/seu-usuario/valora-api.git
cd valora-api
npm install
```

### 2. Configure as variáveis de ambiente

```bash
cp .env.example .env
# Edite o .env conforme necessário
```

### 3. Execute as migrações

```bash
npm run migrate
```

### 4. (Opcional) Insira dados de exemplo

```bash
npm run seed
```

### 5. Inicie em desenvolvimento

```bash
npm run dev
```

A API estará disponível em: `http://localhost:3000`

---

## 🔧 Variáveis de Ambiente

| Variável | Padrão | Descrição |
|---|---|---|
| `PORT` | `3000` | Porta do servidor |
| `NODE_ENV` | `development` | Ambiente de execução |
| `DB_CLIENT` | `sqlite3` | Driver: `sqlite3`, `pg`, `mysql2` |
| `DB_FILENAME` | `./database/valora.db` | Caminho do arquivo SQLite |
| `DB_HOST` | `localhost` | Host do banco (PG/MySQL) |
| `DB_PORT` | `5432` / `3306` | Porta do banco (PG/MySQL) |
| `DB_USER` | — | Usuário do banco |
| `DB_PASSWORD` | — | Senha do banco |
| `DB_NAME` | `valora_db` | Nome do banco |

### Usar PostgreSQL

```bash
# Instale o driver
npm install pg

# .env
DB_CLIENT=pg
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=suasenha
DB_NAME=valora_db
```

### Usar MySQL

```bash
# Instale o driver
npm install mysql2

# .env
DB_CLIENT=mysql2
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=suasenha
DB_NAME=valora_db
```

---

## 🚀 Scripts Disponíveis

| Script | Descrição |
|---|---|
| `npm run dev` | Inicia com hot-reload (tsx watch) |
| `npm run build` | Compila para produção (tsup → dist/) |
| `npm start` | Executa o build de produção |
| `npm run migrate` | Cria todas as tabelas |
| `npm run migrate -- --rollback` | Remove todas as tabelas |
| `npm run seed` | Insere dados de exemplo |

---

## 📡 Endpoints

Todos os endpoints seguem o padrão: `GET /api/v1/{recurso}?page=1&limit=20`

### Paginação (todos os GETs de listagem)

```
GET /api/v1/emissores?page=1&limit=20
```

**Resposta padrão de listagem:**
```json
{
  "data": [...],
  "pagination": {
    "total": 42,
    "page": 1,
    "limit": 20,
    "totalPages": 3
  }
}
```

---

### 🏢 Emissores `/api/v1/emissores`

#### `GET /api/v1/emissores`
Lista todos os emissores.

```bash
curl http://localhost:3000/api/v1/emissores
```

#### `GET /api/v1/emissores/:id`
Busca um emissor por ID.

```bash
curl http://localhost:3000/api/v1/emissores/1
```
```json
{
  "data": {
    "id_emissor": 1,
    "cnpj": "12.345.678/0001-90",
    "razao_social": "Valora Gestão de Benefícios Ltda",
    "nome_fantasia": "Valora",
    "tipo_emissor": "administradora",
    "status": "ativo"
  }
}
```

#### `POST /api/v1/emissores`
Cria um novo emissor.

```bash
curl -X POST http://localhost:3000/api/v1/emissores \
  -H "Content-Type: application/json" \
  -d '{
    "cnpj": "12.345.678/0001-90",
    "razao_social": "Valora Gestão de Benefícios Ltda",
    "nome_fantasia": "Valora",
    "tipo_emissor": "administradora",
    "endereco": "Av. Paulista, 1000, São Paulo - SP",
    "telefone": "(11) 99999-0000",
    "email": "contato@valora.com.br"
  }'
```

#### `PUT /api/v1/emissores/:id`
Atualiza um emissor (campos opcionais — envia apenas o que mudar).

```bash
curl -X PUT http://localhost:3000/api/v1/emissores/1 \
  -H "Content-Type: application/json" \
  -d '{ "status": "inativo" }'
```

#### `DELETE /api/v1/emissores/:id`
Remove um emissor.

```bash
curl -X DELETE http://localhost:3000/api/v1/emissores/1
```

---

### 📋 Programas `/api/v1/programas`

Retorna dados do emissor aninhados (join automático).

```bash
# POST - criar programa
curl -X POST http://localhost:3000/api/v1/programas \
  -H "Content-Type: application/json" \
  -d '{
    "id_emissor": 1,
    "nome": "Vale Alimentação Premium",
    "codigo_programa": "VA-PREMIUM-2024",
    "descricao": "Programa de vale alimentação",
    "data_inicio": "2024-01-01",
    "dia_credito": 5,
    "valor_base_mensal": 800.00,
    "periodicidade": "mensal"
  }'
```

---

### 👤 Beneficiários `/api/v1/beneficiarios`

```bash
# POST
curl -X POST http://localhost:3000/api/v1/beneficiarios \
  -H "Content-Type: application/json" \
  -d '{
    "cpf": "123.456.789-00",
    "nome_completo": "João da Silva",
    "data_nascimento": "1990-05-15",
    "nome_mae": "Maria da Silva",
    "endereco": "Rua das Flores, 123",
    "cep": "01310-100",
    "telefone": "(11) 98888-1234",
    "email": "joao@email.com"
  }'
```

---

### 🏪 Comércios `/api/v1/comercios`

Filtros via query string:
```
GET /api/v1/comercios?status_comercio=ativo
```

```bash
# POST
curl -X POST http://localhost:3000/api/v1/comercios \
  -H "Content-Type: application/json" \
  -d '{
    "cnpj": "98.765.432/0001-10",
    "razao_social": "Supermercado Bom Preço Ltda",
    "nome_fantasia": "Bom Preço",
    "cnae_principal": "4711-3/01",
    "categoria_comercio": "supermercado",
    "endereco": "Rua do Comércio, 500",
    "cep": "01510-000",
    "telefone": "(11) 3333-4444",
    "email": "contato@bompreco.com.br",
    "responsavel_nome": "Carlos Oliveira",
    "responsavel_cpf": "987.654.321-00"
  }'
```

---

### 💳 Cartões `/api/v1/cartoes`

Retorna emissor, programa e beneficiário aninhados.

```bash
# POST
curl -X POST http://localhost:3000/api/v1/cartoes \
  -H "Content-Type: application/json" \
  -d '{
    "numero_cartao": "4111111111111111",
    "id_emissor": 1,
    "id_programa": 1,
    "id_beneficiario": 1,
    "tipo_cartao": "fisico",
    "bandeira": "Visa",
    "validade": "2027-12-31",
    "cvv": "123",
    "data_emissao": "2024-01-01"
  }'
```

---

### 🤝 Credenciamentos `/api/v1/credenciamentos`

```bash
# POST
curl -X POST http://localhost:3000/api/v1/credenciamentos \
  -H "Content-Type: application/json" \
  -d '{
    "id_programa": 1,
    "id_comercio": 1,
    "id_emissor": 1,
    "data_credenciamento": "2024-01-01",
    "taxa_desconto": 1.5,
    "prazo_liquidacao": 30
  }'
```

---

### 💰 Transações `/api/v1/transacoes`

Filtros disponíveis:
```
GET /api/v1/transacoes?id_cartao=1&status_transacao=confirmada
```

```bash
# POST
curl -X POST http://localhost:3000/api/v1/transacoes \
  -H "Content-Type: application/json" \
  -d '{
    "id_cartao": 1,
    "id_comercio": 1,
    "valor_bruto": 150.00,
    "valor_taxa": 2.25,
    "valor_liquido": 147.75,
    "nsu": "NSU20240601001",
    "saldo_antes": 800.00,
    "saldo_depois": 650.00,
    "tipo_transacao": "compra"
  }'
```

---

### 🔋 Recargas `/api/v1/recargas`

```bash
# POST
curl -X POST http://localhost:3000/api/v1/recargas \
  -H "Content-Type: application/json" \
  -d '{
    "id_cartao": 1,
    "id_programa": 1,
    "valor_creditado": 800.00,
    "periodo_referencia": "2024-06-01",
    "tipo_credito": "programado"
  }'
```

---

### 💸 Saques de Comércio `/api/v1/saques`

Filtros disponíveis:
```
GET /api/v1/saques?status_saque=pendente&id_comercio=1
```

```bash
# POST - solicitar saque
curl -X POST http://localhost:3000/api/v1/saques \
  -H "Content-Type: application/json" \
  -d '{
    "id_comercio": 1,
    "id_programa": 1,
    "valor_solicitado": 147.75,
    "banco_destino": "001",
    "agencia_destino": "1234",
    "conta_destino": "56789-0",
    "tipo_conta": "corrente"
  }'

# PUT - aprovar saque
curl -X PUT http://localhost:3000/api/v1/saques/1 \
  -H "Content-Type: application/json" \
  -d '{
    "status_saque": "aprovado",
    "usuario_aprovador": "admin@valora.com.br"
  }'
```

---

## ❌ Tratamento de Erros

Todos os erros seguem o formato:
```json
{
  "error": "Mensagem descritiva",
  "code": "CODIGO_DO_ERRO"
}
```

| Código HTTP | Code | Descrição |
|---|---|---|
| 404 | `NOT_FOUND` | Recurso não encontrado |
| 409 | `CONFLICT` | Dados duplicados (UNIQUE) |
| 409 | `FOREIGN_KEY_VIOLATION` | FK inválida |
| 422 | `VALIDATION_ERROR` | Dados de entrada inválidos (Zod) |
| 500 | `INTERNAL_ERROR` | Erro interno |

**Exemplo de erro de validação:**
```json
{
  "error": "Dados inválidos",
  "code": "VALIDATION_ERROR",
  "details": [
    { "field": "email", "message": "Invalid email" },
    { "field": "cpf", "message": "String must contain at least 11 character(s)" }
  ]
}
```

---

## 🏗️ Build de Produção

```bash
npm run build
NODE_ENV=production node dist/server.js
```

---

## 🔐 Health Check

```bash
curl http://localhost:3000/health
# { "status": "ok", "timestamp": "2024-06-01T12:00:00.000Z", "version": "1.0.0" }
```
