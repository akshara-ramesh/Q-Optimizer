import { db } from "./firebase.js";

import {
  doc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
  deleteDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";


// JOIN QUEUE
window.join = async function(queueId) {
  try {
    const queueRef = doc(db, "queues", queueId);
    const queueSnap = await getDoc(queueRef);

    if (!queueSnap.exists()) {
      alert("Queue not found");
      return;
    }

    const queueData = queueSnap.data();
    const lastToken = queueData.lastTokenNumber || 0;
    const avgTime = queueData.avgServiceTime || 45;

    const newTokenNumber = lastToken + 1;

    const tokenRef = collection(db, "queues", queueId, "tokens");

    const newToken = await addDoc(tokenRef, {
      tokenNumber: newTokenNumber,
      status: "waiting",
      isUrgent: false,
      urgentRequested: false,
      urgentComment: "",
      queueType: "main",
      createdAt: serverTimestamp()
    });

    await updateDoc(queueRef, {
      lastTokenNumber: newTokenNumber
    });

    localStorage.setItem("tokenId", newToken.id);
    localStorage.setItem("queueId", queueId);
    localStorage.setItem("tokenNumber", newTokenNumber);

    watchMyToken();
    startLiveTracking(queueId, newTokenNumber, avgTime, queueData.name);

  } catch (error) {
    console.error(error);
    alert("Join failed");
  }
};


// LIVE QUEUE TRACKING
function startLiveTracking(queueId, myTokenNumber, avgTime, queueName) {

  const tokensRef = collection(db, "queues", queueId, "tokens");
  const q = query(tokensRef, orderBy("isUrgent", "desc"), orderBy("tokenNumber"));

  queueUnsubscribe = onSnapshot(q, (snapshot) => {

    let peopleAhead = 0;
    let totalInQueue = snapshot.size;

    snapshot.forEach((docItem) => {
      const token = docItem.data();
      if (token.tokenNumber < myTokenNumber) {
        peopleAhead++;
      }
    });

    const etaSeconds = peopleAhead * avgTime;
    const minutes = Math.floor(etaSeconds / 60);
    const seconds = etaSeconds % 60;

    let message =
      "<div style='font-size:18px; margin-bottom:10px; font-weight:bold;'>" 
      + queueName + " Queue</div>" +

      "<div class='token'>" + myTokenNumber + "</div>" +

      "<div class='info'>People Ahead: " + peopleAhead + "</div>" +
      "<div class='info'>Total in Queue: " + totalInQueue + "</div>" +

      "<div class='eta'>Estimated Wait: " + minutes + " min " + seconds + " sec</div>" +

      "<br>" +
      "<button class='btn' onclick='requestUrgent()'>Request Urgent</button> " +
      "<button class='btn' onclick='leaveQueue()'>Leave Queue</button>";

    if (peopleAhead === 0) {
      message += "<br><br><b>Your turn now! Please go to counter.</b>";
    }

    document.getElementById("result").innerHTML = message;
  });
}


let queueUnsubscribe = null;

function watchMyToken() {

  const tokenId = localStorage.getItem("tokenId");
  const queueId = localStorage.getItem("queueId");

  if (!tokenId || !queueId) return;

  const tokenRef = doc(db, "queues", queueId, "tokens", tokenId);

  onSnapshot(tokenRef, (docSnap) => {

    // 🛑 TOKEN DELETED = SERVICE COMPLETED
    if (!docSnap.exists()) {

      // Stop queue tracking
      if (queueUnsubscribe) {
        queueUnsubscribe();
      }

      document.getElementById("result").innerHTML =
        "<div class='token'> Service Completed</div>" +
        "<div class='info'>Thank you! You may leave.</div>" +
        "<br><button class='btn' onclick='location.href=\"index.html\"'>Back Home</button>";

      document.getElementById("urgentStatus").innerHTML = "";

      localStorage.removeItem("tokenId");
      localStorage.removeItem("queueId");
      localStorage.removeItem("tokenNumber");

      return;
    }

    const data = docSnap.data();

    // ⚠️ MISSED SERVICE
if (data.queueType === "grace") {
  document.getElementById("urgentStatus").innerHTML =
    "⚠️ You missed your turn. You are moved to Grace Queue.";
}

    else if (data.isUrgent === true) {
      document.getElementById("urgentStatus").innerHTML =
        "Priority Approved ";
    }

    else if (data.urgentRequested === true) {
      document.getElementById("urgentStatus").innerHTML =
        "Waiting for admin approval...";
    }

    else {
      document.getElementById("urgentStatus").innerHTML = "";
    }
  });
}




// REQUEST URGENT
window.requestUrgent = async function() {
  const reason = prompt("Enter reason for urgent request:");
  if (!reason) return;

  const tokenId = localStorage.getItem("tokenId");
  const queueId = localStorage.getItem("queueId");

  await updateDoc(doc(db, "queues", queueId, "tokens", tokenId), {
    urgentRequested: true,
    urgentComment: reason
  });

  alert("Urgent request sent to admin");
};


// LEAVE QUEUE
window.leaveQueue = async function() {

  const tokenId = localStorage.getItem("tokenId");
  const queueId = localStorage.getItem("queueId");

  if (!tokenId || !queueId) {
    alert("No active token");
    return;
  }

  await deleteDoc(doc(db, "queues", queueId, "tokens", tokenId));

  document.getElementById("result").innerHTML =
    "You have left the queue.";

  localStorage.removeItem("tokenId");
  localStorage.removeItem("queueId");
  localStorage.removeItem("tokenNumber");
};
