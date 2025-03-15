# Магазин дверей евро качества

## Завершение SEO-оптимизации

### 1. Замена домена
Необходимо заменить 'https://your-domain.com' на реальный домен сайта в следующих файлах:
- `nuxt.config.ts` (canonical URL, sitemap hostname)
- `components/SchemaMeta.vue` (Organization, WebSite и BreadcrumbList разметка)
- `components/DoorBlog.vue` (ссылки на изображения)
- `public/robots.txt` (Sitemap URL)

### 2. Добавление изображений для блога
Требуется добавить реальные изображения в директорию `/public/images/blog/`:
- `entrance-door-guide.jpg` (800x600px) - для статьи о выборе входной двери
- `entrance-door-materials.jpg` (800x600px) - для статьи о материалах
- `door-maintenance.jpg` (800x600px) - для статьи об уходе за дверями

Рекомендуемые параметры изображений:
- Формат: WebP (с JPG в качестве fallback)
- Размер: максимум 200KB
- Оптимизация: через squoosh.app или imageoptim

### 3. Настройка аналитики

#### Google Analytics
1. Создать аккаунт в Google Analytics 4
2. Получить Measurement ID (G-XXXXXXXXXX)
3. Добавить в nuxt.config.ts:
```typescript
modules: [
  '@nuxtjs/google-analytics'
],
googleAnalytics: {
  id: 'G-XXXXXXXXXX'
}
```

#### Яндекс.Метрика
1. Создать счетчик в Яндекс.Метрике
2. Получить ID счетчика
3. Добавить в nuxt.config.ts:
```typescript
modules: [
  ['@nuxtjs/yandex-metrika', {
    id: XXXXXXXX,
    webvisor: true,
    clickmap: true,
    trackLinks: true
  }]
]
```

### 4. SSL-сертификат
1. Выбрать один из вариантов:
   - Let's Encrypt (бесплатный)
   - Коммерческий SSL от хостинг-провайдера
   - Cloudflare SSL

2. Настройка для Let's Encrypt:
```bash
# Установка certbot
sudo apt-get update
sudo apt-get install certbot

# Получение сертификата
sudo certbot certonly --webroot -w /var/www/html -d your-domain.com
```

3. Настройка NGINX:
```nginx
server {
    listen 443 ssl;
    server_name your-domain.com;
    
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    
    # Дополнительные настройки SSL
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
}
```

### 5. Настройка инструментов вебмастера

#### Google Search Console
1. Добавить сайт в Google Search Console
2. Подтвердить права на домен через:
   - HTML-файл
   - DNS-запись
   - HTML-тег
3. Отправить sitemap.xml
4. Настроить отслеживание:
   - Индексации
   - Мобильной версии
   - Core Web Vitals

#### Яндекс.Вебмастер
1. Добавить сайт в Яндекс.Вебмастер
2. Подтвердить права на домен
3. Загрузить sitemap.xml
4. Настроить:
   - Региональность
   - Зеркала сайта
   - Турбо-страницы

### Проверка результатов
После выполнения всех настроек рекомендуется проверить:
1. SSL сертификат на [SSL Labs](https://www.ssllabs.com/ssltest/)
2. Скорость загрузки на [PageSpeed Insights](https://pagespeed.web.dev/)
3. Валидность микроразметки в [Google Rich Results Test](https://search.google.com/test/rich-results)
4. Корректность работы аналитики
5. Индексацию страниц в поисковых системах

# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
