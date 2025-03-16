<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header без навигационных элементов -->
    <header class="bg-white shadow">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <img src="/images/logo.svg" alt="Евро Двери" class="h-12" />
            <span class="ml-4 text-xl font-bold">Админ-панель</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 bg-gray-50 h-full">
      <div class="h-full">
        <slot />
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white mt-auto">
      <div class="container mx-auto px-4 py-6">
        <div class="flex items-center justify-center">
          <img src="/images/logo.svg" alt="Евро Двери" class="h-8 mr-2 brightness-200" />
          <p>&copy; 2024 Магазин дверей евро качества. Все права защищены.</p>
        </div>
      </div>
    </footer>
  </div>
</template> 