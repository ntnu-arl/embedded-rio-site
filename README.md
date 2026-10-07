# Embedded Bare-Metal Radar-Inertial Odometry (GitHub Pages)

This repository contains the GitHub Pages project website for **"Embedded Bare-Metal Radar-Inertial Odometry"** by Nicolai Adil Øyen Aatif, Morten Nissov, and Kostas Alexis (Autonomous Robots Lab, NTNU).

- **Paper on arXiv**: [https://arxiv.org/abs/2610.07278](https://arxiv.org/abs/2610.07278)
- **Firmware Code Repository**: [https://github.com/ntnu-arl/embedded_rio](https://github.com/ntnu-arl/embedded_rio)
- **Hardware / PCB Repository**: [https://github.com/ntnu-arl/embedded_rio-pcb](https://github.com/ntnu-arl/embedded_rio-pcb)

---

## Features of this GitHub.io Site

- **Modern & Clean Aesthetic**: Sleek typography, responsive layouts, subtle dark/light theme toggle with persistent preferences.
- **Interactive Hardware Showcase**: Switchable tabs for the custom carrier board top view, radar antenna array bottom view, 3D CAD exploded assembly, and complete KiCad electrical schematic.
- **Click-to-Zoom Lightbox**: All diagrams, high-resolution hardware photos, and paper result plots feature an interactive modal viewer for detailed inspection.
- **Experimental Benchmarks**: Interactive visualizations and formatted quantitative tables matching paper results (trajectories, velocity tracking, Doppler aliasing resilience, vertical drift ablation, closed-loop PX4 flight, timing benchmarks, and desktop parity analysis).
- **One-Click Actions**: Quick copy buttons for git clone commands, PX4 configuration parameters, and BibTeX citations.
- **Zero Build Step**: Fully static standard HTML5 / CSS3 / ES6 JavaScript compatible with GitHub Pages directly out of the box.

---

## Directory Structure

```
├── index.html                   # Main landing page
├── assets/
│   ├── css/
│   │   └── style.css            # Responsive, modern styling with Dark/Light themes
│   ├── js/
│   │   └── main.js              # Theme switcher, tab navigation, modal lightbox, clipboard
│   └── images/                  # High-resolution optimized photos, diagrams, and plots
│       ├── system_overview.png
│       ├── carrier_board_top.png
│       ├── carrier_board_bottom.png
│       ├── cad_assembly.png
│       ├── schematic.png
│       ├── fig3_trajectories.png
│       ├── fig4_doppler.png
│       ├── fig5_velocity.png
│       ├── fig6_yaw.png
│       ├── fig7_vertical_ablation.png
│       └── fig8_closed_loop.png
└── paper/                       # Original paper PDF, schematics, and raw assets
```

---

## Local Development & Preview

To preview the website locally:

```bash
# Using Python
python3 -m http.server 8000

# Open in your browser:
# http://localhost:8000
```

---

## GitHub Pages Deployment

1. Go to repository **Settings** &rarr; **Pages**.
2. Under **Build and deployment** &rarr; **Source**, select **Deploy from a branch**.
3. Choose branch `main` (or `gh-pages`) and folder `/ (root)`.
4. Click **Save**. The website will be live at `https://<username>.github.io/<repository-name>/`.
