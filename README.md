
🍔 FOODIE – Full-Stack Food-Ordering App. 
FOODIE is a complete, production-ready mobile food-ordering solution built as a university capstone project (CS375). This MERN-stack application allows customers to securely browse a dynamic menu, manage a shopping cart, place orders, and track their order history, demonstrating proficiency across the entire software development lifecycle.

---

## ✨ Highlights

| Screen | Feature |
|--------|---------|
| 🏠 Home | Browse categorized menu (Starters, Main, Drinks, Desserts) |
| 🔍 Search | Live name-based filter |
| 🛒 Cart | Quantity +/-, auto total, delivery charge |
| 🚚 Checkout | Address + payment method modal |
| 📜 Orders | “My Orders” history + delete |
| 🔐 Auth | JWT register / login |
| 📧 Reset | 6-digit code via Mailtrap (demo) |

---

## 🛠️ Tech Stack

| Layer | Tech |
|-------|------|
| **Frontend** | React-Native (Expo) |
| **Navigation** | React-Navigation v6 |
| **Backend** | Node.js + Express |
| **Database** | MongoDB Atlas (Mongoose) |
| **Auth** | JWT + bcrypt |
| **Mail** | Mailtrap SMTP |

---

## 🚀 Quick Start

### ⚙️ 1. Clone
```bash
git clone https://github.com/your-username/foodie.git
cd foodie
```
### 📦 2. Backend
```bash
cd backend
npm install
# create .env ─ example below
npm start        # http://localhost:5000
```
### 📲 3. Frontend
```bash
cd frontend
npm install
# edit utils/apiConfig.js → set your PC IP
npx expo start -c
```
### 🧪 REST Endpoints (in-app only)

| Method | Endpoint               | Auth | Purpose        |
| ------ | ---------------------- | ---- | -------------- |
| POST   | `/api/orders`          | ✅    | Place order    |
| GET    | `/api/orders/myorders` | ✅    | Order history  |
| DELETE | `/api/orders/:id`      | ✅    | Delete order   |

### 📺 Demo Video
The video recording demonstrating the full functionality of the application is located in the root directory of this repository.

File Name: demovideo.mp4

### 👨‍💻 Author
Muhammad Ali| m.aliwajid1@gmail.com

### 🗃️ License

Licensed under the MIT License.