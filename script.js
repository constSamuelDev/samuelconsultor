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
        if (!formulario) return;

        const campoQtdDependentes = document.getElementById('quantidade_dependentes');
        const inputQtdDependentes = document.getElementById('dependentes');

        document.querySelectorAll('input[name="tem_dependentes"]').forEach(radio => {
            radio.addEventListener('change', () => {
                const temDependentes = radio.value === 'Sim';
                campoQtdDependentes.style.display = temDependentes ? 'flex' : 'none';
                inputQtdDependentes.required = temDependentes;
                if (!temDependentes) inputQtdDependentes.value = '';
            });
        });

        formulario.addEventListener('submit', async function(e) {
            e.preventDefault();

            const dadosFormulario = {
                to_name: "Samuel",
                from_name: this.nome.value,
                message: `
                    Nome: ${this.nome.value}
                    Data de Nascimento: ${this.nascimento.value}
                    Renda Mensal: R$ ${this.renda.value}
                    Tipo de Renda: ${this.tipo_renda.value}
                    Possui Dependentes: ${this.tem_dependentes.value}
                    ${this.tem_dependentes.value === 'Sim' ? `Quantidade de Dependentes: ${this.dependentes.value}` : ''}
                    Experiência CLT +3 anos: ${this.carteira_assinada.value}
                    Contato: ${this.contato.value}
                `
            };

            try {
                await emailjs.send('service_z2zcv1n', 'template_4xe9kbz', dadosFormulario);
                mostrarNotificacao('Que ótimo! Recebemos seus dados e logo entraremos em contato para ajudar você a conquistar seu sonho! 🏠');
                formulario.reset();
            } catch (erro) {
                console.error('Erro:', erro);
                mostrarNotificacao('Ops! Algo deu errado no envio. Poderia tentar novamente? 🙏', false);
            }
        });
    };

    navegacaoSuave();
    gerenciarFormulario();
});