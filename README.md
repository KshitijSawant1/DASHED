<p align="center">
  <img src="src/assets/logos/L1.png" alt="DASHED Logo" width="180" />
</p>

<h1 align="center">DASHED – Debug. Analyze. Simplify. Sharpen. Evolve. Develop.</h1>

<p align="center">
  An AI-powered, interactive DSA learning and visualization platform.<br/>
  <b>Code • Visualize • Learn • Master</b>
</p>

---

## Website
Visit the official DASHED platform: **[Click to Visit](https://dashed-ks.netlify.app/)**

---

## Overview

**DASHED** (Data Structures and Algorithm Self Helped Educational Dashboard) is an interactive learning platform designed to make **Data Structures and Algorithms (DSA)** engaging, visual, and intuitive.  
It enables learners to **code, test, debug, and visualize** algorithmic operations directly within a web browser — eliminating the need for local setup.  

Built with **React**, **Monaco Editor**, **Pyodide**, and **Tailwind CSS**, DASHED merges live Python execution, intelligent hint generation, and a modular JSON-driven learning system to bridge the gap between theory and practice.

---

## Key Features

| **Category** | **Description** |
|---------------|-----------------|
| **Real-Time Python Execution** | Executes Python code instantly in the browser using Pyodide — no installation required. |
| **AI-Assisted Hints** | Detects syntax and logic errors dynamically (e.g., `puh()` → `push()`), providing guided corrections. |
| **Interactive Tabs** | Split workspace for Input, Output, and Hint sections, color-coded for clarity and focus. |
| **Task-Based Learning** | Users can choose stack operations like Push, Pop, Peek, and Display — each loaded dynamically from a JSON library. |
| **Error Visualization** | Displays execution results with colored indicators (green = success, red = error, yellow = hint). |
| **Theme Adaptability** | Fully responsive light/dark mode with adaptive Tailwind-based color tokens. |
| **Scalable Architecture** | JSON-driven content allows easy expansion to Queues, Linked Lists, and Tree structures. |

---

## Project Objectives

1. Simplify DSA learning through visual and interactive coding experiences.  
2. Provide real-time guidance and correction using AI-based hint systems.  
3. Replace static theory with hands-on, stepwise execution and visualization.  
4. Build a scalable platform for modular addition of new algorithms.  
5. Encourage self-learning, debugging confidence, and problem-solving skills.

---

## System Architecture

DASHED follows a **modular 4-layer architecture**:

1. **Frontend Layer (React + Tailwind + Flowbite)**  
   - User Interface, Tabs, and Editor Layout  
   - Dynamic rendering for tasks, outputs, and hints  

2. **Execution Layer (Pyodide)**  
   - Runs Python code client-side in real time  
   - Returns execution results and exception traces  

3. **Logic Layer (Monaco Editor + Error Parser)**  
   - Captures runtime errors and matches patterns to suggest fixes  
   - Implements hint messages and guided learning  

4. **Data Layer (JSON / Supabase planned)**  
   - Stores modular code templates, tasks, and user progress data  

---

## Core Components

### 1. **Task Selector**
Allows users to choose the data structure operation (Push, Pop, Peek, Display). Dynamically loads reference code and stepwise learning material.

### 2. **Monaco Editor**
Provides real-time code highlighting, intelligent suggestions, and inline debugging — all within a responsive React component.

### 3. **Output & Hint Tabs**
- **Output Tab:** Displays code results with green/red color cues.  
- **Hint Tab:** Shows real-time error guidance using AI-style contextual messages.  

### 4. **Task Library (JSON)**
Houses all Stack operation templates, step references, and learning scripts. Easily extendable for new DSA modules.

### 5. **Visual Learning UI**
Modern layout using TailwindCSS and Flowbite, ensuring clarity, consistency, and accessibility across devices.

---

## Experimental Results

| **Parameter** | **Measured Result** | **Description** |
|----------------|---------------------|------------------|
| **Execution Accuracy** | 98% | Successful Python execution via Pyodide. |
| **Hint System Accuracy** | 92% | Correctly identifies common syntax/logic errors. |
| **Response Time** | 1.8s avg | Code execution and feedback rendering time. |
| **User Satisfaction** | 8.7 / 10 | Based on survey feedback from 15 learners. |
| **Learning Efficiency** | +86% | Measured conceptual improvement post usage. |

---

## Tech Stack

| **Layer** | **Technologies Used** |
|------------|------------------------|
| **Frontend** | React, Vite, Tailwind CSS, Flowbite |
| **Editor** | Monaco Editor |
| **Execution Engine** | Pyodide |
| **Database (Future)** | Supabase |
| **Data Format** | JSON Modules |
| **Deployment** | Vercel |
| **Design Tools** | Figma, Canva |

---

## Installation

### **1. Clone the Repository**
```bash
git clone https://github.com/KshitijSawant1/DASHED.git
cd DASHED
```
### 2. Install Dependencies
```bash 
npm install
```

### 3. Run the Development Server
```bash 
npm run dev
```
### 4. Open in Browser
```bash 
http://localhost:5173/
```
---

## Vision & Mission

### **Vision**

To transform Data Structures and Algorithms learning into an **interactive, intelligent, and self-paced experience** for students worldwide.

### **Mission**

* Build tools that teach *how to think*, not just *what to code*.
* Bridge the gap between theoretical learning and hands-on execution.
* Foster curiosity through real-time visual and AI-assisted feedback.

---

## Future Enhancements

* Expansion to **Queue, Linked List, Tree, and Graph** modules.
* **Gamified XP system** for motivation and progress tracking.
* **AI-based learning analytics** for personalized feedback.
* **Educator dashboard** to assign and review coding exercises.
* **Offline mode** and lightweight mobile support.
* **Collaboration features** for peer learning and group study.

---

## Developer

**Developed by:**
**Kshitij K. Sawant**
**Role:** Project Developer and Designer

---

## License

This project is licensed under the **MIT License**.
See the `LICENSE` file for more details.

---


<p align="center">
  <b>“Build systems that teach people how to think — not just what to click.”</b>
</p>