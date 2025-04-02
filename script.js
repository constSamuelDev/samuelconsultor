document.addEventListener('DOMContentLoaded', function() {
    emailjs.init("g1c7VypWC9g4u7QPl");

    const navegacaoSuave = () => {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                document.querySelector(link.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    };

    const mostrarNotificacao = (mensagem, sucesso = true) => {
        Toastify({
            text: mensagem,
            duration: 5000,
            gravity: "top",
            position: "center",
            style: {
                background: sucesso ? "#48bb78" : "#e53e3e",
                borderRadius: "10px",
                padding: "1rem",
                fontSize: "1.1rem"
            }
        }).showToast();
    };

    const gerenciarFormulario = () => {
        const formulario = document.getElementById('formulario-contato');
        if (!formulario) {
            console.error('Formulário não encontrado');
            return;
        }

        formulario.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitButton = formulario.querySelector('button[type="submit"]');
            submitButton.disabled = true;

            try {
                const formData = new FormData(formulario);
                const templateParams = {
                    to_name: "Samuel",
                    from_name: formData.get('nome'),
                    message: `
                        Nome: ${formData.get('nome')}
                        Data de Nascimento: ${formData.get('dia')}/${formData.get('mes')}/${formData.get('ano')}
                        Renda Mensal: R$ ${formData.get('renda')}
                        Tipo de Renda: ${formData.get('tipo_renda')}
                        Possui Dependentes: ${formData.get('tem_dependentes')}
                        Experiência CLT +3 anos: ${formData.get('carteira_assinada')}
                        Contato: ${formData.get('contato')}
                    `
                };

                await emailjs.send('service_z2zcv1n', 'template_4xe9kbz', templateParams);
                mostrarNotificacao('Que ótimo! Recebemos seus dados e logo entraremos em contato para ajudar você a conquistar seu sonho! 🏠');
                formulario.reset();
            } catch (erro) {
                console.error('Erro ao enviar:', erro);
                mostrarNotificacao('Ops! Algo deu errado no envio. Poderia tentar novamente? 🙏', false);
            } finally {
                submitButton.disabled = false;
            }
        });
    };

    navegacaoSuave();
    gerenciarFormulario();
});