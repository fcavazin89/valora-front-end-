# 🚀 Guia de Deploy no Vercel

## Pré-requisitos
- Conta no Vercel: https://vercel.com/signup
- Repositório GitHub conectado: https://github.com/fcavazin89/valora-front-end-

---

## 📱 Deploy do VOUCHER SOCIAL (App do Beneficiário)

### 1. Criar novo projeto no Vercel

1. Acesse https://vercel.com/new
2. Clique em **Import Git Repository**
3. Selecione o repositório: `fcavazin89/valora-front-end-`
4. Configure o projeto:

```
Project Name: voucher-social
Root Directory: VOUCHER SOCIAL
Framework Preset: Next.js
Build Command: pnpm run build
Output Directory: .next
Install Command: pnpm install
```

### 2. Configurar variáveis de ambiente

Na aba **Environment Variables**, adicione:

```bash
# Web3Auth
NEXT_PUBLIC_WEB3AUTH_CLIENT_ID=BEy2uSC8d0lo_rK5hfbu4b84zJxyv-mi9N5ndYhyTsqa487lzPTGYtKDKeDqFAYf9dm22FdkHACbxhxLZxNYKmg

# API Backend (ajuste para a URL real quando deployar o backend)
NEXT_PUBLIC_API_URL=https://seu-backend.railway.app/api/v1

# Blockchain (Celo Alfajores testnet)
NEXT_PUBLIC_CHAIN_ID=44787
NEXT_PUBLIC_RPC_URL=https://alfajores-forno.celo-testnet.org

# Analytics (opcional)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=seu_analytics_id
```

### 3. Deploy

Clique em **Deploy** e aguarde a build.

URL esperada: `https://voucher-social.vercel.app`

---

## 🏪 Deploy do COMERCIANTE - VS (Terminal do Comerciante)

### 1. Criar novo projeto no Vercel

1. Acesse https://vercel.com/new novamente
2. Selecione o mesmo repositório
3. Configure o segundo projeto:

```
Project Name: comerciante-terminal
Root Directory: COMERCIANTE - VS
Framework Preset: Next.js
Build Command: pnpm run build
Output Directory: .next
Install Command: pnpm install
```

### 2. Configurar variáveis de ambiente

```bash
# Web3Auth (mesmo client ID ou criar um novo)
NEXT_PUBLIC_WEB3AUTH_CLIENT_ID=BEy2uSC8d0lo_rK5hfbu4b84zJxyv-mi9N5ndYhyTsqa487lzPTGYtKDKeDqFAYf9dm22FdkHACbxhxLZxNYKmg

# API Backend
NEXT_PUBLIC_API_URL=https://seu-backend.railway.app/api/v1

# Blockchain
NEXT_PUBLIC_CHAIN_ID=44787
NEXT_PUBLIC_RPC_URL=https://alfajores-forno.celo-testnet.org

# Analytics (opcional)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=seu_analytics_id
```

### 3. Deploy

Clique em **Deploy**.

URL esperada: `https://comerciante-terminal.vercel.app`

---

## 🔧 Configurações Adicionais no Vercel

### Domínios personalizados (opcional)

1. Vá em **Settings** > **Domains**
2. Adicione seus domínios:
   - `voucher.seudominio.com.br` → VOUCHER SOCIAL
   - `comerciante.seudominio.com.br` → COMERCIANTE - VS

### Configurar CORS no Backend

Atualize o backend (valora-api) para aceitar requisições dos domínios Vercel:

```typescript
// No backend (valora-api)
app.use(cors({
  origin: [
    'https://voucher-social.vercel.app',
    'https://comerciante-terminal.vercel.app',
    'http://localhost:3000',
    'http://localhost:3002'
  ],
  credentials: true
}))
```

---

## 📊 Monitoramento

- **Analytics**: Habilitado automaticamente com `@vercel/analytics`
- **Logs**: Acesse em **Deployments** > clique no deploy > **Functions**
- **Performance**: Veja métricas em **Analytics**

---

## 🔄 CI/CD Automático

O Vercel está configurado para:
- ✅ Deploy automático em cada push na branch `main`
- ✅ Preview deployments para cada Pull Request
- ✅ Rollback instantâneo se necessário

---

## 🎯 Pós-Deploy

### 1. Testar PWA

- Abra a URL no Chrome mobile
- Toque em **Adicionar à tela inicial**
- Teste o app instalado

### 2. Atualizar Web3Auth URLs permitidas

Acesse https://dashboard.web3auth.io/ e adicione:
- `https://voucher-social.vercel.app`
- `https://comerciante-terminal.vercel.app`

### 3. Verificar Service Worker

No DevTools:
- Application > Service Workers
- Deve mostrar "activated and running"

---

## 🐛 Troubleshooting

### Build falha com erro de memória
```bash
# Em Settings > Environment Variables, adicione:
NODE_OPTIONS=--max-old-space-size=4096
```

### PWA não funciona
- Verifique se `next-pwa` está instalado
- Confirme que `sw.js` está em `/public`
- Force refresh: Ctrl+Shift+R

### Web3Auth não conecta
- Verifique o Client ID nas env vars
- Confirme as URLs no dashboard Web3Auth
- Teste em modo anônimo (sem cache)

---

## 📞 Links Úteis

- Dashboard Vercel: https://vercel.com/dashboard
- Docs Vercel + Next.js: https://vercel.com/docs/frameworks/nextjs
- Web3Auth Dashboard: https://dashboard.web3auth.io/
- Celo Explorer (testnet): https://explorer.celo.org/alfajores

---

✅ **Pronto para deploy!** Execute os passos acima para cada projeto.
