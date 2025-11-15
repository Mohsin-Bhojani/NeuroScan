# NeuroScan



# 🧠 TumorVision – Brain Tumor Detection AI

TumorVision is an AI-powered web application that detects brain tumors from MRI scans using a custom-trained computer vision model. The system features a clean, modern interface and provides treatment recommendations based on detected tumor types.

## 🚀 Features

- Real-time brain tumor detection using a Roboflow YOLOv8 model  
- MRI image upload and live preview  
- Bounding boxes with confidence scores  
- Classification of multiple tumor types  
- Interactive treatment recommendation screen  
- Smooth UI animations with Framer Motion  
- Fully frontend-based (no backend required)

## 🖥️ Tech Stack

- React + TypeScript  
- Tailwind CSS  
- Framer Motion  
- Vite  
- Roboflow Hosted Inference API

## 📂 Project Structure


├── components/ <br>
│ ├── GooeyNav.tsx<br>
│ ├── Squares.tsx<br>
│ ├── Loader.tsx<br>
│ ├── Header.tsx<br>
│ └── ...<br>
├── pages/<br>
│├── Analysis.tsx<br>
│├── TreatmentPlan.tsx<br>
│├── AboutUs.tsx<br>
│└── Home.tsx<br>
├── App.tsx<br>
├── main.tsx<br>
└── styles/<br>
└── globals.css<br>


## 🧪 How It Works

1. User uploads an MRI scan  
2. The image is sent to the Roboflow Hosted Inference API  
3. YOLOv8 detects tumor regions  
4. Bounding boxes and labels appear on the UI  
5. User selects a tumor type to view customized treatment guidance

## ⚙️ Setup Instructions

### 1. Clone the repository


git clone https://github.com/your-username/tumorvision.git
cd tumorvision


### 2. Install dependencies


npm install


### 3. Add environment variables

Create a file:


src/.env


Add:


VITE_ROBOFLOW_API_KEY=your_api_key_here
VITE_ROBOFLOW_MODEL=brain-tumor-detector-xxxx
VITE_ROBOFLOW_VERSION=1


### 4. Run the development server


npm run dev


## 📸 Screenshots (Coming Soon)

* MRI upload screen
* Tumor detection overlay
* Treatment recommendation screen

## 🧭 Roadmap

* [ ] Improve detection accuracy
* [ ] Add segmentation masks
* [ ] Add PDF report generation
* [ ] Add dark/light theme toggle
* [ ] Deploy on Vercel

## 💡 Motivation

TumorVision aims to make early tumor screening accessible by combining modern web development with trained AI models. The goal is to support students, researchers, and healthcare learners with an efficient tool for MRI interpretation.

## 👥 Team

| Name               | Role                     |
| ------------------ | ------------------------ |
| **Kevin Santhosh** | Lead Developer           |
| **Mohsin Bhojani** | Developer                |
| **Akash Harish**   | Developer                |
| **Harshi Shah**    | Research & Documentation |

## 📜 License

MIT License

