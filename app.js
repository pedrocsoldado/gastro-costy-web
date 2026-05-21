/* 
===============================================================================
GASTROCOSTY - LÓGICA DE INTERACTIVIDAD & UX (TEMA CLARO & EMOJI-FREE)
Diseño: Experto en Frontend & UX.
Características: Calculadora ROI Reactiva, Simulador Interactiva de Dashboard,
Animaciones On-Scroll (Intersection Observer) y Navegación Móvil.
===============================================================================
*/

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. BARRA DE NAVEGACIÓN ACTIVA AL HACER SCROLL ---
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // --- 2. MENÚ MÓVIL DESPLEGABLE ---
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const isExpanded = navLinks.classList.contains('active');
      navToggle.innerHTML = isExpanded ? '✕' : '☰';
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.innerHTML = '☰';
      });
    });
  }

  // --- 3. CALCULADORA DE ROI REACTIVA ---
  const spendSlider = document.getElementById('spendSlider');
  const spendValue = document.getElementById('spendValue');
  const savingMonth = document.getElementById('savingMonth');
  const savingYear = document.getElementById('savingYear');
  const hoursSaved = document.getElementById('hoursSaved');

  if (spendSlider) {
    const updateCalculator = (value) => {
      const spend = parseFloat(value);
      
      // Formatear valor del Slider en €
      spendValue.textContent = spend.toLocaleString('es-ES') + ' €';
      
      // Lógica de estimaciones en hostelería (3.5% de ahorro medio)
      const monthlySavingsVal = spend * 0.035;
      const annualSavingsVal = monthlySavingsVal * 12;
      
      // Horas de oficina salvadas
      const hoursSavedVal = Math.round(8 + (spend / 2500));

      animateValue(savingMonth, monthlySavingsVal, ' €');
      animateValue(savingYear, annualSavingsVal, ' €');
      animateValue(hoursSaved, hoursSavedVal, ' horas');
    };

    spendSlider.addEventListener('input', (e) => {
      updateCalculator(e.target.value);
    });

    // Inicializar calculadora
    updateCalculator(spendSlider.value);
  }

  function animateValue(element, targetValue, suffix = '') {
    if (!element) return;
    const duration = 400;
    const startTime = performance.now();
    const startValue = parseFloat(element.getAttribute('data-value') || '0');
    element.setAttribute('data-value', targetValue);

    function updateNumber(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress * (2 - progress);
      const currentValue = startValue + (targetValue - startValue) * easeProgress;
      
      if (suffix.includes('€')) {
        element.textContent = Math.round(currentValue).toLocaleString('es-ES') + suffix;
      } else {
        element.textContent = Math.round(currentValue) + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      }
    }

    requestAnimationFrame(updateNumber);
  }

  // --- 4. SIMULADOR DE INTERFAZ / PANEL DE CONTROL (TEMA CLARO & EMOJI-FREE) ---
  const simButtons = document.querySelectorAll('.sim-step-btn');
  const simPanelContent = document.getElementById('simPanelContent');
  const simPanelHeaderTitle = document.getElementById('simPanelHeaderTitle');

  // Datos para los estados de la simulación
  const simData = {
    step1: {
      title: "1. Escaneo Inteligente (Semáforos OCR)",
      html: `
        <div class="scan-simulation">
          <p style="margin-bottom: 0.5rem; font-size: 0.9rem; color: var(--text-secondary);">
            Los documentos se analizan y clasifican de forma automática en tiempo real:
          </p>
          <div class="sim-flow-item" style="border-left: 4px solid var(--color-warning);">
            <div class="doc-info">
              <span class="doc-name">Albarán #9042 - Carnes Selectas SL</span>
              <span class="doc-date">Procesando lectura OCR y verificando totales...</span>
            </div>
            <span class="semaphore semaphore-yellow">Procesando</span>
          </div>
          <div class="sim-flow-item" style="border-left: 4px solid var(--color-error);">
            <div class="doc-info">
              <span class="doc-name">Factura #F-2026-98 - Verduras Hnos. Ortiz</span>
              <span class="doc-date">Error de lectura: Descuadre aritmético en total</span>
            </div>
            <span class="semaphore semaphore-red">Corregir</span>
          </div>
          <div class="sim-flow-item" style="border-left: 4px solid var(--color-primary);">
            <div class="doc-info">
              <span class="doc-name">Albarán #A-7489 - Distribuciones Rioja</span>
              <span class="doc-date">Lectura e importes validados correctamente</span>
            </div>
            <span class="semaphore semaphore-green">Listo</span>
          </div>
        </div>
      `
    },
    step2: {
      title: "2. Validación Física en Cocina",
      html: `
        <div class="scan-simulation">
          <p style="margin-bottom: 0.5rem; font-size: 0.9rem; color: var(--text-secondary);">
            Los albaranes aceptados por el personal de cocina se marcan como <strong>Validados</strong> y esperan la llegada de la factura.
          </p>
          <div class="sim-flow-item" style="background: rgba(16, 185, 129, 0.02); border: 1px solid rgba(16, 185, 129, 0.1);">
            <div class="doc-info">
              <span class="doc-name">Albarán #ALB-55321 - Pescados del Cantábrico</span>
              <span class="doc-date">Mercancía física revisada y conforme con el papel</span>
            </div>
            <span class="semaphore semaphore-green" style="background: rgba(16, 185, 129, 0.12);">Validado</span>
          </div>
          
          <div class="caza-action-box" style="background: rgba(249, 115, 22, 0.02); border-color: rgba(249, 115, 22, 0.2); margin-top: 1rem;">
            <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-warning)" stroke-width="2" style="margin-top: 2px;">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              <div class="action-text">
                <h5 style="color: var(--color-warning); font-weight: 700; margin: 0 0 0.15rem 0;">Alerta de Anotación Detectada</h5>
                <p>El sistema identificó un tachado manuscrito en <strong>"Pescado de Roca (3kg)"</strong>. Se ha propuesto una reducción del importe total a abonar.</p>
              </div>
            </div>
          </div>
        </div>
      `
    },
    step3: {
      title: "3. La 'Caza' de Precios (Albarán vs Factura)",
      html: `
        <div class="caza-box">
          <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 0.5rem;">
            Gastrocosty compara automáticamente el precio unitario del albarán contra la factura del proveedor:
          </p>
          <div class="caza-table" style="background: white; border-radius: 10px; overflow: hidden; border: 1px solid var(--border-light); box-shadow: 0 4px 10px rgba(0,0,0,0.01);">
            <div class="caza-row header">
              <div>Artículo</div>
              <div>Albarán</div>
              <div>Factura</div>
              <div>Descuadre</div>
            </div>
            <div class="caza-row">
              <div style="font-weight: 600;">Leche Entera 1L (Puleva)</div>
              <div>0,90 €</div>
              <div style="color: var(--color-error); font-weight: 700;">0,98 €</div>
              <div class="caza-diff" style="display: flex; align-items: center; gap: 0.25rem;">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                  <polyline points="18 15 12 9 6 15"/>
                </svg>
                +8,8%
              </div>
            </div>
            <div class="caza-row">
              <div style="font-weight: 600;">Aceite Oliva Virgen 5L</div>
              <div>34,50 €</div>
              <div style="color: var(--color-error); font-weight: 700;">38,00 €</div>
              <div class="caza-diff" style="display: flex; align-items: center; gap: 0.25rem;">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                  <polyline points="18 15 12 9 6 15"/>
                </svg>
                +10,1%
              </div>
            </div>
            <div class="caza-row" style="border-bottom: none;">
              <div style="font-weight: 600;">Tomate Triturado 5Kg</div>
              <div>6,20 €</div>
              <div style="color: var(--color-primary); font-weight: 600;">6,20 €</div>
              <div style="color: var(--color-primary); font-weight: 700;">Correcto</div>
            </div>
          </div>
          <div class="caza-action-box" style="background: rgba(239, 68, 68, 0.01); border-color: rgba(239, 68, 68, 0.15);">
            <div style="display: flex; gap: 0.75rem; align-items: flex-start; width: 100%;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-error)" stroke-width="2" style="margin-top: 2px; flex-shrink: 0;">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <div class="action-text" style="flex-grow: 1; margin-right: 1.5rem;">
                <h5 style="color: var(--color-error); font-weight: 700; margin: 0 0 0.15rem 0;">Descuadre de Facturación Detectado</h5>
                <p>El proveedor ha facturado 21,50 € de más en la entrega actual. Reclama el importe de forma automática.</p>
              </div>
              <button class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.75rem; border-radius: 8px; flex-shrink: 0;" onclick="alert('¡Reclamación de abono generada y enviada al proveedor!')">Generar Abono</button>
            </div>
          </div>
        </div>
      `
    }
  };

  if (simButtons.length > 0 && simPanelContent) {
    simButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        simButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const stepId = btn.getAttribute('data-step');
        const data = simData[stepId];
        
        if (data) {
          simPanelContent.style.opacity = 0;
          simPanelContent.style.transform = 'translateY(10px)';
          
          setTimeout(() => {
            simPanelHeaderTitle.textContent = data.title;
            simPanelContent.innerHTML = data.html;
            simPanelContent.style.opacity = 1;
            simPanelContent.style.transform = 'translateY(0)';
          }, 200);
        }
      });
    });

    const initialBtn = document.querySelector('.sim-step-btn[data-step="step1"]');
    if (initialBtn) initialBtn.click();
  }

  // --- 5. ANIMACIONES AL HACER SCROLL (Intersection Observer) ---
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach(element => {
      element.classList.add('active');
    });
  }
});
