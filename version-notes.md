# V1.0.2 [2021/03/07]

Updates:

-   Made y axis scrollbar visible at all times and only active when content exceeds the devices view height.
-   Changed the games controls UI implementation to be collapsible/expandable tabs instead of always open boxes with titles. Slighlty more friendly to navigate and manage the controls for mobile or small display users.
-   A comma is now only placed after a players name in the 'TEAMLESS' section of the teams controls in the Game UI if there is another player name proceeding it.
-   Renamed 'BundleControls' to the more appropriate 'WordControls'.

# V1.0.1 [2021/01/20]

Updates:

-   Changed "Developed by Sam R-P" link to be target=blank to prevent it from opening in the current window / tab.
-   The "Join Code" button found in the game user interface for copying the join code now works.
-   Added players role icon next to their name. Now you can see who is an insider and who is an agent!
-   Added a "Help & More" button to the footer. For now, this contains a menu with rules for the deduction game and other info.
-   Style changes for mobile and desktop across all pages. Mainly font sizes.
-   Implemented difficulty tiers for word bundles. In a future update players will be able to select multiple tiers of difficutly or a single difficulty tier to play from. A words difficulty tier is decided by how likely a player is to know that word. For example if a word is obscure or would require exstensive knowledge then it will likely be in "hard" or "expert" for its given bundle. More details and clarification will come in future updates.
-   Word bundles have been moved from JSON objects in .js files to be stored in the database. Allowing word bundle updates to occur without having to take the service offline.

# V1.0.0 [2021/01/12]

First fully functioning production build produced, tested and deployed.
