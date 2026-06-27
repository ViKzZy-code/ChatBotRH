# ChatBot RH

Este projeto é um conjunto de scripts em Node.js para automatizar atendimentos e comunicações via WhatsApp usando a biblioteca `whatsapp-web.js`.

## Funcionalidades

### 1. Chatbot interativo
O arquivo `chatbot.js` funciona como um assistente de atendimento RH.

Ele realiza:
- Conexão ao WhatsApp Web
- Geração de QR Code para autenticação
- Respostas automáticas a saudações como "bom dia", "oi" e "olá"
- Menu de opções com assuntos como:
  - Atualização cadastral
  - Acesso ao contracheque
  - Imposto de Renda
  - Vale Feira
  - Certidão de Tempo de Serviço
  - Informações sobre PASEP
  - Número funcional ou matrícula
  - Outras dúvidas
- Resposta automática a mensagens de agradecimento
- Controle de cooldown para evitar respostas repetidas em pouco tempo

### 2. Envio de mensagens de atualização cadastral
O arquivo `Atualizacaocadastral.js` envia uma mensagem com um formulário de atualização cadastral para contatos cadastrados.

### 3. Envio de aviso de férias
O arquivo `ChatAvisoFerias.js` envia uma mensagem informando que o servidor deve comparecer ao RH para assinatura do aviso de férias.

### 4. Envio de instruções sobre Vale Feira
O arquivo `ChatValeFeira.js` envia orientações sobre o cartão Vale Feira, incluindo senha e instruções de cadastro.

### 5. Envio de mensagem complementar sobre Vale Feira
O arquivo `ChatValeFeira2.js` envia informações adicionais sobre recarga e atendimento da contabilidade.

## Requisitos

- Node.js instalado
- npm instalado

## Instalação

No diretório do projeto, execute:

```bash
npm install
```

## Como usar

### Iniciar o chatbot principal

```bash
npm start
```

### Executar outros fluxos

```bash
npm run send:cadastral
npm run send:ferias
npm run send:vale
npm run send:vale2
```

## Estrutura do projeto

- `chatbot.js` — chatbot interativo para atendimento RH
- `Atualizacaocadastral.js` — envio de formulário de atualização cadastral
- `ChatAvisoFerias.js` — envio de aviso de férias
- `ChatValeFeira.js` — envio de instruções sobre Vale Feira
- `ChatValeFeira2.js` — mensagem complementar sobre Vale Feira
- `package.json` — configuração do projeto e scripts

## Observações

- Os scripts utilizam uma lista de contatos localizada no próprio arquivo.
- É necessário escanear o QR Code exibido no terminal para autenticar o WhatsApp.
- Os envios são feitos com pausas entre mensagens para reduzir a chance de bloqueios.

## Segurança

- O projeto já foi validado com `npm audit --omit=dev`, que retornou `found 0 vulnerabilities`.
