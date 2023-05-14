const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');
let reminders = [];

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = input.value.trim();
  if (message) {
    const botMessage = document.createElement('li');
    botMessage.textContent = `Você: ${message}`;
    messages.appendChild(botMessage);
    input.value = '';
    generateResponse(message);
  }
});
//essa função e aonde e adcionado os comandos
function generateResponse(message) {
  if (message.toLowerCase().includes('oi') || message.toLowerCase().includes('olá')) {
    const response = `
      Olá, como posso ajudar?
      Meus comandos são:
      - calendário: exibe sua agenda para o mês atual
      - hoje: exibe sua agenda para o dia de hoje
      - horários: exibe seus horários livres para o dia de hoje
      - datas livres: exibe suas datas livres para o mês atual
      - lembrar: adiciona um novo lembrete à sua agenda
      - listar lembretes: lista todos os seus lembretes salvos
      - esquecer : remove todos os seus lembretes salvos
    `;
    displayBotMessage(response);
  } else if (message.toLowerCase().includes('calendário')) {
    const response = 'Sua agenda para o mês atual é: ...';
    displayBotMessage(response);
  } else if (message.toLowerCase().includes('hoje')) {
    const response = 'Sua agenda para hoje é: ...';
    displayBotMessage(response);
  } else if (message.toLowerCase().includes('horários')) {
    const response = 'Seus horários livres para hoje são: ...';
    displayBotMessage(response);
  } else if (message.toLowerCase().includes('datas livres')) {
    const response = 'Suas datas livres para o mês atual são: ...';
    displayBotMessage(response);
  } else if (message.toLowerCase().includes('lembrar')) {
    const reminderMessage = message.replace('lembrar', '').trim();
    if (reminderMessage) {
      addReminder(reminderMessage);
    } else {
      const response = 'Por favor, especifique o lembrete que deseja adicionar.';
      displayBotMessage(response);
    }
  } else if (message.toLowerCase().includes('listar lembretes')) {
    if (reminders.length > 0) {
      const response = 'Seus lembretes são:';
      displayBotMessage(response);
      reminders.forEach(reminder => {
        displayBotMessage(`- "${reminder.message}" em ${reminder.date.toLocaleString()}`);
      });
    } else {
      const response = 'Você não tem lembretes salvos.';
      displayBotMessage(response);
    }
  } else if (message.toLowerCase().includes('esquecer')) {
    const reminderMessage = message.replace('esquecer', '').trim();
    if (reminderMessage) {
      removeReminder(reminderMessage);
    } else {
      removeAllReminders();
    }
  } else {
    const response = 'Desculpe, não entendi o que você quis dizer.';
    displayBotMessage(response);
  }
}

//aqui estao as funções do bot incluindo a
function addReminder(message) {
  const reminder = {
    message: message,
    date: new Date(),
  };
  reminders.push(reminder);
  displayBotMessage(`Lembrete adicionado: "${reminder.message}" em ${reminder.date.toLocaleString()}`);
}

function displayBotMessage(response) {
  const botMessage = document.createElement('li');
  botMessage.textContent = `Capivara Effort: ${response}`;
  messages.appendChild(botMessage);
}

function removeReminder(message) {
  const index = reminders.findIndex(reminder => reminder.message.toLowerCase() === message.toLowerCase());
  if (index !== -1) {
    const reminder = reminders.splice(index, 1)[0];
    displayBotMessage(`Lembrete removido: "${reminder.message}"`);
  } else {
    const response = 'Não foi possível encontrar um lembrete com a mensagem especificada.';
    displayBotMessage(response);
  }
}

function removeAllReminders() {
  reminders.length = 0;
  const response = 'Todos os lembretes foram removidos.';
  displayBotMessage(response);
}