# 💜 BTS Argentina Fan Page

Fanpage oficial de BTS para la comunidad ARMY de Argentina, Brasil y Latinoamérica. Una plataforma moderna y completa con soporte multiidioma, noticias, galería comunitaria y más.

## ✨ Características

### 🌍 Sistema Multiidioma
- Soporte para Español, Portugués e Inglés
- Navegación y contenido personalizado por región
- Sistema de internacionalización con `next-intl`

### 📰 Sistema de Noticias
- **Web Scraping Automático**: Extracción de noticias de Weverse y BigHit Music
- **Sistema de Aprobación**: Moderación de contenido antes de publicación
- **Categorización**: Noticias organizadas por categoría (Weverse, Oficial, General, etc.)
- **Imágenes**: Soporte para imágenes en artículos

### 💬 Sistema de Comentarios
- Comentarios en noticias con moderación
- Sistema de aprobación para comentarios
- Interfaz intuitiva para dejar comentarios

### 🖼️ Galería Comunitaria
- Los fans pueden subir y compartir fotos
- Sistema de moderación para fotos
- Sistema de "me gusta" en fotos

### 👨‍💼 Panel de Administración
- **Estadísticas**: Dashboard con métricas del sitio
- **Gestión de Noticias**: Aprobar/rechazar noticias scrapeadas
- **Gestión de Scraper**: Ejecutar y monitorear web scrapers
- **Moderación**: Gestión de comentarios y galería
- **Logs**: Historial de ejecuciones del scraper

## 🛠️ Tecnologías

- **Framework**: Next.js 15 (App Router)
- **Lenguaje**: TypeScript
- **Estilizado**: Tailwind CSS
- **Base de Datos**: Supabase (PostgreSQL)
- **Autenticación**: Supabase Auth
- **Web Scraping**: Playwright
- **Internacionalización**: next-intl

## 📁 Estructura del Proyecto

```
bts-arg-fanpage/
├── src/
│   ├── app/
│   │   ├── [locale]/              # Rutas con soporte multiidioma
│   │   │   ├── admin/             # Panel de administración
│   │   │   │   ├── approve-news/  # Aprobar noticias
│   │   │   │   ├── stats/         # Estadísticas
│   │   │   │   ├── scraper/       # Gestión de scraper
│   │   │   │   └── gallery/       # Moderación de galería
│   │   │   ├── news/              # Noticias
│   │   │   ├── community/         # Comunidad
│   │   │   ├── login/             # Autenticación
│   │   │   └── ...
│   │   └── api/                   # API Routes
│   │       ├── news/              # CRUD de noticias
│   │       ├── comments/          # Gestión de comentarios
│   │       ├── gallery/           # Gestión de galería
│   │       ├── stats/             # Estadísticas
│   │       └── scraper/           # Web scraper
│   ├── components/
│   │   ├── layout/                # Componentes de layout
│   │   ├── comments/              # Componente de comentarios
│   │   └── gallery/               # Componente de galería
│   ├── services/
│   │   └── newsService.ts         # Servicio de noticias
│   ├── lib/
│   │   └── supabase/              # Configuración de Supabase
│   └── scripts/
│       └── scraper/               # Scripts de web scraping
├── messages/                      # Traducciones (es, en, pt)
└── public/                        # Archivos estáticos
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18 o superior
- npm o yarn
- Cuenta de Supabase

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/bts-arg-fanpage.git
cd bts-arg-fanpage
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
```

### 4. Configurar la base de datos
Ejecuta el script SQL en tu proyecto de Supabase:
```bash
# El archivo está en: src/lib/supabase/schema.sql
```

Este script creará las siguientes tablas:
- `news` - Noticias y artículos
- `tour_dates` - Fechas de tours
- `profiles` - Perfiles de usuarios
- `scraper_logs` - Logs del scraper
- `comments` - Comentarios en noticias
- `gallery` - Galería de fotos
- `reactions` - Reacciones a noticias
- `admin_users` - Usuarios administradores

### 5. Ejecutar en desarrollo
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📡 API Endpoints

### Noticias
- `GET /api/news` - Obtener noticias (con paginación y filtros)
- `POST /api/news` - Crear nueva noticia
- `GET /api/news/[id]` - Obtener noticia por ID
- `PUT /api/news/[id]` - Actualizar noticia
- `DELETE /api/news/[id]` - Eliminar noticia
- `PATCH /api/news/[id]` - Aprobar/rechazar noticia

### Comentarios
- `GET /api/comments?news_id=[id]` - Obtener comentarios de una noticia
- `POST /api/comments` - Crear comentario
- `PATCH /api/comments/[id]` - Aprobar/rechazar comentario
- `DELETE /api/comments/[id]` - Eliminar comentario

### Galería
- `GET /api/gallery` - Obtener fotos (con paginación)
- `POST /api/gallery` - Subir foto

### Scraper
- `GET /api/scraper/run?source=[weverse|bighit|all]&locale=[es|en|pt]` - Ejecutar scraper
- `GET /api/scraper/logs` - Obtener logs del scraper

### Estadísticas
- `GET /api/stats` - Obtener estadísticas del sitio

## 🤖 Web Scraping

### Ejecución Manual
Puedes ejecutar el scraper de dos formas:

1. **Desde el panel de admin** (http://localhost:3000/admin/scraper)
2. **Desde la línea de comandos**:
```bash
npm run scrape:news
```

### Fuentes de Noticias
- **Weverse**: Publicaciones oficiales de BTS
- **BigHit Music**: Avisos oficiales

### Automatización (Opcional)
Para ejecutar el scraper automáticamente, puedes configurar un cron job o usar Vercel Cron Jobs:

```javascript
// En vercel.json
{
  "crons": [{
    "path": "/api/scraper/run?source=all&locale=es",
    "schedule": "0 */6 * * *"  // Cada 6 horas
  }]
}
```

## 👥 Panel de Administración

Para acceder al panel de administración:

1. Ve a http://localhost:3000/admin
2. Las siguientes funciones están disponibles:
   - **Aprobar Noticias**: Revisa y aprueba noticias scrapeadas
   - **Estadísticas**: Visualiza métricas del sitio
   - **Gestión de Scraper**: Ejecuta y monitorea scrapers
   - **Moderar Galería**: Aprueba fotos de la comunidad

## 🎨 Personalización de Diseño

El diseño utiliza variables CSS personalizadas. Puedes modificar los colores en `src/app/globals.css`:

```css
:root {
  --color-primary: 174 74% 60%;        /* Morado BTS */
  --color-primary-light: 174 74% 70%;
  --color-background: 240 10% 3.9%;    /* Fondo oscuro */
  --color-surface: 240 4.9% 12%;       /* Superficies */
  /* ... más variables */
}
```

## 🌐 Despliegue

### Vercel (Recomendado)
```bash
# Instala Vercel CLI
npm i -g vercel

# Despliega
vercel
```

### Variables de entorno en producción
No olvides configurar las siguientes variables en tu plataforma de hosting:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 🔒 Seguridad

- Las noticias scrapeadas requieren aprobación manual
- Los comentarios pasan por moderación
- Las fotos de galería son revisadas antes de publicarse
- Implementa autenticación para el panel de admin en producción

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.

## 💜 Créditos

Desarrollado con amor por la comunidad ARMY para la comunidad ARMY.

**BTS and ARMY Forever! 💜**

---

## 📞 Contacto

Para preguntas o sugerencias, abre un issue en GitHub.

## 🔮 Roadmap

- [ ] Sistema de notificaciones push
- [ ] Chat en vivo para eventos
- [ ] Sistema de eventos y meetups
- [ ] Integración con redes sociales
- [ ] App móvil con React Native
- [ ] Marketplace de merchandising oficial
- [ ] Sistema de recompensas para usuarios activos
