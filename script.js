document.addEventListener('DOMContentLoaded', function() {
    // Rolagem suave para links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Inicialização do EmailJS
    emailjs.init("g1c7VypWC9g4u7QPl");

    // Tratamento do formulário de contato
    const formularioContato = document.getElementById('formulario-contato');
    if (formularioContato) {
        formularioContato.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = {
                to_name: "Samuel",
                from_name: this.nome.value,
                message: `
                    Nome: ${this.nome.value}
                    Renda: R$ ${this.renda.value}
                    Tipo de Renda: ${this.tipo_renda.value}
                    Dependentes: ${this.dependentes.value}
                    Carteira Assinada +3 anos: ${this.carteira_assinada.value}
                    Contato: ${this.contato.value}
                `
            };

            emailjs.send('service_z2zcv1n', 'template_4xe9kbz', formData)
                .then(function() {
                    alert('Mensagem enviada com sucesso!');
                    formularioContato.reset();
                }, function(error) {
                    alert('Erro ao enviar mensagem. Por favor, tente novamente.');
                    console.error('Erro:', error);
                });
        });
    }

    // Animação de scroll para elementos
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.75) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    });
});