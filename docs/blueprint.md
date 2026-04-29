# **App Name**: ONE CUP Kinshasa 2026

## Core Features:

- Competition Dashboard: Displays an animated countdown to the competition, total prize money with progress bar, current phase (Pools, Quarterfinals, etc.), key match information, and top-ranking teams/players for awards.
- Group Stage Management: Allows input of scores for all pool matches (home/away), automatically updates group standings based on points, goal difference, and other criteria, and determines the 8 qualifying teams for the knockout phase.
- Knockout Bracket Tracking: Visualizes the entire elimination bracket (Quarters, Semis, Final, 3rd Place Play-off), enables score input for each match, and automatically advances the winners through the bracket, displaying potential prize money at each stage.
- Automatic Prize Allocation & Tracking: Calculates and assigns all prize money ($1000 total) and special awards (top scorer, best passer, best defense, MVP, fair play, revelation, best atmosphere) based on competition results, triggering celebratory notifications.
- Team & Player Profiles: Detailed pages for each of the 16 participating schools/teams, showing their stats, potential and accumulated winnings, and for individual players with their full statistics, badges, and real/potential earnings.
- Score Entry & Management: Centralized interface for entering and modifying match scores, instantly updating all related statistics, standings, and prize calculations across the application.
- AI-powered Match Recap Tool: After a match's scores are entered, an AI tool will generate a concise, engaging summary or highlight report based on the results and contributing players.
- Local Data Persistence & Reset: Saves all competition data (scores, standings, award winners, etc.) locally using localStorage for browser persistence, with an option to fully reset the competition.

## Style Guidelines:

- Overall color scheme: A sophisticated dark mode that evokes prestige and focus. The main background will be a very dark, desaturated teal-gray (RGB #171D1A), allowing vibrant elements to pop.
- Primary action color: The vibrant Vert RDC (RGB #009639) for buttons, interactive elements, and success indicators.
- Accent color (Prizes): A prominent gold (RGB #FFD700) for all prize money, award displays, and champion highlights to symbolize winning.
- Accent color (Alerts/Intensity): The passionate Rouge (RGB #CE1126) for warnings, losses, or intense match highlights.
- Headline font: 'Space Grotesk' (sans-serif) for titles and main headings, offering a modern, tech-informed and structured appearance.
- Body font: 'Inter' (sans-serif) for all body text, statistical tables, and detailed information, ensuring optimal readability and clarity.
- Use FontAwesome 6 icons throughout the application, selecting glyphs that are highly relevant to football, awards, statistics, and navigation, maintaining a modern and clean aesthetic.
- Glassmorphism styling applied to all 'cards' and information panels, creating a modern, layered, and translucent effect, ensuring the site is fully responsive across mobile, tablet, and desktop views.
- Dynamic animations for the prize money counter and progress bars, JavaScript-driven confetti blasts for major victories, smooth transitions for data updates, and distinct badges to highlight award winners ('💰', '🏆').