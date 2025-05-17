const form = document.getElementById('contact-form');
const successMessage = document.getElementById('form-success');

form.addEventListener('submit', async (e) => {
  e.preventDefault(); // previne o envio padrão do form

  const data = {
    user_name: form.user_name.value,
    user_phone: form.user_phone.value,
    user_email: form.user_email.value,
    subject: form.subject.value,
    message: form.message.value,
  };

  try {
    const response = await fetch('http://localhost:3000/send-email', { // ajuste a URL se seu backend estiver em outro lugar
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      successMessage.style.display = 'block'; // mostra mensagem de sucesso
      form.reset(); // limpa o formulário
    } else {
      alert('Erro: ' + result.message);
    }
  } catch (error) {
    alert('Erro ao enviar a mensagem, tente novamente.');
    console.error('Erro:', error);
  }
});
