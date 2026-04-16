/**
 * LN Store - Script Principal de Interação
 * Desenvolvido para alta conversão e performance.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       1. CABEÇALHO INTELIGENTE (STICKY HEADER)
       ========================================================================== */
    const header = document.getElementById('header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.background = 'rgba(2, 2, 2, 0.98)';
                header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.8)';
                header.style.padding = '5px 0'; 
            } else {
                header.style.background = 'rgba(3, 3, 3, 0.85)';
                header.style.boxShadow = 'none';
                header.style.padding = '0'; 
            }
        });
    }

    /* ==========================================================================
       2. ROLAGEM SUAVE COM CÁLCULO DE OFFSET (SMOOTH SCROLL)
       ========================================================================== */
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#' || !targetId.startsWith('#')) return;

            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                const headerHeight = header ? header.offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20; 
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    /* ==========================================================================
       3. ALGORITMO DO POPUP DE VENDAS (GATILHO DE PROVA SOCIAL)
       ========================================================================== */
    const salesPopup = document.getElementById('sales-popup');
    const popupText = document.getElementById('popup-text');
    const popupTime = document.getElementById('popup-time');
    const closePopupBtn = document.getElementById('close-popup');

    const salesData = [
        { name: "Matheus", state: "SP", item: "Camisa Real Madrid 24/25", time: "agora mesmo" },
        { name: "Lucas", state: "RJ", item: "Camisa Flamengo Jogador", time: "há 2 minutos" },
        { name: "Pedro", state: "MG", item: "Camisa Arsenal Home", time: "há 5 minutos" },
        { name: "Gabriel", state: "BA", item: "Camisa Bahia Esquadrão", time: "agora mesmo" },
        { name: "Rafael", state: "PR", item: "Camisa Manchester City", time: "há 1 minuto" },
        { name: "Thiago", state: "SC", item: "Camisa Barcelona Retrô", time: "há 3 minutos" },
        { name: "Bruno", state: "GO", item: "Camisa Seleção Brasileira", time: "há 10 minutos" },
        { name: "Felipe", state: "CE", item: "Camisa Manchester United", time: "agora mesmo" },
        { name: "Rodrigo", state: "PE", item: "Camisa Inter de Milão", time: "há 4 minutos" },
        { name: "Diego", state: "RS", item: "Camisa Grêmio Imortal", time: "há 7 minutos" }
    ];

    let lastIndex = -1;
    let popupInterval;
    let hideTimeout;

    function getRandomSale() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * salesData.length);
        } while (newIndex === lastIndex);
        
        lastIndex = newIndex;
        return salesData[newIndex];
    }

    function showPopup() {
        if (!salesPopup) return;
        const sale = getRandomSale();
        
        popupText.innerHTML = `<strong>${sale.name} (${sale.state})</strong> convocou:<br><span style="color: var(--primary-blue); font-weight: 800;">${sale.item}</span>`;
        popupTime.textContent = sale.time;

        salesPopup.classList.add('show');

        hideTimeout = setTimeout(() => {
            hidePopup();
        }, 6000);
    }

    function hidePopup() {
        if (salesPopup) salesPopup.classList.remove('show');
    }

    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', () => {
            hidePopup();
            clearTimeout(hideTimeout);
            clearInterval(popupInterval); 
            setTimeout(startPopupCycle, 45000); 
        });
    }

    function startPopupCycle() {
        popupInterval = setInterval(() => {
            showPopup();
        }, 15000);
    }

    setTimeout(() => {
        showPopup();
        startPopupCycle();
    }, 4000);

    /* ==========================================================================
       4. DRAG TO SCROLL (ARRASTAR PARA ROLAR NAS AVALIAÇÕES)
       ========================================================================== */
    const slider = document.querySelector('.reviews-track');
    
    if (slider) {
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.style.cursor = 'grabbing';
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.style.cursor = 'grab';
            slider.classList.remove('active');
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.style.cursor = 'grab';
            slider.classList.remove('active');
        });

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2; 
            slider.scrollLeft = scrollLeft - walk;
        });
        
        slider.style.cursor = 'grab';
    }

    /* ==========================================================================
       5. CAPTURA DE LEADS (FORMULÁRIO CLUBE VIP)
       ========================================================================== */
    const vipForm = document.getElementById('vipForm');

    if (vipForm) {
        vipForm.addEventListener('submit', function(e) {
            e.preventDefault(); 

            const emailInput = this.querySelector('input[type="email"]');
            const btnSubmit = this.querySelector('button[type="submit"]');
            
            if (!emailInput.value) return;

            const originalBtnText = btnSubmit.innerHTML;
            
            btnSubmit.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processando...';
            btnSubmit.disabled = true;
            btnSubmit.style.opacity = '0.8';

            setTimeout(() => {
                btnSubmit.innerHTML = '<i class="fa-solid fa-check"></i> Bem-vindo ao Clube!';
                btnSubmit.style.background = 'var(--success-green)';
                btnSubmit.style.color = '#fff';
                
                emailInput.value = ''; 
                
                setTimeout(() => {
                    btnSubmit.innerHTML = originalBtnText;
                    btnSubmit.disabled = false;
                    btnSubmit.style.opacity = '1';
                    btnSubmit.style.background = 'var(--bg-base)';
                }, 3000);

            }, 1500);
        });
    }

    /* ==========================================================================
       6. INTERAÇÃO DOS HOTSPOTS (DETALHES DA CAMISA COM BOTÕES "+")
       ========================================================================== */
    const hotspots = document.querySelectorAll('.hotspot');
    const imageContainer = document.querySelector('.tech-image-container');

    // Textos informativos para cada botão
    const hotspotData = {
        'hs-1': { title: 'Bordado Premium', desc: 'Símbolo bordado em alta definição, garantindo durabilidade máxima nas lavagens.' },
        'hs-2': { title: 'Etiquetas Oficiais', desc: 'Tags e etiquetas internas 1:1, idênticas ao modelo de loja oficial.' },
        'hs-3': { title: 'Escudo em HD', desc: 'Escudo do clube aplicado com precisão cirúrgica e textura original.' }
    };

    hotspots.forEach(hotspot => {
        hotspot.addEventListener('click', function(e) {
            e.stopPropagation(); // Evita que o clique feche o balão imediatamente

            // 1. Remove qualquer balão aberto anteriormente
            const existingTooltip = document.querySelector('.hotspot-tooltip');
            if (existingTooltip) existingTooltip.remove();

            // 2. Descobre qual botão foi clicado (hs-1, hs-2 ou hs-3)
            let currentId = '';
            this.classList.forEach(cls => {
                if(cls.startsWith('hs-')) currentId = cls;
            });

            // 3. Cria e injeta o novo balão
            if(currentId && hotspotData[currentId]) {
                const tooltip = document.createElement('div');
                tooltip.className = 'hotspot-tooltip';
                tooltip.innerHTML = `<strong>${hotspotData[currentId].title}</strong><span>${hotspotData[currentId].desc}</span>`;
                
                // Coloca o balão dentro do container da imagem
                imageContainer.appendChild(tooltip);

                // Posiciona o balão exatamente em cima do botão clicado
                tooltip.style.left = this.offsetLeft + 17 + 'px'; // 17px compensa o centro do botão
                tooltip.style.top = this.offsetTop + 'px';

                // Troca o ícone temporariamente
                const icon = this.querySelector('i');
                const oldIconClass = icon.className;
                icon.className = 'bx bx-check';
                
                setTimeout(() => { icon.className = oldIconClass; }, 2000);
            }
        });
    });

    // Fecha o balão se o usuário clicar em qualquer outro lugar da página
    document.addEventListener('click', function() {
        const existingTooltip = document.querySelector('.hotspot-tooltip');
        if (existingTooltip) existingTooltip.remove();
    });

});