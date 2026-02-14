# 🏗️ SOCOPER Construcciones SpA — Landing Page

Landing page corporativa premium con modo oscuro para **SOCOPER Construcciones SpA**, constructora residencial de alto estándar en la Región Metropolitana de Santiago, Chile.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

---

## 📋 Descripción

Sitio web de una sola página (SPA) diseñado para transmitir confianza, orden y profesionalismo. Construido con HTML, CSS y JavaScript puros — sin frameworks ni dependencias externas.

El diseño sigue una estética **dark mode premium** con paleta de azul profundo, acentos naranja y efectos de glassmorphism, orientada a posicionar a SOCOPER como una constructora metódica y confiable.

---

## 🗂️ Estructura del Proyecto

```
socoper/
├── index.html              # Estructura HTML principal
├── index.css               # Estilos (dark mode, responsive, animaciones)
├── index.js                # Interactividad (scroll reveal, counters, menú móvil)
├── logo.png                # Logo de la empresa
├── brand_identity_socoper.md  # Documento de identidad de marca
└── README.md               # Este archivo
```

---

## 🎨 Secciones

| Sección | Descripción |
|---------|-------------|
| **Header** | Navegación fija con efecto glassmorphism al hacer scroll, menú hamburguesa responsive |
| **Hero** | Imagen de fondo a pantalla completa con overlay oscuro, título principal y CTAs |
| **Métricas** | Barra de estadísticas con contadores animados (10+ años, 100+ proyectos, 100% entregas) |
| **Nuestro Método** | Timeline de 4 pasos con tarjetas interactivas (Evaluación → Planificación → Ejecución → Entrega) |
| **Servicios** | Grid de 6 servicios con imágenes y descripciones |
| **Proyectos Destacados** | Galería de 3 proyectos con detalles de superficie y tiempo de ejecución |
| **Testimonios** | 3 testimonios de clientes con sistema de estrellas |
| **Quiénes Somos** | Información corporativa con características diferenciadores |
| **CTA / Contacto** | Formulario de contacto + integración con WhatsApp |
| **Footer** | Links de navegación, datos de contacto y redes sociales |

---

## 🛠️ Tecnologías

- **HTML5** semántico con SEO básico (meta tags, estructura de headings)
- **CSS3 puro** con:
  - Custom Properties (variables CSS) como sistema de diseño
  - CSS Grid y Flexbox para layouts
  - Glassmorphism (`backdrop-filter`)
  - Animaciones CSS (`@keyframes`)
  - Diseño fully responsive (mobile-first breakpoints)
- **JavaScript vanilla** con:
  - `IntersectionObserver` para scroll reveal y contadores animados
  - Smooth scroll nativo
  - Menú hamburguesa para mobile
  - Formulario con redirección a WhatsApp
- **Google Fonts** — Inter (300–800)
- **Material Symbols Rounded** — Iconografía

---

## 🎨 Paleta de Colores

| Color | Hex | Uso |
|-------|-----|-----|
| Azul 900 | `#0A1628` | Fondo principal body |
| Azul 800 | `#0D1B2A` | Secciones alternativas |
| Azul 700 | `#112240` | Tarjetas, componentes |
| Azul 600 | `#1B3A5C` | Acentos estructurales |
| Naranja | `#E8712B` | CTAs, acentos, íconos |
| WhatsApp | `#25D366` | Botón WhatsApp |

---

## 🚀 Uso

### Desarrollo local

Simplemente abre `index.html` en tu navegador, o usa un servidor local:

```bash
# Con Python
python -m http.server 8000

# Con Node.js (npx)
npx serve .

# Con VS Code
# Instala la extensión "Live Server" y haz clic en "Go Live"
```

### Despliegue

Al ser un sitio estático, puede desplegarse en cualquier hosting:

- **GitHub Pages** — Sube el repositorio y activa Pages desde Settings
- **Netlify / Vercel** — Arrastra la carpeta o conecta el repositorio
- **Hosting tradicional** — Sube los archivos por FTP

---

## ⚙️ Personalización

### Datos de contacto

Busca y reemplaza los siguientes placeholders en `index.html` y `index.js`:

| Placeholder | Reemplazar con |
|-------------|---------------|
| `569XXXXXXXX` | Número de WhatsApp real (formato: 56912345678) |
| `+56 9 XXXX XXXX` | Número de teléfono visible |
| `contacto@socoper.cl` | Email de contacto |

### Imágenes

Las imágenes actuales provienen de [Unsplash](https://unsplash.com). Para producción, reemplázalas con fotografías reales de los proyectos de la empresa.

---

## 📄 Licencia

© 2026 SOCOPER Construcciones SpA. Todos los derechos reservados.
