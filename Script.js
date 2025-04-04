import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCZtRoanYqhEHapzyylSdsciYJc_iG1FyI",
  authDomain: "kevin-docs.firebaseapp.com",
  projectId: "kevin-docs",
  storageBucket: "kevin-docs.appspot.com",
  messagingSenderId: "636511201809",
  appId: "1:636511201809:web:5f6cd7fa35247149d6dfb0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize EmailJS with your public key
emailjs.init("asApBLVCT-CCvMpnV");

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

window.sendOTP = async function () {
  const email = document.getElementById("email").value;
  const otp = generateOTP();

  const now = new Date();
  const expireAt = new Date(now.getTime() + 5 * 60000);

  try {
    await setDoc(doc(db, "otps", email), {
      otp,
      expireAt: expireAt.toISOString()
    });
    console.log("OTP saved to Firestore for", email);
  } catch (error) {
    console.error("Error saving OTP:", error);
    document.getElementById("status").innerText = "Error saving OTP. Check console.";
    return;
  }

  emailjs.send("service_y2gxf7e", "template_kz0g69a", {
    to_email: email,
    otp: otp
  })
  .then(() => {
    document.getElementById("status").innerText = "OTP has been sent to your email.";
    document.getElementById("otp-section").style.display = "block";
    console.log("Email sent successfully");
  })
  .catch((err) => {
    console.error("EmailJS error:", err);
    document.getElementById("status").innerText = "Failed to send OTP. Check console.";
  });
};

window.verifyOTP = async function () {
  const email = document.getElementById("email").value;
  const enteredOtp = document.getElementById("otp").value;

  try {
    const docRef = doc(db, "otps", email);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      document.getElementById("status").innerText = "No OTP found. Please try again.";
      return;
    }

    const data = docSnap.data();
    const now = new Date();
    const expireAt = new Date(data.expireAt);

    if (now > expireAt) {
      document.getElementById("status").innerText = "OTP expired. Please request a new one.";
      await deleteDoc(docRef);
      return;
    }

    if (enteredOtp === data.otp) {
      document.getElementById("status").innerText = "OTP verified! Access granted.";
      await deleteDoc(docRef);
    } else {
      document.getElementById("status").innerText = "Incorrect OTP.";
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    document.getElementById("status").innerText = "Error verifying OTP. Check console.";
  }
};
