<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="container mx-auto px-4">
      <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 class="text-3xl font-bold mb-6">Kontaktirajte nas</h1>
        <p class="text-gray-600 mb-8">
          Imate pitanja? Slobodno nas kontaktirajte i naš tim će vam odgovoriti u najkraćem mogućem roku.
        </p>
        <form class="space-y-6">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Ime i prezime</label>
            <input
              type="text"
              id="name"
              class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            >
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email adresa</label>
            <input
              type="email"
              id="email"
              class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            >
          </div>
          <div>
            <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Poruka</label>
            <textarea
              id="message"
              rows="4"
              class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            ></textarea>
          </div>
          <button
            type="submit"
            class="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors"
          >
            Pošalji poruku
          </button>
        </form>
      </div>
    </div>
  </div>
</template>