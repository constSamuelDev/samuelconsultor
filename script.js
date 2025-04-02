document.addEventListener('DOMContentLoaded', function() {
    emailjs.init("g1c7VypWC9g4u7QPl");

    // Restaurando navegação suave
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            document.querySelector(link.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Gerenciamento do formulário
    const formulario = document.getElementById('formulario-contato');
    const campoQtdDependentes = document.getElementById('quantidade_dependentes');
    const inputQtdDependentes = document.getElementById('dependentes');

    // Gerenciamento dos dependentes
    document.querySelectorAll('input[name="tem_dependentes"]').forEach(radio => {
        radio.addEventListener('change', () => {
            const temDependentes = radio.value === 'Sim';
            campoQtdDependentes.style.display = temDependentes ? 'flex' : 'none';
            inputQtdDependentes.required = temDependentes;
            if (!temDependentes) inputQtdDependentes.value = '';
        });
    });

    // Nova lógica de envio do formulário
    if (formulario) {
        formulario.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitButton = this.querySelector('button[type="submit"]');
            submitButton.disabled = true;

            const formData = new FormData(this);
            const templateParams = {
                to_name: "Samuel",
                from_name: formData.get('nome'),
                message: `
                    Nome: ${formData.get('nome')}
                    Data de Nascimento: ${formData.get('dia')}/${formData.get('mes')}/${formData.get('ano')}
                    Renda Mensal: R$ ${formData.get('renda')}
                    Tipo de Renda: ${formData.get('tipo_renda')}
                    Possui Dependentes: ${formData.get('tem_dependentes') || 'Não'}
                    ${formData.get('tem_dependentes') === 'Sim' ? `Quantidade de Dependentes: ${formData.get('dependentes')}` : ''}
                    Experiência CLT +3 anos: ${formData.get('carteira_assinada') || 'Não'}
                    Contato: ${formData.get('contato')}
                `
            };

            emailjs.send('service_z2zcv1n', 'template_4xe9kbz', templateParams)
                .then(() => {
                    Toastify({
                        text: "Que ótimo! Recebemos seus dados e logo entraremos em contato para ajudar você a conquistar seu sonho! 🏠",
                        duration: 5000,
                        gravity: "top",
                        position: "center",
                        style: {
                            background: "#48bb78",
                            borderRadius: "10px",
                            padding: "1rem",
                            fontSize: "1.1rem"
                        }
                    }).showToast();
                    this.reset();
                })
                .catch((error) => {
                    console.error('Erro no envio:', error);
                    Toastify({
                        text: "Ops! Algo deu errado no envio. Poderia tentar novamente? 🙏",
                        duration: 5000,
                        gravity: "top",
                        position: "center",
                        style: {
                            background: "#e53e3e",
                            borderRadius: "10px",
                            padding: "1rem",
                            fontSize: "1.1rem"
                        }
                    }).showToast();
                })
                .finally(() => {
                    submitButton.disabled = false;
                });
        });
    }
});