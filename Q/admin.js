import { db } from "./firebase.js";

import {
  collection,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
  getDocs,
  limit,
  updateDoc,
  where
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Get queue from login
let queueId = localStorage.getItem("adminQueue");

const queueRef = doc(db, "queues", queueId);

onSnapshot(queueRef, (snap) => {
  const data = snap.data();

  if (!data) return;

  // Update status text
  document.getElementById("queueStatus").innerText =
    data.isOpen ? "Open" : "Closed";

  // Switch screens
  if (data.isOpen === false) {
    document.getElementById("adminContent").style.display = "none";
    document.getElementById("closedScreen").style.display = "block";
  } else {
    document.getElementById("adminContent").style.display = "block";
    document.getElementById("closedScreen").style.display = "none";
  }
});


let unsubscribe = null;

function loadTokens() {

  if (unsubscribe) unsubscribe();

  const queueRef = doc(db, "queues", queueId);

onSnapshot(queueRef, (snap) => {
  const data = snap.data();
  document.getElementById("queueStatus").innerText =
    data.isOpen ? "Open" : "Closed";
});


  const tokensRef = collection(db, "queues", queueId, "tokens");
  const q = query(tokensRef, orderBy("isUrgent", "desc"), orderBy("tokenNumber"));

  unsubscribe = onSnapshot(q, (snapshot) => {

    // ✅ Correct place to count
    document.getElementById("queueCount").innerText = snapshot.size;

    const list = document.getElementById("tokenList");
    list.innerHTML = "";

    snapshot.forEach((docItem) => {
      const data = docItem.data();
      const li = document.createElement("li");

      let html = "<div class='token-card'>";

      html += "<div class='token-title'>Token " + data.tokenNumber + "</div>";

      if (data.queueType === "grace") {
        html += "<div class='grace'>Grace Queue</div>";
      }

      if (data.urgentRequested) {
        html += "<div class='urgent'>Urgent: " + data.urgentComment + "</div>";

        html +=
          "<button class='action-btn' onclick='approveUrgent(\"" + docItem.id + "\")'>Approve</button>" +
          "<button class='action-btn' onclick='rejectUrgent(\"" + docItem.id + "\")'>Reject</button>";
      }

      html +=
        "<br>" +
        "<button class='action-btn' onclick='serveThis(\"" + docItem.id + "\")'>Served</button>" +
        "<button class='action-btn' onclick='markMissed(\"" + docItem.id + "\")'>Missed</button>";

      html += "</div>";

      li.innerHTML = html;
      list.appendChild(li);
    });

  });
}



window.serveNext = async function () {

  const tokensRef = collection(db, "queues", queueId, "tokens");

  // 1️⃣ Serve GRACE queue first
  const graceQuery = query(tokensRef, where("queueType", "==", "grace"), limit(1));
  const graceSnap = await getDocs(graceQuery);

  if (!graceSnap.empty) {
    graceSnap.forEach(async (docItem) => {
      await deleteDoc(docItem.ref);
    });
    return;
  }

  // 2️⃣ Then serve MAIN queue
  const mainQuery = query(tokensRef, orderBy("isUrgent", "desc"), orderBy("tokenNumber"), limit(1));
  const mainSnap = await getDocs(mainQuery);

  const queueRef = doc(db, "queues", queueId);

onSnapshot(queueRef, (snap) => {
  const data = snap.data();

  if (data.isOpen === false) {
    document.getElementById("adminContent").style.display = "none";
    document.getElementById("closedScreen").style.display = "block";
  } else {
    document.getElementById("adminContent").style.display = "block";
    document.getElementById("closedScreen").style.display = "none";
  }
});


  mainSnap.forEach(async (docItem) => {
    await deleteDoc(docItem.ref);
  });
};

window.markMissed = async function(tokenId) {
  await updateDoc(doc(db, "queues", queueId, "tokens", tokenId), {
    queueType: "grace"
  });
};

window.serveThis = async function(tokenId) {
  await deleteDoc(doc(db, "queues", queueId, "tokens", tokenId));
};

window.approveUrgent = async function(tokenId) {
  await updateDoc(doc(db, "queues", queueId, "tokens", tokenId), {
    isUrgent: true,
    urgentRequested: false
  });
};

window.rejectUrgent = async function(tokenId) {
  await updateDoc(doc(db, "queues", queueId, "tokens", tokenId), {
    urgentRequested: false,
    urgentComment: ""
  });
};

window.closeQueue = async function() {
  await updateDoc(doc(db, "queues", queueId), {
    isOpen: false
  });
};

window.openQueue = async function() {
  await updateDoc(doc(db, "queues", queueId), {
    isOpen: true
  });
};




loadTokens();
