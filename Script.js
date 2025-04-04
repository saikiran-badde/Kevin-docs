<script>
  window.onload = function () {
    // Firebase Config
    const firebaseConfig = {
      apiKey: "AIzaSyCZtRoanYqhEHapzyylSdsciYJc_iG1FyI",
      authDomain: "kevin-docs.firebaseapp.com",
      projectId: "kevin-docs",
      storageBucket: "kevin-docs.appspot.com",
      messagingSenderId: "636511201809",
      appId: "1:636511201809:web:5f6cd7fa35247149d6dfb0"
    };

    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    let generatedOtp = "";

    window.toggleForms = function(view) {
      document.getElementById("login-form").classList.add("hidden");
      document.getElementById("signup-form").classList.add("hidden");
      document.getElementById("otp-section").classList.add("hidden");
      document.getElementById("post-signup-message").classList.add("hidden");
      document.getElementById("status").innerText = "";
      document.getElementById("form-title").innerText = view === "signup" ? "Sign Up" : "Login";

      if (view === "signup") {
        document.getElementById("signup-form").classList.remove("hidden");
      } else {
        document.getElementById("login-form").classList.remove("hidden");
      }
    };

    window.handleLogin = function() {
      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;
      document.getElementById("status").innerText = "Logging in...";
      auth.signInWithEmailAndPassword(email, password)
        .then(() => {
          document.getElementById("status").innerText = "Login successful!";
        })
        .catch((error) => {
          document.getElementById("status").innerText = error.message;
        });
    };

    window.initiateSignup = function() {
      const email = document.getElementById("signup-email").value;
      const password = document.getElementById("signup-password").value;
      const confirmPassword = document.getElementById("signup-confirm").value;

      if (password !== confirmPassword) {
        document.getElementById("status").innerText = "Passwords do not match.";
        return;
      }

      generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

      emailjs.send("service_y2gxf7e", "template_kz0g69a", {
        to_email: email,
        otp: generatedOtp
      }).then(() => {
        document.getElementById("signup-form").classList.add("hidden");
        document.getElementById("otp-section").classList.remove("hidden");
        document.getElementById("status").innerText = "OTP has been sent to your email.";
      }).catch((error) => {
        console.error("OTP send error:", error);
        document.getElementById("status").innerText = "Failed to send OTP.";
      });
    };

    window.verifySignupOTP = function() {
      const enteredOtp = document.getElementById("otp").value;
      const email = document.getElementById("signup-email").value;
      const password = document.getElementById("signup-password").value;

      if (enteredOtp === generatedOtp) {
        auth.createUserWithEmailAndPassword(email, password)
          .then(() => {
            document.getElementById("otp-section").classList.add("hidden");
            document.getElementById("post-signup-message").classList.remove("hidden");
          })
          .catch((error) => {
            document.getElementById("status").innerText = error.message;
          });
      } else {
        document.getElementById("status").innerText = "Invalid OTP.";
      }
    };
  };
</script>
