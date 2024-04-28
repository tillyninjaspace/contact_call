$('#app').on('submit', '#contactForm', async function (event) {
    event.preventDefault()
    const name = $(this).find('input#name').val();
    const email = $(this).find('input#email').val();
    const message = $(this).find('input#message').val();
     console.log('name: ', name);
     console.log('email: ', email);
     console.log('message: ', message);
    try {
      const response  = await fetch(`/api/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, email, message})
      })
    const data = await response.json();

    if (data) {
        console.log("There is a response back. " + data.status)
        $('#contactForm').trigger('reset')
        $('#messageResults').append("Your message was successfully SENT.")
    }

    } catch (error) {
        console.error(error)
    }
  });