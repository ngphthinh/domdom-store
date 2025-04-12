document.addEventListener("DOMContentLoaded", function () {
  checkValidation();
});

function checkValidation() {
  document
    .getElementById("send-btn")
    .addEventListener("click", function (event) {
      event.preventDefault();

      const patternPhone = /^0[^14]\d{8}$/;
      const patternName = /^([A-ZÀ-Ỹ][a-zà-ỹ]+)(\s[A-ZÀ-Ỹ][a-zà-ỹ]+)+$/;
      const patternEmail =
        /^[a-zA-Z0-9](([a-zA-Z0-9._%+-](?!\.\.))*[a-zA-Z0-9])?@([a-zA-Z0-9][-a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/i;

      const elemtName = document.getElementById("fullname");
      const elemtEmail = document.getElementById("email");
      const elemtPhone = document.getElementById("phone");
      const elemtSubject = document.getElementById("subject");
      const elemtMessage = document.getElementById("message-content");

      const validName = document.querySelector(".valid-fullname");
      const validEmail = document.querySelector(".valid-email");
      const validPhone = document.querySelector(".valid-phone");
      const validSubject = document.querySelector(".valid-subject");
      const validMessage = document.querySelector(".valid-message");

      let isValid = true;

      if (elemtName.value.trim() === "") {
        validName.textContent = "Vui lòng nhập họ và tên.";
        elemtName.classList.add("is-invalid");
        isValid = false;
      } else if (!patternName.test(elemtName.value.trim())) {
        validName.textContent = "Họ và tên không hợp lệ.";
        elemtName.classList.add("is-invalid");
        isValid = false;
      } else {
        validName.textContent = "";
        elemtName.classList.remove("is-invalid");
      }

      if (elemtEmail.value.trim() === "") {
        validEmail.textContent = "Vui lòng nhập email.";
        elemtEmail.classList.add("is-invalid");
        isValid = false;
      } else if (!patternEmail.test(elemtEmail.value.trim())) {
        validEmail.textContent = "Email không hợp lệ.";
        elemtEmail.classList.add("is-invalid");
        isValid = false;
      } else {
        validEmail.textContent = "";
        elemtEmail.classList.remove("is-invalid");
      }

      if (elemtPhone.value.trim() === "") {
        validPhone.textContent = "Vui lòng nhập số điện thoại.";
        elemtPhone.classList.add("is-invalid");
        isValid = false;
      } else if (!patternPhone.test(elemtPhone.value.trim())) {
        validPhone.textContent = "Số điện thoại không hợp lệ.";
        elemtPhone.classList.add("is-invalid");
        isValid = false;
      } else {
        validPhone.textContent = "";
        elemtPhone.classList.remove("is-invalid");
      }

      if (elemtSubject.value.trim() === "") {
        validSubject.textContent = "Vui lòng chọn chủ đề.";
        elemtSubject.classList.add("is-invalid");
        isValid = false;
      } else {
        validSubject.textContent = "";
        elemtSubject.classList.remove("is-invalid");
      }

      if (elemtMessage.value.trim() === "") {
        validMessage.textContent = "Vui lòng nhập nội dung.";
        elemtMessage.classList.add("is-invalid");
        isValid = false;
      } else {
        validMessage.textContent = "";
        elemtMessage.classList.remove("is-invalid");
      }

      if (isValid) {
        const successMessage = document.createElement("div");
        successMessage.className = "alert alert-success mt-3";
        successMessage.textContent =
          "Tin nhắn đã được gửi thành công! Chúng tôi sẽ phản hồi sớm nhất có thể.";
        document.getElementById("contactForm").appendChild(successMessage);
        setTimeout(() => {
          successMessage.remove();
        }, 3000);

        document.getElementById("contactForm").reset();
      }
    });
}
