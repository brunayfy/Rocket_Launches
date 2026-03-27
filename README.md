# 🚀 SpaceX Launches SPA

A modern Single Page Application built with **React + Vite + TypeScript** to explore SpaceX launches with search, filters, pagination and detailed views.

## ✨ Features

* Paginated launch list
* Search by name (debounced)
* Filters: success / upcoming / from/to launch date
* Launch detail page with external links and embedded video.
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

Type `q` and Enter to close the server


Generate production build
```bash
npm run build
```

## 🧪 Tests
* **Vitest** + **React Testing Library**
* **MSW (Mock Service Worker)** for API mocking
* Covers : Filters (search, selects, date interval), Pagination, Navigation, Launch detail rendering, API integration.

![coverage](https://img.shields.io/badge/coverage-87%25-brightgreen)

```bash
npm run test
```

Coverage:

```bash
npm run coverage
```


## 🎯 Technical Decisions
* **React Query** for caching and smooth UX on pagination and refetch.
* **Chakra UI** for fast and consistent UI development. It creates accessible and responsive interfaces.
* **Feature-based structure** for scalability and maintainability and clarity on the application field
* **MSW  (Mock Service Worker)** for reliable API mocking without dependency on external service availability, making more resilient testing.

## 🚀 Highlights

* URL-based state (filters & pagination)
* Debounced search
* Clean architecture
* Automated tests

## Future Improvements

* **Search Launches**: add lookup of partial names
* **Date Filter**: `date_utc` is not reliable for upcoming launches. Make if `upcoming:true` sort by `flight_number`. 
* **Testing**: more robust testing
* Infinite scroll
* Better error treatment
* Improve UI to look more professional and easy to use

---

Built with focus on production-ready patterns and developer experience.
