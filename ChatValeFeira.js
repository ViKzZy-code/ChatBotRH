// Importações necessárias
const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');

// Inicializa o cliente do WhatsApp Web
const client = new Client();

// Lista de contatos com nome, número e senha
const contatos = [
    { nome: "TEST", numero: "0000", senha: "0000" },
    
];

// Exibir QR Code para autenticação
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
    console.log('📲 Escaneie o QR Code para conectar-se ao WhatsApp.');
});

// Quando o bot estiver pronto
client.on('ready', async () => {
    console.log('✅ Conectado ao WhatsApp! Iniciando envios...');

    for (const contato of contatos) {
        let numeroFormatado = `55${contato.numero}@c.us`; // Adiciona código do Brasil (55)
        let mensagem = `Prezado(a) Sr(a). ${contato.nome},\n\nVocê está recebendo a sua senha pessoal e intransferível para utilização nos estabelecimentos credenciados do seu cartão TOPCARD.\n\nPara sua segurança, memorize sua senha e tenha cuidado na sua utilização.\n\n🔒 Senha: ${contato.senha}\n\nSobre o dia da recarga aguarde até o dia 15.\n\n---\n\n*Segue abaixo instruções sobre cadastro e redefinição de senha:*\n\n---\n\n*VALE FEIRA*\n\n*COMO DEFINIR MINHA SENHA DE ACESSO AO APLICATIVO VALE FEIRA:*\n\n• Baixe o aplicativo VALE FEIRA, disponível para \n*Android*\n https://play.google.com/store/apps/details?id=br.com.topcard.vale_feira&hl=pt_BR \n\n*iOS*\n https://apps.apple.com/br/app/vale-feira/id1624528626 .\n\n• Após baixar, acesse o aplicativo VALE FEIRA.\n• Clique em "Cadastrar" para novo cadastro ou "Redefinir minha senha" caso já tenha cadastro.\n• Escolha como deseja definir a senha (SMS ou e-mail).\n• Ao definir a nova senha:\n  - No campo "Usuário", informe seu CPF.\n  - A nova senha deve conter letras, números e um caractere especial (Ex.: andressa@2023).\n\n---\n\n*REDEFINIÇÃO DA SENHA DE 4 DÍGITOS DO CARTÃO:*\n\n• Para redefinir, é necessário ter seu e-mail devidamente cadastrado.\n• Com o e-mail cadastrado, siga os passos:\n  - Acesse o aplicativo VALE FEIRA;\n  - No canto superior esquerdo, acesse o menu (ícone de três linhas);\n  - Clique em "Alterar Senha";\n  - Selecione "Alterar Senha do Cartão" e siga as instruções.\n\n---\n\nEm caso de dúvidas, entre em contato informando seu e-mail e CPF:\n📱 (28) 99996-2186`;

        try {
            await client.sendMessage(numeroFormatado, mensagem);
            console.log(`✅ Mensagem enviada para ${contato.nome} - ${contato.numero}`);
        } catch (error) {
            console.error(`❌ Erro ao enviar para ${contato.nome} - ${contato.numero}:`, error);
        }

        await new Promise(resolve => setTimeout(resolve, 5000)); // Pausa de 5s entre envios
    }

    console.log('✅ Envio concluído!');
    client.destroy(); // Finaliza o bot após envio
});

// Iniciar o cliente
client.initialize();