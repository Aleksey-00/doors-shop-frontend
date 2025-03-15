import { SitemapStream, streamToPromise } from 'sitemap'
import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  // Создаем новый SitemapStream
  const sitemap = new SitemapStream({
    hostname: 'https://your-domain.com'
  })

  try {
    // Добавляем статические страницы
    sitemap.write({
      url: '/',
      changefreq: 'daily',
      priority: 1
    })

    // Добавляем категории дверей
    const categories = ['Премиум 3к', 'Стандарт', 'Эконом']
    categories.forEach(category => {
      sitemap.write({
        url: `/category/${encodeURIComponent(category.toLowerCase())}`,
        changefreq: 'weekly',
        priority: 0.8
      })
    })

    // Здесь можно добавить динамические URL из базы данных
    // Например, URL для каждой двери
    // const doors = await fetchDoors()
    // doors.forEach(door => {
    //   sitemap.write({
    //     url: `/doors/${door.id}`,
    //     lastmod: door.updatedAt,
    //     changefreq: 'weekly',
    //     priority: 0.7
    //   })
    // })

    sitemap.end()

    // Генерируем XML
    const xml = await streamToPromise(sitemap)
    
    // Устанавливаем правильные заголовки
    event.node.res.setHeader('Content-Type', 'application/xml')
    return xml.toString()
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return 'Error generating sitemap'
  }
}) 