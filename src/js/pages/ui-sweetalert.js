import Swal from 'sweetalert2';

// Initialize immediately when module loads
function initializeSweetAlert() {
  console.log('SweetAlert2 module initializing...');
  // Basic Alerts
  document.getElementById('basic-alert')?.addEventListener('click', () => {
    Swal.fire('Hello World!', 'This is a basic SweetAlert2 popup', 'info');
  });

  document.getElementById('success-alert')?.addEventListener('click', () => {
    Swal.fire('Good job!', 'You clicked the button!', 'success');
  });

  document.getElementById('error-alert')?.addEventListener('click', () => {
    Swal.fire('Oops...', 'Something went wrong!', 'error');
  });

  document.getElementById('warning-alert')?.addEventListener('click', () => {
    Swal.fire('Warning!', 'Please check your input', 'warning');
  });

  // Interactive Examples
  document.getElementById('confirm-alert')?.addEventListener('click', () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  });

  document.getElementById('input-alert')?.addEventListener('click', async () => {
    const { value: email } = await Swal.fire({
      title: 'Input email address',
      input: 'email',
      inputLabel: 'Your email address',
      inputPlaceholder: 'Enter your email address',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to enter an email!';
        }
      }
    });

    if (email) {
      Swal.fire(`Entered email: ${email}`);
    }
  });

  document.getElementById('ajax-alert')?.addEventListener('click', () => {
    Swal.fire({
      title: 'Submit your GitHub username',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Look up',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        return fetch(`//api.github.com/users/${login}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json();
          })
          .catch(error => {
            Swal.showValidationMessage(`Request failed: ${error}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `${result.value.login}'s avatar`,
          imageUrl: result.value.avatar_url,
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: 'Avatar',
        });
      }
    });
  });

  document.getElementById('chaining-alert')?.addEventListener('click', () => {
    Swal.mixin({
      input: 'text',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2', '3']
    }).queue([
      {
        title: 'Question 1',
        text: 'What is your name?'
      },
      'What is your favorite color?',
      'What is your favorite programming language?'
    ]).then((result) => {
      if (result.value) {
        const answers = JSON.stringify(result.value);
        Swal.fire({
          title: 'All done!',
          html: `Your answers: <pre>${answers}</pre>`,
          confirmButtonText: 'Lovely!'
        });
      }
    });
  });

  // Advanced Features
  document.getElementById('timer-alert')?.addEventListener('click', () => {
    let timerInterval;
    Swal.fire({
      title: 'Auto close alert!',
      html: 'I will close in <b></b> milliseconds.',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer().querySelector('b');
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft();
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer');
      }
    });
  });

  document.getElementById('html-alert')?.addEventListener('click', () => {
    Swal.fire({
      title: '<strong>HTML <u>example</u></strong>',
      icon: 'info',
      html:
        'You can use <b>bold text</b>, ' +
        '<a href="//sweetalert2.github.io">links</a> ' +
        'and other HTML tags',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
      cancelButtonAriaLabel: 'Thumbs down'
    });
  });

  document.getElementById('custom-alert')?.addEventListener('click', () => {
    Swal.fire({
      title: 'Custom animation with Animate.css',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
  });

  document.getElementById('image-alert')?.addEventListener('click', () => {
    Swal.fire({
      title: 'Sweet!',
      text: 'Modal with a custom image.',
      imageUrl: 'https://unsplash.it/400/200',
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
    });
  });

  // Toast Examples
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });

  document.getElementById('toast-success')?.addEventListener('click', () => {
    Toast.fire({
      icon: 'success',
      title: 'Signed in successfully'
    });
  });

  document.getElementById('toast-info')?.addEventListener('click', () => {
    Toast.fire({
      icon: 'info',
      title: 'Info message here'
    });
  });

  document.getElementById('toast-warning')?.addEventListener('click', () => {
    Toast.fire({
      icon: 'warning',
      title: 'Warning: Check your input'
    });
  });

  document.getElementById('toast-error')?.addEventListener('click', () => {
    Toast.fire({
      icon: 'error',
      title: 'Error occurred!'
    });
  });

  // Position Examples
  document.getElementById('top-start')?.addEventListener('click', () => {
    Swal.fire({
      position: 'top-start',
      icon: 'success',
      title: 'Top Start Position',
      showConfirmButton: false,
      timer: 1500
    });
  });

  document.getElementById('top-center')?.addEventListener('click', () => {
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Top Center Position',
      showConfirmButton: false,
      timer: 1500
    });
  });

  document.getElementById('top-end')?.addEventListener('click', () => {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Top End Position',
      showConfirmButton: false,
      timer: 1500
    });
  });

  document.getElementById('center-start')?.addEventListener('click', () => {
    Swal.fire({
      position: 'center-start',
      icon: 'success',
      title: 'Center Start Position',
      showConfirmButton: false,
      timer: 1500
    });
  });

  document.getElementById('center')?.addEventListener('click', () => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Center Position',
      showConfirmButton: false,
      timer: 1500
    });
  });

  document.getElementById('center-end')?.addEventListener('click', () => {
    Swal.fire({
      position: 'center-end',
      icon: 'success',
      title: 'Center End Position',
      showConfirmButton: false,
      timer: 1500
    });
  });

  document.getElementById('bottom-start')?.addEventListener('click', () => {
    Swal.fire({
      position: 'bottom-start',
      icon: 'success',
      title: 'Bottom Start Position',
      showConfirmButton: false,
      timer: 1500
    });
  });

  document.getElementById('bottom-center')?.addEventListener('click', () => {
    Swal.fire({
      position: 'bottom',
      icon: 'success',
      title: 'Bottom Center Position',
      showConfirmButton: false,
      timer: 1500
    });
  });

  document.getElementById('bottom-end')?.addEventListener('click', () => {
    Swal.fire({
      position: 'bottom-end',
      icon: 'success',
      title: 'Bottom End Position',
      showConfirmButton: false,
      timer: 1500
    });
  });

  // Special Examples
  document.getElementById('queue-alert')?.addEventListener('click', () => {
    Swal.mixin({
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2', '3']
    }).queue([
      {
        title: 'Step 1',
        text: 'This is the first step'
      },
      {
        title: 'Step 2',
        text: 'This is the second step'
      },
      {
        title: 'Step 3',
        text: 'This is the final step'
      }
    ]).then((result) => {
      if (result.value) {
        Swal.fire({
          title: 'All steps completed!',
          confirmButtonText: 'Finish'
        });
      }
    });
  });

  document.getElementById('mixin-alert')?.addEventListener('click', () => {
    const MySwal = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success me-2',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    MySwal.fire({
      title: 'Are you sure?',
      text: "This is a mixin example with custom button styling",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, proceed!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    });
  });

  document.getElementById('progress-alert')?.addEventListener('click', () => {
    Swal.fire({
      title: 'Progress Steps Example',
      currentProgressStep: 0,
      progressSteps: ['1', '2', '3'],
      showClass: {
        backdrop: 'swal2-noanimation',
        popup: '',
        icon: ''
      },
      hideClass: {
        popup: ''
      }
    });
  });

  document.getElementById('delete-confirm')?.addEventListener('click', () => {
    Swal.fire({
      title: 'Delete this item?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // Simulate deletion
        Swal.fire({
          title: 'Deleting...',
          timer: 1000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          }
        }).then(() => {
          Swal.fire(
            'Deleted!',
            'The item has been deleted.',
            'success'
          );
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your item is safe :)',
          'error'
        );
      }
    });
  });
}

// Call initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeSweetAlert);
} else {
  initializeSweetAlert();
}

// Export for module system if needed
export { initializeSweetAlert };