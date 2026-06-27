// Importações necessárias
const qrcode = require("qrcode-terminal");
const { Client } = require("whatsapp-web.js");

// Inicializa o cliente do WhatsApp Web
const client = new Client();

// Lista de contatos com nome, número e senha
const contatos = [
  { nome: "TEST", numero: "0000" },
  
];

// Exibir QR Code para autenticação
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
  console.log("📲 Escaneie o QR Code para conectar-se ao WhatsApp.");
});

// Quando o bot estiver pronto
client.on("ready", async () => {
  console.log("✅ Conectado ao WhatsApp! Iniciando envios...");

  for (const contato of contatos) {
        if (!contato.numero) {
            console.warn(`⚠️ Pulando contato sem número: ${contato.nome}`);
            continue;
        }

        const numeroFormatado = `55${contato.numero}@c.us`; // Adiciona código do Brasil (55)
        const mensagem = `Prezado(a) Sr(a). ${contato.nome},\n\nBoa tarde,\nSolicitamos que compareça ao setor de Recursos Humanos no horário da manhã para a assinatura do seu aviso de férias.`;
    try {
      await client.sendMessage(numeroFormatado, mensagem);
      console.log(
        `📩 Mensagem enviada para ${contato.nome} - ${contato.numero}`
      );
    } catch (error) {
      console.error(
        `❌ Erro ao enviar para ${contato.nome} - ${contato.numero}:`,
        error
      );
    }

    await new Promise((resolve) => setTimeout(resolve, 5000)); // Pausa de 5s entre envios
  }

  console.log("✅ Envio concluído!");
  client.destroy(); // Finaliza o bot após envio
});

// Iniciar o cliente
client.initialize();
