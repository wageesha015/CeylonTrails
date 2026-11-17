# CeylonTrails 🇱🇰 — Sri Lankan Travel & Destination Guide

* **Student Name:** Wageesha Tharu
* **Student ID:** PE/2022/015
* **Demonstration Video:** [Watch Demo Video Here](https://drive.google.com/file/d/1GoSrpOnxbPn9JkFZWC_u2MzeIHONUgNA/view?usp=sharing)

---

 1. Overview & Problem Statement

**CeylonTrails** is a cross-platform mobile travel guide application built with React Native and Expo Router, designed to help local and international travelers discover iconic destinations across Sri Lanka. 

**Problem Solved:** Travelers planning trips in Sri Lanka often struggle to quickly compare entry fees, optimal visiting hours, and regional categories (Heritage, Beach, Nature, Wildlife) in one clean, offline-ready interface, or keep track of places they want to visit. CeylonTrails solves this by providing categorized destination discovery, instant filtering, detailed travel information, and an interactive personal Bucket List with local reminder notifications.

---

 2. Application Screens & Purpose

The application consists of 3 primary screens :

1. Explore Screen (app/(tabs)/index.tsx):
   * Serves as the main landing screen displaying curated Sri Lankan destinations using a scrollable FlatList.
   * Features a category filter Modal (All, Heritage, Beach,Nature, Wildlife), quick bookmark toggles on each destination card, and a live AppState status banner that updates whenever the user returns to the app from the background.
2. My Bucket List Screen (app/(tabs)/bucketlist.tsx):
   * Displays all destinations bookmarked by the user, synchronized via global state (TravelContext).
   * Allows users to inspect saved places, view quick summaries, or remove destinations from their itinerary.
3. Destination Details Screen (app/place/[id].tsx):
   * A dynamic stack screen accessed by selecting any destination card.
   * Displays high-resolution imagery, district and province details, local/foreign entry fees, best visiting times, a full description, and an "Add to Bucket List & Remind Me" action button that triggers an immediate local notification.

---

 3. Core React Native Components Used

| Component | Where Implemented | Purpose |
| :--- | :--- | :--- |
| **View** | All screens (index.tsx, bucketlist.tsx, [id].tsx, _layout.tsx) | Structural layout containers, cards, badges, and flexbox alignment. |
| **Text** | All screens | Displaying titles, districts, entry fees, ratings, descriptions, and status banners. |
| **Image** | index.tsx, bucketlist.tsx, [id].tsx, _layout.tsx | Rendering local bundled destination photography (require(...)) and full-screen splash visuals. |
| **Pressable** | index.tsx, bucketlist.tsx, [id].tsx | Handling card navigation, bookmark toggles, category filter selection, and notification triggers. |
| **FlatList** | app/(tabs)/index.tsx, app/(tabs)/bucketlist.tsx | Efficiently rendering scrollable lists of hard-coded destination objects from data/placeData.tsx. |
| **Modal** | app/(tabs)/index.tsx | Providing an interactive slide-up category filter menu (All, Heritage, Beach, Nature, Wildlife). |

---

## 4. Expo Router File-Based Navigation Structure

```text
CeylonTrails/
├── app/
│   ├── _layout.tsx            # Root Stack Navigator wrapped with TravelProvider (Global State)
│   ├── (tabs)/
│   │   ├── _layout.tsx        # Bottom Tab Navigator (Explore & Bucket List tabs with live badge count)
│   │   ├── index.tsx          # Explore Tab Screen (Main destination feed + Filter Modal)
│   │   └── bucketlist.tsx     # Bucket List Tab Screen (Saved destinations list)
│   └── place/
│       └── [id].tsx           # Dynamic Nested Stack Screen for individual destination details
├── assets/                    # Local destination images and app icons
├── context/
│   └── TravelContext.tsx      # React Context + useState for global bucket list state sharing
└── data/
    └── placeData.tsx          # Structured Sri Lankan destination dataset