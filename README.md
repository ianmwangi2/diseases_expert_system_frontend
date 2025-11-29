# Disease Expert System – Frontend (React)

This is the frontend dashboard for the Disease Expert System.  
It communicates with the Flask backend to fetch data, diagnose symptoms, and manage disease information.

---

## 🚀 Tech Stack
- React
- JavaScript
- Fetch API / Axios
- CSS / Tailwind


---

## 🛠 Installation & Setup

### 1. Enter the frontend folder
```sh
cd frontend
```
### 2. Install dependencies
```sh
npm install
```
### 3. Start the development server
```sh
npm start
```
### 4. Open in browser
Navigate to `http://localhost:3000`
---

## ⚙️ API Configuration
Open:
`src/api.js`

Set the API URL depending on where the backend is running:
1. For local hosting input the below URL
```sh
http://localhost:5000
```
2. For deployment, input the deployed backend URL
```sh
https://ass-xag6.onrender.com
```
---

## 🧠 How the Frontend Works
The app provides:

✔ Symptom Selection

Users search and pick symptoms, and select severity.

✔ Diagnosis

Frontend sends:
```
{
  "symptoms": [{"name": "fever", "severity": "high"}]
}
```
to 
```
POST /diagnose
```
✔ Display Results

Diseases are returned with match percentage, explanation, and treatments.

### 🌐 Deployment on Vercel
The frontend of the project has been hosted on Vercel and is accessible at:
```
https://diseases-expert-system-frontend.vercel.app/
```




