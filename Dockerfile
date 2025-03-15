FROM node:20-alpine AS build

WORKDIR /app

# Копируем файлы package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем исходный код
COPY . .

# Устанавливаем переменные окружения для сборки
ENV NODE_ENV=production
ENV NUXT_PUBLIC_API_BASE=http://doors-shop-backend-production.up.railway.app:9090

# Собираем приложение
RUN npm run build

# Этап запуска
FROM node:20-alpine AS runtime

WORKDIR /app

# Копируем собранное приложение из предыдущего этапа
COPY --from=build /app/.output /app/.output
COPY --from=build /app/.nuxt /app/.nuxt
COPY --from=build /app/package.json /app/package.json

# Устанавливаем переменные окружения для запуска
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
ENV NUXT_PUBLIC_API_BASE=http://doors-shop-backend-production.up.railway.app:9090

# Открываем порт
EXPOSE 3000

# Запускаем приложение
CMD ["node", ".output/server/index.mjs"] 