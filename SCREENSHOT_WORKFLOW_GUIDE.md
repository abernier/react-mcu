# How to Use the Material Theme Builder Screenshot Workflow

This GitHub Action workflow automatically captures a screenshot from the Material Theme Builder website for comparison purposes.

## Automatic Trigger

The workflow runs automatically when:

- A pull request is opened or updated targeting the `main` branch
- Changes are made to files in the `src/` directory
- Changes are made to the workflow file itself

The workflow uses the default source color `769CDF` (matching the Default story in Storybook).

## Manual Trigger

1. **Go to the Actions tab** in the GitHub repository
2. **Select "Capture Material Theme Builder Screenshot"** from the workflows list
3. **Click "Run workflow"** button
4. **Enter the source color** (hex value without #, e.g., `769CDF`)
5. **Click "Run workflow"** to start the process

## What it does

The workflow will:

1. Launch a headless Chromium browser using Playwright
2. Navigate to https://material-foundation.github.io/material-theme-builder/
3. Attempt to set the source color to the value you specified
4. Capture a full-page screenshot
5. Commit the screenshot as `material-theme-builder-screenshot.png` to the current branch
6. Post a comment on the PR (if applicable) confirming the screenshot was captured

## Default Configuration

- **Source Color**: `769CDF` (matches the Default story in Storybook)
- **Output File**: `material-theme-builder-screenshot.png`

## Manual Alternative

If the workflow fails or you prefer to capture the screenshot manually:

1. Visit: https://material-foundation.github.io/material-theme-builder/
2. Enter the source color: `769CDF`
3. Ensure "Tonal Spot" scheme is selected (default)
4. Keep contrast at 0 (standard)
5. Keep "Color match - Stay true to my color inputs" **unchecked**
6. Take a screenshot and save it as `material-theme-builder-screenshot.png`
7. Commit it to the repository

## Troubleshooting

If the workflow doesn't set the color correctly:

- The Material Theme Builder website may have changed its UI
- You can still use the screenshot as-is and manually verify the colors
- Or capture a screenshot manually following the steps above

## After the Screenshot is Captured

Once the screenshot is in the repository, the comparison can be completed by:

1. Viewing both screenshots side by side
2. Comparing the hex values between Storybook and Material Theme Builder
3. Verifying that colors match (they should be identical or very similar)
4. Documenting any differences found in `COLOR_COMPARISON.md`
