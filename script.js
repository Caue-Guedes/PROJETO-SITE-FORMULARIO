document.getElementById("form-contato").addEventListener("submit", function(e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();
  const retorno = document.getElementById("retorno-formulario");

  if (nome === "" || email === "" || mensagem === "") {
    retorno.style.color = "red";
    retorno.textContent = "Por favor, preencha todos os campos.";
    return;
  }

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailValido.test(email)) {
    retorno.style.color = "red";
    retorno.textContent = "Formato de e-mail inválido.";
    return;
  }

  retorno.style.color = "green";
  retorno.textContent = "Mensagem enviada com sucesso!";

  // (Opcional) Limpar os campos
  document.getElementById("form-contato").reset();
});
