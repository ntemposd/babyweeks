# Babyweeks

Babyweeks is a React app designed to help users track their baby's development milestones by calculating the number of weeks since a given birthdate. It started back in 2021 using PyScript and transitioned to React in early 2025. The app is hosted on GitHub Pages.

## What a user can do

- Input a birthdate to calculate the weeks since birth.
- View developmental milestones content for a baby's first year.

---

## Installation and Setup

Follow these steps to set up and run the app on your local machine:

### Prerequisites

- Node.js (16.x or later) and npm installed.

### Clone the Repository

```bash
git clone https://github.com/ntemposd/babyweeks.git
cd babyweeks
```

### Install Dependencies

Run the following command to install all required dependencies:

```bash
npm install
```

### Start the Development Server

To start the app in development mode:

```bash
npm start
```

- Open your browser and navigate to `http://localhost:3000`.
- The app will reload automatically as you make changes to the source code.

---

## Deployment

The app is automatically deployed to GitHub Pages from the `babyweeks-react` branch using GitHub Actions.

### View the Live Application

Visit the deployed app at:

```
https://ntemposd.github.io/babyweeks
```

### Manual Deployment

If you need to deploy manually:

1. Build the app:
   ```bash
   npm run build
   ```
2. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

### Branching & deployment (recommended workflow)

- Develop on feature branches based off `main`:
  - git checkout -b feature/some-feature
  - make changes, commit, push, open a Pull Request to `main`.
- Merge into `main` only after review and CI checks pass.
- The GitHub Actions workflow (./github/workflows/deploy.yml) runs on pushes to `main` and builds + deploys the production bundle to the `gh-pages` branch automatically.
- Do NOT edit `gh-pages` directly under normal development — it is the generated deployment artifact. Editing it directly is risky and may be overwritten by the automatic deploy.
- Emergency hotfix: if you must update the deployed site immediately, create a build locally (`npm run build`) and deploy with the `deploy` script (`npm run deploy`) or carefully push a tested change to `main` so the workflow publishes it.

Notes

- Local dev: the app uses `BrowserRouter basename="/babyweeks"`. When running `npm start` open:
  - http://localhost:3000/babyweeks/
  - or temporarily remove/adjust the `basename` in src/App.js for convenience.
- This keeps source-of-truth in `main` and leaves `gh-pages` as the safe deployment branch.

---

## File Structure

```
.
├── public/               # Public assets
├── src/                  # Source code
│   ├── App.js           # Main application component
│   ├── App.css          # Global styles
│   ├── assets/          # Images and JSON data
│   ├── components/      # Reusable components (if applicable)
├── .github/             # GitHub workflows
│   ├── workflows/
│       ├── deploy.yml   # Deployment configuration
├── package.json         # Project metadata and scripts
```

---

## Technologies Used

- **React**: Front-end framework.
- **Bootstrap**: For responsive and modern styling.
- **DatePicker**: Custom date input component.
- **GitHub Pages**: Deployment platform.
- **GitHub Actions**: CI/CD workflow for automatic deployment.

---

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

---

## Troubleshooting

If you encounter issues:

- Ensure all dependencies are installed by running `npm install`.
- Verify that your Node.js version is compatible with the app.
- Check the browser console for error messages.
- Reach out by opening an issue in the repository.


