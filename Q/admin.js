import { db } from "./firebase.js";

import {
  collection,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Get queue from login
let queueId = localStorage.getItem("adminQueue");

let unsubscribe = null;

function loadTokens() {

  if (unsubscribe) unsubscribe();

  const tokensRef = collection(db, "queues", queueId, "tokens");
  const q = query(tokensRef, orderBy("isUrgent", "desc"), orderBy("tokenNumber"));

  unsubscribe = onSnapshot(q, (snapshot) => {
    const list = document.getElementById("tokenList");
    list.innerHTML = "";

    snapshot.forEach((docItem) => {
      const data = docItem.data();
      const li = document.createElement("li");

      let text = "Token " + data.tokenNumber;

      if (data.urgentRequested) {
        text += "<br>Request: " + data.urgentComment +
          " <button onclick='approveUrgent(\"" + docItem.id + "\")'>Approve</button>" +
          " <button onclick='rejectUrgent(\"" + docItem.id + "\")'>Reject</button>";
      }

      li.innerHTML = text;
      list.appendChild(li);
    });
  });
}

window.serveNext = async function () {
  const tokensRef = collection(db, "queues", queueId, "tokens");
  const q = query(tokensRef, orderBy("isUrgent", "desc"), orderBy("tokenNumber"), limit(1));
  const snapshot = await getDocs(q);

  snapshot.forEach(async (docItem) => {
    const tokenData = docItem.data();

    const createdTime = tokenData.createdAt.toDate();
    const now = new Date();
    const serviceTime = Math.floor((now - createdTime) / 1000);

    const queueRef = doc(db, "queues", queueId);
    const queueSnap = await getDoc(queueRef);
    const queueData = queueSnap.data();

    const oldAvg = queueData.avgServiceTime || 30;
    const newAvg = Math.floor((oldAvg + serviceTime) / 2);

    await updateDoc(queueRef, {
      avgServiceTime: newAvg
    });

    await deleteDoc(docItem.ref);
  });
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

loadTokens();
