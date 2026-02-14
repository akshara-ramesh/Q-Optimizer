<p align="center">
  <img src="./img.png" alt="Project Banner" width="100%">
</p>

# [Q-Optimizer] 🎯

## Basic Details

### Team Name: [Codenauts]

### Team Members
- Member 1: [Akshara R] - [NSS College Of Engineering, Palakkad]
- Member 2: [Uthara Menon] - [NSS College Of Engineering, Palakkad]

### Hosted Project Link
[https://heroic-chimera-745ca4.netlify.app/]

### Project Description
AI-assisted smart queue management system that replaces physical lines in college canteens, offices, and libraries with a digital token system. It provides real-time queue position, wait time estimation, urgent priority handling, and dynamic queue control.

### The Problem statement
In institutions such as colleges, long and unorganized queues are common in places like canteens, libraries, labs, and administrative offices. People are required to stand in line without knowing their actual waiting time. This leads to wasted time, overcrowding during peak hours, and inefficient service management. Additionally, staff members lack real-time visibility into queue load and peak periods, making crowd control difficult.

### The Solution
We built a real-time digital token system that converts physical queues into virtual queues. Students can join remotely and track their position and estimated wait time, while admins can manage tokens, approve urgent requests, mark missed turns, and temporarily close queues. The system also learns average service time dynamically to improve ETA accuracy.

---

## Technical Details

### Technologies/Components Used

**For Software:**
- Languages used: [JavaScript, HTML, CSS]
- Frameworks used: [Firebase (Backend)]
- Libraries used: [Firebase Firestore SDK]
- Tools used: [VS Code, Git, Firebase Console, Chrome DevTools]

**For Hardware:**
[None]

## Features
- Feature 1: Live digital token system. Students join queue and get instant token number and position.
- Feature 2: Real-time ETA prediction. Wait time calculated based on current queue and average service time.
- Feature 3: Urgent priority system. Students can request priority and admins can approve/reject.
- Feature 4: Grace queue for missed turns. Users who miss their slot get a second chance queue.
- Feature 5: Queue open/close control. Admin can close service during lunch/break time.
- Feature 6: Live service completion detection. Student screen updates automatically when served.
---

## Implementation

### For Software:

#### Installation
 No installation needed
 Just open project folder


#### Run
 Open index.html using Live Server
 OR deploy on Firebase Hosting


### For Hardware:

#### Components Required
[None]

#### Circuit Setup
[None]

---

## Project Documentation

### For Software:

#### Screenshots (Add at least 3)

![Screenshot1](screenshots/assigning_token_to_user.png)
Student interface showing token number, people ahead, total peoplein queue and real-time estimated waiting time after joining a queue.

![Screenshot2](screenshots/closing_and_opening_queue.png)
Admin closes the queue temporarily, users attempting to join are notified that the service is unavailable.

![Screenshot3](screenshots/missed_tokens_added_to_grace_queue.png)
Users who miss their turn are moved to a grace queue and can be served next without rejoining from the end.

![Screenshot4](screenshots/service_completed.png)
Student screen automatically updates when service is completed and token is removed from the system.

![Screenshot5](screenshots/service_selection_for_user.png)
User interface where students choose the required service (Canteen, Office, or Library) before joining the respective digital queue.

#### Diagrams

**System Architecture:**

![Architecture Diagram](diagrams/Architecture_Diagram.png)

Our system follows a real-time, serverless client–backend architecture built using Firebase as a Backend-as-a-Service (BaaS). The application consists of two client interfaces — a Student client and an Admin client — both interacting directly with Firebase services without a traditional backend server. The frontend is built using React.js (or HTML, CSS, JavaScript) and integrates the Firebase SDK to communicate with the backend. Cloud Firestore is used as the NoSQL database to store queue and token data, while Firebase Authentication manages user identity and role-based access (student/admin). Real-time synchronization is achieved using Firestore listeners (onSnapshot()), ensuring that any update made by students or admins instantly reflects across all connected devices. Critical business logic such as token assignment, ETA calculation, urgent request prioritization, and queue validation is handled securely using Firebase Cloud Functions, preventing client-side manipulation. The application can be deployed using Firebase Hosting, making it fully scalable, low-latency, and easy to maintain.

🔹 Tech Stack

Frontend:  HTML / CSS / JavaScript

Backend-as-a-Service: Firebase

Database: Cloud Firestore (NoSQL, real-time database)

Authentication: Firebase Authentication

Serverless Logic: Firebase Cloud Functions

Hosting & Deployment: Firebase Hosting

🔹 Key Components

Student Client: Join queue, view status, send urgent request

Admin Client: Manage tokens, approve requests, track ETA, open/close queue

Queue Collection: Stores queue state (open/closed, current token, ETA)

Token Subcollection: Stores individual student token details

Real-Time Listeners: Automatically sync data across all users

🔹 Data Flow

Student joins queue → Token stored in Firestore → Real-time update triggers → Admin and students see changes instantly

Admin updates token → Cloud Function processes logic → ETA recalculated → All clients auto-update

Urgent request → Priority adjusted via Cloud Function → Queue reordered → Live sync

🔹 Architecture Benefits

Fully serverless (no dedicated backend server)

Real-time synchronization

Secure role-based access control

Scalable and cost-efficient

Minimal infrastructure maintenance

**Application Workflow:**

[Workflow](diagrams/Application_Workflow.png)
Our workflow represents the real-time operational flow of the queue system, showing how actions from students and admins move through Firebase and reflect instantly across the application.
The process begins when a student joins the queue through the frontend interface. The student’s request is immediately stored in Cloud Firestore as a new token document. Because Firestore supports real-time listeners, this new entry automatically updates the Admin Dashboard without requiring a manual refresh. The admin can then take action — such as approving the request, serving the next token, marking a token as completed, or handling urgent priority. When the admin performs an action, the corresponding token document in Firestore is updated. This database update again triggers real-time synchronization, which instantly refreshes the student’s screen to reflect their new position, updated ETA, or status change. The cycle continues dynamically, ensuring both sides always view the same live data.
Step-by-Step Workflow
•	Student joins queue
    o	Student submits request from frontend.
    o	Token data (name, timestamp, status, urgency) is created.
•	Token stored in Firestore
    o	Data saved inside Queue Collection → Token Subcollection.
    o	Firestore triggers real-time listeners.
•	Admin dashboard updates live
    o	New token appears instantly on admin panel.
    o	No manual refresh required.
•	Admin action
    o	Admin approves, completes, reorders, or closes queue.
    o	Action updates Firestore document.
•	Firestore updates
    o	Database reflects new token status.
    o	Cloud Functions (if used) recalculate ETA or adjust priority.
•	Student screen updates live
    o	Real-time listener updates UI.
    o	Student sees new status or queue position instantly.
This workflow is based on:
  •	Event-driven architecture
  •	Real-time database listeners
  •	Serverless backend logic
  •	Two-way live synchronization

### For Hardware:

#### Schematic & Circuit

![Circuit](Add your circuit diagram here)
*Add caption explaining connections*

![Schematic](Add your schematic diagram here)
*Add caption explaining the schematic*

#### Build Photos

![Team](Add photo of your team here)

![Components](Add photo of your components here)
*List out all components shown*

![Build](Add photos of build process here)
*Explain the build steps*

![Final](Add photo of final product here)
*Explain the final build*

---

## Additional Documentation

### For Web Projects with Backend:

#### API Documentation

**Base URL:** `https://api.yourproject.com`

##### Endpoints

**GET /api/endpoint**
- **Description:** [What it does]
- **Parameters:**
  - `param1` (string): [Description]
  - `param2` (integer): [Description]
- **Response:**
```json
{
  "status": "success",
  "data": {}
}
```

**POST /api/endpoint**
- **Description:** [What it does]
- **Request Body:**
```json
{
  "field1": "value1",
  "field2": "value2"
}
```
- **Response:**
```json
{
  "status": "success",
  "message": "Operation completed"
}
```

[Add more endpoints as needed...]

---

### For Mobile Apps:

#### App Flow Diagram

![App Flow](docs/app-flow.png)
*Explain the user flow through your application*

#### Installation Guide

**For Android (APK):**
1. Download the APK from [Release Link]
2. Enable "Install from Unknown Sources" in your device settings:
   - Go to Settings > Security
   - Enable "Unknown Sources"
3. Open the downloaded APK file
4. Follow the installation prompts
5. Open the app and enjoy!

**For iOS (IPA) - TestFlight:**
1. Download TestFlight from the App Store
2. Open this TestFlight link: [Your TestFlight Link]
3. Click "Install" or "Accept"
4. Wait for the app to install
5. Open the app from your home screen

**Building from Source:**
```bash
# For Android
flutter build apk
# or
./gradlew assembleDebug

# For iOS
flutter build ios
# or
xcodebuild -workspace App.xcworkspace -scheme App -configuration Debug
```

---

### For Hardware Projects:

#### Bill of Materials (BOM)

| Component | Quantity | Specifications | Price | Link/Source |
|-----------|----------|----------------|-------|-------------|
| Arduino Uno | 1 | ATmega328P, 16MHz | ₹450 | [Link] |
| LED | 5 | Red, 5mm, 20mA | ₹5 each | [Link] |
| Resistor | 5 | 220Ω, 1/4W | ₹1 each | [Link] |
| Breadboard | 1 | 830 points | ₹100 | [Link] |
| Jumper Wires | 20 | Male-to-Male | ₹50 | [Link] |
| [Add more...] | | | | |

**Total Estimated Cost:** ₹[Amount]

#### Assembly Instructions

**Step 1: Prepare Components**
1. Gather all components listed in the BOM
2. Check component specifications
3. Prepare your workspace
![Step 1](images/assembly-step1.jpg)
*Caption: All components laid out*

**Step 2: Build the Power Supply**
1. Connect the power rails on the breadboard
2. Connect Arduino 5V to breadboard positive rail
3. Connect Arduino GND to breadboard negative rail
![Step 2](images/assembly-step2.jpg)
*Caption: Power connections completed*

**Step 3: Add Components**
1. Place LEDs on breadboard
2. Connect resistors in series with LEDs
3. Connect LED cathodes to GND
4. Connect LED anodes to Arduino digital pins (2-6)
![Step 3](images/assembly-step3.jpg)
*Caption: LED circuit assembled*

**Step 4: [Continue for all steps...]**

**Final Assembly:**
![Final Build](images/final-build.jpg)
*Caption: Completed project ready for testing*

---

### For Scripts/CLI Tools:

#### Command Reference

**Basic Usage:**
```bash
python script.py [options] [arguments]
```

**Available Commands:**
- `command1 [args]` - Description of what command1 does
- `command2 [args]` - Description of what command2 does
- `command3 [args]` - Description of what command3 does

**Options:**
- `-h, --help` - Show help message and exit
- `-v, --verbose` - Enable verbose output
- `-o, --output FILE` - Specify output file path
- `-c, --config FILE` - Specify configuration file
- `--version` - Show version information

**Examples:**

```bash
# Example 1: Basic usage
python script.py input.txt

# Example 2: With verbose output
python script.py -v input.txt

# Example 3: Specify output file
python script.py -o output.txt input.txt

# Example 4: Using configuration
python script.py -c config.json --verbose input.txt
```

#### Demo Output

**Example 1: Basic Processing**

**Input:**
```
This is a sample input file
with multiple lines of text
for demonstration purposes
```

**Command:**
```bash
python script.py sample.txt
```

**Output:**
```
Processing: sample.txt
Lines processed: 3
Characters counted: 86
Status: Success
Output saved to: output.txt
```

**Example 2: Advanced Usage**

**Input:**
```json
{
  "name": "test",
  "value": 123
}
```

**Command:**
```bash
python script.py -v --format json data.json
```

**Output:**
```
[VERBOSE] Loading configuration...
[VERBOSE] Parsing JSON input...
[VERBOSE] Processing data...
{
  "status": "success",
  "processed": true,
  "result": {
    "name": "test",
    "value": 123,
    "timestamp": "2024-02-07T10:30:00"
  }
}
[VERBOSE] Operation completed in 0.23s
```

---

## Project Demo

### Video
[Add your demo video link here - YouTube, Google Drive, etc.]

*Explain what the video demonstrates - key features, user flow, technical highlights*

### Additional Demos
[Add any extra demo materials/links - Live site, APK download, online demo, etc.]

---

## AI Tools Used (Optional - For Transparency Bonus)

If you used AI tools during development, document them here for transparency:

**Tool Used:** ChatGPT, Gemini AI

**Purpose:** What you used it for
- Logic Design
- Real-time listener debugging
- ETA learning logic
- Firestore integration help
- UI improvements

**Key Prompts Used:**
- Explain the logic behind live ETA calculation
- How to add urgent request approval flow
- Real-time queue system using Firebase

**Percentage of AI-generated code:** Approximately 30% - 40%

**Human Contributions:**
- System architecture design
- Firebase database structuring
- Feature integration and testing
- Frontend development

*Note: Proper documentation of AI usage demonstrates transparency and earns bonus points in evaluation!*

---

## Team Contributions

- Akshara R: Backend logic, Firestore database design, real-time features.
- Uthara Menon: Frontend development, UI design, integration.
---

## License

This project is licensed under the [LICENSE_NAME] License - see the [LICENSE](LICENSE) file for details.

**Common License Options:**
- MIT License (Permissive, widely used)
- Apache 2.0 (Permissive with patent grant)
- GPL v3 (Copyleft, requires derivative works to be open source)

---

Made with ❤️ at TinkerHub
