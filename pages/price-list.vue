<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-8">
          <h1 class="text-2xl font-bold mb-2">Прайс-лист стоимости работ с 1 февраля</h1>
        </div>

        <div class="bg-white rounded-lg shadow p-6 overflow-x-auto">
          <div class="min-w-[280px]">
            <table class="w-full">
              <thead>
                <tr>
                  <th class="text-left">Вид услуги</th>
                  <th class="text-center">Ед. измер.</th>
                  <th class="text-right">Стоимость, руб/ед.</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colspan="3" class="font-bold pt-4">МОНТАЖНЫЕ РАБОТЫ</td>
                </tr>
                <tr>
                  <td>Монтаж новой двери в готовый проем до 100 кг</td>
                  <td class="text-center">за 1 дверь</td>
                  <td class="text-right">5 000 ₽</td>
                </tr>
                <tr>
                  <td>Монтаж нестандарт</td>
                  <td class="text-center">за 1 дверь</td>
                  <td class="text-right">по договоренности</td>
                </tr>
                <tr>
                  <td>Уличный монтаж / в минусовую температуру</td>
                  <td class="text-center">за 1 дверь</td>
                  <td class="text-right">от 5500/8000</td>
                </tr>
                <tr>
                  <td>Демонтаж старой двери</td>
                  <td class="text-center"></td>
                  <td class="text-right"></td>
                </tr>
                <tr>
                  <td>деревянная дверь</td>
                  <td class="text-center">за 1 дверь</td>
                  <td class="text-right">700 ₽</td>
                </tr>
                <tr>
                  <td>стальная дверь (стандарт)</td>
                  <td class="text-center">за 1 дверь</td>
                  <td class="text-right">1 000 ₽</td>
                </tr>
                <tr>
                  <td>стальная дверь (> 220 см)</td>
                  <td class="text-center">за 1 дверь</td>
                  <td class="text-right">1 200 ₽</td>
                </tr>
                <tr>
                  <td>стальная дверь (заливка бетоном)</td>
                  <td class="text-center">за 1 дверь</td>
                  <td class="text-right">1 500 ₽</td>
                </tr>
                <tr>
                  <td>Демонтаж с сохранением</td>
                  <td class="text-center">за 1 дверь</td>
                  <td class="text-right">1 500 ₽</td>
                </tr>
                <tr>
                  <td>Панели</td>
                  <td class="text-center"></td>
                  <td class="text-right"></td>
                </tr>
                <tr>
                  <td>Установка панели внутренней</td>
                  <td class="text-center">1 панель</td>
                  <td class="text-right">4 500 ₽</td>
                </tr>
                <tr>
                  <td>Установка панели наружней</td>
                  <td class="text-center">1 панель</td>
                  <td class="text-right">5 500 ₽</td>
                </tr>
                <tr>
                  <td>Нестандартные панели ( с зеркалом)</td>
                  <td class="text-center">1 панель</td>
                  <td class="text-right">По согласованию</td>
                </tr>
                <tr>
                  <td>штробление/резка наличников/плитки</td>
                  <td class="text-center">за 1 шт.</td>
                  <td class="text-right">1 000 ₽</td>
                </tr>
                <tr>
                  <td>установка портала (доборы+наличники/без порога)</td>
                  <td class="text-center">за 1 услугу</td>
                  <td class="text-right">4 500 ₽</td>
                </tr>
                <tr>
                  <td colspan="3" class="font-bold pt-4">РАБОТА С ПРОЕМОМ</td>
                </tr>
                <tr>
                  <td>Расширение (рубка) проема</td>
                  <td class="text-center"></td>
                  <td class="text-right"></td>
                </tr>
                <tr>
                  <td>пеноблок, гипс, деревянный</td>
                  <td class="text-center">за 1 м/п</td>
                  <td class="text-right">1 000 ₽</td>
                </tr>
                <tr>
                  <td>кирпичный</td>
                  <td class="text-center">за 1 м/п</td>
                  <td class="text-right">1 500 ₽</td>
                </tr>
                <tr>
                  <td>П 44 I серия</td>
                  <td class="text-center">за 4 стороны</td>
                  <td class="text-right">4 000 ₽</td>
                </tr>
                <tr>
                  <td>П 44 Т</td>
                  <td class="text-center">за 4 стороны</td>
                  <td class="text-right">5 500 ₽</td>
                </tr>
                <tr>
                  <td>П 44 Т 76</td>
                  <td class="text-center">за 4 стороны</td>
                  <td class="text-right">5 500 ₽</td>
                </tr>
                <tr>
                  <td>Резка плинтуса</td>
                  <td class="text-center">за 1 сторону</td>
                  <td class="text-right">500 ₽</td>
                </tr>
                <tr>
                  <td>Закладка проема</td>
                  <td class="text-center"></td>
                  <td class="text-right"></td>
                </tr>
                <tr>
                  <td>боковой стенки</td>
                  <td class="text-center">за 1 сторону</td>
                  <td class="text-right">4 000 ₽</td>
                </tr>
                <tr>
                  <td>фрамуги над дверью</td>
                  <td class="text-center">за 1 м2</td>
                  <td class="text-right">3 500 ₽</td>
                </tr>
                <tr>
                  <td>Зазор</td>
                  <td class="text-center">5 см</td>
                  <td class="text-right">2 000 ₽</td>
                </tr>
                <tr>
                  <td>сужение проема (швеллер, проф.труба)</td>
                  <td class="text-center">за 1 м/п</td>
                  <td class="text-right">2 000 ₽</td>
                </tr>
                <tr>
                  <td>усиление проема</td>
                  <td class="text-center">за 1 м/п</td>
                  <td class="text-right">1 500 ₽</td>
                </tr>
                <tr>
                  <td>Усиленый крепеж</td>
                  <td class="text-center">6-8крепежный</td>
                  <td class="text-right">2 000 ₽</td>
                </tr>
                <tr>
                  <td>заштукатуривание</td>
                  <td class="text-center">1 проем</td>
                  <td class="text-right">по договоренности</td>
                </tr>
                <tr>
                  <td>Отделка пластикатом</td>
                  <td class="text-center">1 проем</td>
                  <td class="text-right">по договоренности</td>
                </tr>
                <tr>
                  <td colspan="3" class="font-bold pt-4">ЗАМЕР/ДОСТАВКА</td>
                </tr>
                <tr>
                  <td>Выезд замерщика</td>
                  <td class="text-center">за 1 услугу</td>
                  <td class="text-right">1 500 ₽</td>
                </tr>
                <tr>
                  <td>Замер нестандарт</td>
                  <td class="text-center">за 1 услугу</td>
                  <td class="text-right">1 800 ₽</td>
                </tr>
                <tr>
                  <td>Доставка двери</td>
                  <td class="text-center"></td>
                  <td class="text-right"></td>
                </tr>
                <tr>
                  <td>в пределах МКАД до подъезда</td>
                  <td class="text-center">за 1 услугу</td>
                  <td class="text-right">3 000 ₽</td>
                </tr>
                <tr>
                  <td>от МКАД</td>
                  <td class="text-center">руб./км</td>
                  <td class="text-right">40 ₽</td>
                </tr>
                <tr>
                  <td>Подъем</td>
                  <td class="text-center"></td>
                  <td class="text-right"></td>
                </tr>
                <tr>
                  <td>ручной: дверь в сборе/коробка</td>
                  <td class="text-center">за 1 этаж</td>
                  <td class="text-right">от 350</td>
                </tr>
                <tr>
                  <td>на грузовом лифте</td>
                  <td class="text-center">за 1 услугу</td>
                  <td class="text-right">500 при доставке</td>
                </tr>
                <tr>
                  <td colspan="3" class="font-bold pt-4">ПРОЧЕЕ</td>
                </tr>
                <tr>
                  <td>Перенос звонка</td>
                  <td class="text-center">за 1 точку</td>
                  <td class="text-right">1 000 ₽</td>
                </tr>
                <tr>
                  <td>вывоз мусора / старой двери</td>
                  <td class="text-center">за 1 шт.</td>
                  <td class="text-right">по договоренности</td>
                </tr>
                <tr>
                  <td>Работа с проводами</td>
                  <td class="text-center">от</td>
                  <td class="text-right">1 000 ₽</td>
                </tr>
                <tr>
                  <td>Пыль и пароизоляция</td>
                  <td class="text-center"></td>
                  <td class="text-right">3 000 ₽</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '#imports'

// SEO метаданные
useHead({
  title: 'Прайс-лист на услуги | Спец Монтаж Сервис-Доорс',
  meta: [
    {
      name: 'description',
      content: 'Актуальный прайс-лист на монтаж дверей, демонтаж, работу с проемом, доставку и другие услуги.'
    }
  ]
})
</script>

<style scoped>
.container {
  max-width: 1200px;
}

table {
  border-collapse: collapse;
  width: 100%;
}

td, th {
  padding: 8px;
  border-bottom: 1px solid #eee;
  line-height: 1.4;
  vertical-align: top;
}

th {
  background-color: #f8f9fa;
  font-weight: 600;
  white-space: nowrap;
}

.font-bold {
  font-weight: 600;
  background-color: #f8f9fa;
}

/* Большие экраны */
@media (min-width: 1024px) {
  td, th {
    padding: 12px;
  }
}

/* Средние экраны */
@media (max-width: 1023px) {
  td, th {
    padding: 8px;
  }
}

/* Маленькие экраны */
@media (max-width: 640px) {
  .container {
    padding: 0;
  }
  
  .bg-white {
    border-radius: 0;
    padding: 4px;
  }
  
  .text-2xl {
    font-size: 20px;
  }
  
  .text-lg {
    font-size: 16px;
  }

  td, th {
    padding: 6px 4px;
    font-size: 13px;
  }

  td:first-child {
    min-width: 140px;
  }

  td:nth-child(2) {
    min-width: 80px;
  }

  td:last-child {
    min-width: 90px;
  }

  table {
    font-size: 13px;
  }
}

/* Очень маленькие экраны */
@media (max-width: 360px) {
  td, th {
    padding: 4px 3px;
    font-size: 12px;
  }

  td:first-child {
    min-width: 120px;
  }

  td:nth-child(2) {
    min-width: 70px;
  }

  td:last-child {
    min-width: 80px;
  }

  .bg-white {
    padding: 2px;
  }
}
</style> 