document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registrationForm");
    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const togglePassword = document.getElementById("togglePassword");
    const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");
    const successMessage = document.getElementById("successMessage");


    const usernameError = document.getElementById("usernameError");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const confirmPasswordError = document.getElementById("confirmPasswordError");


    const strengthBar = document.getElementById("strength-bar");
    const strengthText = document.getElementById("strength-text");


    const usernamePattern = /^[a-zA-Z0-9]{3,15}$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;


    function toggleVisibility(input, icon) {
        if (input.type === "password") {
            input.type = "text";
            icon.classList.replace("fa-eye-slash", "fa-eye");
        } else {
            input.type = "password";
            icon.classList.replace("fa-eye", "fa-eye-slash");
        }
    }


    togglePassword.addEventListener("click", () => toggleVisibility(password, togglePassword));
    toggleConfirmPassword.addEventListener("click", () => toggleVisibility(confirmPassword, toggleConfirmPassword));


    password.addEventListener("input", () => {
        const value = password.value;
        let strength = 0;
        if (value.length >= 8) strength++;
        if (/[A-Z]/.test(value)) strength++;
        if (/\d/.test(value)) strength++;
        if (/[!@#$%^&*]/.test(value)) strength++;

        let colors = ["red", "orange", "green"];
        let texts = ["Weak", "Medium", "Strong"];
        strengthBar.style.width = `${strength * 25}%`;
        strengthBar.style.background = colors[strength - 1] || "red";
        strengthText.textContent = texts[strength - 1] || "Weak";
    });


    form.addEventListener("submit", (e) => {
        let valid = true;

        if (!usernamePattern.test(username.value)) {
            usernameError.textContent = "Invalid username (3-15 letters/numbers only)";
            valid = false;
        } else {
            usernameError.textContent = "";
        }

        if (!emailPattern.test(email.value)) {
            emailError.textContent = "Invalid email format";
            valid = false;
        } else {
            emailError.textContent = "";
        }

        if (!passwordPattern.test(password.value)) {
            passwordError.textContent = "Password must have 8+ chars, 1 uppercase, 1 number, 1 special char";
            valid = false;
        } else {
            passwordError.textContent = "";
        }

        if (confirmPassword.value !== password.value) {
            confirmPasswordError.textContent = "Passwords do not match";
            valid = false;
        } else {
            confirmPasswordError.textContent = "";
        }

        if (!valid) {
            e.preventDefault();
            return;
        }

        successMessage.textContent = "Registration Successful!";
        form.reset();
        strengthBar.style.width = "0";
        e.preventDefault();
    });
   
});
