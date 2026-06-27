// Importações necessárias
const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const client = new Client();

// Armazenamento de saudações e horários de resposta
const saudacoesRespondidas = {}; // Para armazenar quando uma saudação foi respondida

// Lista de respostas neutras
const respostasNeutras = ['ta jóia', 'beleza', 'ok', 'tudo certo', 'tranquilo', 'tudo bem'];

// Início do serviço de leitura de QR Code
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

// Após a conexão ser estabelecida
client.on('ready', () => {
    console.log('Tudo certo! WhatsApp conectado.');
});

client.initialize();

// Função de delay para simular digitação
const delay = ms => new Promise(res => setTimeout(res, ms));

// Função para verificar cooldown
const verificarCooldown = (mensagem, user) => {
    const tempoAgora = Date.now();
    const cooldownTempo = 1800000; // 30 minutos (em milissegundos)

    if (saudacoesRespondidas[user] && tempoAgora - saudacoesRespondidas[user] < cooldownTempo) {
        return true; // Já respondeu recentemente
    }

    // Caso contrário, registra o horário da resposta
    saudacoesRespondidas[user] = tempoAgora;
    return false; // Não foi respondido recentemente
};

// Função para verificar se a mensagem é uma saudação genuína
const isSaudacao = (mensagem) => {
    // Verifica se a mensagem contém palavras-chave de saudação e não está na lista de respostas neutras
    return /(bom dia|boa tarde|boa noite|ei|oi|ola|opa|olá)/i.test(mensagem) && !respostasNeutras.includes(mensagem.toLowerCase());
};

// Funil de mensagens
client.on('message', async msg => {
    if (isSaudacao(msg.body) && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();

        // Verifica se a saudação já foi respondida recentemente
        if (verificarCooldown(msg.body, msg.from)) {
            console.log('Mensagem de saudação já respondida recentemente.');
            return; // Não responde novamente
        }

        await delay(2000); // Simulando digitação
        await chat.sendStateTyping();
        await delay(2000);

        const contact = await msg.getContact();
        const name = contact.pushname;
        await client.sendMessage(msg.from, `Olá! ${name.split(" ")[0]} Como posso ajudá-lo? Por favor, digite uma das opções abaixo:\n\n1 - Atualização Cadastral\n2 - Acesso ao Contracheque\n3 - Imposto de Renda\n4 - Vale Feira\n5 - Certidão de Tempo de Serviço\n6 - Informações Sobre PASEP\n7 - Número funcional ou Matrícula\n8 - Outras Dúvidas.`);
        saudacoesRespondidas[msg.from] = Date.now(); // Marca a resposta no histórico
    }

    if (msg.body === '1' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(2000);
        await chat.sendStateTyping();
        await delay(2000);
        await client.sendMessage(msg.from, '*Atualização Cadastral Mês de Aniversário*\n\n*Formulário de Informações Pessoais Atualização Cadastral RH-PMG*\n\nPor favor, preencha os campos abaixo:\nNome Completo:\nData de Nascimento:\nEndereço:\nEstado Civil:\nGrau de Instrução:\nTrocou algum documento com troca de emissão?\nNúmero de Dependentes:\nDeseja declarar alguma religião?\nEmail:');
    }

    if (msg.body === '2' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(2000);
        await chat.sendStateTyping();
        await delay(2000);
        await client.sendMessage(msg.from, '*PORTAL DO SERVIDOR*\n\n https://servicos1.cloud.el.com.br/es-guacui-pm/portal/\n\n Ou acesse o site da Prefeitura Municipal de Guaçuí-ES > Portal do Servidor \n\n*PRIMEIRO ACESSO É CPF NO LOGIN E CPF NA SENHA! (SOMENTE NÚMERO)*');
        await delay(2000);
        await chat.sendStateTyping();
        await delay(2000);
        await client.sendMessage(msg.from, 'Se precisar redefinir sua senha, por favor, nos informe seu nome completo e aguarde a redefinição da senha para ter acesso ao contracheque.');
    }

  if (msg.body === '3' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(2000);
        await chat.sendStateTyping();
        await delay(2000);
        await client.sendMessage(msg.from, 'Acesse o PORTAL DO SERVIDOR\n\n Clique em COMPROVANTE DE RENDIMENTO e selecione o ano desejado\n\n Qualquer outra dúvida digite "7" e aguarde o atendimento.\n\n\n*PORTAL DO SERVIDOR*\n\n https://servicos1.cloud.el.com.br/es-guacui-pm/portal/\n\n Ou acesse o site da Prefeitura Municipal de Guaçuí-ES > Portal do Servidor \n\n*PRIMEIRO ACESSO É CPF NO LOGIN E CPF NA SENHA! (SOMENTE NÚMERO)*');
    }

    if (msg.body === '4' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(2000);
        await chat.sendStateTyping();
        await delay(2000);
        await client.sendMessage(msg.from, '*Vale Feira - Instruções para Cadastro e Redefinição de Senha*\n\n1. Se você é um servidor novo e ainda não possui cartão, aguarde o cadastro na TopCard. Entraremos em contato assim que o acesso for liberado.\n\n2. Se seu cartão encontra-se bloqueado, aguarde o desbloqueio realizado pela contabilidade.\n\nSegue abaixo as instruções sobre cadastro e redefinição de senha:\n\n**Cadastro e Redefinição de Senha no Aplicativo VALE FEIRA:**\n\n• Baixe o aplicativo VALE FEIRA, disponível para \n*Android* \n https://play.google.com/store/apps/details?id=br.com.topcard.vale_feira&hl=pt_BR e \n*iOS* \n https://apps.apple.com/br/app/vale-feira/id1624528626 .\n\n• Após baixar, acesse o aplicativo e clique em Cadastrar ou Redefinir minha senha.\n• Escolha o método para definir sua senha (SMS ou e-mail).\n• A senha deve conter letras, números e um caractere especial (exemplo: andressa@2023).\n\n**Redefinir Senha de 4 Dígitos do Cartão:**\n\n• Para redefinir sua senha de 4 dígitos, é necessário ter um e-mail cadastrado.\n• Acesse o aplicativo VALE FEIRA, clique no menu no canto superior esquerdo e selecione ALTERAR SENHA.\n• Siga as instruções para alteração.\n\nCaso tenha dúvidas, entre em contato conosco pelo telefone (28)99996-2186 e informe seu e-mail e CPF.');
    }

    if (msg.body === '5' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(2000);
        await chat.sendStateTyping();
        await delay(2000);
        await client.sendMessage(msg.from, 'Para gerar sua Certidão de Tempo de Serviço, informe seu nome completo e aguarde o envio.');
    }

    if (msg.body === '6' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(2000);
        await chat.sendStateTyping();
        await delay(2000);
        await client.sendMessage(msg.from, 'Para obter informações sobre o PASEP, siga uma das opções abaixo:\n\n1. Acesse o aplicativo da **Carteira de Trabalho Digital** e clique em **Abono Salarial**.\n\n2. Ou acesse o **Portal Emprega Brasil** através deste link: [https://servicos.mte.gov.br/spme-v2/#/login](https://servicos.mte.gov.br/spme-v2/#/login) (site do Governo).');
    }
   
    if (msg.body === '7' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(2000);
        await chat.sendStateTyping();
        await delay(2000);
        await client.sendMessage(msg.from, 'Pode consultar a matrícula através da opção "2", acessando o contracheque, ou pelo portal da transparência "https://guacui-es.portaltp.com.br/consultas/pessoal/servidores.aspx"\n\nCaso seu cadastro tenha sido feito neste mês, aguarde o fechamento da folha de pagamento.');
    }

    if (msg.body === '8' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(2000);
        await chat.sendStateTyping();
        await delay(2000);
        await client.sendMessage(msg.from, 'Caso tenha alguma outra dúvida, estamos à disposição para ajudar. Informe como podemos auxiliá-lo!');
    }

    if (msg.body.match(/(obrigado|Obrigado|OBRIGADO|obrigada|Obrigada|OBRIGADA|Obg)/i) && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();

        await delay(2000); //delay de 2 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(2000); //Delay de 2000 milisegundos mais conhecido como 2 segundos
        const contact = await msg.getContact(); //Pegando o contato
        const name = contact.pushname; //Pegando o nome do contato
        await client.sendMessage(msg.from, 'Disponha! Se tiver qualquer dúvida, não hesite em nos contatar.'); //Primeira mensagem de texto
    }
});
