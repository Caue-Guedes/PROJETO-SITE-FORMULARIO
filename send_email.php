<?php
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = filter_input(INPUT_POST, 'nome', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $assunto = filter_input(INPUT_POST, 'assunto', FILTER_SANITIZE_STRING);
    $mensagem = filter_input(INPUT_POST, 'mensagem', FILTER_SANITIZE_STRING);
    
    $destinatario = "caue.guedes@escola.pr.gov.br";
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    $corpo = "Nome: $nome\n";
    $corpo .= "Email: $email\n\n";
    $corpo .= "Assunto: $assunto\n\n";
    $corpo .= "Mensagem:\n$mensagem";
    
    if (mail($destinatario, "Contato do Site: $assunto", $corpo, $headers)) {
        echo json_encode(['success' => true, 'message' => 'Mensagem enviada com sucesso!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Erro ao enviar mensagem.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método não permitido.']);
}
?>
