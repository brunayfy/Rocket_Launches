# 🚀 SpaceX Launches SPA

A modern Single Page Application built with **React + Vite + TypeScript** to explore SpaceX launches with search, filters, pagination and detailed views.

## ✨ Features

* Paginated launch list
* Search by name (debounced)
* Filters: success / upcoming
* Launch detail page
* Loading (skeleton), error and empty states
* Responsive UI with Chakra UI
* Dark mode 🌙

## 🧱 Tech Stack

* React + Vite + TypeScript
* Chakra UI
* React Router
* TanStack Query (React Query)
* Axios
* Vitest + React Testing Library
* MSW (API mocking)

## 📁 Project Structure

```bash
src/
  app/
  components/
  features/
    launches/
  test/
  theme/
```

Feature-based architecture for scalability and maintainability.

## ▶️ Running the project

```bash
npm install
npm run dev
```

Open:

```bash
http://localhost:5173
```

## 🧪 Tests

```bash
npm run test
```

Coverage:

```bash
npm run coverage
```

## 🎯 Technical Decisions

* **React Query** for caching and smooth UX
* **Chakra UI** for fast and consistent UI development
* **Feature-based structure** for scalability
* **MSW** for reliable API mocking in tests

## 🚀 Highlights

* URL-based state (filters & pagination)
* Debounced search
* Clean architecture
* Automated tests

## Future Improvements

* Search Launches can lookup partial names


---

Built with focus on production-ready patterns and developer experience.
