# 🐱 CatSpace - Full Stack Cat Directory

**CatSpace** is a comprehensive web application for cat lovers to explore breeds, manage favorites, and rate individual cats. Built with a **React (TypeScript)** frontend and a **Ruby on Rails** backend, it features parparameterized multi-attribute filtering, external API integration, asynchronous processing and client-side state management with persistence.Users can like cats, leave ratings, and create a personalized list of favorites. Authentication is supported via email/password or Google OAuth login.

## 🚀 Live Demo
[Check out the live app here](https://rails-react-cat-app.vercel.app/) 
*(Note: Please allow ~30s for the initial load as the backend is hosted on a free tier).*

## 🛠 Tech Stack

* **Frontend:** React , TypeScript, Tailwind CSS, Zustand (State Management).
* **Backend:** Ruby on Rails (REST API) 
* **Database:** PostgreSQL.
* **Asynchronous Tasks:** Active Job (Background processing for Cloudinary image uploads).


## ✨ Key Features

* **Comprehensive Breed Explorer:** Browse a vast library of cat breeds with pagination.
* **Dynamic Breed Profiles:** Detailed pages featuring lifespan, origin, temperament, and health attributes visualized through intuitive star ratings.
* **Search & Filtering:**
    * **Live Search:** Instant search by breed name with filtered results.
    * **Multi-attribute Filtering:** Advanced search engine using range sliders for specific traits like Intelligence, Grooming, Social Needs, and Dog Friendliness.
* **Interactive Rating System:** Rate individual cats (1–10). Average scores are updated based on persisted data.
* **Personalized Experience:** One-click "Favorites" for both specific cats and entire breeds. Users can manage their saved favorites from a personal dashboard.
* **Media Gallery:** Each breed profile includes an image gallery powered by external API integration

## 📸 Screenshots

| Home Page | Breed Profile | Advanced Filtering |
| :--- | :--- | :--- |
| ![Home Page](screenshots/HomePage.png) | ![Profile 1](screenshots/BreedPage1.png) <br><br> ![Profile 2](screenshots/BreedPage2.png) <br><br> ![Profile 3](screenshots/BreedPage3.png) | ![Filters](screenshots/AdvancedFiltering.png) |

---

## ⚙️ Technical Highlights

### Backend (Ruby on Rails)
* **Service-based architecture:** Core business logic is extracted into service objects (e.g. authentication, ratings, favorites) for better separation of concerns and maintainability.
* **External API integration:** Integration with TheCatAPI for breed data and image retrieval.
* **Google OAuth authentication:** Secure login using Google OAuth or email/password authentication.
* **Background processing:** ActiveJob is used for asynchronous tasks such as image uploads to Cloudinary.

### Frontend (React & TypeScript)
* **Type Safety:** Full TypeScript implementation ensuring robust props, API response handling, and state models.
* **State Management & Caching:** Leveraged **Zustand** to manage global UI state and implement a custom client-side caching layer for breed data to minimize redundant network requests.
* **Responsive UI:** Mobile-first design with Tailwind CSS for responsiveness.

---

## 🛣️ Roadmap

* **Future Improvements:**
    * [ ] **Testing:** Implement RSpec for backend services and Vitest for React components.
    * [ ] **Server-state Migration:** Transition from custom Zustand caching to **TanStack Query** for advanced synchronization.
    * [ ] **Dockerization:** Containerize the application for easier deployment and environment consistency.

---

## ⚙️ Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/yourusername/catspace.git](https://github.com/yourusername/catspace.git)
    ```

2.  **Backend Setup**
    ```bash
    cd backend
    bundle install
    rails db:setup
    rails s
    ```

3.  **Frontend Setup**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```
