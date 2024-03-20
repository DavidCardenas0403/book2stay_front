<template>
    <div class="flex min-h-screen">
        <aside
            class="bg-zinc-800 text-gray-50 w-1/6 min-h-screen flex flex-col gap-6 p-8">
            <h1 class="font-bold text-xl text-center">Admin
            </h1>

            <section>
                <NuxtLink to="/admin/propiedades">
                    <font-awesome-icon
                        icon="fa-solid fa-house" />
                    Propiedades
                </NuxtLink>
            </section>
        </aside>
        <div class="w-full bg-gray-200">
            <header class="bg-zinc-800 text-gray-50 p-4 flex justify-end">
                <span>Hola Dani</span>
            </header>
            <main class="p-8  container">
                <Button label="hola" />
            </main>

        </div>
    </div>
</template>